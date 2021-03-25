import { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { CartContext } from '../src/main/contexts/CartContext';
import { CartSubtotalsContext } from '../src/main/contexts/CartSubtotalsContext';
import { UserContext } from '../src/main/contexts/UserContext';
import { CurrencyContext } from '../src/main/contexts/CurrencyContext';
import { StatusContext } from '../src/main/contexts/StatusContext';
import PageTitle from '../src/main/components/PageTitle';
import StatusIndicator from '../src/main/components/onlineStore/StatusIndicator';
import CartCss from '../src/main/styles/onlineStore/cart.css'; 
import IndexCss from '../src/main/styles/index.css'; 
import ProductModalCSS from '../src/main/styles/ProductModal.css';


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
