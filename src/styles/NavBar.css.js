import React from "react";

function NavBarCss() {
    return (
        <style jsx={true}>{`
            .navBarOuter {
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                height: 30px;
                border-bottom: 1px solid grey;
            }
            @media only screen and (max-width: 500px) {
                .navBarOuter {
                    padding-right: 10px;
                    height: 40px;
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .navLinks {
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: relative;
            }
            @media only screen and (max-width: 500px) {
                .navLinks {
                    flex-direction: column;
                    height: 140px;
                    padding: 10px;
                    border-radius: 3px;
                    background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                    z-index: 6000;
                }
                .navLinks a {
                    font-size: 16px;
                }
            }
            a {
                font-family: 'avenir';
                font-size: 12px;
                text-decoration: none;
                color: #000000;
                opacity: .8;
            }
            a:hover {
                opacity: 1;
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
      `}</style>

    )
}

export default NavBarCss;
