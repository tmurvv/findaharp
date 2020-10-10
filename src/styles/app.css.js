import React from 'react';

function AppCss() {
    return (
        <style jsx="true">{`
            @font-face {
                font-family: avenir;
                src: url(/fonts/avenir_ff/AvenirLTStd-Roman.otf);
            }
            @font-face {
                font-family: 'Avenir Next Bold';
                font-weight: bold;
                font-style: normal;
                font-variant:normal;
                src: url('./fonts/Avenir_ff/Avenir_Next_Condensed_Bold.otf') format('opentype');
            }
            @font-face {
                font-family: 'Metropolis Extra Bold';
                font-weight: bold;
                font-style: normal;
                font-variant:normal;
                src: url('./fonts/metropolis_ff/Metropolis-ExtraBold.otf') format('opentype');
            }
            body {
                -webkit-box-sizing:border-box;
                -moz-box-sizing:border-box;
                box-sizing:border-box;
                overflow-x: hidden;
                margin: 0;
                margin-block-end: 0 !important;
                margin-block-start: 0 !important;
                font-family: avenir;
                color: #5c5b5b;
                background-image: linear-gradient(to bottom, #fffedf, #fffedf 250px, #ffffff 450px);
            }
            h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .mainTitle {
                text-align: center;
                margin: auto;
                letter-spacing: 1.5px;
                font-size: 24px
            }
            .subTitle {
                width: 60%;
                margin: auto;
                text-align: center;
                font-size: 16px;
                font-style: italic;
                font-weight: 500;
                color: #868686;
                letter-spacing: 1px;
                margin-bottom: 45px;
                font-family: avenir;    
            }
            .menuButton {
                background-color: transparent;
                font-size: 14px;
                padding-top: 12px;
                position: relative;
                cursor: pointer;
                color: #fafbfc;
                border: none;
                outline: none;
            }
            @media only screen and (max-width: 550px) {
                .menuButton {
                    padding: 0
                }
            }
            .plainTextSelectLine1 {
                margin-block-end: 0;
                margin-block-start: 0;
                color: #fafbfc;
                background-color: #000000;
                font-size: 14px;
                position: absolute;
                cursor: pointer;
                z-index: 2000;
                list-style: none;
                margin-top: -2px;
                padding-inline-start: 0;
                width: 75%;
                transform: translateX(16.5%);
                padding: 9px;
            }
            @media only screen and (max-width: 550px) {
                .plainTextSelectLine1 {
                    width: 190%;
                }
            }
            .plainTextSelectLine1 p {
                margin-block-start: 0;
                margin-block-end: 0;
            }
            .plainTextSelectLine2 {
                margin-block-start: -.2em;
                color: #333333;
                font-size: 14px;
                padding: 6px 0;
                position: absolute;
                cursor: pointer;
                background-color: #fcd961;
                list-style: none;
                z-index: 2000;
                padding-inline-start: 0;
                width: 75%;
                transform: translateX(16.5%);
                text-align: center;
            }
            .plainTextSelectLine2 p {
                margin-block-start: 0;
                margin-block-end: 0;
            }
            @media only screen and (max-width: 550px) {
                .plainTextSelectLine1 {
                    /*margin-block-start: -.5em;*/
                    width: 190%;
                    position: absolute;
                }
                .plainTextSelectLine2 {
                    /*margin-block-start: -.5em;*/
                    width: 190%;
                    position: absolute;
                }
            }  
            .divider {
                width: 90%;
                height: 7px;
                margin: auto;
                background-color: transparent;
            }
            .divider img {
                width: 100%;
            }
            .flex {
                display: flex;
                justify-content: flex-start;
            }
            .flex-sa {
                display: flex;
                justify-content: space-around;
            }
            .flex-sb {
                display: flex;
                justify-content: space-between;
            }
            .flexSB {
                display: flex;
                justify-content: space-between;
            }
            .relative {
                position: relative;
            }
            .marginLeft {
                margin-left: 15px;
            }
            .marginRight {
                margin-right: 15px;
            }
            .blueFontButton {
                background-color: 'white';
                outline: 'none';
                color:'#6A75AA';
                text-decoration: 'none'; 
                border: 'none'; 
                font-size: '14px';
            }
            .submit-btn {
                width: 100%;
                border-radius: 3px;
                background-color: #ffe58a;
                color: #000;
                border: none;
                padding: 10px 7px;
                outline-color: #fbd960;
                font-family: avenir;
            }
            .submit-btn:active {
                outline-color: #fbd960;
            }
            .whiteWallPaper {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                background-color: #fffeee;
                padding-top: 50px;
            }
        `}
        </style>
    )
}

export default AppCss;
