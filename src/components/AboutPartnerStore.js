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
                <p className='storeName'>{product.productMaker}</p>
                <p style={{textAlign: 'left'}}>{longDesc?product.productLongDesc.substr(0,200):product.productLongDesc} <span style={{fontSize: '18px'}} className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<200}>{longDesc?' more...':' less...'}</span></p> 
                <p style={{marginTop: '10px'}}>{product.sellerRegion}</p>
                <p>{product.sellerWebsite} {product.sellerEmail}</p>     
            </div>
        </div>
        <AboutPartnerStoresCSS />
        </>
    )
}

export default AboutPartnerStore;
