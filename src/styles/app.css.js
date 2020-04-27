import React from 'react';

function AppCss() {
    return (
        <style jsx={true}>{`
            @font-face {
                font-family: avenir;
                src: url(/fonts/avenir_ff/AvenirLTStd-Roman.otf);
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
            @media only screen and (max-width: 500px) {
                .plainTextSelectLine1 {
                    margin-block-start: -.5em;
                }
                .plainTextSelectLine2 {
                    margin-block-start: -.5em;
                }
            }
        `}
        </style>
    )
}

export default AppCss;
