import React from "react";

function BannerCss() {
    return (
        <style jsx="true">{`
            .mainContainer {
                background-color: #000000;
                height: 150px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 0 20px;  
            }
            @media only screen and (max-width: 950px) {
                .mainContainer {
                  height: 90px;
                  padding: 0 75px;
                }
            }
            @media only screen and (max-width: 750px) {
                .mainContainer {
                  height: 60px;
                  padding: 0 150px 0 100px;
                }
            }
            @media only screen and (max-width: 750px) {
                .mainContainer {
                    height: 60px;
                    padding: 0 150px 0 100px;
                }
            }
            @media only screen and (max-width:550px) {
                .mainContainer {
                    height: 150px;
                    padding: 15px;
                    flex-direction: column-reverse;
                    align-items: center;
                }
            }
            .textLogo {
                height: 70%;
                margin-left: 5%;
                margin-top: 13px;
            }
            @media only screen and (max-width: 550px) {
                .textLogo {
                    height: 45%;
                    flex-direction: column-reverse;
                    align-items: center;
                }
            }
            .productGraphic {
                height: 100%;
            }
            @media only screen and (max-width: 550px) {
                .productGraphic {
                    height: 40%;
                }
            }
        `}
    </style>
    )
}

export default BannerCss;