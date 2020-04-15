import React from 'react';

function ProductSearchCss() {
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
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
            }
            .searchLine1 span {
                color: #fafbfc;
            }
            .searchLine1Sub {
                width: 70%;
                margin: auto;
                height: 28.5px;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                border-top: 1px solid;
                border-bottom: 1px solid;
                text-align: center;
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
            }
            .searchLine2 {
                width: 60%;
                margin: auto;
                height: 27px;
                background-color: #f9bf1e;
                color: #868686;
                text-align: center;
                border-top: 1px solid;
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
            }
            .searchLine2 span {
                color: #fafbfc;
            }
            .searchLine2Sub {
                width: 60%;
                margin: auto;
                height: 26.5px;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                border-top: 1px solid;
                border-bottom: 1px solid;
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
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
                transform: translate(-9px, 3px) rotate(135deg);
            }
            .line2SubLeftArrow {
                transform: translate(8.5px, 3px) rotate(135deg);
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
            .search-grid-item {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            input {
                margin-bottom: 15px;
            }
            button {
                transform: translateY(-3px);
            }
            
            
            
            li {
                
                padding: 5px 7px;
                border: 1 solid grey;
                z-index: 1000;
            } 
        `}
    </style>
    )
}

export default ProductSearchCss;
