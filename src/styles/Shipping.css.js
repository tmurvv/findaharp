import React from 'react';

function ShippingCss() {
    return (
        <style jsx="true">{`
            .shippingContainer {
                background-color: #fffeee;
                padding: 15px;
                font-family: avenir;
            }
            .shippingContainer input {
                padding: 15px;
                width: 85%;
                border-radius: 3px;
                margin-top: 5px;
                margin-bottom: 20px;
            }
            .shippingUpdatesContact {
                background-color: #fff;
                padding: 15px;
                margin-bottom: 10px;
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
