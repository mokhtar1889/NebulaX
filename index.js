import express from 'express'
import { bootstrap } from './bootstrap.js'
import 'dotenv/config'


let app = express()
let port = 3000

bootstrap(app)

app.listen(port , async ()=>{
    console.log('server is running ......')
})
