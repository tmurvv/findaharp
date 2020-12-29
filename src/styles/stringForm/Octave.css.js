import React from "react";

function OctaveCss() {
    return (
        <style jsx="true">{`
            select {
                width: 100%;
                text-align: center;
                font-size: 14px;
                padding: 10px;
            }
            .octaveGridContainer {
                display: grid;
                grid-template-columns: auto auto;
                grid-gap: 10px;
                padding: 10px;
            }
            .octaveGridContainer > div {
                background-color: rgba(255, 255, 255, 0.8);
                text-align: center;
                padding: 20px 0;
                font-size: 30px;
                border: 1px solid;
            }
            .col1-2 {
                grid-col-start: 1;
                grid-col-end: 2;
            }
            .col3-4 {
                grid-col-start: 3;
                grid-col-end: 5;
            }
            .colHeader {
                border: 7px double;
            }
        `}
    </style>
    )
}

export default OctaveCss;