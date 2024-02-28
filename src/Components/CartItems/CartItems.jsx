import React ,{ useContext} from 'react'
import './CartItems.css'
import {ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
  //accesing the context api for cart product
  const {all_product,cartItems,removeFromCart,getTotalCartAmount,} = useContext(ShopContext)

  return (
    <div className='cartitems'>
      {/* cart item product format*/}
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Tittle</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
     
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
          //now we use the individual procduct section we created before
          return<div>
          <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className='carticon-product-icon'/>
            <p>{e.name}</p>
            <p>₹{e.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>₹{e.new_price*cartItems[e.id]}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""/>
          </div>
          <hr/>
        </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
                <p>Subtotal:-</p>
                <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cartitems-total-item">
                <p>Shipping Fee:- </p>
                <p>Free</p>
            </div>
            <hr/>
            <div className="cartitems-total-item">
                <h3>Total:- </h3>
                <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it Here</p>
            <div className="cartitems-promobox">
                <input type='text' placeholder='promo code' />
                <button>Apply</button>
            </div>
        </div>
      </div>
    </div>
  )
}
