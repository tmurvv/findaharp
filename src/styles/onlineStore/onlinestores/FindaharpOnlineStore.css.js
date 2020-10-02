import React from "react";
import { cssVariables } from '../../../constants/cssVariables'

function FindaharpOnlineStoreCss() {
    return (
        <style jsx="true">{`
            .divider img {
                max-height: 5px;
            }
            .fah {
                width: 100%;
                margin: auto;
                box-sizing: border-box;
            }
            .fahproduct-list {
                display: flex; 
                flex-wrap: wrap; 
                padding: 50px;
                padding-top: 25px;
                justify-content: space-between;
                position: relative;
                background-color: #fffeee;
                margin-top: -20px;
            }
            @media only screen and (max-width: 550px) {
                .fahproduct-list {
                    padding: 0px;
                }
                
            }
            .fahproduct-list-header {
                background-color: '#fffeee';
                padding-top: 30px;
            }
            .fahproduct-list-header h3 {
                font-family: "avenir";
                margin: auto;
                text-align: center;
            }
            .fahproduct {
                background-color: #fffeee;
            }
            .fahlogo>img {
                height: 100%;
            }
            .fahcopy {
                font-size: 12px;
            }
            .fahstoreButtons {
                width: 90%;
                margin: 50px auto 0;
            }
            .fahstoreButton {
                margin:10px;
                width: 25%;
                background: #6A75AA;
                font-family: Lato;
                color: #ffffff;
                border-radius: 0 0 4px 4px;
                border: 0;
                padding: 12px 16px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                display: block;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            .fahstoreButton a {
                transform: scale(1);
            }
            @media only screen and (max-width: 600px) {
                .fahstoreButton a {
                    font-size: 12px;
                    
                }
            }
            .fahharpContact {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 5000;
            }
        `}
        </style>
    )
}

export default FindaharpOnlineStoreCss;
