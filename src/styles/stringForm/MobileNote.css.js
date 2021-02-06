import React from "react";

function MobileNoteCss() {
    return (
        <style jsx="true">{`
            
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
                justify-content: space-evenly;
                align-items: center;
                width: 100%;
                border-top: 1px solid #676767;
            }
            .mobilenote {
                flex: 2.1;
                transform: translateY(22px);
            }
            .mobileqty {
                // display: flex;
                // align-items: center;
                flex: 3.3;
            }
            
            .mobileqty-input {
                height: 38px;
                text-align: right;
                border: none;
                font-size: 18px;
                width: 100%;
                // flex: 2.5;
            }
            .mobileqty-input::-webkit-inner-spin-button {  
                width: 14px;
                height: 30px;
                margin-left: 7.5px;
            }
            .mobilepriceper,
            .mobilelinetotal {
                flex: 3.3;
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