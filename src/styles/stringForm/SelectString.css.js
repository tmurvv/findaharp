import React from "react";

function Css() {
    return (
        <style jsx="true">{`
            button {
                outline: none;
                border: none;
            }
            .menu-wrapper, .menu button{
                width: fit-content;
                text-align: left;
                color: #fff;
                border-radius: 4px;
            }
            
            .menu::after{
                content: '';
                clear: both;
                display: block;
            }

            .menu button{
                display: block;
                padding: 10px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                text-decoration: none;
                // font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
                font-size: 14px;
                // width: 150%;
            }

            .menu li{
                position: relative;
            }

            .menu > li{
                float: left;
            }

            .menu, .menu ul{
                padding: 0;
                margin: 0;
                list-style-type: none;
            }

            .menu ul li+li{
                border-top: 1px solid #fff;
            }

            .menu ul{
                position: absolute;
                box-shadow:  5px 5px 10px 0 rgba(0,0,0, 0.5);
                color: gold;
            }

            .menu > li ul, .menu ul ul{
                opacity: 1;
                -webkit-transition: all 0.2s ease-in;
                -moz-transition: all 0.2s ease-in;
                transition: all 0.2s ease-in;
                z-index: 9000;
                visibility: hidden;
                background-color: #ffe58a;
                width: 100%;
            }
            // .menu > li ul:hover, .menu ul ul:hover{
            //     // background-color: #ffd74c;
            //     width: 100% !important;
            // }

            .menu > li ul{
                top: 130%;
                left: 50%;
            }

            .menu ul ul{
                left: 130%;
                top: 0;
            }

            .menu ul button{
                // width: 150%;
                opacity: 1 !important;
            }
            .menuLevel2 {
                opacity: 1 !important;

            }

            .menu > li:hover > ul{
                top: 100%;
                opacity: 1;
                z-index: 1;
                visibility: visible;
            }

            .menu ul > li:hover > ul{
                left: 100%;
                opacity: 1;
                z-index: 1;
                visibility: visible;
            }

            /* color set */
            .menu-gray, .menu-gray button{
                background-color: #CCC;
                color: #222;
            }
            .menu-gray button:hover{
                background-color: #BBB;
                color: #222;
            }

            .menu-tomato, .menu-tomato button{
                background-color: Tomato;
                color: #FFF;
            }
            .menu-tomato button:hover{
                background-color: #ff3c1a;
                color: #FFF;
            }

            .menu-dodgerblue, .menu-dodgerblue button{
                background-color: dodgerblue;
                color: #FFF;
            }
            .menu-dodgerblue button:hover{
                background-color: #0080ff;
                color: #FFF;
            }

            .menu-gold, .menu-gold button{
                background-color: #ffe58a;
                color: #000;

            }
            .menu-gold button:hover{
                background-color: #ffd74c;
                color: #000;
                width: 100%;
            }
        `}
        </style>
    )
}

export default Css;