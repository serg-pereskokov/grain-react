import mysql from 'mysql'
import { sql } from './asyncFunc.js'
import { SQL_CONN as settings } from '../CONST.js'
import { trimTimestamp } from './trimTimestamp.js'

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
            return {
                mobitelId: payload.mobitelId,
                speed: item.speed,
                time: item.UnixTime,
                coords: [item.lat, item.lng]
            }
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