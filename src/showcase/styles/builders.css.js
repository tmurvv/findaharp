import React from 'react';

function BuildersCss() {
    return (
        <style jsx="true">{`
            .builders {
                background-image: linear-gradient(to bottom, #eff3fc, #ffffff 300px);
                margin: 0;
                padding-top: 70px;
                height: fit-content;
                position: relative;
            }
            .builders h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
        `}
    </style>
    )
}

export default BuildersCss;
