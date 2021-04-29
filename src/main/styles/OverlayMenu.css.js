import React from "react";

function OverlayMenuCss() {
    return (
        <style>{`
            #overlayBar {
                -webkit-transition: all 1000ms ease-in;
                -moz-transition: all 1000ms ease-in;
                -ms-transition: all 1000ms ease-in;
                -o-transition: all 1000ms ease-in;
                transition: all 1000ms ease-in;
            }
            .overlayBarOuter {
                z-index: 9000;
                position: absolute;
                top: 191px;
                height: 5000px;
                width: 100%;
                padding-top: 70px;
                background-color: #fff;
                background-image: url('img/OverlayMenu/landing_background_opacity.png');
            }
            .overlayLinks {
                margin: auto;
                width: 580px;
            }
            @media only screen and (max-width: 1050px) {
                .overlayBarOuter {
                    top: 162px;
                } 
            }
            @media only screen and (max-width: 850px) {
                .overlayBarOuter {
                    top: 120px;
                    right: 0;
                } 
            }
            @media only screen and (max-width: 550px) {
                .overlayLinks {
                    margin: auto;
                    width: 100%
                } 
                .overlayBarOuter {
                    top: 223px;
                } 
            }     
            .item1,
            .item4 { 
                width: 100%;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
            @media only screen and (max-width: 550px) {
                .item1,
                .item4 { 
                    flex: 2;
                    background-color: #000;
                }
            }
            .item1 {
                margin-bottom: 10px;
                background-image: url('/img/OverlayMenu/landing_findusedharp.png');
            }
            .item4 {
                background-image: url('/img/OverlayMenu/landing_musicstringsthings2.png');
            }
            
            .item2,
            .item3 { 
                height: 150px;
                width: 100%;
                grid-area: builder; 
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
            @media only screen and (max-width: 550px) {
                .item2,
                .item3 { 
                    flex: 4;
                }
            } 
            .item2 {
                background-image: url('/img/OverlayMenu/landing_builders.png');
                background-origin: bottom;
                transform: translate(0, 28px);
            }
            .item3 {
                background-image: url('/img/OverlayMenu/landing_fastneasy.png');
                transform: translate(0,-25px)
            }
            .item4 { 
                background-size: contain;
                background-repeat: no-repeat;
                margin-top: 15px;
            }
            .item1,
            .item3 {
                margin-right: 5px;
            }
            .item2,
            .item4 {
                margin-left: 5px;
            }     
            @media only screen and (max-width: 550px) {
                .item1,
                .item2,
                .item3,
                .item4 { 
                    margin: -7.5px;
                }
                .item2 {
                    background-color: #7682b9;
                }
                .item3 {
                    margin-top: -22.5px;
                    background-color: #fdc93a;
                }
            }
            @-webkit-keyframes myMove {
                0% { -webkit-transform: translate(50%, -50%) scale(1);  } 
                70% {-webkit-transform: translate(45vw, -150px) scale(.1); }
                100% { -webkit-transform: translate(45vw, -150px) scale(.02); }
            }
              
      `}</style>
    )
}

export default OverlayMenuCss;
