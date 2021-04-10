import React from "react";

function OverlayMenuCss() {
    return (
        <style>{`
            #overlayBar {
                opacity: 1;
                background: rgb(244,244,244,0);
                -webkit-transition: all 500ms ease-in;
                -moz-transition: all 500ms ease-in;
                -ms-transition: all 500ms ease-in;
                -o-transition: all 500ms ease-in;
                transition: all 2000ms ease-in;
            }
            .overlayBarClosedImg {
                document.querySelector('#overlayBar').style.transform = 'scale(.02)';
                document.querySelector('#overlayBar').style.top = '250px';
                document.querySelector('#overlayBar').style.right = '25px';
                display: 'none';
            }
            .overlayBarOuter {
                z-index: 9999;
                position: absolute;
                height: 100%;
                width: 100%;
                // background-image: url("/img/OverlayMenu/landing_background_blur.png");
                // background-image: url("/img/OverlayMenu/landing_background_blur_darken.png"), linear-gradient(rgb(0,0,0,.4), rgb(0,0,0,.4)); /* W3C */
                // background-size: 500px, 600px;
            }
           
            .overlayLinks {
                position: absolute;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%) scale(1);
                display: flex;
                max-height: 80%;
                flex-direction: column;
                justify-content: space-around;
                transform-origin: center;
                transition: all 2000ms ease-in;
                animation-iteration-count: 1;
            }        
            .overlayLink {
                color: white;
                font-size: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 5px;
                margin-top: 5px;
            }
            .thinLink {
                max-height: 100px;
            }
            .fatLink {               
                max-height: 250px;
            }
            .overlayLinks img {
                height: 100%;
                width: 80%;
                border-radius: 12px;
            }  
            @-webkit-keyframes myMove {
                0% { -webkit-transform: translate(50%, -50%) scale(1);  } 
                100% { -webkit-transform: translate(800px, -300px) scale(.02); }
            }
            @-webkit-keyframes myMoveBack {
                // 0% { -webkit-transform: scale(1) rotate(0deg); }
                // 50% {-webkit-transform: scale(1.5) rotate(22.5deg); }  
                // 100% { -webkit-transform: scale(1.5) rotate(45deg); }
                0% { -webkit-transform: scale(1) translate(0, 0); background: rgb(244,244,244,0); }
                100% { -webkit-transform: scale(8) translate(-40px, 20px); background: rgb(244,244,244,.93);}
            }      
      `}</style>
    )
}

export default OverlayMenuCss;
