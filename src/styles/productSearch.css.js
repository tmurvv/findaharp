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
            .searchLine1 {
                position: relative;
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
                position: relative;
                width: 70%;
                margin: auto;
                height: 28.5px;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                font-size: 14px;
                border-top: 1px solid;
                border-bottom: 1px solid;
                text-align: center;
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
            }
            @media only screen and (max-width: 650px) {
                .mobileSearchLine1 {
                    display: flex;
                    margin: 5%;
                }
                .searchLine1 {
                    grid-template-columns: 100%;
                    grid-template-rows: 9.5% 29% 29% 29% 9.5%;
                    height: 120px;
                }
                .searchLine1Sub {
                    grid-template-columns: 100%;
                    grid-template-rows: 9.5% 29% 29% 29% 9.5%;
                    height: 120px;
                    border-right: 1px solid;
                } 
            }
            .searchLine2 {
                position: relative;
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
                position: relative;
                width: 60%;
                margin: auto;
                height: 26.5px;
                background-color: #ffffff;
                color: #868686;
                font-style: italic;
                font-size: 14px;
                border-top: 1px solid;
                border-bottom: 1px solid;
                display: grid;
                grid-template-columns: 9.5% 29% 29% 29% 9.5%;
            }
            @media only screen and (max-width: 650px) {
                .mobileSearchLine2 {
                    display: flex;
                    margin: 5%;
                    margin-bottom: 40px;
                }
                .searchLine2 {
                    grid-template-columns: 100%;
                    grid-template-rows: 9.5% 29% 29% 29% 9.5%;
                    height: 120px;
                    border: 1px solid;
                }
                .searchLine2Sub {
                    grid-template-columns: 100%;
                    grid-template-rows: 9.5% 29% 29% 29% 9.5%;
                    height: 120px;
                    border: 1px solid;
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
            @media only screen and (max-width: 650px) {
                .arrow {
                    opacity: 0;
                }
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
            .clearSearch {
                position: absolute; 
                right: -120px;
                height: 60%;
                top: -8px;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .clearSearch img {
                width: 40px;
            }
            @media only screen and (max-width: 650px) {
                .clearSearch {
                    top: 120px;
                    right: 0;
                    font-size: 16px;
                }   
            }
            @media only screen and (max-width: 500px) {
                .clearSearch {
                    top: 130px;
                    height: 25px;
                    font-size: 14px;
                }
                .clearSearch img{
                    width: 25px;
                }
            }
        `}
    </style>
    )
}

export default ProductSearchCss;
