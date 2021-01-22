import { useState, useContext, useEffect } from 'react';
import Router from 'next/router';

import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { UserContext } from '../src/contexts/UserContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import { StatusContext } from '../src/contexts/StatusContext';
import PageTitle from '../src/components/PageTitle';
import StatusIndicator from '../src/components/onlineStore/StatusIndicator';
import CartCss from '../src/styles/onlineStore/cart.css'; 
import IndexCss from '../src/styles/index.css'; 
import ProductModalCSS from '../src/styles/ProductModal.css';


function RememberDetails() {
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
            <div style={{ padding: '20px 0'}}>
                <div style={{padding: '20px 0', maxWidth: '650px', margin: 'auto'}} >
                    <PageTitle maintitle='Remember My Harp' subtitle={`How does it work?`} />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul style={{width: 'fit-content', margin: 'auto'}}>
                            <li>Enter a name and email for your harp</li>
                            <li>Signup as many harps as you like</li>
                            <li>We will remember your string brands</li>
                            <li>Teachers, you can enter your students' harps!</li>
                            <li>Rentors, you can enter your rental harps!</li>
                            <li>What a great idea!</li>
                        </ul>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly',margin: '50px', maxWidth: '650px'}}>
                    <button style={{fontSize: '14px', marginRight: '2.5px'}} className='submit-btn' onClick={()=>alert('Button under construction. Please go back to string form and click "Remember my harp" button there.')}>Signup a harp?</button>
                        <button style={{fontSize: '14px', marginLeft: '2.5px'}} className='submit-btn' onClick={()=>Router.push('/stringform')}>Back String Form</button> 
                    </div>
                </div>
            </div>
            <CartCss />
            <IndexCss />
        </>
    )       
}

export default RememberDetails;