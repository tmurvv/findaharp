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
        `}
    </style>
    )
}

export default StringFormCss;
