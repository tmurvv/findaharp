import React from "react";

function NavBarCss() {
    return (
        <style>{`
            .navBarOuter {
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                height: 40px;
                border-bottom: 1px solid grey;
            }
            @media only screen and (max-width: 550px) {
                .navBarOuter {
                    padding-right: 10px;
                    height: 40px;
                    display: flex;
                    justify-content: flex-end;
                }
            }
            #partnerSubMenu {
                transform: translateX(25%);
                display: none;
                width: fit-content;
                position: absolute;
                top: 20px;
                z-index: 9998;
                padding: 10px;
                background-color: #f9bf1e;
                box-shadow: 3px 3px 13px #f7dd93;
                flex-direction: column;
                justify-content: flex-start;
            }
            #partnerSubMenu a {
                white-space: nowrap;
                text-align: left;
            }
            @media only screen and (max-width: 550px) {
                #partnerSubMenu {
                    transform: translateX(-75%);
                    justify-content: flex-end;
                }
                #partnerSubMenu a {
                    text-align: right;
                }
            }
            .mirrorATagFont {
                color: #000;
                font-size: 16px;
            }
            @media only screen and (max-width: 950px) {
                a,
                aclass {
                    font-size: 14px;
                }
            }
            @media only screen and (max-width: 700px) {
                a,
                aclass {
                    font-size: 12px;
                }
            }
            .navLinks {
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: relative;
            }
            @media only screen and (max-width: 550px) {
                .navLinks {
                    flex-direction: column;
                    height: 140px;
                    padding: 10px;
                    border-radius: 3px;
                    background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                    z-index: 9500;
                }
                .navLinks a {
                    font-size: 16px;
                }
            }
            a {
                font-family: 'avenir';
                font-size: 16px;
                text-decoration: none;
                color: #000000;
                opacity: 1;
                flex: 2;
                text-align: center;
            }
            a:hover {
                opacity: 1;
            }
            @media only screen and (max-width: 950px) {
                a {
                    font-size: 14px;
                }
                .mirrorATagFont {
                    font-size: 14px;
                }
            }
            @media only screen and (max-width: 700px) {
                a {
                    font-size: 12px;
                }
                .mirrorATagFont {
                    font-size: 12px;
                }
            }
            .hamburgerMenu img {
                height: 35px;
            }
            .closeIcon img {
                height: 25px;
                position: absolute;
                top: 0;
                left: 0;
            }
            @media only screen and (max-width: 550px) {
                .closeIcon img {
                    height: 18px;
                    top: 5px;
                    left: 5px;
                }
            }
      `}</style>
    )
}

export default NavBarCss;
