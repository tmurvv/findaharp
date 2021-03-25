// packages
import React, {useState, useEffect } from 'react';
// styles
import StorePartnerInfoCSS from '../styles/StorePartnerInfo.css';

function StorePartnerInfo(props) {
    return (
        <>
        <div className='detailContainer' style={{flexDirection: 'column'}} hidden={!props.open}>
            <h2 style={{maxWidth: '90%'}}>Store Partner Program Details</h2>
            <br />
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='detailInfo'>
                <div className={`detailImg`}>
                    <img src= '/img/golden_harp_cropped.png' style={{objectFit: 'contain', height: 'auto'}} alt='findaharp golden harp logo' />
                    <img src= '/img/logo_findaharp_black.png' style={{objectFit: 'contain', height: 'auto'}} alt='findaharp golden harp logo' />
                </div>
                <div className={`detailText`}>
                    <p>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No monthly fee<br></br>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No per harp fee<br></br>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No signup time requirements<br></br>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No extra working uploading or updating your listings, ask for details (free)<br></br>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Small finders fee only if findaharp connects you with a customer that eventually purchases a harp<br></br>
                        <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Email tisha@findaharp.com for more information or to sign up
                    </p>
                    <br></br>
                    <br></br>
                    <div className='longDesc'><span>Testimonials and Statistics</span><br></br>Coming soon !! Testimonials. Findaharp.com website traffic statistics. Number of findaharp.com community members. Number of referrals.</div>
                    <br></br>
                    <button className='detailButton'><a href='mailto:tisha@findaharp.com?subject=store partner inquiry' style={{color: 'black'}}>Store Partner Inquiry</a></button>        
                </div>

                <div onClick={() => props.close()} className='clearModal'>
                    <img src='/img/clear_search.png' alt='clear filters'/>
                </div>  
            </div>
        </div>
        <StorePartnerInfoCSS />
        </>
    );
}

export default StorePartnerInfo;
