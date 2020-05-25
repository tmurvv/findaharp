import React from 'react';

function BuyersGuideCSS() {
    return (
        <style jsx="true">{`
            .buyersContainer {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                padding: 30px;
                padding-top: 70px;
                height: fit-content;
                margin-top: 0;
                text-align: center;
                margin: auto;
            }
            h1 {
                margin-block-start: 0;
            }
            .block {
                display: block;
                text-align: left;
            }
            .buyersGuide {
                width: 70%;
                margin: auto;
            }
            @media only screen and (max-width: 1200px) {
                .buyersGuide {
                    width: 80%;
                }
            }
            @media only screen and (max-width: 1050px) {
                .buyersGuide {
                    width: 90%;
                }
            }
            @media only screen and (max-width: 900px) {
                .buyersGuide {
                    width: 100%;
                    padding: inherit 15px;
                }
            }

            .buyersGuide p,
            .shortcut p, 
            .buyersGuide li,
            .buyersGuide ol {
                text-align: justify;
            }
            .shortcut input {
                margin-left: 10%;
            }
            .shortcut inputGroup {
                display: flex;
                flex-direction: column;
            }
            .pedalLeverTut {
                margin: 50px auto 70px;
                background-color: #ffffff;
                border: 2px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                padding: 30px 0;
                position: relative;
                display: flex;
                justify-content: space-between;
            }
            @media only screen and (max-width: 800px) {
                .pedalLeverTut {
                    display: none;
                }
            }
            .pedalLeverTutMobile {
                display: none;
                margin: 50px auto 70px;
                background-color: #ffffff;
                border: 2px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                padding: 30px;
            }
            @media only screen and (max-width: 800px) {
                .pedalLeverTutMobile {
                    display: block;
                }
            }
            .pedalLeverTutText {
                flex: 5;
            }
            .pedalLeverTutImg {
                flex: 2.5;
            }
            .pedalLeverTutImg img {
                height: 95%;
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .shortcutButton {
                margin: 25px auto;
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                -webkit-box-shadow: 2px 2px 2px 0px #555555;
                box-shadow: 2px 2px 2px 0px #555555;
            }
            .shortcutButton:active {
                box-shadow: none;
            }
            .shortcutButton-close {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            .contact {
                width: 100%;
                
            }
            .contactItem {
                margin: 50px;
                background-color: #ffffff;
                border: 2px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                padding: 20px;
                text-align: center;
                margin: auto;
                flex: 5;
                overflow-y: scroll;
            }
            .contactContainer h1 {
                font-size: 48px;
                margin-bottom: 50px;
                width: 100%;
                text-align: center;
            }    
            .contactContainer input {
                font-size: 14px;
                margin-right: 15px;
            }
            .contact h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .buyerDivider {
                margin: 50px auto 80px;
                height: 2px;
                width: 80%;
            }
            .buyerDivider img {
                width: 100%;
            }
            .contactContainer a {
                color: #f9bf1e;
                text-decoration: underline;
            }
            .about {
                padding: 10px 50px 30px ;
            }
            .buyerClearModal {
                position: absolute;
                bottom: 5px;
                right: 10px;
                color: black;
            }
            .buyerClearModal img{
                width: 35px;
            }
            .underConstructionImage img{
                height: 100px;
            }
        `}
    </style>
    )
}

export default BuyersGuideCSS;
