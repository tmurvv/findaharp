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
                margin: auto;
                position: relative;
            }
            .grid-container {
                margin: auto;
                margin-top: 45px;
                display: grid;
                grid-template-columns: 20% 20% 20% 20% 20%;
                grid-column-gap: 10px;
                width: 90%;
            }
            @media only screen and (max-width: 1000px) {
                .productContainer {
                    width: unset;
                }
                .grid-container {
                    grid-template-columns: 25% 25% 25% 25%;
                        grid-column-gap: 5px;
                        margin: 5%;
                        width: unset;    
                }
            }
            @media only screen and (max-width: 750px) {
                .grid-container {
                    grid-template-columns: 33.3% 33.3% 33.3%;
                    width: unset;
                }
            }
            @media only screen and (max-width: 600px) {
                .grid-container {
                    grid-template-columns: 50% 50%;
                }
            }
            .grid-item {
                font-size: 30px;
                text-align: center;
                width: 180px;
                font-size: 14px;
            }
            @media only screen and (max-width: 600px) {
                .grid-item {
                    width: 150px;
                }
            }
            .productSmallDisplay {
                display: flex;
                flex-direction: column;
                height: 350px;
                width: 100%;
            }
            .productSmallDisplay-img {
                flex:7; 
                height: 60%;
                overflow: hidden;
                background-color: #333333;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .productSmallDisplay-img img{
                width: auto;
                height: 70%;

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