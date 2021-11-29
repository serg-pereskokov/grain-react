const payload = {
    mobitelId: 542,
    startDate: 1610323200000,
    endDate: 1610409600000,
    sqlDB: 'mca_dispatcher'
}

console.log('test work');

import mysql from 'mysql'
import { sql } from './asyncFunc.js'
import { SQL_CONN as settings } from '../CONST.js'
import { trimTimestamp } from './trimTimestamp.js'
import fs from 'fs'

const func = async () => {
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

        console.log(newData);

        fs.writeFile('./gps-542.json', JSON.stringify(newData, '', 1), (err) => {
            if(err) throw err;
            console.log('Data Base was updated');
        });

        // res.json(newData)
        
    } catch (e) {
        console.log(e);
        // res.json({
        //     error: e
        // })
    }
}

func()