import React from "react";

function BannerCss() {
    return (
        <style jsx="true">{`
        .mainContainer {
            background-color: #000000;
            height: 120px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 20px;
        }
        .textLogo {
            height: 70%;
            margin-left: 5%;
            margin-top: 13px;
        }
        .productGraphic {
            height: 100%;
            margin-left: -25px;
        }
    `}
    </style>
    )
}

export default BannerCss;