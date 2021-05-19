import React from "react";

function StoreProductCss() {
    return (
        <style jsx="true">{`
            .storeproduct {
                margin: 10px;
                text-align: center;
                width: 265px;
                height: 535px;
                max-height: 650px;
                position: relative;
                margin-bottom: 60px;
                min-width: 265px;
            }
            .storeproduct__title {
                width: 95%;
                margin: 25px auto 15px;
            }
            .storeproductDetails {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                text-align: left;
            }
            .storeproductDetails div {
                // font-family: 'Metropolitan Extra Bold';
                font-size: 14px;
            }
            .storeproductDetails span {
                font-weight: 800;
            }
            @media only screen and (max-width: 1000px) {
                .storeproduct {
                    margin: 30px auto;
                }
            }
            @media only screen and (max-width: 550px) {
                .storeproduct {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid lightgrey;
                    margin-bottom: 40px;
                    width: 100%;
                }
            }
            .storeproduct__description {
                text-align: justify;
                margin-bottom: 25px;
                padding-right: 5px;
                width: 97.5%;
                height: 60px;
                overflow-y: auto;
            }
            .storeproduct__imgcontainer {
                height: 267px;
                // height: 50%;
                min-height: 50%;
                position: relative;
            }
            .storeproduct__imgcontainer img {
                // height: auto;
                // width: auto;
                max-width:100%;
                max-height:100%;
                // min-width: 100%;
                // object-fit: cover;
                // overflow: hidden;
                box-shadow: 3px 5px 3px lightgrey;
            }
            .storeproduct__price {
                margin: 0 0 10px;
                width: 100%;
                text-align: center;
                font-weight: 600;
            }
            .storeproduct__price-button-container {
                order: 4;
                width: 100%;
                // width: 265px;
                position: absolute;
                bottom: 0;
                left: 0px;
                margin-top: 20px;
            }
            .blueFontButton {
                background-color: 'white';
                outline: 'none';
                color:'#6A75AA';
                text-decoration: 'none'; 
                border: 'none'; 
                font-size: '14px';
            }
            .storeflyToCart {
                position: relative;
                animation-name: storeflyToCart;
                animation-duration: .75s;  
                animation-delay: 0;
                animation-fill-mode: backwards;
                animation-timing-function: ease-in;
            }
            @keyframes storeflyToCart {
                from {
                    bottom: 0px;
                    left: 0px;
                    width: 100%;
                    opacity: 1; 
                }
                to {
                    bottom: 450px;
                    left: 400px;
                    width: 25%;
                    opacity: 0;
                }
            }
            ::-webkit-scrollbar {
                height: 0px;
                width: 6px;
                background: #fff;
            } 
            ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            } 
            ::-webkit-scrollbar-thumb {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    background-color: #ffe58a; 
            }
        `}
        </style>
    )
}

export default StoreProductCss;
