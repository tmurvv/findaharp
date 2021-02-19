import React from "react";

function StringFormCss() {
    return (
        <style jsx="true">{`
            @font-face {
                font-family: 'Metropolis Extra Bold';
                font-weight: bold;
                font-style: normal;
                font-variant:normal;
                src: url('./fonts/metropolis_ff/Metropolis-ExtraBold.otf') format('opentype');
            }
            .stringForm {
                // background-image: linear-gradient(to bottom, #f6f6f6, #ffffff 300px);
                background-color: #ffffff;
                margin: 0;
                padding: 70px 15px;
                height: fit-content;
                position: relative;
            }
            .stringForm-subheader {
                opacity: .8;
                margin: 25px auto 25px;
                // text-align: center;
                font-style: italic;
                width: 60%;
                font-size: 16px;
            }
            @media only screen and (max-width: 550px) {
                .stringForm-subheader {
                    width: 80%;
                    font-size: 14px;
                }
            }
            #addHarp { 
                display: flex; 
                justify-content: space-evenly;
                padding: 15px 5px 0;
                width: 60%;
                mid-width: 360px;
                margin: auto;
                // margin-top: -50px;
                // display: none;
                opacity: 0;
                visibility: hidden;
                transition: opacity 600ms, visibility 600ms, marginTop 600ms;
                z-index: 0;
            }
            @media only screen and (max-width: 550px) {
                #addHarp {
                    width: 100%;
                    justify-content: space-between;
                }   
            }
            .shipsTo-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px 5px 0;
                font-size: 22px;
                font-weight: 600;
                margin: auto;
                width: 60%;
                // margin-bottom: -50px;
            }
            @media only screen and (max-width: 550px) {
                .shipsTo-container {
                    // margin: -50px auto 30px;
                    width: 100%;
                }
            }
            .shipsTo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: 300;
                font-style: italic;
                line-height: 1.5;
                font-size: 12px;
                // margin: 15px auto 0;
            }
            @media only screen and (max-width: 550px) {
                .shipsTo {
                    
                }
            }
            .stringForm h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .stringForm-btn {
                width: 175px;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #6A75AA;
                cursor: pointer;
                font-size: 14px;
                outline: none;
                border: none;
                box-shadow: 3px 3px 3px lightgrey;
            }
            @media only screen and (max-width: 550px) {
                .stringForm-btn {
                    width: 48%;
                }
            }
            .stringForm-btn:active {
                box-shadow: none;
            }
            .formSubtotal {
                padding: 5px 0;
                font-size: 16px;
                width: 200px;
                background-color: #f6f6f6;
                color: #000000;
                text-align: center;
                white-space: nowrap;
                margin-top: 20px;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .formSubtotal-btm {
                bottom: 40px;
                right: 0;
            }
            @media only screen and (max-width: 550px) {
                .formSubtotal-btm {
                    bottom: 60px;
                }
            }
        `}
    </style>
    )
}

export default StringFormCss;
