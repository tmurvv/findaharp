import React from 'react';

function PaymentCss() {
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
            .paymentInfo {
                background-color: #fff;
                padding: 15px;
                margin-bottom: 10px;
            }
            .billingInfo {
                background-color: #fff;
                padding: 15px;
            }
            .paymentMethod input {
                padding: unset;
                width: auto;
                border-radius: unset;
                margin-top: 0;
                margin-bottom: 0;
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

export default PaymentCss;
