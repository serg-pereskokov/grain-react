import express from "express"
import bodyParser from 'body-parser'
// import getCar from "./modules/getCar.js"
import getCarJSON from "./modules/getCarJSON.js"

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/getCar', (req, res) => {
    getCarJSON([req.body, res])
    // getCar([req.body, res])
})

app.listen( 3001, () => console.log('Server was started on 3001 port') )