import React from 'react'
import './Offers.css'
import naruto from '../Assets/naruto.png'

export const Offers = () => {
  return (
    <div className='offers' >
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offer For You</h1>
            <p>ONY ON BEST SELLER PRODUCT</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={naruto} alt=''/>
        </div>
    </div>
  )
}
export default Offers