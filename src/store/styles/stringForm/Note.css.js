import React from "react";

function NoteCss() {
    return (
        <style jsx="true">{`
            .noteGridContainer {
                width: 100%;
                display: grid;
                grid-template-columns: 10% 10% 60% 10% 10%;
                position: relative;
            }
            .noteGridContainer > div {
                background-color: #f6f6f6;
                text-align: center;
                font-size: 16px;
                border: 1px solid;
                align-items: center;
                display: flex;
                justify-content: center;
                width: 100%;
            }
            .qty-input {
                height: 40px;
                text-align: right;
                border: none;
                font-size: 18px;
                width: 100%;
            }
            .qty-input::-webkit-inner-spin-button {  
                width: 14px;
                height: 30px;
                margin-left: 7.5px;
            }
            .item4 {
                // width: 100%;
                // text-align: center;
                // font-size: 26px;
            }
            .colHeader {
                font-size: 14px;
                border: 3px solid ;
            }
        `}
    </style>
    )
}

export default NoteCss;