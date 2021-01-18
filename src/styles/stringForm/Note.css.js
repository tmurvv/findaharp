import React from "react";

function NoteCss() {
    return (
        <style jsx="true">{`
            .noteGridContainer {
                width: 100%;
                display: grid;
                grid-template-columns: 10% 10% 40% 20% 20%;
                // padding: 5px 0;
                position: relative;
                // height: 32px;
            }
            .noteGridContainer > div {
                background-color: rgba(255, 255, 255);
                text-align: center;
                padding: 5px 12px;
                font-size: 16px;
                border: 1px solid;
                align-items: center;
                display: flex;
                justify-content: center;
                width: 100%;
            }
            .qty-input {
                max-width: 50px;
                height: 30px;
                text-align: right;
            }
            
            .qty-input:hover::-webkit-inner-spin-button {  
                width: 14px;
                height: 30px;
                // margin-left: 5px;
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