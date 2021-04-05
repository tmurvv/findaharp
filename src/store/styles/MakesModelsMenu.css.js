import React from 'react';

function MakesModelsMenuCSS() {
    return (
        <style jsx="true">{`
            .storeSubMenu-closed {
                z-index: -1 !important;
                background-color: transparent;
                max-height: 0;
                transition: max-height 4s ease-in, overflow 4s;
                overflow: hidden;
            }
            .storeSubMenu-open {
                z-index: 6000;
                background-color: #6A75AA !important;
                color: #ffffff !important;
                max-height: 1500px;
                transition: max-height 2s ease-out, overflow 4s;
                box-shadow: 3px 3px 3px lightgrey;
                margin-left: 30px;
            }
            .storeSubMenu-open li {
                z-index: 6000;
            }
            #makesmodels,
            .makesmodels {
               transform: translateX(-20px);

            }
            @media only screen and (max-width: 750px) {
                #makesmodels,
                .makesmodels {
                   transform: translateX(0px); 
                }
            }
            .makesmodels-select {
                background-color: yellow;
                // max-height: 0;
                // transition: max-height 0.15s ease-out;
                // overflow: hidden;
            }
            .makesmodels-select:hover {
                background-color: blue;
                // max-height: 1000;
                // transition: max-height 0.25s ease-in;
            }
            .makesmodels {
                // transform: scale(2)
            }
        `}
    </style>
    )
}

export default MakesModelsMenuCSS;
