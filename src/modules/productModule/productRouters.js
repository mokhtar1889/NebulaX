import { Router} from "express";
import * as productsControllers from "./productControllers.js"
import * as productsValidationSchemas from "./productValidationSchemas.js"
import { validation } from "../../middlewares/validation.js";
import { uploadFile } from "../../../utils/fileUpload.js";

const router = Router()

//create product
router.post("/createProduct" ,
        validation(productsValidationSchemas.createProduct) ,
        productsControllers.createProduct 
)

//upload product image
router.patch("/uploadImage/:productId" ,
        validation(productsValidationSchemas.uploadProductImage) ,
        uploadFile().single("productImage"),
        productsControllers.uploadProductImage
)

//delete product
router.delete("/deleteProduct/:productId" ,
        validation(productsValidationSchemas.deleteProduct) ,
        productsControllers.deleteProduct
)

//update product
router.patch("/updateProduct/:productId" ,
        validation(productsValidationSchemas.updateProduct) ,
        productsControllers.updateProduct
)

//add product to cart
router.post("/addProductToCart")


export default router