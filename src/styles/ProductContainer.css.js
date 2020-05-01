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
            @media only screen and (max-width: 550px) {
                .productContainer {
                    width: 80%;
                }
            }
            .grid-container {
                margin: auto;
                margin-top: 45px;
                display: grid;
                grid-template-columns: 19.2% 19.2% 19.2% 19.2% 19.2%;
                grid-column-gap: 1%;
                width: 100%;
            }
            @media only screen and (max-width: 1200px) {
                .grid-container {
                    grid-template-columns: 24.25% 24.25% 24.25% 24.25%;
                }
            }
            @media only screen and (max-width: 950px) {
                .grid-container {
                    grid-template-columns: 32.66% 32.66% 32.66%;
                }
            }
            @media only screen and (max-width: 700px) {
                .grid-container {
                    grid-template-columns: 48.5% 48.5%;
                }
            }
            .grid-item {
                font-size: 30px;
                text-align: center;
                width: 180px;
                font-size: 14px;
                max-width: 200px;
            }
            // @media only screen and (max-width: 600px) {
            //     .grid-item {
            //         width: 150px;
            //     }
            // }
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