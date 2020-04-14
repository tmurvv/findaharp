import React from 'react';

function HarpSearchCss() {
    return (
        <style jsx>{`
            .searchTitle {
                width: 100%;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686
            }
            .searchLine1 {
                width: 80%;
                margin: auto;
                height: 30px;
                background-color: #000000;
                text-align: center;
                color: #fafbfc;
                margin-top: 40px;
                -webkit-clip-path: polygon(0 0, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 2% 50%, 0% 0%);
                clip-path: polygon(0 0, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 2% 50%, 0% 0%);
            }
            .searchLine1 span {
                color: #fafbfc;
            }
            .searchLine1Sub {
                width: 80%;
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
                display: flex;
                align-items: center;
            }
            .searchLine2 {
                width: 70%;
                margin: auto;
                height: 25px;
                background-color: #f9bf1e;
                color: #868686;
                margin-top: 40px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                -webkit-clip-path: polygon(0 0, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 2% 50%, 0% 0%);
                clip-path: polygon(0 0, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 2% 50%, 0% 0%);
            }
            .searchLine2 span {
                color: #fafbfc;
            }
            .searchLine2Sub {
                width: 70%;
                margin: auto;
                height: 26.5px;
                text-align: center;
                display: flex;
                justify-content: space-between;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                border-top: 1px solid;
                border-bottom: 1px solid;
                display: flex;
                align-items: center;
            }
                
            .rightArrow {
                background-color: #fffff3;
                height: 20px;
                width: 20px;
                border-left: 1px solid;
                border-top: 1px solid;
                transform: translateX(-10px) rotate(135deg);
            }
            .leftArrow {
                background-color: #fffff3;
                height: 20px;
                width: 20px;
                border-right: 1px solid;
                border-bottom: 1px solid;
                transform: translateX(10px) rotate(135deg);
            }
            .flexSE {
                display: flex;
                justify-content: space-evenly;
            }
            input {
                margin-bottom: 15px;
            }
            /*.makerModelMenu {
                position: absolute;
                top: 45%;
                left: 33%;
            }*/   
        `}
    </style>
    )
}

export default HarpSearchCss;
