import React from "react";

function OverlayMenuCss() {
    return (
        <style>{`
            #overlayBar {
                opacity: 1;
                background: rgb(244,244,244,.93);
                -webkit-transition: all 500ms ease-in;
                -moz-transition: all 500ms ease-in;
                -ms-transition: all 500ms ease-in;
                -o-transition: all 500ms ease-in;
                transition: all 2000ms ease-in;
            }
            .overlayBarOuter {
                z-index: 9999;
                position: absolute;
                top: 160px;
                height: 100%;
                width: 100%;
                padding-top: 70px;
            }
            .overlayLinks {
                margin: auto;
                width: 580px;
            }   
            .item1,
            .item4 { 
                width: 100%;
                background-size: contain;
                background-repeat: no-repeat;
            }
            .item1 {
                margin-bottom: 10px;
                background-image: url('/img/OverlayMenu/landing_usedharps.png');
            }
            .item4 {
                background-image: url('/img/OverlayMenu/landing_musicstringsthings.png');
            }
            .item2,
            .item3 { 
                height: 150px;
                width: 100%;
                grid-area: builder; 
                background-size: cover;
                background-repeat: no-repeat;
            }
            .item2 {
                background-image: url('/img/OverlayMenu/landing_builders.png');
                background-origin: bottom;
            }
            .item3 {
                background-image: url('/img/OverlayMenu/landing_fastneasy.png');
                transform: translate(0,-50px)
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
            .tileContainer {
                display: flex;
                justify-content: flex-end;
                margin-right: 15px;
            }
            #tiles {
                height: 12px;
                width: 20px;
                z-index: 6000;
            }
            @-webkit-keyframes myMove {
                0% { -webkit-transform: translate(50%, -50%) scale(1);  } 
                70% {-webkit-transform: translate(400px, -200px) scale(.1); }
                100% { -webkit-transform: translate(400px, -200px) scale(.02); }
            }
            @-webkit-keyframes myMoveBack {
                0% { -webkit-transform: scale(1) translate(0, 0); background: rgb(244,244,244,0); }
                100% { -webkit-transform: scale(8) translate(-40px, 20px); background: rgb(244,244,244,.93);}
            }      
      `}</style>
    )
}

export default OverlayMenuCss;
