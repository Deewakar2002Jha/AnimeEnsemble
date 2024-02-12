import React from 'react'
import './DescriptionBox.css';

export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
        <div className="descriptionbox-navigator">
            <div classname="descriptionbox-nav-box">DescriptionBox</div>
            <div classname="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div classname="description-description" style={{ display: 'flex', flexDirection: 'column', gap: '25px', border: '1px solid #d0d0d0', padding: '48px', paddingBottom: '70px' }}>
                <p>
                    e-commerce websites are online platforms that allow businesses and individuals to buy and sell products or services over the internet. These websites serve as virtual marketplaces where users can browse and purchase items from the comfort of their own homes. E-commerce websites typically display detailed information about each product, including descriptions, images, prices, and any available variations. Each product usually has its own dedicated page with more detailed information.
                </p>
                <p>
                    E-commerce websites have become increasingly popular due to their convenience, accessibility, and the global reach they offer. They allow businesses to sell their products to a much larger audience than they would be able to reach with a physical storefront.
                </p>
        </div>
    </div>
  )
}
export default DescriptionBox
