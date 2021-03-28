import React from 'react';

function FeaturedProductContainerCss() {
    return (
        <style jsx="true">{`
            .featurednotFoundContainer {
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                position: relative;
                z-index: 0;
            } 
            .featurednotFoundContainer img {
                height: 225px;
            }          
            .featuredproductContainer h3 {
                width: 100%; 
                text-align: left; 
                margin: auto; 
                margin-bottom: -15px; 
                margin-top: 50px; 
                font-family: Metropolis Extra Bold; 
                text-transform: uppercase;
            }
            @media only screen and (max-width: 1475px) {
                // .featuredproductContainer {
                //     max-width: unset;
                // }
            }
            @media only screen and (max-width: 550px) {
                .featuredproductContainer h3 {
                    text-align: center;
                }
            }
            .featuredgrid-container {
                margin: 50px auto;
                width: 80%;
                // max-width: 1010px;
                display: flex;
                justify-content: space-between;
                overflow: hidden;
                height: 275px;
            }
            @media only screen and (max-width: 550px) {
                .featuredgrid-container {
                    margin: 0 20px;
                }
            }
            // .featuredproductSmallDisplay {
            //     display: flex;
            //     flex-direction: column;
            //     margin-bottom: 35px;
            //     text-align: center;
            //     font-size: 14px;
            //     height: 350px;
            //     width: 19%;
            // }
            // .featuredproductSmallDisplay:nth-child(5n) {
            //     margin-right: 0;
            // }
            // @media only screen and (max-width: 1200px) {
            //     .featuredproductSmallDisplay {
            //         width: 24%;
            //     }
            // }
            // @media only screen and (max-width: 950px) {
            //     .featuredproductSmallDisplay {
            //         width: 33%;
            //     }
            // }
            // @media only screen and (max-width: 700px) {
            //     .featuredproductSmallDisplay {
            //       width: 30vw;
            //     }
            // }
            // @media only screen and (max-width: 550px) {
            //     .featuredproductSmallDisplay {
            //         width: 80vw;
            //         /*grid-template-columns: 39.5vw 39.5vw; */  
            //     }
            // }
            // .featuredproductSmallDisplay span {
            //     cursor: pointer;
            // }
            // .featuredproductSmallDisplay-img {
            //     flex:7;
            //     overflow: hidden;
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     min-height: 269px;
            // }
            // .featuredproductSmallDisplay-img img{
            //     height: 267px;
            //     width: auto;
            //     max-width:100%;
            //     max-height:100%;
            //     object-fit: cover;
            //     overflow: hidden;
            // }
            // .featuredproductSmallDisplay-text {
            //     flex: 2;
            //     display: flex;
            //     flex-direction: column;
            //     justify-content: flex-start;
            //     align-items: center;
            //     padding-top: 5px;
            // }
            // .featuredproductSmallDisplay-text p {
            //     margin-block-start: 0;
            //     margin-block-end: 0;
            // }
            // .featuredproductSmallDisplay-text p a {
            //     text-decoration: none;
            //     cursor: pointer;
            //     color: #333333;
            // }
            // .featuredpriceText {
            //     font-size: 12px;
            //     font-style: italic;
            // }
        `}
        </style>
    )
} 

export default FeaturedProductContainerCss;
