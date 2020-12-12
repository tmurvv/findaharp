import React from "react";

function CartItemCss() {
    return (
        <style jsx="true">{`
        .subCart_item {
            margin: 15px;
            display: flex;
            border-radius: 3px;
            margin-bottom: 40px;

            // width: 660px; 
            // height: 100px;
            // margin: 10px auto;
            // text-align: left;
            // display: flex;
            // border-radius: 3px;
            // padding: 10px;
        }
        @media only screen and (max-width: 1000px) {
            .subCart_item {
                flex-direction: column;
                margin: 0;
                // margin: 15px;
                // display: flex;
                // border-radius: 3px;
                // margin-bottom: 40px;
            }
        }
        .subCart_item-image {
            // width: 100%;
            // flex: 4;
            // margin-right: 10px;
            // display: flex;
            // justify-content: center;
            // padding-bottom: 25px;

            // height: 40%;
            // min-height: 100px;
            // min-width: 100px;
            // width: 70%;
            // padding-top: 10px;
            // margin: auto;
            // margin-right: 25px;
            max-height: 200px;
            flex: 3;
            
            display: flex;
            justify-content: center;
            width: 30%;
            padding-top: 18px;
        }
        @media only screen and (max-width: 1000px) {
            .subCart_item-image {
                width: 100%;
                margin: auto;
            }
        }
        .subCart_item-image img { 
            // width: auto;
            // min-width: 75px;
            // max-width: 200px;

            // border-radius: 3px;
            // max-width:100%;
            // height:200px;
            max-width: 150px;
            max-height: 150px;
            // box-shadow: 3px 5px 3px lightgrey;
        }
        .subCart_item-text { 
            flex: 7;
            width: 70%;
            // margin-top: 15px;
            // margin-left: 10px;
            // margin-bottom: 10px;
            // max-height: 100px;
            // overflow-y: auto;
            margin-left: 15px;
        }
        @media only screen and (max-width: 1000px) {
            .subCart_item-text { 
                // flex: 8;
                // width: 80%;
                // margin-top: 15px;
                // margin-left: 10px;
                // margin-bottom: 10px;
                // max-height: 100px;
                // overflow-y: auto;
                margin-left: 0px;
                width: 100%;
                text-align: center;
            }
        }
        .description p {
            font-size: 14px;
        }
        
        .description h2 {
            font-size: 14px; 
            color: #2c3e50;
            margin: 5px 0;
        }
        
        .description h3 {
            display: inline-block;
            font-size: 12px; 
            height: 20px; 
            line-height: 20px; 
            width: 100px;  
            text-align: center;
            margin: 15px 0;
        }
        .product_quantity {
            // width: 100px; 
            // height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .quantity_button {
            // margin: 33px auto;
            // height: 26px;
            // width: 71px;
            // text-align: center;
            // padding: 2px;
            // background-color: #ECF0F1;
            // position: relative;
            display: flex;
            align-items: center;
            height: fit-content;
        }
        .quantity_button img {
            height: 20px;
            width: 20px;
            transform: translateY(3px)
        }
        
        .how_many {
            width: 46px;
            height: 26px;
            line-height: 30px;
            font-size: 1.25em;
            color: #7F8C8D;
            padding: 0 25px; 
            text-align: center;
        }
        
        .price  { 
            font-size: 16px;
            font-family: 'Metropolis Extra Bold';
            margin-bottom: 25px;
            margin-left: -2px;
        }
        `}
    </style>
    )
}

export default CartItemCss;