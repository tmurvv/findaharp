import { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { UserContext } from '../src/contexts/UserContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import { StatusContext } from '../src/contexts/StatusContext';
import PageTitle from '../src/components/PageTitle';
import StatusIndicator from '../src/components/onlinestore/StatusIndicator';
import CartCss from '../src/styles/onlinestore/cart.css'; 
import IndexCss from '../src/styles/index.css'; 
import ProductModalCSS from '../src/styles/ProductModal.css';


function Receipt() {
    const { setStatus } = useContext(StatusContext);
    
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []);
    // set status completed
    useEffect(()=>{
       setStatus('completed');
    }, []);
    return ( 
        <>
            
            <IndexCss />
        </>
    )       
}

export default Receipt;
