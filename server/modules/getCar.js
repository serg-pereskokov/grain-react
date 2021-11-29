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
                datagps.Speed
            FROM
                datagps
            WHERE 
                datagps.UnixTime >= ${trimTimestamp(payload.startDate)}
            AND 
                datagps.UnixTime <= ${trimTimestamp(payload.endDate)}
            AND 
                datagps.Mobitel_ID = ${payload.mobitelId}
            ORDER BY
                 datagps.DataGps_ID
            DESC
        `)

        conn.end()

        const newData = data.map( item => {
            if (item.lat && item.lng) {
                return {
                    mobitelId: payload.mobitelId,
                    speed: item.speed,
                    time: item.UnixTime,
                    coords: [item.lat, item.lng]
                }
            }
            else {
                return {
                    mobitelId: payload.mobitelId,
                    time: item.UnixTime,
                    coords: false
                }
            }
        })
        .filter( (item, index, array) => {
            if(index == 0 && item.coords) {
                return {
                    mobitelId: item.mobitelId,
                    speed: item.speed,
                    time: item.time,
                    coords: item.coords
                }
            }
            else if (item.coords) {
                return {
                    mobitelId: item.mobitelId,
                    speed: item.speed,
                    time: item.time,
                    coords: item.coords
                }
            }
            // else if(array[index + 1] !== undefined && item.coords && array[index + 1].coords) {
            //     let eq = arrEq(item.coords, array[index + 1].coords)
            //     if (!eq) {
            //         return {
            //             mobitelId: item.mobitelId,
            //             speed: item.speed,
            //             time: item.time,
            //             coords: item.coords
            //         }
            //     } else return
            // }
        })

        res.json(newData)
    } catch (e) {
        console.log(e);
        res.json({
            error: e
        })
    }
    
}

export default getCar