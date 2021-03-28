import React from "react";

function OnlineStoreCss() {
    return (
        <style jsx="true">{`
            .storeIndex {
                margin: 0;
                padding: 70px 40px;
                height: fit-content;
                position: relative;
            }
            .storeIndex h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .divider img {
                max-height: 5px;
            }
            @media only screen and (max-width: 550px) {
                .subTitle {
                    font-size: 8px;
                }
            }
            .onlinestore {
                width: 100%;
                margin: auto;
                box-sizing: border-box;
            }
            .onlinestoreproduct-list {
                display: flex; 
                flex-wrap: wrap; 
                padding: 50px;
                padding-top: 25px;
                justify-content: space-around;
                position: relative;
                background-color: transparent;
                margin-top: -20px;
            }
            @media only screen and (max-width: 550px) {
                .onlinestoreproduct-list {
                    padding: 0px;
                }
                
            }
            .onlinestoreproduct-list-header {
                background-color: 'transparent';
                padding-top: 30px;
            }
            .onlinestoreproduct-list-header h3 {
                font-family: "avenir";
                margin: auto;
                text-align: center;
            }
            .onlinestoreproduct {
                background-color: transparent;
            }
            .onlinestorelogo>img {
                height: 100%;
            }
            .onlinestorecopy {
                font-size: 12px;
            }
            .onlinestorestoreButtons {
                width: 90%;
                margin: 50px auto 0;
            }
            .onlinestorestoreButton {
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
            .onlinestorestoreButton a {
                transform: scale(1);
            }
            @media only screen and (max-width: 600px) {
                .onlinestorestoreButton a {
                    font-size: 12px;
                    
                }
            }
            .onlinestoreharpContact {
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

export default OnlineStoreCss;
