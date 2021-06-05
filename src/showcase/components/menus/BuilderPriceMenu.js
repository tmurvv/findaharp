// packages
import React, { useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
// internal
import { UserContext } from '../../../main/contexts/UserContext';
import { CurrencyContext } from '../../../main/contexts/CurrencyContext';

export default function PriceMenu(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier, setCurrencyMultiplier } = useContext(CurrencyContext);
    
    const handleClose = (evt) => {
        if (evt.target.value === 'All Prices') return;
        props.handlePriceChange(evt.target.getAttribute('name')); 
    };
    // get currency conversions
    async function getCurrency() {
        const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
        setCurrencyMultiplier(multiplier.data.USD_CAD);  
    }   
    return (
        <div className='relative'>
            <button 
                id='font12'
                className="menuButton" 
                name='price' 
                onClick={(e)=>{
                    props.handleclick(e); 
                    if (user.currency.toUpperCase()==="CAD"&&!currencyMultiplier) getCurrency();
                }}
                style={{color: '#000000'}}
            >
                BASE PRICE {user.currency.toUpperCase()==='USD'?'USD':'CAD'}
            </button>               
            <ul
                id="price-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Price Menu'
                className='builderplainTextSelectLine2 plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Prices'
                >All Prices</li>
                
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='$6500 plus'
                >$6500 plus</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='$4,000-6,499'
                >$4,000-6,499</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='$2,500-3,999'
                >$2,500-3,999</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='$1,000-2,499'
                >$1,000-2,499</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Less than $1,000'
                >Less than $1,000</li>          
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Currency'
                >Prices in {user.currency.toUpperCase()==='USD'?'US Dollars':'Canadian Dollars'}</li>
                <li 
                    onClick={()=>alert('Currency preference is located in your profile. Please login or signup to change your currency preference.')}
                    style={{color: '#000', textDecoration: 'underline'}}
                    key={uuid()}
                    name='Preference'
            >Change Currency</li>
            </ul>     
        </div>
    );
}
