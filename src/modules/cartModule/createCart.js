import {Cart} from "./../../../database/models/cartModel.js"

export let createCart = async()=>{

    let cartsCount = await Cart.countDocuments()

    if(cartsCount == 0 ){
        //create empty cart
        await Cart.create({products:[] , totalPrice: 0 , subtotal: 0})
    }
  
}

export let getCart = async () => {

    let cart = await Cart.find({})

    return cart[0]
    
}


export let calculateTotalAndSubTotalPrices = async (cart) => {

    //determin subtotal price , total sales and total price
    let subtotal = 0
    let cartSales = 0

    cart.products.forEach((item)=>{
        subtotal += item. price
        cartSales += item.salePrice

    })

    cart.subtotal = subtotal ;
    cart.totalSales =  cartSales ; 
    cart.totalPrice = subtotal - cartSales ;

    await cart.save()

}

