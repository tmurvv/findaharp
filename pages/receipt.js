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
            <div style={{backgroundColor: '#fff', marginTop: '-20px', paddingBottom: '25px'}}>
                <StatusIndicator />
            </div>
            <div style={{backgroundColor: '#fffeee', padding: '20px 0'}}>
                <div style={{backgroundColor: '#fff', padding: '20px 0'}} >
                    <PageTitle maintitle='Order Completed' subtitle={`A receipt for your order will be emailed to you. Thank you for your order.`} />
                    <div style={{display: 'flex', justifyContent: 'space-evenly',margin: '50px 0'}}>
                        <button style={{width: '30%'}} className='submit-btn' onClick={()=>Router.push('/')}>Back to Harps</button>
                        <button style={{width: '30%'}} className='submit-btn' onClick={()=>Router.push('/storeentry')}>Back to Harp MiniMall</button>
                    </div>
                </div>
            </div>
            <CartCss />
            <IndexCss />
            <ProductModalCSS />
        </>
    )       
}

export default Receipt;
