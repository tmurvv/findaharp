import React, { useState } from 'react';
import AboutPartnerStoresCSS from '../styles/AboutPartnerStores.css';

import ProductCss from '../styles/Product.css';
import LazyLoad from 'react-lazyload';

function AboutPartnerStore(props) {
    const [longDesc, setLongDesc] = useState(true);
    let product = props.product;
    if (!product) props.handleClose;
    if (!product.productLongDesc) product={...product, productLongDesc: "description not found"};
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '85%') evt.target.style.height="100%";
    }

    return (
        <>
        <div 
            key={product.id} 
            id={product.id} 
            className={`productSmallDisplay`} 
            // onClick={() => handleOpenProductModal(productdetail)}
        >
            <div className={`productSmallDisplay-img`}>
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                >
                    <img 
                        id={product.id} 
                        src={product.productImageUrl} 
                        onError={(evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%';}} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={product.productTitle}
                    />
                </LazyLoad>
            </div>
            <div className='buyerDivider'>
                <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
            </div>
            <div className={`detailText`}>
                {/* <p className='storeName'>{product.productMaker}</p> */}
                <p className='longDesc productSmallDisplay-LongDesc'>
                    <span>{product.productMaker}</span>{product.productLongDesc}       
                </p> 
                {/* <p 
                    className='longDesc productSmallDisplay-LongDesc'><span>{product.sellerName}</span>{longDesc
                    ?product.productLongDesc.substr(0,200)
                    :product.productLongDesc} <span 
                        style={{fontSize: '18px'}} 
                        className='moreButton' 
                        onClick={()=>setLongDesc(!longDesc)} 
                        hidden={product.productLongDesc.length<200}>{longDesc
                            ?' more...'
                            :' less...'}</span>
                </p>  */}
                
            </div>
            <div className={`grid-item productSmallDisplay-text`}>
                <p>{product.sellerWebsite}</p>
                <p>{product.sellerRegion}</p>     
            </div>           
            <AboutPartnerStoresCSS />          
        </div>
        {/**************************** 
        <div className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <p className='storeName'>{product.productMaker}</p>
                <p 
                    className='longDesc'>{longDesc
                    ?product.productLongDesc.substr(0,200)
                    :product.productLongDesc} <span 
                        style={{fontSize: '18px'}} 
                        className='moreButton' 
                        onClick={()=>setLongDesc(!longDesc)} 
                        hidden={product.productLongDesc.length<200}>{longDesc
                            ?' more...'
                            :' less...'}</span>
                </p> 
                <p style={{marginTop: '10px'}}>{product.sellerRegion}</p>
                <p>{product.sellerWebsite} {product.sellerEmail}</p>     
            </div>
        </div>
        */}
        {/* <AboutPartnerStoresCSS /> */}
        </>

    )
}

export default AboutPartnerStore;
