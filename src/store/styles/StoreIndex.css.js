import React from 'react';

function StoreIndexCss() {
    return (
        <style jsx="true">{`
            .storeIndex {
                // background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                margin: 0;
                height: fit-content;
                position: relative;
                padding: 70px 40px;
            }
            @media only screen and (max-width: 550px) {
                .storeIndex {
                    padding: 70px 10px;
                }
            }
            
            .storeIndex h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
        `}
    </style>
    )
}

export default StoreIndexCss;
