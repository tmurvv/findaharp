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
            #makesmodels-select {
                background-color: yellow;
            }
            .makesmodels {
                // transform: scale(2)
            }
        `}
    </style>
    )
}

export default MakesModelsMenuCSS;
