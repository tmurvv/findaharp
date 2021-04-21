// packages
import React, {useState, useEffect, useLayoutEffect } from 'react';
import LazyLoad from 'react-lazyload'; 
// styles
import ProductCss from '../styles/builderProduct.css';
// internal
import { removeDashOE } from '../../main/utils/helpers';

function Product({productdetail, handleopendetail, handleclosedetail, handleopencontact, handleclosecontact, clientlat, clientlong}) {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);
    const [useNaturalHeight, setUseNaturalHeight] = useState(0);
    let poll;
    
    // if (productdetail.productImageUrl.indexOf('genericHarp')>-1) productdetail.productImageUrl="";
    function handleOpenProductModal() {
        if (!productdetail||!productdetail.productTitle) return;
        setOpenProductModal(true);
        handleopendetail(productdetail); 
    }
    // function handleCloseProductModal(evt, product, openContact) {
    //     setOpenProductModal(false);
    //     handleclosedetail(productdetail); 
    //     if (openContactModal) handleopencontact(evt, product);
    // }
    function handleOpenContactModal(evt, product) {
        evt.stopPropagation();
        setOpenContactModal(true);
        handleopencontact(evt, product);
    }
    // function handleCloseContactModal() {
    //     evt.stopPropagation();
    //     setOpenContactModal(false);
    // }
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '30%') evt.target.style.height="auto";
        if (productdetail.naturalHeight && productdetail.naturalHeight > 0) evt.target.style.height=`auto`;
    }
    
    useEffect(() => {
        if (productdetail) {
            let mounted = true;
            // if image is squarish, adjusts the height so image not stretched out
            const img = document.createElement('img');
            img.src = productdetail.productImageUrl;

            poll = setInterval(function () {
                
                if (img.naturalWidth&&mounted) {
                    clearInterval(poll);
                    if (img.naturalWidth/img.naturalHeight > .80) {setUseNaturalHeight(img.naturalHeight);productdetail.naturalHeight = img.naturalHeight;}
                    }
            }, 30);
            return () => mounted = false;
        }  
    },[]);
    if (productdetail) return (
        
        <div 
            key={productdetail&&productdetail.id} 
            id={productdetail&&productdetail.id} 
            className={`productSmallDisplay`} 
            onClick={() => handleOpenProductModal(productdetail)}
        >
            <div className={`productSmallDisplay-img`}>
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                >
                    <img 
                        id={productdetail&&productdetail.id} 
                        src={productdetail&&productdetail.productImageUrl} 
                        onError={(evt) => {
                            evt.target.src='./img/not_found.png'; 
                            evt.target.style.height='30%';
                        }} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={productdetail&&productdetail.productTitle}
                    />
                </LazyLoad>
            </div>
            <div className={`grid-item productSmallDisplay-text`}>
                <p>{productdetail.productModel.indexOf(productdetail.productMaker)>-1?'':productdetail.productMaker} {productdetail.productModel}<br></br>
                {productdetail.productSize>0?`${productdetail.productSize} Strings`:''}
                {productdetail.productTitle?<button 
                        onClick={() => handleOpenProductModal(productdetail)} 
                        style={{
                            margin: 'auto', 
                            padding: '5px 7px', 
                            fontSize: '14px', 
                            backgroundColor: 'transparent', 
                            border: 'none', 
                            color: '#6A75AA',
                            cursor: 'pointer'
                        }}
                    >more...</button>:''}
                    <br />
                    {removeDashOE(productdetail.sellerName)}
                </p>
            </div> 
            <ProductCss />          
        </div>
                    
    );
    return (<p>Not found</p>)
}

export default Product;
