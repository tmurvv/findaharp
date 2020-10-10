import React from "react";

function StoreProductCss() {
    return (
        <style jsx="true">{`
            .fahproduct {
                margin: 10px;
                margin-top: 25px;
                text-align: center;
                min-width: 225px;
                max-width: 265px;
                max-height: 600px;
                position: relative;
            }
            .fahproduct__title {
                width: 95%;
                margin: 25px auto 15px;
            }
            .fahproductDetails {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                text-align: left;
            }
            .fahproductDetails div {
                font-family: 'Metropolitan Extra Bold';
            }
            .fahproductDetails span {
                font-weight: 800;
            }
            @media only screen and (max-width: 1000px) {
                .fahproduct {
                    margin: 30px auto;
                    width: 100%;
                }
            }
            @media only screen and (max-width: 550px) {
                .fahproduct {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid lightgrey;
                    margin-bottom: 40px;
                }
            }
            .fahproduct__description {
                text-align: justify;
                margin-bottom: 25px;
                padding-right: 5px;
                width: 97.5%;
                height: 60px;
                overflow-y: auto;
            }
            .fahproduct__imgcontainer {
                height: 50%;
            }
            .fahproduct__imgcontainer img {
                height: 100%;
                width: auto;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
                box-shadow: 3px 5px 3px lightgrey;
            }
            // .music .fahproduct__image {
            //     margin-top: 20px;
            //     box-shadow: 3px 5px 3px lightgrey;
            //     height: 350px;
            //     width: 250px;
            //     margin: auto;
            // }
            // @media only screen and (max-width:750) {
            //     .music .fahproduct_image {
            //         width: 175px;
            //     }
            // }
            .fahproduct__price {
                margin: 25px 0;
                width: 100%;
                text-align: center;
                font-weight: 600;
            }
            .fahproduct__price-button-container {
                order: 4;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0px;
            }
            .fahflyToCart {
                position: relative;
                animation-name: fahflyToCart;
                animation-duration: .75s;  
                animation-delay: 0;
                animation-fill-mode: backwards;
                animation-timing-function: ease-in;
            }
            @keyframes fahflyToCart {
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
