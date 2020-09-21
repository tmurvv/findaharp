import React from "react";
import { cssVariables } from '../constants/cssVariables';

function CheckoutStatusCss() {
    return (
        <style jsx="true">{`

            .statusIndicator ol {
                display: flex;
                justify-content: space-evenly;
                list-style: none;
            }
            .statusItem {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .statusItem p {
                width: 26px;
                height: 25px;
                border: 2px solid #868686;
                border-radius: 50%;
                text-align: center;
                font-size: 20px;
            }
            .statusItem a {
                margin-top: -15px;
                font-size: 18px;
            }
            .statusLine {
                flex: 3;
                height: 30px;
                border-bottom: 4px solid #868686;
            }
            .statusLine p {
                
                text-align: center;
                font-size: 20px;
                font-weight: 600;
                
            }
            





        `}
        </style>
    )
}

export default CheckoutStatusCss;
