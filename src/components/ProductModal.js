import React, { useState } from 'react';

// internal
import ProductModalCSS from '../styles/ProductModal.css';
import {removeDashOE} from '../utils/helpers';

function ProductModal(props) {
    const [longDesc, setLongDesc] = useState(true);
    const {productTitle, productMaker, productModel, productSize, productPrice, productType, productFinish, productLongDesc, productImageUrl, sellerRegion, sellerName, productImageBestColor} = props.product;
    if (props.product===undefined||!props.product) return props.handleCloseDetail();
    if (!productLongDesc) productLongDesc="unavailable";

    function handleClick(evt, product, openContact) {
        setLongDesc(true);
        props.handleCloseDetail(evt, product, openContact);
    }
    return (
        <>
        <div className='detailContainer'>
            <h1>{productMaker} {productModel}</h1>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='detailInfo'>
            <div className={`detailImg`}><img src= {productImageUrl} alt={productTitle} /></div>
            <div className={`detailText`}>
                <p><span>Maker</span> {productMaker}<br></br>
                <span>Model</span> {productModel}<br></br>
                <span>Size</span> {productSize?productSize:'unavailable'} Strings / {productType}<br></br>
                <span>Price</span> {productPrice?productPrice:'unavailable'}<br></br>
                <span>Finish</span> {productFinish?productFinish:'unavailable'}</p>
                <br></br>
                <div className='longDesc'><span>Description</span><br></br>{longDesc?productLongDesc:''}</div>
                <br></br>
                <p><span>Location</span> {sellerRegion?sellerRegion:'unavailable'}<br></br>
                <span>Seller</span> {sellerName?removeDashOE(sellerName):'unavailable'}<br></br></p>
                <button className='detailButton' onClick={(evt) => handleClick(evt, props.product, true)}>Contact Seller</button>        
            </div>

            <div onClick={(evt) => handleClick(evt, props.product, false)} className='clearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>  
        </div>
        </div>
        <ProductModalCSS />
        </>
    )
}

export default ProductModal;
