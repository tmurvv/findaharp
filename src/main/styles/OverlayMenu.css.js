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
                transition: all 500ms ease-in;
            }
            // .overlayBarClosed {
            //     background: rgb(244,244,244, 0);
            // }
            // .overlayBarOpen {
            //     background: rgb(244,244,244, .93);
            // }
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
                transform: translate(50%, -50%);
                display: flex;
                height: 80%;
                flex-direction: column;
                justify-content: space-around;
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
      `}</style>
    )
}

export default OverlayMenuCss;
