import React from "react";

function StoreCss() {
    return (
        <style jsx="true">{`
            .product-list {
                display: flex; 
                flex-wrap: wrap; 
                padding: 50px;
                padding-top: 25px;
                justify-content: space-between;
                position: relative;
            }
            .product-list-header {
                padding: 10px 25px;
                background-color: lightgrey;
                color: white;
                border-radius: 3px;
            }
            .product-list-header h3 {
                font-family: "avenir";
                margin: auto;
                text-align: center;
            }
            .logo>img {
                height: 100%;
            }
            .flexSB {
                display: flex;
                justify-content: space-between;
            }
            .copy {
                font-size: 12px;
            }
            .storeButtons {
                width: 90%;
                margin: 50px auto 0;
            }
            .storeButton {
                margin:10px;
                width: 25%;
                background: #6A75AA;
                font-family: Lato;
                color: #ffffff;
                border-radius: 0 0 4px 4px;
                border: 0;
                padding: 12px 16px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                display: block;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            .storeButton a {
                transform: scale(1);
            }
            @media only screen and (max-width: 600px) {
                .storeButton a {
                    font-size: 12px;
                }
            }
        `}
        </style>
    )
}

export default StoreCss;
