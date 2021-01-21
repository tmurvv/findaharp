import React from "react";

function MobileNoteCss() {
    return (
        <style jsx="true">{`
            .mobilenoteGridContainer {
                // display: grid;
                
                // gap: 0px 0px;
                // grid-template-areas:
                //     "10% 10% 80%"
                //     "60% 20% 20%;
            }
            .mobilenoteContainer {
                background-color: #f6f6f6;
                text-align: center;
                font-size: 16px;
                border: 3px solid;
                align-items: center;
            }
            #lastChild:last-child {
                border-bottom: 3px solid;
            }
            .mobilenoteContainer select {
                font-size: 14px !important;
            }
            .mobileline2 {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                border-top: 1px solid #676767;
            }
            .mobileqty {
                display: flex;
                align-items: center;
                flex: 32;
            }
            .mobilenote {
                flex: 10;
            }
            .mobileqty-input {
                height: 38px;
                text-align: right;
                border: none;
                font-size: 18px;
                width: 100%;
            }
            .mobileqty-input::-webkit-inner-spin-button {  
                width: 14px;
                height: 30px;
                margin-left: 7.5px;
            }
            .mobilepriceper,
            .mobilelinetotal {
                flex:27.5;
            }
            .mobilecolHeader {
                // font-size: 14px;
                // border: 3px solid ;
            }
            .mobilestringtype {
                padding-bottom: 2px;
                padding-top: 2px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .mobilestringBrand {
                font-size: 14px;
            }
            
        `}
    </style>
    )
}

export default MobileNoteCss;