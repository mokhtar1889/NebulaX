import { asyncHandler } from "../../../utils/asyncHandler.js"
import { getCart , calculateTotalAndSubTotalPrices } from "../cartModule/createCart.js";
import {Product} from "./../../../database/models/productModel.js"
import { unlink } from 'node:fs';


//create product 
export let createProduct = asyncHandler(async (req , res , next)=>{

    //product data
    let {name , price , quantity , salePrice} = req.body

    //check if product is exists
    let product = await Product.findOne({name}) ;

    if(product) return next(new Error("product is already exists!" , {cause:403}))

    if(!salePrice){

        salePrice = 0 ;
    }    

    // add product to database
    product = await Product.create({name , price , quantity , salePrice})

    //response
    return res.json({success:true , message:"product created" , product})
 
})

//upload Product Image
export let uploadProductImage = asyncHandler(async(req , res , next)=>{

    let{productId} = req.params

    //check if product is exists
    let product = await Product.findById(productId)

    if(!product) return next(new Error("product is not exists!" , {cause:404}))
    
    //remove old product image if exists 
    if(product.image) unlink(product.image , (err)=>{}) 

    //add image path to database   
    let imagePath = req.file.path  
    product.image = imagePath
    await product.save()
    
    //resposne
    return res.json({success:true , message:"image uploaded successfully" , imagePath})
})

//delete product
export let deleteProduct = asyncHandler(async(req , res , next)=>{

    let{productId} = req.params

    //check if product is exists
    let product = await Product.findById(productId)

    if(!product) return next(new Error("product is not exists!" , {cause:404}))

    // delete product image if exists
    if(product.image){
        unlink(product.image , (err)=>{

            console.log("product image deleted")
        })
    }
    
    //delete product from database
    await product.deleteOne()

    //response
    res.json({success:true , message:"product deleted successfully"})    

})

//update product
export let updateProduct = asyncHandler(async (req , res , next)=>{

    let { productId } = req.params ;

    let {name , price , quantity , salePrice} = req.body

    //check if product is exists
    let product = await Product.findById(productId)

    if(!product) return next(new Error("product is not exists!" , {cause:404}))

    //update product information
    product.name = name ? name : product.name    
    product.price = price ? price : product.price    
    product.quantity = quantity ? quantity : product.quantity

    if(salePrice == 0){

        product.salePrice = 0   

    }else if(salePrice > 0){

        product.salePrice = salePrice
    }
    
    await product.save()
    

    // update product details in the cart

    //get cart if exists 
    let cart = await getCart() ;

    let cartProduct ;

    if(cart){

        //check if the product exist in the cart
        cartProduct = cart.products.find((item)=>{
        return item.productId == productId ;
        })
    }

    if(cart && cartProduct ){

        if(cartProduct){
            
            //update product information in the cart
            cart.products.map((item)=>{

                if(item.productId.equals(product._id)){

                    item.salePrice = product.salePrice * item.quantity ;

                    item.productName = product.name ;

                    item.price = product.price * item.quantity ;
                }
            })
        }

        //update subtotal price , total sales and total price
        calculateTotalAndSubTotalPrices(cart)

    }

    //response 
    return res.json({success:true , message:"product updated successfully" , product})

})

