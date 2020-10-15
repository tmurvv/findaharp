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
                padding-top: 0;
                font-family: avenir;
                margin: auto;
                width: 100%;
                display: flex;
            }
            
            @media only screen and (max-width: 1000px) {
                .shippingContainer{
                    display: block;
                }
            }
            .labelGroup {
                display: block;
            }
            .shippingContainer input,
            .shippingemail input {
                width:100%;
                box-sizing:border-box; /* add vendor prefix or a script to do so if needed */
                padding: 15px;
                border-radius: 3px;
                margin-top: 5px;
                margin-bottom: 20px;
                max-width: 100%;
            }
            @media only screen and (min-width: 550px) {
                .shippingemail input {
                    width: 50%;
                }
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
