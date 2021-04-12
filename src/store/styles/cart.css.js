import React from "react"; 

function CartCss() {
    return (
        <style jsx="true">{`
        .cartContainer {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin: auto;
            margin-bottom: 50px;
        }
        .cart-container:nth-child(2) {
            flex:1;
        }
        @media only screen and (max-width: 715px) {
            .cartContainer {
                flex-direction: column;
            }
        }
        #cart {
            margin-top: -15px;
            height: fit-content;
            flex: 3;
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
        @media only screen and (max-width: 700px) {
            .cartBody>h3 {
                text-align: center;
            }
        }
        .subCart {
            border: 1px solid lightgrey;
            padding: 20px;
            margin: 15px;
        }
        @media only screen and (max-width: 1000px) {
            .subCart {
                padding: 20px;
            }
        }
        .itemsContainerWrapper {
            display: flex;
        }
        @media only screen and (max-width: 1000px) {
            .itemsContainerWrapper {
                display: block;
            }
        }
        .itemsContainer {
            background-color: transparent;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0;
            max-width: 650px;
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
            overflow-y:auto;
            overflow-x:hidden;
            background-color: transparent;
        }      
        .subTotal {
            // flex: 2;
            // margin: 0;
            // height: 100%;
            // background-color: #ECF0F1;
            text-align: center;
            margin-bottom: 25px;
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
            
        input[type=checkbox] {
            margin-right: 5px;
        }
        .cartButton {
            // float: right;
            // cursor: pointer;
            // margin: 10px;
            display: block;
            position: fixed;
            top: 220px;
            right: 10px;
            z-index: 9000;
        }
        .cartButtonCart {
            cursor: pointer;
            margin: 10px;
            display: flex;
            
        }
        .cartButtonCart img {
            height: 45px;
            width: unset;
        }
        
        .cartButtonCart p {
            margin-block-start: 0;
            margin-block-end: 0;
            font-weight: 600;
            font-size: 20px;
           transform: translate(39px, 0px);
        }
        @media only screen and (max-width: 550px) {
            .cartButtonCart img {
                height: 30px;
            }
            .cartButtonCart p {
                font-size: 14px;
                transform: translate(27px, 0px);
            }
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
            margin: 10px auto;
            text-align: left;
            display: block;
            height: auto;
            width: auto;
        }
        .noItem {
            background-color: rgb(255, 255, 255);
            padding: 25px 0;
            width: 100%;
            text-align: center;
        }
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
        @-webkit-keyframes myMoveBack {
            0% { -webkit-transform: scale(1) translate(0, 0); background: rgb(244,244,244,0); }
            100% { -webkit-transform: scale(8) translate(-40px, 20px); background: rgb(244,244,244,.93);}
        } 
        `}
        </style>
    )
}

export default CartCss;
