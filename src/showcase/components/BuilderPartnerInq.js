// packages
import React, {useState, useEffect } from 'react';
// styles
import StorePartnerInfoCSS from '../../main/styles/StorePartnerInfo.css';

function BuilderPartnerInq(props) {
    return (
        <>
        <div className='detailContainer' style={{flexDirection: 'column'}} hidden={!props.open}>
            <h2 style={{maxWidth: '90%'}}>Builder Partner Program Details</h2>
            <br />
            <img className={`divider`} src="./img/dkblue_tapered_line.png" alt="fancy golden divider line" />
            <div className='detailInfo'>
                <div className={`detailImg`}>
                    <img src= '/img/golden_harp_cropped.png' style={{objectFit: 'contain', height: 'auto'}} alt='findaharp golden harp logo' />
                    <img src= '/img/logo_findaharp_black.png' style={{objectFit: 'contain', height: 'auto'}} alt='findaharp golden harp logo' />
                </div>
                <div className={`detailText`}>
                    <p>
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No per harp fee<br />
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No signup time requirements<br />
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Six month trial period<br />
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Your branding is featured when customer selects you<br />
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Your website link is clearly visible to customer<br />
                        <span><img src='/img/ltblue_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Email tisha@findaharp.com for more information or to sign up
                    </p>
                    <br />
                    <br />
                    <div className='longDesc'>Findaharp.com was launched in July of 2020 and is averaging one to two referrals per week to it's store and business partners. Site traffic is currently 15-30 unique visitors per day and growing steadily.</div>
                    <br />
                    <button style={{backgroundImage: 'linear-gradient(340deg, #9cacdd 50%, #b9c3e4 58%, #e2e7f9 74%, #9cacdd 87%)'}} className='detailButton'><a href='mailto:tisha@findaharp.com?subject=store partner inquiry' style={{color: 'black'}}>Store Partner Inquiry</a></button>        
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

export default BuilderPartnerInq;
