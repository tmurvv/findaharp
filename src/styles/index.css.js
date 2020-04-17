import React from 'react';

function IndexCss() {
    return (
        <style jsx="true">{`
            .index {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                margin: 0;
                padding-top: 20px;
                height: fit-content;
            }
            .index h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .mainTitle {
                text-align: center;
                margin: auto;
                letter-spacing: 1.5px;
            }
            .subTitle {
                width: 60%;
                margin: auto;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686;
                letter-spacing: 1px;         
            }
        `}
    </style>
    )
}

export default IndexCss;
