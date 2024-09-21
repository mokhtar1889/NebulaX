import { asyncHandler } from "../../../utils/asyncHandler.js";
import {createCart, getCart , calculateTotalAndSubTotalPrices} from "./createCart.js";
import {Product} from "../../../database/models/productModel.js"


// add product to cart
export let addProduct = asyncHandler(async(req , res , next)=>{
    
    //create cart if not exist
    await createCart() ;

    //get cart 
    let cart = await getCart()

    //get product id from params
    let {productId} = req.params ;

    //get product quantity
    let {quantity} = req.body ;

    //get product
    let product = await Product.findById(productId) ;

    //check product
    if(!product) return next(new Error("product is not exists!" , {cause:404}))

    // check if product is available
    if(product.quantity < quantity) return next(new Error(`there is only ${product.quantity} units available !` , {cause:403}))     

    //sale price of the product
    product.salePrice = product.salePrice ? product.salePrice : 0

    // check if the product is already in the cart
    let productInCart = cart.products.find((item)=>{

        return item.productId == productId
    })

    if(productInCart){

        // increase the added units to the product units
        productInCart.quantity += quantity ; 

        // update the price of the total number of all product units
        productInCart.price += (product.price * quantity);

        //update the sale price
        productInCart.salePrice += (product.salePrice * quantity)

    } else{

        // add product to cart 
        cart.products.push({

            productId:product._id ,
            productName:product.name ,
            quantity ,
            price: (product.price * quantity) ,
            unitPrice : product.price ,
            salePrice: (product.salePrice * quantity)
            
        });
    }

    //determin subtotal price , total sales and total price
    calculateTotalAndSubTotalPrices(cart)

    
    //update the avaliable product units 
    product.quantity -= quantity ;
    product.save()
   
        
    return res.json({success:true , message:"product added to cart successfully"})    

})

// display carts total and subtotal
export let displayCart = asyncHandler(async(req , res , next)=>{

    let cart = await getCart()

    return res.json({cart}) 
})

//change product quantity in the cart
export let changeProductQuantity = asyncHandler(async(req , res , next)=>{

    //get cart 
    let cart = await getCart()

    //get product id from params
    let {productId} = req.params ;

    //get product quantity
    let {quantity} = req.body ;

    //get product
    let product = await Product.findById(productId) ;

    //check product
    if(!product) return next(new Error("product is not exists!" , {cause:404}))
        
    // check if the product is already in the cart
    let productInCart = cart.products.find((item)=>{
        return item.productId == productId
    })

    if(!productInCart) return next(new Error("this product is not exists in the cart add it first" , {cause:403}))

    // if the new quantity is larger than the original quantity of the product before it added to cart    
    if(quantity > productInCart.quantity + product.quantity) return next(new Error(`there is only ${productInCart.quantity + product.quantity} units available !` , {cause:403}))
    
    //update the original quantity of the product
    if(productInCart.quantity > quantity ){

        product.quantity += (productInCart.quantity - quantity) 

        await product.save()    

    } else if(productInCart.quantity < quantity){

        product.quantity -= (quantity - productInCart.quantity)

        await product.save()    
    }

    // if the new quantity is less than or equal to original quantity of the product before it added to cart
    if(quantity <= productInCart.quantity + product.quantity){

        //add the new quantity
        productInCart.quantity = quantity

        // update the new price
        productInCart.price = quantity * product.price 

        // update the new sale price
        productInCart.salePrice = quantity * product.salePrice

        //update subtotal price , total sales and total price
        calculateTotalAndSubTotalPrices(cart)
    } 

    return res.json({success:true , message:"quantity updated " , productInCart})
    
})

//remove product from cart
export let removeProduct = asyncHandler(async(req , res , next)=>{

    //get cart
    let cart = await getCart()

    //get product
    let {productId} = req.params

    let product = await Product.findById(productId);

    //check if the product exist in the cart
    let cartProduct = cart.products.find((item)=>{
        return item.productId == productId ;
    })

    if(!cartProduct) return next(new Error("this product not exists in the cart") , {cause:403})

    //return the quantity of the removed product to the product 
    product.quantity += cartProduct.quantity ;
    
    await product.save() ;  

    //delete product from cart
    cart.products = cart.products.filter((item)=>{

        return !item.productId.equals(product._id) 

    }) ;

    //update subtotal price , total sales and total price after removing the product from the cart 

    calculateTotalAndSubTotalPrices(cart)

    return res.json({success:true , message:"product successfully deleted from cart"})

})