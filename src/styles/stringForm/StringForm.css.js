import React from "react";

function StringFormCss() {
    return (
        <style jsx="true">{`
            .stringForm {
                // background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
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
