import React from 'react';

function ProductContainerCss() {
    return (
        <style jsx>{`
            img {
                height: 100%;
            }
            .notFoundContainer {
                width: 60%;
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                transform: rotate(25deg);
            }           
            .productContainer {
                width: 70%;
                margin: 30px auto;
            }
            .grid-container {
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;
                grid-column-gap: 10px
            }
            .grid-item {
                font-size: 30px;
                text-align: center;
                width: 180px;
                font-size: 14px;
            }
            .productSmallDisplay {
                display: flex;
                flex-direction: column;
                height: 350px;
                width: 100%;
            }
            .productSmallDisplay-img {
                flex:7; 
                height: 70%;    
                /*background-image: linear-gradient(to right, #ffffff, #fffee0 25%, #fffee0 75%, #ffffff 0%);*/
                background-color: #fffee0;
                overflow: hidden;
            }
            .productSmallDisplay-img img{
                width: auto;
                height: 100%;
            }
            .productSmallDisplay-text {
                flex: 2;
                display: flex;
                justify-content: center;
                align-items: top;
                padding-top: 5px;
                width: 100%;
            }
        `}
        </style>
    )
} 

export default ProductContainerCss;