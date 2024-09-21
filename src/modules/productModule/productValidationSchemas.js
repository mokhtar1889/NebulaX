import Joi from "joi";
import { Types } from "mongoose";

// add product validation schema
export const createProduct = Joi.object({
    name: Joi.string().required() ,
    price:Joi.number().required() ,
    quantity:Joi.number().min(1).required(),
    salePrice:Joi.number()
}).required()

//upload product image
export const uploadProductImage = Joi.object({
    productId:Joi.custom(validateId)
}).required()

//delete product
export const deleteProduct = Joi.object({
    productId:Joi.custom(validateId)
}).required()

// update product validation schema
export const updateProduct = Joi.object({
    productId:Joi.custom(validateId),
    name: Joi.string() ,
    price:Joi.number() ,
    quantity:Joi.number().min(1),
    salePrice:Joi.number()
}).required()


//id validation method 
export function validateId (value , helper) {
        if(Types.ObjectId.isValid(value) === false) return helper.message("in valid product Id")
            return true
}
