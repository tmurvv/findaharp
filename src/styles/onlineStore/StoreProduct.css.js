import React from "react";

function StoreProductCss() {
    return (
        <style jsx="true">{`
            .product {
                margin: 30px;
                width: 45%;
                text-align: center;
                max-width: 375px;
            }
            .productDetails {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                text-align: left;
            }
            .productDetails div {
                font-family: 'Metropolitan Extra Bold';
            }
            .productDetails span {
                font-weight: 800;
            }
            @media only screen and (max-width: 1000px) {
                .product {
                    margin: 30px auto;
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
            .product__description {
                text-align: justify;
                margin-bottom: 25px;
                padding-right: 5px;
                width: 97.5%;
                height: 60px;
                overflow: scroll;
            }
            .product__image {
                width: auto;
                height: 350px;
                margin-top: 20px;
                max-width: 100%;
                box-shadow: 3px 5px 3px lightgrey;
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
