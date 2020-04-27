import React, { useState } from 'react';

// internal
import ProductModalCSS from '../styles/ProductModal.css';

function ProductModal(props) {
    const [longDesc, setLongDesc] = useState(true);
    let product = props.product;
    if (product===undefined||!product) return props.handleCloseDetail();
    if (!product.productLongDesc) product={...product, productLongDesc: "Description not available."};

    function handleClick(evt, product, openContact) {
        setLongDesc(true);
        props.handleCloseDetail(evt, product, openContact);
    }
    return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <p>Maker: {product.productMaker} {product.productModel}<br></br>
                Model: {product.productSize} Strings / {product.productType}<br></br>
                Price: {product.productPrice}<br></br>
                Finish: {product.productFinish}</p>
                <p>------</p>
                <p>Description: {longDesc?product.productLongDesc.substr(0,200):product.productLongDesc} </p> 
                <div className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<199}>{longDesc?' more...':' less...'}</div>
                <p>------</p>
                <p>Location: {product.sellerRegion}<br></br>
                <button className='detailButton' onClick={(evt) => handleClick(evt, product, true)}>Contact Seller</button> </p>     
                
            </div>
            
            <div onClick={(evt) => handleClick(evt, product, false)} className='clearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>  
        </div>
        <ProductModalCSS />
        </>
    )
}

export default ProductModal;
