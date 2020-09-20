import React from "react"; 
import { cssVariables } from '../constants/cssVariables';
function CartCss() {
    return (
        <style jsx="true">{`
        // body, ul, h1, h2, h3, form, input, li { margin: 0; padding: 0 }
       
        #cart {
            // width: fit-content;
            // background-color: #ECF0F1;
            // border: 1px lightgrey solid;
            // box-shadow: 2px 2px 2px rgba(0,0,0,.3);
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            // z-index: 1000;
            margin-top: -15px;
            height: fit-content;
        }
        #cart h1 {
            margin: -15px auto 20px;
        }
        @media only screen and (max-width: 600px) {
            #cart {
                // height: 70vw;
                // border: 0;
                // box-shadow: 0;
            }
        }
        .cartBody {
            // display: flex;
            // flex-direction: space-between;
            // border: 1px lightgrey solid;
            // box-shadow: 2px 2px 2px rgba(0,0,0,.3);
            
            padding: 15px;
            margin-top: -50px;
        }
        @media only screen and (max-width: 600px) {
            // .cartBody {
            //     flex-direction: column;
            // }
        }
        .itemsContainer {
            background-color: #fffeee;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px 10px;
        }
        .itemsContainer h4 {
            width: fit-content;
            text-align: center;
            margin: 0 auto;
            font-weight: 300;
            font-style: italic;
            color: #868686;
        }
        .items {
            flex: 8;
            min-width: 300px;
            margin: 0;
            padding-left: 15px;
            display: flex;
            height: 440px; 
            overflow-y:scroll;
            overflow-x:hidden;
            background-color: #fffeee;
        }      
        .subTotal {
            // flex: 2;
            // margin: 0;
            // height: 100%;
            // background-color: #ECF0F1;
            text-align: center;
            margin-bottom: 25px;
        }
        @media only screen and (max-width: 600px) {
            // .subTotal {
            //     order: -1;
            // }
        }
        
        .items h1 {
            margin: 5px 0;
            font-size: 24px;
            color: #2C3E50;
        }
        
        .subTotal h1 {
            margin: 10px 0;
            font-size: 20px;
            color: #34495E;
        
        }
        
        .subTotal h2 {
            margin: 5px auto;
            font-size: 16px;
            color: #34495E;
        
        }
        
        .subTotal h3 {
            margin: 25px 0;
            font-size: 16px;
            font-weight: bold;
            font-family: 'Metropolis Extra Bold'
        }
        
        .subTotal h4 {
            margin: 15px 0;
            font-size: 12px;
            color: rgba(0,0,0,.3);
        }
        
        .checkout {
            height: 30px;
            line-height: 30px;
            width: 100px;
            margin: 10px auto;
            background-color: #E74C3C;
            color: #fff;
        }
        
        form {
            font-size: 14px;
            color: #1ABC9C;
        }
        
        input[type=checkbox] {
            margin-right: 5px;
        }
        .cartButton {
            // float: right;
            cursor: pointer;
            margin: 10px;
            display: flex;
            position: fixed;
            top: 220px;
            right: 10px;
            z-index: 5000;
        }
        .cartButton img {
            height: 45px;
            width: unset;
        }
        .cartButton p {
            margin-block-start: 0;
            margin-block-end: 0;
            font-weight: 600;
            font-size: 24px;
            transform: translate(35px, -5px);
        }
        /*********************************************/
        
        ul {     
            width: 100%;
            margin-left: -8px; 
            padding: 0; 
        }
    
        #cart ul li { 
            list-style-type: none; 
        }
    
        .item { 
            width: 660px; 
            height: 100px;
            margin: 10px auto;
            text-align: left;
            display: flex;
        }
        .noItem {
            background-color: rgb(255, 255, 255);
            padding: 25px 0;
            width: 100%;
            text-align: center;
        }
        @media only screen and (max-width: 1000px) {
            .item {
                display: block;
                height: auto;
                width: auto;
            }
        }
        
        #cart img { 
            // display: block;
            // border: 0; 
            // padding: 0; 
            // margin: 0 auto; 
            // margin-top: 10px; 
            // width: 75px; 
            // height: 80px; 
        }
        
        // .description { 
        //     padding-left: 5px; 
        //     width: 300px;
        //     height: 100px;
        // }
        
        // .description h1 {
        //     font-size: 14px; 
        //     color: ${cssVariables.primaryColour}
        // }
        
        // .description h2 {
        //     font-size: 14px; 
        //     color: #2c3e50;
        //     margin: 5px 0;
        // }
        
        // .description h3 {
        //     display: inline-block;
        //     font-size: 12px; 
        //     height: 20px; 
        //     line-height: 20px; 
        //     width: 100px;  
        //     text-align: center;
        //     margin: 15px 0;
        // }
        
        // .description h3.delete {
        //     background-color: #c0392b;
        //     color: #fff;
        // }
        
        // .description h3.save {
        //     background-color: #1ABC9C;
        //     color: #fff;
        // }
        
        /********************************/
        
        .save ul { margin: 0; padding: 0; display: inline;}
                
        .save ul li { 
            list-style-type: none; 
        }
    
        .saved_item {   
            float: left;
            width: 100px; 
            height: 130px;
            margin: 10px 5px;
        }
        
        .img { 
            display: block;
            border: 0; 
            padding: 0; 
            margin: 0 auto; 
            margin-top: 10px; 
            width: 75px; 
            height: 80px; 
        }
        
        .add_cart {
            height: 30px;
            line-height: 16px;
            font-size: 12px;
            text-align: center;
            width: 100%;
            color: #16A085;
            font-weight: bold;
        }
        
        .save {
            width: 660px;
            height: 150px;
            margin: 0 auto;
        }
        .itemLine1 {
            display: flex;
        }
        // .submit-btn {
        //     width: 100%;
        //     border-radius: 3px;
        //     background-color: #ffe58a;
        //     color: #000;
        //     border: none;
        // }
        
        `}
        </style>
    )
}

export default CartCss;
