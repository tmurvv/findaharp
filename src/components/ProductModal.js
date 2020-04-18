import React, { useState } from 'react';

function ProductModal(props) {
    const [longDesc, setLongDesc] = useState(true);
    let product = props.product;
    if (!product) props.handleClose;
    if (!product.productLongDesc) product={...product, productLongDesc: "description not found"};

    function handleClick() {
        setLongDesc(true);
        props.handleClose();
    }
    return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <p>Maker: {product.productMaker} {product.productModel}</p>
                <p>Model: {product.productSize} Strings / {product.productType}</p>
                <p>Price: {product.productPrice}</p>
                <p>Finish: {product.productFinish}</p>
                <p>------</p>
                <p>Description: {longDesc?product.productLongDesc.substr(0,100):product.productLongDesc} </p> 
                <div className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<99}>{longDesc?' more...':' less...'}</div>
                <p>------</p>
                <p>Location: {product.sellerRegion}</p>
                <p>contact info (will link to a contact form): {product.sellerName}</p>     
            </div>
            <button className='detailButton' onClick={handleClick}>Close</button>
        </div>
        <style jsx>{`
            .detailContainer {
                overflow-y: scroll;
                min-height: 75vh;
                max-height: 90vh;
                width: 50vw;
                background-color: #ffffff;
                position: fixed;
                border: 12px double #f9bf1e;
                border-radius: 3px;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                z-index: 3000;
            }
            .detailButton {
                margin: 15px auto;
                background-color: #f9bf1e;
                padding: 5px 10px;
                font-size: 20px;
                border-radius: 3px;
            }
            .detailImg {
                height: 50%;
                margin: 0 auto;
            }
            .detailImg img {
                height: 100%;
                max-height: 300px;
                margin: 0 auto;
            }
            .detailText {
                padding: 20px 0;
            }
            .detailText p {
                text-align: center;
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .marginTop {
                margin-top: 10px;
            }
            .moreButton {
                color: purple;
                cursor: pointer;
                transition: all .3s;
                outline: none;
                font-size: 18px;
                width: fit-content;
                margin: auto;
            }
            .moreButton:hover {
                transform: scale(1.1);
            }
        `}
        </style>
        </>
    )
}

export default ProductModal;
