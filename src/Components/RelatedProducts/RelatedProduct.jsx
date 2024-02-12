import React from 'react'
import './RelatedProduct.css'
import Item from  '../Item/Item'
import data_product from '../Assets/data'
/*
The callback function returns a <Item/> component for each element in the data_product array.
The <Item/> component is a placeholder for a custom component that you have defined elsewhere
in your code.
*/

export const RelatedProduct = () => {
  return (
    <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr/>
        
        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
export default  RelatedProduct;
