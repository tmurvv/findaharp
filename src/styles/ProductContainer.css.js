import React from 'react';

function ProductContainerCss() {
    return (
        <style jsx="true">{`
            img {
                height: 100%;
            }
            .notFoundContainer {
                width: 60%;
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                transform: rotate(15deg);
                position: relative;
                z-index: 0;
            }           
            .productContainer {
                width: 70%;
                margin: 30px auto;
                position: relative;
            }
            .grid-container {
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;
                grid-column-gap: 10px
            }
            .grid-item {
                font-size: 30px;
                text-align: center;
                width: 180px;
                font-size: 14px;
            }
            .productSmallDisplay {
                display: flex;
                flex-direction: column;
                height: 350px;
                width: 100%;
            }
            .productSmallDisplay-img {
                flex:7; 
                height: 70%;
                background-color: transparent;
                overflow: hidden;
            }
            .productSmallDisplay-img img{
                width: auto;
                height: 100%;
            }
            .productSmallDisplay-text {
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 5px;
                width: 100%;
            }
            .productSmallDisplay-text p {
                margin-block-start: 0;
                margin-block-end: 0;
            }
            .priceText {
                font-size: 12px;
                font-style: italic;
            }
        `}
        </style>
    )
} 

export default ProductContainerCss;