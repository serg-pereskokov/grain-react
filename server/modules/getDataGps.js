import mysql from 'mysql'
import { sql } from './asyncFunc.js'
import { SQL_CONN as settings } from '../CONST.js'
import { trimTimestamp } from './trimTimestamp.js'
import { arrEq } from '../utils/arrEq.js'

const getCar = async ([payload, res]) => {
    console.log(payload)
    
    try{
        const conn = mysql.createConnection({
            host: settings.host,
            user: settings.user,
            password: settings.password,
            database: payload.sqlDB
        });

        conn.connect();

        let data = await sql(conn, `
            SELECT
                ROUND(datagps.Longitude/600000,6) as lng,
                ROUND(datagps.Latitude/600000,6) as lat,
                datagps.UnixTime,
                datagps.Speed,
                datagps.Mobitel_ID,
                ROUND(datagps64.Longitude / 10000000, 8) as lng,
                ROUND(datagps64.Latitude / 10000000, 8) as lat,
                datagps64.UnixTime,
                datagps64.Speed,
                datagps64.Mobitel_ID
            FROM
                datagps
            JOIN 
                datagps64
            WHERE
                datagps.UnixTime >= ${trimTimestamp(payload.startDay)}
            AND 
                datagps.UnixTime <= ${trimTimestamp(payload.endDay)}
            AND 
                datagps.Mobitel_ID IN(${payload.mobitelIds})
            AND
                datagps64.UnixTime >= ${trimTimestamp(payload.startDay)}
            AND 
                datagps64.UnixTime <= ${trimTimestamp(payload.endDay)}
            AND 
                datagps64.Mobitel_ID IN(${payload.mobitelIds})
            ORDER BY
                datagps.UnixTime
        `)

        // let data = await sql(conn, `
        //     SELECT
        //         ROUND(datagps.Longitude/600000,6) as lng,
        //         ROUND(datagps.Latitude/600000,6) as lat,
        //         datagps.UnixTime,
        //         datagps.Speed,
        //         datagps.Mobitel_ID
        //     FROM
        //         datagps
        //     WHERE 
        //         datagps.UnixTime >= ${trimTimestamp(payload.startDay)}
        //     AND 
        //         datagps.UnixTime <= ${trimTimestamp(payload.endDay)}
        //     AND 
        //         datagps.Mobitel_ID IN(${payload.mobitelIds})
        //     UNION
        //     SELECT
        //         ROUND(datagps64.Longitude / 10000000, 8) as lng,
        //         ROUND(datagps64.Latitude / 10000000, 8) as lat,
        //         datagps64.UnixTime,
        //         datagps64.Speed,
        //         datagps64.Mobitel_ID
        //     FROM
        //         datagps64
        //     WHERE 
        //         datagps64.UnixTime >= ${trimTimestamp(payload.startDay)}
        //     AND 
        //         datagps64.UnixTime <= ${trimTimestamp(payload.endDay)}
        //     AND 
        //         datagps64.Mobitel_ID IN(${payload.mobitelIds})
        //     ORDER BY
        //         UnixTime
        // `)

        // let data = await sql(conn, `
        //     SELECT
        //         ROUND(datagps.Longitude/600000,6) as lng,
        //         ROUND(datagps.Latitude/600000,6) as lat,
        //         datagps.UnixTime,
        //         datagps.Speed,
        //         datagps.Mobitel_ID,

        //         ROUND(datagps64.Longitude / 10000000, 8) as lng,
        //         ROUND(datagps64.Latitude / 10000000, 8) as lat,
        //         datagps64.UnixTime,
        //         datagps64.Speed,                
        //         datagps64.Mobitel_ID,
        //     FROM
        //             datagps 
        //         AND 
        //             datagps64
        //     WHERE 
        //         datagps.UnixTime >= ${trimTimestamp(payload.startDay)}
        //     AND 
        //         datagps.UnixTime <= ${trimTimestamp(payload.endDay)}
        //     AND 
        //         datagps.Mobitel_ID IN(${payload.mobitelIds})
        //     ORDER BY
        //         datagps.UnixTime
        // `)

        // if ( data.length === 0 ) {
        //     data = await sql(conn, `
        //         SELECT
        //             ROUND(datagps64.Longitude / 10000000, 8) as lng,
        //             ROUND(datagps64.Latitude / 10000000, 8) as lat,
        //             datagps64.UnixTime,
        //             datagps64.Speed
        //         FROM 
        //             datagps64
        //         WHERE 
        //             datagps64.UnixTime >= ${trimTimestamp(payload.startDate)}
        //         AND 
        //             datagps64.UnixTime <= ${trimTimestamp(payload.endDate)}
        //         AND 
        //             datagps64.Mobitel_ID IN(${payload.mobitelIds})
        //         ORDER BY
        //             datagps64.UnixTime
        //     `)
        // }

        conn.end()

        let obj = []

        for (let item of payload.mobitelIds) {
            const array = data.filter( value => {
                if (item === value.Mobitel_ID) return {
                    speed: value.speed,
                    time: value.UnixTime,
                    coords: [value.lat, value.lng]
                }
            })
            obj.push({id: item, array})
        }

        
        res.json(obj)

        // const newData = data.map( item => {
        //     if (item.lat && item.lng) {
        //         return {
        //             mobitelId: payload.mobitelId,
        //             speed: item.speed,
        //             time: item.UnixTime,
        //             coords: [item.lat, item.lng]
        //         }
        //     }
        //     else {
        //         return {
        //             mobitelId: payload.mobitelId,
        //             time: item.UnixTime,
        //             coords: false
        //         }
        //     }
        // })
        // .filter( (item, index, array) => {
        //     if(index == 0 && item.coords) {
        //         return {
        //             mobitelId: item.mobitelId,
        //             speed: item.speed,
        //             time: item.time,
        //             coords: item.coords
        //         }
        //     }
        //     else if(array[index + 1] !== undefined && item.coords && array[index + 1].coords) {
        //         let eq = arrEq(item.coords, array[index + 1].coords)
        //         if (!eq) {
        //             return {
        //                 mobitelId: item.mobitelId,
        //                 speed: item.speed,
        //                 time: item.time,
        //                 coords: item.coords
        //             }
        //         } else return
        //     }
        // })

        // res.json(newData)
    } catch (e) {
        console.log(e);
        res.json({
            error: e
        })
    }
    
}

export default getCar