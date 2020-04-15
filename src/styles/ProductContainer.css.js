import React from 'react';

function ProductContainerCss() {
    return (
        <style jsx>{`
            img {
                height: 100%;
            }
            .productContainer {
                width: 70%;
                margin: 30px auto;
            }
            .grid-container {
                display: grid;
                grid-template-columns: auto auto auto auto;
                background-color: #eeeeee;
                grid-column-gap: 5px
            }
            .grid-item {
                background-color: rgba(255, 255, 255, 0.8);
                font-size: 30px;
                text-align: center;
                width: 130px;
                font-size: 14px;
            }
            .oddRow {
                height: 220px;
                background-color: #dddddd
            }
            .evenRow {
                height: 50px;
                padding: 10px 0;
                display: flex;
                align-items: center;
            }
        `}
        </style>
    )
} 

export default ProductContainerCss;