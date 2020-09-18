import React from "react";
import { cssVariables } from '../constants/cssVariables'

function StoreProductCss() {
    return (
        <style jsx="true">{`
            .product {
                margin: 30px;
                width: 45%;
                text-align: center;
                max-width: 375px;
            }

            @media only screen and (max-width: 1000px) {
                .product {
                    margin: auto;
                    width: 100%;
                }
            }
            @media only screen and (max-width: 550px) {
                .product {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid lightgrey;
                    margin-bottom: 40px;
                }
            }
            .product_title {
                margin-top: 50px;
                order:1;
            }
            .product__description {
                height: 140px;
                overflow-y: auto;
                text-align: justify;
                margin-bottom: 25px;
                padding-right: 5px;
                width: 97.5%;
                order: 3;
            }
            .product__image {
                width: 100%;
                height: auto;
                margin-top: 20px;
                max-width: 100%;
                order: 2;
            }
            .product__price {
                margin: 25px 0;
                width: 100%;
                text-align: center;
                font-weight: 600;
            }
            .product__price-button-container {
                order: 4;
            }
            .flyToCart {
                position: relative;
                animation-name: flyToCart;
                animation-duration: .75s;  
                animation-delay: 0;
                animation-fill-mode: backwards;
                animation-timing-function: ease-in;
            }
            @keyframes flyToCart {
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
        `}
        </style>
    )
}

export default StoreProductCss;
