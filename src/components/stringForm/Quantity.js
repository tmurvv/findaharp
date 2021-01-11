import React, {useState} from 'react';
import NoteCss from '../../styles/stringForm/Note.css';
import { StringFormContext } from '../../contexts/StringFormContext';
import SelectString from '../../components/stringForm/SelectString';

function Quantity(props) {
    const [ value, setValue ] = useState(1);
    
    return (
        <>
        
        <div class="quantity">
            <div className="quantity-input">
                <input type="number" id={`qty${props.note}`} value={value} onChange={()=>setValue(document.querySelector(`#qty${props.note}`).value)} />
            </div>
            <div class="quantity-nav">
                <div onClick={()=>setValue(parseInt(value)+1)} class="quantity-button quantity-up">+</div>
                <div onClick={()=>setValue(parseInt(value)-1)} class="quantity-button quantity-down">-</div>
            </div>
            
        </div>
        
        <style>{`
            .quantity {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 15%;
                height: 100%;
            }
            input[type=number] {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                padding: 10px;
                text-align: right;
                border: none;
                outline: none;
            }
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button
            {
                -webkit-appearance: none;
                margin: 0;
            }
            
            input[type=number]
            {
                -moz-appearance: textfield;
            }
            
            .quantity input {
                width: 35px;
                height: 32px;
                line-height: 1.65;
                display: block;
                padding: 0;
                margin: 0;
                text-align: right;
            }
            
            .quantity input:focus {
                outline: 0;
            }
            
            .quantity-nav {
                position: relative;
                height: 85%;
                transform: translate(8px,-3px);
            }
            
            .quantity-button {
                position: relative;
                cursor: pointer;
                border-left: 1px solid #eee;
                width: 20px;
                text-align: center;
                color: #333;
                font-size: 16px;
                font-family: "Trebuchet MS", Helvetica, sans-serif !important;
                line-height: 1.7;
                // -webkit-transform: translateX(-100%);
                // transform: translateX(-100%);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                -o-user-select: none;
                user-select: none;
            }
            
            .quantity-button.quantity-up {
                position: absolute;
                height: 50%;
                top: 0;
                border-bottom: 1px solid #eee;
                color: white;
                background-color: #54b354;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .quantity-button.quantity-down {
                position: absolute;
                bottom: -1px;
                height: 50%;
                color: white;
                background-color: tomato;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `}
        </style> 
    
        </>
    )
}

export default Quantity;
