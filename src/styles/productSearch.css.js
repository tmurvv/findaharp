import React from 'react';

function ProductSearchCss() {
    return (
        <style jsx="true">{`
            .searchTitle {
                width: 60%;
                margin: 25px auto 5px;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686;
                font-weight: 500;
                font-size:14px;
            }
            
            h3 {
                width: 100%;
                text-align: center;
                margin-block-end: 1.66em;
                margin-block-start: 1.66em;
            }
            .productSearchOuter {
                max-width: 1010px;
                width: 70%;
                margin: auto;
            }
            @media only screen and (max-width: 550px) {
                .productSearchOuter {
                    width: 90%;
                }
            }
            
            .searchLine1 {
                position: relative;
                width: 100%;
                height: 27px;
                background-color: #000000;
                color: #fafbfc;
                text-align: center;
                border-top: 1px solid;
                border-bottom: 1px solid;
                display: grid;
                grid-template-columns: 5.5% 29% 29% 29% 9.5%;
            }
            .searchLine1 span {
                color: #fafbfc;
            }
            .searchLine1Sub {
                position: relative;
                width: 100%;
                margin: auto;
                margin-top: -2px;
                height: 27px;
                background-color: #ffffff;
                color: #868686;
                border-top: 1px solid;
                border-bottom: 1px solid;
                font-style: italic;
                font-size: 14px;
                text-align: center;
                display: grid;
                grid-template-columns: 5.5% 29% 29% 29% 9.5%;
            }
            @media only screen and (max-width: 550px) {
                .mobileSearchLine1 {
                    display: flex;
                    margin: auto;
                    width: 80%;
                    margin-top: 10px;
                }
                .arrow {
                    display: none;
                }
                .searchLine1 {
                    grid-template-columns: 100%;
                    height: 120px;
                    grid-template-columns: unset;
                    align-items: center;
                }
                .searchLine1>.grid-item {
                    padding-top: 5px;
                }
                .searchLine1Sub {
                    grid-template-columns: 100%;
                    height: 120px;
                    border-right: 1px solid;
                    grid-template-columns: unset;
                    margin-top: auto;
                } 
            }
            .searchLine2 {
                position: relative;
                width: 90%;
                margin: auto;
                height: 27px;
                background-color: #f9bf1e;
                color: #868686;
                text-align: center;
                border-top: 1px solid;
                display: grid;
                grid-template-columns: 5.5% 29% 29% 29% 9.5%;
            }
            .searchLine2 span {
                color: #fafbfc;
            }
            .searchLine2Sub {
                position: relative;
                width: 90%;
                margin: auto;
                height: 26.5px;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                font-size: 14px;
                border-top: 1px solid;
                border-bottom: 1px solid;
                display: grid;
                grid-template-columns: 5.5% 29% 29% 29% 9.5%;
            }
            @media only screen and (max-width: 550px) {
                .mobileSearchLine2 {
                    display: flex;
                    margin: auto;
                    width: 80%;
                    margin-bottom: 40px;          
                }
                .searchLine2 {
                    grid-template-columns: 100%;
                    height: 120px;
                    grid-template-columns: unset;
                    align-items: center;
                    border: 1px solid;
                    border-right: none;
                }
                .searchLine2.div.button {
                    color: #000000;
                }
                .searchLine2Sub {
                    grid-template-columns: 100%;
                    height: 120px;
                    border: 1px solid;
                }
                .arrow {
                    display: none;
                }
            }
            .arrow {
                background-color: #fffff3;
                height: 20px;
                width: 20px;  
            }  
            .rightArrow {
                border-left: 1px solid;
                border-top: 1px solid;
                transform: translate(-10.5px, 4px) rotate(135deg);
            }
            .leftArrow {
                border-right: 1px solid;
                border-bottom: 1px solid;
                position: absolute;
                top: 4px;
                right: -10px;
                transform: rotate(135deg);
            }
            .line1RightArrow {
                transform: translate(-13.5px, 4px) rotate(135deg);
            }
            .line1LeftArrow {
                transform: translate(2.5px, -1px) rotate(135deg);
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
                z-index: 5;
            }
            .search-grid-item img {
                height: 20px;
                margin-left: 10px;
                color: #333333
                z-index: 1000;
            }
            input {
                margin-bottom: 15px;
            }  
            li {
                padding: 5px 7px;
                border: 1 solid grey;
                z-index: 1000;
            }
            .selected {
                width: fit-content;
                height: fit-content;
                margin: auto;
                margin-bottom: -15px;
                display: flex;
                justify-content: center;
            }
            .selected p {
                font-size: 14px;
            }
            .clearSearch {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 7px;
            }
            .clearSearch img {
                z-index: 1000;
                width: 20px;
            }
            .clearSearch p {
                font-size: 14px;
            }
            /*@media only screen and (max-width: 750px) {
                .clearSearch {
                    top: 35px;
                    right: -35px;
                    height: 25px;
                    font-size: 14px;
                }
                .clearSearch img{
                    width: 25px;
                }  
            }
            @media only screen and (max-width: 550px) {
                .clearSearch {
                    top: 125px;
                    right: 0;
                } 
            }*/
        `}
    </style>
    )
}

export default ProductSearchCss;
