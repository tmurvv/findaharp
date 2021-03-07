import React from 'react';

function MakesModelsMenuCSS() {
    return (
        <style jsx="true">{`
            
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
