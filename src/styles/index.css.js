import React from 'react';

function IndexCss() {
    return (
        <style jsx>{`
            .App {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                margin: 0;
                padding-top: 20px;
                height: 100vh;
            }
            .App h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .mainTitle {
                text-align: center;
                margin: auto;
            }
            .subTitle {
                margin-top: 10px;
                font-size: 16px;
                font-style: italic;
            }
        `}
    </style>
    )
}

export default IndexCss;
