import React from 'react';

function ProductContainerCss() {
    return (
        <style jsx="true">{`
            .notFoundContainer {
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                position: relative;
                z-index: 0;
            } 
            .notFoundContainer img {
                height: 225px;
            }          
            .productContainer {
                margin: auto;
                position: relative;
                width: 100%;
                max-width: 1010px;
            }
            @media only screen and (max-width: 1475px) {
                .productContainer {
                    max-width: unset;
                }
            }
            @media only screen and (max-width: 550px) {
                .productContainer {
                    width: 80%;
                }
            }
            .grid-container {
                margin: auto;
                width: 100%;
                max-width: 1010px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            @media only screen and (max-width: 550px) {
                .grid-container {
                    width: 60vw;
                }
            }
            .productSmallDisplay {
                display: flex;
                flex-direction: column;
                margin-bottom: 35px;
                text-align: center;
                font-size: 14px;
                height: 350px;
                width: 19%;
            }
            .productSmallDisplay:nth-child(5n) {
                margin-right: 0;
            }
            @media only screen and (max-width: 1200px) {
                .productSmallDisplay {
                    width: 24%;
                }
            }
            @media only screen and (max-width: 950px) {
                .productSmallDisplay {
                    width: 33%;
                }
            }
            @media only screen and (max-width: 700px) {
                .productSmallDisplay {
                  width: 30vw;
                }
            }
            @media only screen and (max-width: 550px) {
                .productSmallDisplay {
                    width: 80vw;
                    /*grid-template-columns: 39.5vw 39.5vw; */  
                }
            }
            .productSmallDisplay span {
                cursor: pointer;
            }
            .productSmallDisplay-img {
                flex:7;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 269px;
            }
            .productSmallDisplay-img img{
                height: 267px;
                width: auto;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .productSmallDisplay-text {
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 5px;
            }
            .productSmallDisplay-text p {
                margin-block-start: 0;
                margin-block-end: 0;
            }
            .productSmallDisplay-text p a {
                text-decoration: none;
                cursor: pointer;
                color: #333333;
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
