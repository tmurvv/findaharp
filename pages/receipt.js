import { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { UserContext } from '../src/contexts/UserContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import { StatusContext } from '../src/contexts/StatusContext';
import PageTitle from '../src/components/PageTitle';
import StatusIndicator from '../src/components/onlineStore/StatusIndicator';
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
            <div className='index' style={{paddingBottom: '25px'}}>
                <StatusIndicator />
            </div>
            <div style={{ padding: '20px 0'}}>
                <div style={{padding: '20px 0', maxWidth: '650px', margin: 'auto'}} >
                    <PageTitle maintitle='Order Completed' subtitle={`A receipt for your order will be emailed to you. Thank you for your order.`} />
                    <div style={{display: 'flex', justifyContent: 'space-evenly',margin: '50px', maxWidth: '650px'}}>
                        <button style={{fontSize: '14px', marginRight: '2.5px'}} className='submit-btn' onClick={()=>Router.push('/')}>Back to Harps</button>
                        <button style={{fontSize: '14px', marginLeft: '2.5px'}} className='submit-btn' onClick={()=>Router.push('/onlinestore')}>Back to Shopping</button>
                    </div>
                </div>
            </div>
            <CartCss />
            <IndexCss />
        </>
    )       
}

export default Receipt;
