import React from "react";

function HarpProfileCss() {
    return (
        <style jsx="true">{`
            @font-face {
                font-family: 'Metropolis Extra Bold';
                font-weight: bold;
                font-style: normal;
                font-variant:normal;
                src: url('./fonts/metropolis_ff/Metropolis-ExtraBold.otf') format('opentype');
            }
            @media screen only and (max-width: 550px) {
                // ul {
                //     padding: 20px;
                // }
            }
            .harpProfile {
                // background-image: linear-gradient(to bottom, #f6f6f6, #ffffff 300px);
                background-color: transparent;
                margin: 0;
                padding: 70px 15px;
                height: fit-content;
                position: relative;
            }
            .harpProfile h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .harpProfileImg {
                flex: 4;
                height: 100%;
            }
            .harpProfileButton {
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
                .harpProfileButton {
                    width: 48%;
                }
            }
            // .harpProfileButton {
            //     padding: 10px 20px;
            //     color: #ffffff;
            //     background-color: #6A75AA;
            //     cursor: pointer;
            //     font-size: 18px;
            //     outline: none;
            //     border: none;
            //     box-shadow: 3px 3px 3px lightgrey;
            //     // background-image: linear-gradient(340deg, #f9bf1e 50%, #ffe178 58%, #ffe58a 74%, #f9bf1e 87%);
            //     // padding: 5px 10px;
            //     // font-size: 16px;
            //     // border-radius: 3px;
            //     // outline: none;
            //     // border-style: none;
            //     // border-color: none;
            //     // box-shadow: 1.5px 1.5px 1.5px 0px #555555;
            //     // /*-webkit-box-shadow: 2px 2px 2px 0px #555555;
            //     // box-shadow: 2px 2px 2px 0px #555555;*/
            // }
            .harpProfileButton:active {
                box-shadow: none;
            }
            .harpProfileButton-cancel {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            .harpProfileImg {
                flex: 4;
                height: 100%;
            }
            @media only screen and (max-width: 550px) {
                .harpProfileImg {
                    width: 100%;
                }
            }
            .harpProfileImg img {
                height: 95%;
                width: 80%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            @media only screen and (max-width: 550px) {
                .harpProfileImg img {
                    max-height: 150px;
                    width: auto;
                    margin: auto;
                }
            }
            .harpProfileText {
                flex: 6;
                text-align: center;
                display: flex;
                flex-direction: column;
                height: 290px;
                justify-content: space-between;
                width: 100%;
            }
            @media only screen and (max-width: 550px) {
                .harpProfileText {
                    padding: 25px 0;
                }
            }         
            .harpProfileText span {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
            }
            .harpProfileText p {
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .harpProfileInput input{
                font-size: 14px;
                padding: 7px 10px;
                border: 1px solid #6A75AA;
                margin-bottom: 10px;
            }
            .harpProfileInput label{
                padding: 7px 10px;
                margin-bottom: 0px;
                text-align: right;
                font-family: Metropolis Extra Bold;
                font-size: 12px;
            }
            @media only screen and (max-width: 550px) {
                .rememberInput {
                    align-items: flex-end;
                }
            }
        `}
    </style>
    )
}

export default HarpProfileCss;
