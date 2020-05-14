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
                width: 70%;
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
                display: grid;
                grid-template-columns: 13.2vw 13.2vw 13.2vw 13.2vw 13.2vw;
                grid-column-gap: 1vw;
                width: 100%;
            }

            @media only screen and (max-width: 1475px) {
                .grid-container {
                    width: unset;
                }
            }
            @media only screen and (max-width: 1200px) {
                .grid-container {
                    grid-template-columns: 16.75vw 16.75vw 16.75vw 16.75vw;
                }
            }
            @media only screen and (max-width: 950px) {
                .grid-container {
                    grid-template-columns: 22.66vw 22.66vw 22.66vw;
                }
            }
            @media only screen and (max-width: 700px) {
                .grid-container {
                    width: 60vw;
                    grid-template-columns: 29.5vw 29.5vw;   
                }
            }
            @media only screen and (max-width: 550px) {
                .grid-container {
                    width: 80vw;
                    grid-template-columns: 39.5vw 39.5vw;   
                }
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
                margin-bottom: 50px;
            }
            .productSmallDisplay span {
                cursor: pointer;
            }
            .productSmallDisplay-img {
                flex:7;
                overflow: hidden;
                background-color: #333333;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .productSmallDisplay-img img{
                height: 95%;
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
                width: 100%;
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