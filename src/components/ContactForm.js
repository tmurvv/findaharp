import React from 'react';

import ProductModalCSS from '../styles/ProductModal.css';

function ContactForm(props) {
    const {product} = props;
    return (
        <>
        <div hidden={true} className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <p>Contact {product.sellerName} about {product.productMaker} {product.productModel}<br></br>
                
                contact info (will link to a contact form): {product.sellerName}</p>     
                
            </div>
            {/* <div onClick={handleClick} className='clearModal'>
                <img onClick={handleClick} src='/img/clear_search.png' alt='clear filters'/>
            </div>   */}
        </div>
        <ProductModalCSS />
        </>
    )
}

export default ContactForm;
