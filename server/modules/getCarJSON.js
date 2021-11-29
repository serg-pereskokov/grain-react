import { readFile } from 'fs/promises';
import { arrEq } from '../utils/arrEq.js';

const getCar = async ([payload, res]) => {
    
    const data = await readFile('./modules/gps-525-11.json').then(json => JSON.parse(json)).catch(() => null);

    // data.forEach(item => console.log(item))

    const newData = data.map( item => {
        if (item.lat && item.lng) {
            return {
                mobitelId: payload.mobitelId,
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
    }).filter( (item, index, array) => {
        if(index == 0 && item.coords) {
            return {
                mobitelId: payload.mobitelId,
                time: item.time,
                coords: item.coords
            }
        }
        // else if (item.coords) {
        //     return {
        //         mobitelId: item.mobitelId,
        //         time: item.time,
        //         coords: item.coords
        //     }
        // }
        else if(array[index + 1] !== undefined && item.coords && array[index + 1].coords) {
            let eq = arrEq(item.coords, array[index + 1].coords)
            if (!eq) {
                return {
                    mobitelId: payload.mobitelId,
                    time: item.time,
                    coords: item.coords
                }
            } else return
        }
    })

    res.json(newData)

    // res.json(d)
    
}

export default getCar