import React, { createContext } from 'react'
import all_product from "../Components/Assets/all_product"
//we are creating a context to share data between components in our React application
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    const contextValue = {all_product};
    //The ShopContextProvider component is a functional component that takes in a props object.
    // It is used to provide data to other components in the application using the ShopContext
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
