import React from 'react';

function StoreProductContainerCss() {
    return (
        <style jsx="true">{`
            .storenotFoundContainer {
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                position: relative;
                z-index: 0;
            } 
            .storenotFoundContainer img {
                height: 225px;
            }          
            .storeproductContainer {
                // margin: auto;
                // position: relative;
                // width: 100%;
                // max-width: 1010px;
            }
            @media only screen and (max-width: 1475px) {
                // .storeproductContainer {
                //     max-width: unset;
                // }
            }
            @media only screen and (max-width: 550px) {
                // .storeproductContainer {
                //     width: 80%;
                // }
            }
            .storegrid-container {
                margin: 50px auto;
                // width: 100%;
                // max-width: 1010px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            @media only screen and (max-width: 550px) {
                .storegrid-container {
                    margin: 0 20px;
                }
            }
            // .storeproductSmallDisplay {
            //     display: flex;
            //     flex-direction: column;
            //     margin-bottom: 35px;
            //     text-align: center;
            //     font-size: 14px;
            //     height: 350px;
            //     width: 19%;
            // }
            // .storeproductSmallDisplay:nth-child(5n) {
            //     margin-right: 0;
            // }
            // @media only screen and (max-width: 1200px) {
            //     .storeproductSmallDisplay {
            //         width: 24%;
            //     }
            // }
            // @media only screen and (max-width: 950px) {
            //     .storeproductSmallDisplay {
            //         width: 33%;
            //     }
            // }
            // @media only screen and (max-width: 700px) {
            //     .storeproductSmallDisplay {
            //       width: 30vw;
            //     }
            // }
            // @media only screen and (max-width: 550px) {
            //     .storeproductSmallDisplay {
            //         width: 80vw;
            //         /*grid-template-columns: 39.5vw 39.5vw; */  
            //     }
            // }
            // .storeproductSmallDisplay span {
            //     cursor: pointer;
            // }
            // .storeproductSmallDisplay-img {
            //     flex:7;
            //     overflow: hidden;
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     min-height: 269px;
            // }
            // .storeproductSmallDisplay-img img{
            //     height: 267px;
            //     width: auto;
            //     max-width:100%;
            //     max-height:100%;
            //     object-fit: cover;
            //     overflow: hidden;
            // }
            // .storeproductSmallDisplay-text {
            //     flex: 2;
            //     display: flex;
            //     flex-direction: column;
            //     justify-content: flex-start;
            //     align-items: center;
            //     padding-top: 5px;
            // }
            // .storeproductSmallDisplay-text p {
            //     margin-block-start: 0;
            //     margin-block-end: 0;
            // }
            // .storeproductSmallDisplay-text p a {
            //     text-decoration: none;
            //     cursor: pointer;
            //     color: #333333;
            // }
            // .storepriceText {
            //     font-size: 12px;
            //     font-style: italic;
            // }
        `}
        </style>
    )
} 

export default StoreProductContainerCss;
