import React, { createContext, useState } from 'react'
import all_product from "../Components/Assets/all_product"
//we are creating a context to share data between components in our React application
export const ShopContext = createContext(null);

//creating logic for add to cart button on product display compement

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    //now we are creating usestate variable

    const [cartItems,setCartItems] = useState(getDefaultCart());


    //we are creating add to cart fuction in the for cart section

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    // we are creting the revove function for cart section

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {all_product,cartItems,addToCart,removeFromCart};

    // console.log(cartItems);
    // checking the cart item list of item in cart and how item order of the product in the shopping cart

    
    
    //The ShopContextProvider component is a functional component that takes in a props object.
    // It is used to provide data to other components in the application using the ShopContext
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
