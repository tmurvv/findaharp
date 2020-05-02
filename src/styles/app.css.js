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
                src: url('./fonts/Avenir_ff/Metropolis-ExtraBold.otf') format('opentype');
            }
            body {
                overflow-x: hidden;
                margin: 0;
                margin-block-end: 0 !important;
                margin-block-start: 0 !important;
                font-family: avenir;
                color: #5c5b5b;
            }
            .menuButton {
                background-color: transparent;
                font-size: 14px;
                padding: 6px 9px;
                position: relative;
                cursor: pointer;
                color: #fafbfc;
            }
            .plainTextSelectLine1 {
                margin-block-end: 0;
                margin-block-start: 0;
                color: #fafbfc;
                background-color: #000000;
                font-size: 14px;
                padding: 6px 9px;
                position: relative;
                cursor: pointer;
                z-index: 2000;
                list-style: none;
                margin-top: -2px;
            }
            .plainTextSelectLine2 {
                margin-block-start: -.5em;
                color: #333333;
                font-size: 14px;
                padding: 6px 9px;
                position: relative;
                cursor: pointer;
                background-color: #f9bf1e;
                list-style: none;
                z-index: 2000;
            }
            @media only screen and (max-width: 550px) {
                .plainTextSelectLine1 {
                    margin-block-start: -.5em;
                }
                .plainTextSelectLine2 {
                    margin-block-start: -.5em;
                }
            }  
            .divider {
                width: 90%;
                height: 7px;
                margin: auto;
            }
        `}
        </style>
    )
}

export default AppCss;
