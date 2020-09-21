import React from "react";
import { cssVariables } from '../constants/cssVariables';

function CheckoutCss() {
    return (
        <style jsx="true">{`

        //     .statusIndicator ol {
        //         display: flex;
        //         justify-content: space-evenly;
        //         list-style: none;
        //     }
        //     .statusItem {
        //         flex: 1;
        //         display: flex;
        //         flex-direction: column;
        //         justify-content: center;
        //         align-items: center;
        //     }
        //     .statusItem p {
        //         width: 26px;
        //         height: 25px;
        //         border: 2px solid #868686;
        //         border-radius: 50%;
        //         text-align: center;
        //         font-size: 20px;
        //     }
        //     .statusItem a {
        //         margin-top: -15px;
        //         font-size: 18px;
        //     }
        //     .statusLine {
        //         flex: 3;
        //         height: 30px;
        //         border-bottom: 4px solid #868686;
        //     }
        //     .statusLine p {
                
        //         text-align: center;
        //         font-size: 20px;
        //         font-weight: 600;
                
        //     }
            








        // // @charset "utf-8";
        // // /* CSS Document */
        
        // // /* CSS Reset */
        // // html, body, div, span, applet, object, iframe,
        // // h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        // // a, abbr, acronym, address, big, cite, code,
        // // del, dfn, em, img, ins, kbd, q, s, samp,
        // // small, strike, strong, sub, sup, tt, var,
        // // b, u, i, center,
        // // dl, dt, dd, ol, ul, li,
        // // fieldset, form, label, legend,
        // // table, caption, tbody, tfoot, thead, tr, th, td,
        // // article, aside, canvas, details, embed, 
        // // figure, figcaption, footer, header, hgroup, 
        // // menu, nav, output, ruby, section, summary,
        // // time, mark, audio, video {
        // //     margin: 0;
        // //     padding: 0;
        // //     border: 0;
        // //     font-size: 100%;
        // //     font: inherit;
        // //     vertical-align: baseline;
        // // }
        // // /* HTML5 display-role reset for older browsers */
        // // article, aside, details, figcaption, figure, 
        // // footer, header, hgroup, menu, nav, section {
        // //     display: block;
        // // }
        // // body {
        // //     line-height: 1;
        // // }
        // // ol, ul {
        // //     list-style: none;
        // // }
        // // blockquote, q {
        // //     quotes: none;
        // // }
        // // blockquote:before, blockquote:after,
        // // q:before, q:after {
        // //     content: '';
        // //     content: none;
        // // }
        // // table {
        // //     border-collapse: collapse;
        // //     border-spacing: 0;
        // // }
        
        
        // /* Form Styles */
        // form
        // {
        //     width: auto !important;
        //     display: flex;
        //     justify-content: space-betwwen;
        //     padding-left: 20px;
        // }
        // @media only screen and (max-width: 600px) {
        //     form {
        //         flex-direction: column-reverse;
        //         margin: 0;
        //         padding: 20px;
        //     }
        // }
        
        // input[type="text"], input[type="password"], select, input[type="email"], input[type="tel"], input[type="date"], textarea
        // {
        //     border: 1px solid #ddd;
        //     background-color: #fff;
        //     color: #959595;
        //     width: 100%;
        //     padding: 10px;
        //     font-size: 12px;
        //     margin: 7px 0 25px 0;
        //     border-radius: 3px;
        // }
        
        // label
        // {
        //     font-size: 14px;
        // }
        
        // select
        // {
        //     height: 37px;
        // }
        
        // input[type="checkbox"]
        // {
        //     margin: 5px 10px 5px 0px;
        // }
        
        // .user-pswd input[type="checkbox"]
        // {
        //     margin: 5px 10px 5px 15px;
        // }
        
        // input[type="checkbox"] + p, input[type="radio"] + p
        // {
        //     font-size: 15px;
        //     padding: 0 5px;
        //     display: inline;
        //     color: #959595;
        // }
        
        // input[type="radio"] + p
        // {
        //     font-size: 13px;
        //     padding: 0 0 0 20px;
        // }
        
        // input[type="submit"]
        // {
        //     padding: 10px 20px;
        //     color: #fff; 
        //     background-color: #000;
        //     text-transform: uppercase;
        //     border: none;
        //     cursor: pointer;
        // }
        
        // input[type="submit"]:hover
        // {
        //     background-color: #D6544E;
        //     border: none;
        // }
        
        // .coupon input[type="text"]
        // {
        //     width: auto;
        // }
        
        // .coupon input[type="submit"]
        // {
        //     margin: 0 0 0 20px;
        // }
        
        // textarea
        // {
        //     height: 120px;
        // }
        
        // textarea:hover, input:hover
        // {
        //     border: 1px solid #D6544E;
        //     background-color: #fff;
        // }
        
        // textarea:active, input:active
        // {
        //     border: 1px solid #D6544E;
        //     background-color: #f5f5f5;
        // }
        
        // textarea:focus, input:focus
        // {
        //     border: 1px solid #000;
        //     background-color: #f5f5f5;
        // }
        
        // label:not(.notes):after
        // {
        //     content: "*";
        //     color: red;
        //     padding-left: 5px;
        // }
        
        // .notes
        // {
        //     display: block;
        //     padding-top: 20px;
        // }
        
        
        // /* Grid Styles */
        // // *
        // // {
        // //     box-sizing: border-box;
        // // }
        
        // .wrapper
        // {
        //     width: 100%;
        //     margin: 0 auto;
        //     margin-bottom: 100px;
        // }
        
        // .row:before, .row:after
        // {
        //     content: " ";
        //     display: table;
        // }
        
        // .row:after
        // {
        //     clear: both;
        // }
        
        // .col
        // {
        //     margin-right: 16px;
        //     float: left;
        // }
        
        // .col:last-child
        // {
        //     margin-right: 0;
        // }
        
        // .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12
        // {
        //     width: 100%;
        // } 
        
        // .col-push-1, .col-push-2, .col-push-3, .col-push-4, .col-push-5, .col-push-6, .col-push-7, .col-push-8, .col-push-9, .col-push-10, .col-push-11
        // {
        //     margin-left: 0;
        // } 
        
        
        
        // /* Main CSS Starts Here */
        // body
        // {
        //     font-family: 'Raleway', sans-serif;
        //     color: #959595;
        // }
        
        // h1
        // {
        //     font-size: 36px;
        //     text-transform: uppercase;
        //     font-weight: 400;
        //     color: ${cssVariables.primaryColour};
        //     margin-top: 50px
        // }
        
        // h2
        // {
        //     font-size: 28px;
        // }
        
        // h3
        // {
        //     font-size: 16px;
        // }
        
        // h4
        // {
        //     font-size: 15px;
        // }
        
        // h5
        // {
        //     font-size: 14px;
        // }
        
        // h6
        // {
        //     font-size: 13px;
        // }
        
        // form p
        // {
        //     font-size: 13px;
        //     padding: 20px 0;
        // }
        
        // /* Heading Top Border Styles Start Here */
        //  h3 
        // {
        //     position: relative;
        // }
          
        //  h3.topborder 
        // {
        //  margin: 25px 0;
        // }
          
        // h3.topborder:before 
        // {
        //     content: "";
        //     display: block;
        //     border-top: 1px solid #c2c2c2;
        //     width: 100%;
        //     height: 1px;
        //     position: absolute;
        //     top: 50%;
        //     z-index: 1;
        // }
          
        // h3.topborder span {
        //     background: #fff;
        //     padding: 5px 10px;
        //     position: relative;
        //     z-index: 5;
        //     border-radius: 3px;
        // }
        // /* Heading Top Border Styles End Here */
        
        
        // header
        // {
        //     text-align: center;
        // }
        
        // .white-space
        // {
        //     height: 90px;
        //     border-bottom: 1px solid #ddd;
        //     box-shadow: 0px 12px 14px -10px #DDDDDD;
        //     -webkit-box-shadow: 0px 12px 14px -10px #DDDDDD;
        //     -moz-box-shadow: 0px 12px 14px -10px #DDDDDD;
        //     -o-box-shadow: 0px 12px 14px -10px #DDDDDD;
        
        // }
        
        // .fa-info
        // {
        //     font-size: 24px;
        //     padding: 0 20px; 
        //     color: #757575;
        //     line-height: 56px;
        //     vertical-align: middle;
        // }
       
        // th, td {
        //     padding: 5px;
        // }
        // th {
        //     border: 1px double ${cssVariables.primaryColour};
        //     font-weight: 600;
        // }
        // td {
        //     border: 1px solid ${cssVariables.primaryColour};
        // }
        // .info-bar
        // {
        //     height: 56px;
        //     background-color: #f5f5f5;
        //     margin: 20px 0;
        // }
        
        // .info-bar p:first-child
        // {
        //     padding: 0;
        // }
        
        // .order
        // {
        //     border: 12px solid #f5f5f5;
        //     padding: 30px;
        //     margin: 28px 0 28px 20px;
        //     background-color: #fff
        // }
        // @media only screen and (max-width: 600px) {
        //     .order {
        //         margin: 0;
        //         border: 0;
        //         padding-top: 0;
        //     }
        // }
        
        // .order div:not(.qty)
        // {
        //     width: 100%;
        //     border-bottom: 1px solid #DDDDDD;
        //     padding: 20px 0;
        // }
        
        // .shipping {
            
        // }
        // .order a
        // {
        //     display: block;
        // }
        
        // .order p
        // {
        //     padding: 0;
        //     line-height: 20px;
        // }
        
        // .order h4, h5
        // {
        //     padding: 0;
        // }
        
        // .order div:nth-child(6)
        // {
        //     border: none;
        // }
        
        // .padleft
        // {
        //     margin-left: 39px;
        // }
        
        // .padright
        // {
        //     padding-right: 40px;
        // }
        
        // .inline
        // {
        //     display: inline-block;
        // }
        
        // .alignright
        // {
        //     float: right;
        // }
        
        // .prod-description
        // {
        //     text-transform: uppercase;
        //     color: #000;
        // }
        
        // .qty
        // {
        //     font-weight: 900;
        //     font-size: 13px;
        //     color: #000;
        //     padding-left: 4px;
        // }
        
        // .smalltxt
        // {
        //     font-size: 9px;
        //     vertical-align: middle;
        // }
        
        // .paymenttypes
        // {
        //     border: 1px solid #DDDDDD;
        //     padding: 0 8px;
        //     margin: 0 0 20px 10px;
        //     display: flex;
        //     flex-direction: row;
        //     justify-content: space-evenly;
        //     vertical-align: middle;
        // }

        // .paymenttypes>img {
        //     width: 45px;
        //     height: 30px;
        // }
        
        // #paypallogo
        // {
        //     width: 100px;
        //     height: 40px;
        // }
        
        // .cards
        // {
        //     width: 135px;
        //     height: 24px;
        // }
        
        // .difwidth
        // {
        //     width: 150px;
        //     line-height: 20px;
        // }
        
        // .order .center
        // {
        //     line-height: 40px;
        //     color: #000;
        // }
        // .orderButton {
        //     margin: auto;
        //     background: #1ABC9C;
        // }
        // .orderButton:focus,
        // .orderButton:hover {
        //     background: #0eab8c;
        // }
        `}
        </style>
    )
}

export default CheckoutCss;
