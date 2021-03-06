import React from "react";
import { cssVariables } from '../../../constants/cssVariables'

function HarpsEtcOnlineStoreCss() {
    return (
        <style jsx="true">{`
            .product-list {
                display: flex; 
                flex-wrap: wrap; 
                padding: 50px;
                padding-top: 25px;
                justify-content: space-between;
                position: relative;
                background-color: #fffeee
            }
            .product-list-header {
                padding: 10px 25px;
                background-color: #6A75AA;
                color: white;
                border-radius: 3px;
                font-weight: 600;
                font-size: 24px;
                width: 60%;
                margin: auto;
            }
            .product-list-header h3 {
                font-family: "avenir";
                margin: auto;
                text-align: center;
            }
            .product {
                background-color: #fff;
                padding: 15px;
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
            .harpContact {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 5000;
            }
        `}
        </style>
    )
}

export default HarpsEtcOnlineStoreCss;
