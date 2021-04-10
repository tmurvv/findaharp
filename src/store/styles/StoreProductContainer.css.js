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
