import React from "react";

function NoteCss() {
    return (
        <style jsx="true">{`
            .noteGridContainer {
                width: 100%;
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;
                padding: 5px 0;
            }
            .noteGridContainer > div {
                background-color: rgba(255, 255, 255, 0.8);
                text-align: center;
                padding: 5px 12px;
                font-size: 26px;
                border: 1px solid;
            }
            .item4 {
                width: 100%;
                text-align: center;
                font-size: 26px;
            }
            .colHeader {
                font-size: 14px !important;
            }
        `}
    </style>
    )
}

export default NoteCss;