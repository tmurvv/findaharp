import React from 'react';

function SubtotalCss() {
    return (
        <style jsx="true">{`
            .subtotal {
                padding: 35px;
            }
            @media only screen and (max-width: 1000px) {
                .subtotal {
                    padding: 15px;
                }
            }
        `}
        </style>
    )
} 

export default SubtotalCss;
