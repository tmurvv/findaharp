import React from 'react';

function StoreProductContainerCss() {
    return (
        <style jsx="true">{`
            .storenotFoundContainer {
                display: flex;
                justify-content: center;
                margin: 45px auto 25px;
                position: relative;
                z-index: 0;
            } 
            .storenotFoundContainer img {
                height: 225px;
            } 
            .storeproductContainer {
                padding-top: 50px;
            }   
            @media only screen and (max-width: 750px) {
                .storeproductContainer {
                    padding-top:0;
                } 
            }      
            .storeproductContainer>div {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
        `}
        </style>
    )
} 

export default StoreProductContainerCss;
