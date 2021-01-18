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
        `}
    </style>
    )
}

export default StringFormCss;
