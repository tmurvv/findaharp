import React from 'react';

function BuyersGuide() {
    return (
        <>
            <div className='buyersGuide'>           
            <h2>Buyer's Guide Under Construction</h2>
        </div>
        <style jsx="true">{`
                .buyersGuide {
                    background-image: url('/img/factoryFloor.jpg');
                    background-position: cover;
                    text-align:center;
                    padding: 15px;
                    min-height: 75vh;
                }
                h2 {
                    background-color: #bbbbbb;
                    color: white;
                    width: fit-content;
                    padding: 20px;
                    margin:auto;
                    margin-top: 30px;
                    border-raduis: 7px;
                }
            `}
            </style>
        </>
    )
}

export default BuyersGuide;
