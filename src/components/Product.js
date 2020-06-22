// packages
import React, {useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
// styles
import ProductCss from '../styles/Product.css';
// internal
import { removeDashOE, geoDistance } from '../utils/helpers';


function Product({productdetail, handleopendetail, handleclosedetail, handleopencontact, handleclosecontact, clientlat, clientlong}) {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);
    const [useNaturalHeight, setUseNaturalHeight] = useState(0);
    
    function handleOpenProductModal() {
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
        if (evt.target.style.height !== '85%') evt.target.style.height="100%";
        if (useNaturalHeight > 0) evt.target.style.height=`auto`;
    }
    
    useEffect(() => {
        var img = document.createElement('img');
        console.dir('imin')
        // img.src = evt.target.getAttribute('src');
        img.src = productdetail.productImageUrl;

        var poll = setInterval(function () {
            if (img.naturalWidth) {
                clearInterval(poll);
                console.log(img.naturalWidth, img.naturalHeight);
                console.log(img.naturalWidth/img.naturalHeight);
                if (img.naturalWidth/img.naturalHeight > .85) setUseNaturalHeight(img.naturalHeight);
                if (img.naturalWidth/img.naturalHeight > .85) console.log(productdetail.productTitle);
            }
        }, 10);

        // img.onload = function () { console.log('Fully loaded'); }
    })
    return (
        <div 
            key={productdetail.id} 
            id={productdetail.id} 
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
                        id={productdetail.id} 
                        src={productdetail.productImageUrl} 
                        onError={(evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%';}} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={productdetail.productTitle}

                    />
                </LazyLoad>
            </div>
            <div className={`grid-item productSmallDisplay-text`}>
                <p>{productdetail.productMaker} {productdetail.productModel}<br></br>
                {productdetail.productSize!==0?`${productdetail.productSize} Strings`:''}<br></br>
                <span 
                    onClick={(e)=>handleOpenContactModal(e, productdetail)} 
                    style={{color: '#6A75AA'}}
                >
                    {removeDashOE(productdetail.sellerName)}
                </span>
                </p>
            </div>           
            <ProductCss />          
        </div>
    );
}

export default Product;
