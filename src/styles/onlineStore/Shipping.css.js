import React from 'react';

function ShippingCss() {
    return (
        <style jsx="true">{`
            table {
                border-collapse: collapse;
                box-sizing:border-box;
            }
            .dropDown {
                padding: '15px',
                border: '2px solid black',
                borderRadius: '3px',
                minWidth: '100%',
                marginTop: '2.5px',
                backgroundColor: '#fff'
            }
            td {
                width: 25%;
            }
            .shippingContainer {
                box-sizing:border-box;
                background-color: #fffeee;
                padding: 30px;
                font-family: avenir;
                margin: auto;
                width: 100%;
            }
            .shippingContainer>form {
                display: flex;
                // width: 100%;
            }
            @media only screen and (max-width: 750px) {
                .shippingContainer>form{
                    display: block;
                }
            }
            .labelGroup {
                display: block;
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
