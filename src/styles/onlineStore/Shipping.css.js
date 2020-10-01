import React from 'react';

function ShippingCss() {
    return (
        <style jsx="true">{`
            box-sizing:border-box;
            table {
                border-spacing: 20px;
                border: 1px solid black;
                border-collapse: collapse;
                width: 100%;
            }
            td {
                width: 25%;
            }
            .shippingContainer {
                background-color: #fffeee;
                padding: 30px;
                font-family: avenir;
                margin: auto;
                display: flex;
                width: 100%;
            }
            @media only screen and (max-width: 550px) {
                .shippingContainer {
                    display: block;
                }
            }
            .whole {
                width: 100%;
            }
            .half {
                width: 50%;
            }
            .quarter {
                width: 25%;
            }
            .labelGroup {
                display: block;
                // width: 100%;
            }
            .shippingContainer input {
                width:100%;
                box-sizing:border-box; /* add vendor prefix or a script to do so if needed */
                padding: 15px;
                border-radius: 3px;
                margin-top: 5px;
                margin-bottom: 20px;
            }
            .shippingContainer label {
                display: block;
            }
            .shippingUpdatesContact {
                background-color: #fff;
                padding: 15px;
                margin-bottom: 10px;
            }
            .customerName {
                // display: flex;
                // justify-content: space-between;
                width: 100%;
            }
            @media only screen and (max-width: 950px) {
                .customerName {
                    flex-direction: column;
                }
            }
            .shippingInfo {
                background-color: #fff;
                padding: 15px;
            }
            .zipPostal {
                flex: 5;
            }
            .regionDrop {
                flex: 5;
                margin-left: 20px;
            }
        `}
        </style>
    )
} 

export default ShippingCss;
