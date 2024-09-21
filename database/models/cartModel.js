import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema({

    products:[
        {
            productId:{type:Types.ObjectId , ref:"Product"} ,
            productName:{type:String},
            quantity:{type:Number} ,
            price:{type:Number},
            unitPrice:{type:Number},
            salePrice:{type:Number}
        }],

    subtotal:{type:Number},

    totalSales: {type:Number},

    totalPrice:{type:Number}
    
},{
    timestamps:true
})

export let Cart = model("Cart" , cartSchema)