import { useEffect } from 'react';
import Router from 'next/router';

import PageTitle from '../src/components/PageTitle';
import CartCss from '../src/styles/onlineStore/cart.css'; 
import IndexCss from '../src/styles/index.css';

function RememberDetails() {
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []);
    
    return ( 
        <>
            <div style={{ padding: '20px 0'}}>
                <div style={{padding: '20px 0', maxWidth: '650px', margin: 'auto'}} >
                    <PageTitle maintitle='Remember My Harp' subtitle={`How does it work?`} />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul style={{width: 'fit-content', margin: 'auto', listStyle:'none'}}>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;Enter a name and email for your harp</li>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;Signup as many harps as you like</li>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;We will remember your string brands</li>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;Teachers, you can enter your students' harps!</li>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;Rentors, you can enter your rental harps!</li>
                            <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;Email any questions <a style={{fontSize: '14px', textDecoration: 'underline', color: '#6A75AA'}} href='mailto:tisha@findaharp.com'>tisha@findaharp.com</a></li>
                        </ul>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly',margin: '50px', maxWidth: '650px'}}>
                        <button style={{fontSize: '14px', marginRight: '2.5px'}} className='submit-btn' onClick={()=>Router.push('/harploginsignup')}>Signup a Harp</button>
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
