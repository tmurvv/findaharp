import React from "react";

function BannerCss() {
    return (
        <style jsx>{`
        .mainContainer {
            background-color: #000000;
            height: 120px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .textLogo {
            height: 70%;
            margin-left: 5%;
            margin-top: 13px;
        }
        .productGraphic {
            height: 100%;
            margin-left: -55px;
        }
    `}
    </style>
    )
}

export default BannerCss;