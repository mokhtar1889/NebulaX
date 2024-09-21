import Joi from "joi"
import {validateId} from "../productModule/productValidationSchemas.js"


//add product to cart
export let addProduct = Joi.object({

    productId : Joi.custom(validateId).required() ,
    quantity: Joi.number().min(1).required()

}).required()

//remove product from cart
export let removeProduct = Joi.object({

    productId : Joi.custom(validateId).required()

}).required()

//change product quantity in the cart
export let changeProductQuantity = Joi.object({

    productId : Joi.custom(validateId).required(),
    quantity:Joi.number().required()

}).required()
