// packages
import React, {useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
// styles
import ProductCss from '../styles/Product.css';
// internal
import ProductModal from './ProductModal';
import ContactSellerForm from './ContactSellerForm';
import { removeDashOE,setOpacity } from '../utils/helpers';
import { productsReducer } from '../utils/reducers';
import ProductContainer from './ProductContainer';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

function Product({productdetail, handleopendetail, handleclosedetail, handleopencontact, handleclosecontact}) {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);
    function handleOpenProductModal() {
        setOpenProductModal(true);
        handleopendetail(productdetail); 
    }
    function handleCloseProductModal(evt, product, openContact) {
        setOpenProductModal(false);
        handleclosedetail(productdetail); 
        if (openContactModal) handleopencontact(evt, product);
    }
    function handleOpenContactModal(evt, product) {
        evt.stopPropagation();
        setOpenContactModal(true);
        handleopencontact(evt, product);
    }
    function handleCloseContactModal() {
        evt.stopPropagation();
        setOpenContactModal(false);
    }
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '85%') evt.target.style.height="100%";
    }
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
