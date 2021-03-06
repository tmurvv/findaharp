// packages
import React, {useState, useEffect} from 'react';
import Head from 'next/head';

//internal
import { STORE_PARTNERS } from '../src/main/constants/storeDirectory';
import PageTitle from '../src/main/components/main/PageTitle';
import Spinner from '../src/main/components/main/Spinner';
import AboutPartnerStore from '../src/main/components/main/AboutPartnerStore';
import StorePartnersCSS from '../src/main/styles/StorePartners.css';
import { 
    getWindowSize,
    shuffleStorePartners,
    addPlaceholderStorePartners } from '../src/main/utils/helpers';
import StorePartnerInfo from '../src/main/components/main/StorePartnerInfo';
  
export default function StorePartners() {
    const [openStoreOwnerInq, setOpenStoreOwnerInq] = useState(false);
    // randomize store partners
    const storePartnersShuffled = shuffleStorePartners(STORE_PARTNERS);
    // get grid size
    const size = getWindowSize();
    // add blank placeholders for grid
    const addPlaceHolders=addPlaceholderStorePartners(storePartnersShuffled, size.width);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
        document.querySelector('#partnerSubMenu')?document.querySelector('#partnerSubMenu').style.display='none':'';
    },[]);
    return (
        <>
        <Spinner />
        <Head>
            <title>findaharp.com -- Store Partners</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Stores partnering with findaharp.com, Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities" key="title" />
        </Head>
        {openStoreOwnerInq?<StorePartnerInfo open={openStoreOwnerInq} close={()=>setOpenStoreOwnerInq(false)}/>:''}
        <div className='storePartnersContainer'>
            <PageTitle 
                maintitle='Our Store and Business Partners' 
                subtitle='Find a Harp is proud to partner with the following harp sellers' 
            />
            <h3 className={`subTitle`} style={{width: 'fit-content', marginTop: '-45px'}}><button onClick={()=>setOpenStoreOwnerInq(true)} style={{margin: 'auto', padding: '5px 7px', fontSize: '16px', backgroundColor: 'transparent', border: 'none', color: '#6A75AA'}}>Click here</button>for more information.</h3>
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container">
                    {addPlaceHolders.map(partner=>!partner.doNotList&&
                        <AboutPartnerStore 
                            key={partner.id} 
                            product={partner} 
                            placeholder={!partner.productTitle}
                        />)
                    }
                </div>
            </div>
            <StorePartnersCSS />
        </div>
        </>
    )
}