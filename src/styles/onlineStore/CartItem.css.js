import React from "react";

function CartItemCss() {
    return (
        <style jsx="true">{`
        .item { 
            width: 660px; 
            height: 100px;
            margin: 10px auto;
            text-align: left;
            display: flex;
            border-radius: 3px;
            padding: 10px;
        }
        .product_image {
            // height: 40%;
            // min-height: 40%;
            // width: 70%;
            max-width: 70px;
            padding-top: 10px;
            margin: auto;
        }
        .product_image img { 
            // width: 140px;
            // max-height: 250px;
            border-radius: 3px;
            max-width:100%;
            max-height:100%;
            box-shadow: 3px 5px 3px lightgrey;
        }
        .description { 
            margin-top: 15px;
            margin-left: 10px;
            margin-bottom: 10px;
            max-height: 100px;
            overflow-y: auto;
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
            margin-left: 8px;
        }
        `}
    </style>
    )
}

export default CartItemCss;