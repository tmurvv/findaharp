import React from 'react';

function HarpSearchCss() {
    return (
        <style jsx>{`
            .searchTitle {
                width: 60%;
                margin: 25px auto 5px;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686
            }
            .searchLine1 {
                width: 70%;
                margin: auto;
                height: 30px;
                background-color: #000000;
                text-align: center;
                color: #fafbfc;
                display: flex;
                justify-content: space-between;
            }
            .searchLine1 span {
                color: #fafbfc;
            }
            .searchLine1Sub {
                width: 70%;
                margin: auto;
                height: 28.5px;
                text-align: center;
                display: flex;
                justify-content: space-between;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                border-top: 1px solid;
                border-bottom: 1px solid;
                text-align: center;
            }
            .searchLine2 {
                width: 60%;
                margin: auto;
                height: 27px;
                background-color: #f9bf1e;
                color: #868686;
                display: flex;
                justify-content: space-between;
                text-align: center;
                border-top: 1px solid;
                vertical-align: -50px;
            }
            .searchLine2 span {
                color: #fafbfc;
            }
            .searchLine2Sub {
                width: 60%;
                margin: auto;
                height: 26.5px;
                display: flex;
                justify-content: space-between;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                border-top: 1px solid;
                border-bottom: 1px solid;
                align-items: center;
                text-align: center;
            }
            .arrow {
                background-color: #fffff3;
                height: 20px;
                width: 20px;  
            }  
            .rightArrow {
                border-left: 1px solid;
                border-top: 1px solid;
            }
            .leftArrow {
                border-right: 1px solid;
                border-bottom: 1px solid;
            }
            .line1RightArrow {
                transform: translate(-10px, -50px) rotate(135deg);
            }
            .line1LeftArrow {
                transform: translate(10px, 4px) rotate(135deg);
            }
            .line1SubRightArrow {
                transform: translate(-10px, 4px) rotate(135deg);
            }
            .line1SubLeftArrow {
                transform: translate(10px, 4px) rotate(135deg);
            }
            .line1RightArrow {
                transform: translate(-10px, 4px) rotate(135deg);
            }
            .line1LeftArrow {
                transform: translate(10px, 4px) rotate(135deg);
            }
            .line2RightArrow {
                transform: translate(-10px, 4px) rotate(135deg);
            }
            .line2LeftArrow {
                transform: translate(8.5px, 4px) rotate(135deg);
            }
            .line2SubRightArrow {
                transform: translate(-10px, 0) rotate(135deg);
            }
            .line2SubLeftArrow {
                transform: translate(10px, 0) rotate(135deg);
            }
            .flexSE {
                width: 100%;
                display: flex;
                justify-content: space-evenly;
            }
            .flexSB {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            input {
                margin-bottom: 15px;
            }
            button {
                transform: translateY(-3px);
            } 
        `}
    </style>
    )
}

export default HarpSearchCss;
