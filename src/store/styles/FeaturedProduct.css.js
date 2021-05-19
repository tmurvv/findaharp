import React from "react";

function FeaturedProductCss() {
    return (
        <style jsx="true">{`
            .featuredproduct {
                margin: 10px;
                text-align: center;
                max-width: 200px;
                max-height: 300px;
                position: relative;
            }
            .featuredproductDetails {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                text-align: left;
                margin-bottom: 50px;
            }
            .featuredproductDetails div {
                font-family: 'Metropolitan Extra Bold';
            }
            .featuredproductDetails span {
                font-weight: 800;
            }
            @media only screen and (max-width: 1000px) {
                .featuredproduct {
                    margin: 30px auto;
                }
            }
            @media only screen and (max-width: 550px) {
                .featuredproduct {
                    display: flex;
                    flex-direction: column;
                    border-bottom: none;
                    margin-bottom: 40px;
                    width: 100%;
                }
            }
            
            .featuredproduct__imgcontainer {
                height: 80%;
                min-height: 80%;
            }
            .featuredproduct__imgcontainer img {
                // height: auto;
                // width: auto;
                max-width:100%;
                max-height:100%;
                // min-width: 100%;
                // object-fit: cover;
                // overflow: hidden;
                box-shadow: 3px 5px 3px lightgrey;
            }
            .featuredproduct__price {
                margin: 25px 0;
                width: 100%;
                text-align: center;
                font-weight: 600;
            }
            .featuredproduct__price-button-container {
                order: 4;
                width: 100%;
                height: 20%;
                position: absolute;
                bottom: 0;
                left: 0px;
                margin-top: 20px;
                font-size: 14px;
            }
            .featuredflyToCart {
                position: relative;
                animation-name: featuredflyToCart;
                animation-duration: .75s;  
                animation-delay: 0;
                animation-fill-mode: backwards;
                animation-timing-function: ease-in;
            }
            @keyframes featuredflyToCart {
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

export default FeaturedProductCss;
