import React from 'react';

function ProductSearchCss() {
    return (
        <style jsx="true">{`
            .storesearchTitle {
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
            .storeproductSearchOuter {
                max-width: 1010px;
                width: 70%;
                margin: auto;
            }
            @media only screen and (max-width: 550px) {
                .storeproductSearchOuter {
                    width: 100%;
                }
            } 
            .storesearchLine1 {
                display: flex;
                justify-content: space-evenly;
                text-align: center;
                display: grid;
                grid-template-columns: 33.3% 33.3% 33.3%;
                color: white;            
            }
            @media only screen and (max-width: 550px) {
                .storesearchLine1 {
                    background-color: #000000;
                }
            }
            .storesearchLine1 img {
                width: 70%;
                position: absolute;
                height: 60px;
                max-width: 1010px;
            }
            @media only screen and (max-width: 550px) {
                .storesearchLine1 img {
                    display: none;
                }
            } 
            .storesearchLine1 span {
                color: #fafbfc;
            }
            .storesearchLine1Sub {
                display: flex;
                justify-content: space-evenly;
                font-size: 13px;
                padding-top: 9px;
                text-align: center;
                display: grid;
                grid-template-columns: 33.3% 33.3% 33.3%;
            }
            @media only screen and (max-width: 550px) {
                .storemobileSearchLine1 {
                    display: flex;
                    justify-content: space-evenly;
                    margin: auto;
                    margin-top: 10px;
                }
                .storesearchLine1 {
                    flex: 5;
                    grid-template-columns: 100%;
                    height: 120px;
                    grid-template-columns: unset;
                    align-items: center;
                    border: 1px solid black;
                }
                .storesearchLine1>.grid-item {
                    padding-top: 5px;
                }
                .storesearchLine1Sub {
                    flex: 5;
                    grid-template-columns: 100%;
                    padding: 0;
                    height: 120px;
                    border: 1px solid;
                    grid-template-columns: unset;
                    margin-top: auto;
                    background-color: #ffffff;
                }
            }
            .storesearchLine2 {
                width: 90%;
                margin: auto;
                display: flex;
                justify-content: space-evenly;
                text-align: center;
                display: grid;
                grid-template-columns: 33.3% 33.3% 33.3%;
            }
            @media only screen and (max-width: 550px) {
                .storesearchLine2 {
                    height: 120px;
                    border: 1px solid #FCD961;
                    background-color: #FCD961;
                }
            }
            .storesearchLine2 img {
                width: 63.3%;
                position: absolute;
                height: 60px;
                max-width: 909px;
            }
            @media only screen and (max-width: 550px) {
                .storesearchLine2 img {
                    display: none;
                }
            }
            .storesearchLine2 span {
                color: #fafbfc;
            }
            .storesearchLine2Sub {
                margin: auto;
                width: 90%;
                display: flex;
                justify-content: space-evenly;
                font-size: 13px;
                padding-top: 9px;
                text-align: center;
                display: grid;
                grid-template-columns: 33.3% 33.3% 33.3%;
            }
            @media only screen and (max-width: 550px) {
                .storemobileSearchLine2 {
                    display: flex;
                    justify-content: space-evenly;
                    margin: auto;
                    margin-bottom: 40px;
                }
                .storesearchLine2 {
                    grid-template-columns: 100%;
                    height: 120px;
                    grid-template-columns: unset;
                    align-items: center;
                }
                .storesearchLine2 img {
                    width: 70%;
                    position: absolute;
                    height: 50px;
                }
                .storesearchLine2.div.button {
                    color: #000000;
                }
                .storesearchLine2Sub {
                    grid-template-columns: 100%;
                    height: 120px;
                    border: 1px solid;
                    padding: 0;
                }     
            } 
            .storeflexSE {
                width: 100%;
                display: flex;
                justify-content: space-evenly;
            }
            .storeflexSB {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .storesearch-grid-item {
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 5;
            }
            @media only screen and (max-width: 550px) {
                .storesearch-grid-item {
                    font-size: 16px;
                }
            }
            
            .storesearch-grid-item img {
                height: 12px;
                margin-left: 10px;
                color: #333333
                z-index: 1000;
                padding-bottom: 2px;
            }
            input {
                margin-bottom: 15px;
            }  
            li {
                padding: 5px 7px;
                border: 1 solid grey;
                z-index: 1000;
            }
            .storeselected {
                width: fit-content;
                height: fit-content;
                margin: 20px auto;
                display: flex;
                justify-content: center;
            }
            .storeselected p {
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
                width: 15px;
                padding-bottom: 2px;
            }
            .clearSearch p {
                font-size: 14px;
                margin-left: 3px;
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
                    padding-bottom: 2px;
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
