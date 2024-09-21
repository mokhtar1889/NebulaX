import { model, Schema } from "mongoose"

const productSchema = new Schema({
    name:{type:String} ,
    price:{type:Number},
    image:{type:String},
    quantity:{type:Number},
    salePrice:{type:Number}
},{
    timestamps:true
})


export let Product = model("Product" , productSchema)
