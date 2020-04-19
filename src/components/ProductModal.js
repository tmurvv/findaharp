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
                <p>Description: {longDesc?product.productLongDesc.substr(0,200):product.productLongDesc} </p> 
                <div className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<199}>{longDesc?' more...':' less...'}</div>
                <p>------</p>
                <p>Location: {product.sellerRegion}</p>
                <p>contact info (will link to a contact form): {product.sellerName}</p>     
                
            </div>
            <div onClick={handleClick} className='clearModal'>
                <img onClick={handleClick} src='/img/clear_search.png' alt='clear filters'/>
            </div>  
        </div>
        <style jsx>{`
            .detailContainer {
                width: 80vw;
                background-color: #ffffff;
                position: fixed;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                padding: 20px;
                z-index: 3000;
                max-height: calc(100vh - 210px);
                overflow-y: auto;
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
            }
            .detailButton {
                margin: 15px auto;
                background-color: #f9bf1e;
                padding: 5px 10px;
                font-size: 20px;
                border-radius: 3px;
            }
            .detailImg {
                height: 100%;
            }
            .detailImg img {
                height: 100%;
                max-height: 300px;
                margin: 0 auto;
            }
            .detailText {
                padding: 20px;
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
            .clearModal {
                position: absolute;
                top: 0;
                right: 0;
                color: black;
                height: 35px;
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
