import { readFile } from 'fs/promises';

const getCar = async ([payload, res]) => {
    
    const data = await readFile('./modules/gps-542.json').then(json => JSON.parse(json)).catch(() => null);

    res.json(data)
    
}

export default getCar