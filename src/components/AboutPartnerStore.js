import React, { useState } from 'react';

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
                <h4>{product.productMaker}</h4>
                
                <p>{longDesc?product.productLongDesc.substr(0,120):product.productLongDesc} </p> 
                <div className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={product.productLongDesc.length<120}>{longDesc?' more...':' less...'}</div>
                <p>{product.sellerRegion}</p>
                <p>{product.sellerWebsite} {product.sellerEmail}</p>     
            </div>
        </div>
        <style jsx='true'>{`
            h4 {
                text-align: center;
                margin-top: -20px;
            }
            .detailContainer {
                overflow-y: scroll;
                min-height: 25vh;
                max-height: 10vh;
                width: 80vw;
                background-color: #ffffff;
                border: 12px double #f9bf1e;
                border-radius: 3px;
                display: flex;
                align-items: center;
                padding: 20px;
                margin: auto;
                margin-bottom: 30px;
            }
            .detailButton {
                margin: 15px auto;
                background-color: #f9bf1e;
                padding: 5px 10px;
                font-size: 20px;
                border-radius: 3px;
            }
            .detailImg img {
                height: 100%;
                max-height: 170px;
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
                margin-bottom: 15px
            }
            .moreButton:hover {
                transform: scale(1.1);
            }
        `}
        </style>
        </>
    )
}

export default AboutPartnerStore;
