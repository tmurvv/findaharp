import React, { useState } from 'react';
import AboutPartnerStoresCSS from '../styles/AboutPartnerStores.css';

function AboutPartnerStore(props) {
    const [longDesc, setLongDesc] = useState(true);
    let product = props.product;
    if (!product) props.handleClose;
    if (!product.productLongDesc) product={...product, productLongDesc: "description not found"};
    return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <h2>{product.productMaker}</h2>
                
                <p>{longDesc?product.productLongDesc.substr(0,240):product.productLongDesc} </p> 
                <div className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<240}>{longDesc?' more...':' less...'}</div>
                <p>{product.sellerRegion}</p>
                <p>{product.sellerWebsite} {product.sellerEmail}</p>     
            </div>
        </div>
        <AboutPartnerStoresCSS />
        </>
    )
}

export default AboutPartnerStore;
