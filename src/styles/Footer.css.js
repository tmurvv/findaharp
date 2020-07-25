import React from "react";

function FooterCss() {
    return (
        <style jsx="true">{`
            .footer {
                background-color: #000000;
                color: #faf8ed;
                height: 85px;
                font-size: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px 20px 10px;
            }
            .logo {
                height: 30px;
            }
            .logo>img {
                height: 100%;
            }
            .flexSB {
                display: flex;
                justify-content: center
            }
            .copy {
                font-size: 12px;
            }
            .copy>a {
                color: #ffe58a; 
                font-size: 12px;
            }
        `}
        </style>
    )
}

export default FooterCss;
