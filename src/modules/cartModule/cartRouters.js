import { Router } from "express";
import { validation } from "../../middlewares/validation.js";
import * as cartValidationSchemas from "./cartValidationSchemas.js";
import * as cartControllers from "./cartControllers.js"


let router = Router()

// add product to cart
router.post('/addProductToCart/:productId' ,
    validation(cartValidationSchemas.addProduct),
    cartControllers.addProduct
)

//display cart
router.get('/displayCart' , cartControllers.displayCart)


//remove product from cart
router.patch('/deleteProduct/:productId' , validation(cartValidationSchemas.removeProduct) , cartControllers.removeProduct)

//change product quantity in cart
router.patch(
    '/changeProductQuantity/:productId',
    validation(cartValidationSchemas.changeProductQuantity),
    cartControllers.changeProductQuantity
)

export default router ;
