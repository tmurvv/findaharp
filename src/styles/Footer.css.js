import React from "react";

function FooterCss() {
    return (
        <style jsx='true'>{`
            .footer {
                background-color: #000000;
                color: #faf8ed;
                height: 75px;
                font-size: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
                padding: 20px;
            }
            .logo {
                height: 30px
            }
            .flexSB {
                display: flex;
                justify-content: center
            }
            .copy {
                font-size: 12px;
            }
        `}
        </style>
    )
}

export default FooterCss;
