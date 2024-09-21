import {connectDB } from './database/connectDB.js'
import { globalErrorHandler } from './utils/globalErrorHandler.js'
import { notFoundPage } from './utils/notFoundPage.js'
import productRouter from './src/modules/productModule/productRouters.js'
import express from 'express'
import cartRouter from "./src/modules/cartModule/cartRouters.js"


export async function bootstrap (app){

    //connect data base 
    connectDB()

    app.use(express.json())

    app.use("/productsImages" , express.static("productsImages"))

    app.use('/product' , productRouter)

    app.use('/cart' , cartRouter)

    //global error handler
    app.use(globalErrorHandler)

    //not found page handler 
    app.use("*" , notFoundPage)

}