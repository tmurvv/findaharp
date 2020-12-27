// packages
import React, {useState, useEffect} from 'react';
import Head from 'next/head';

//internal
import { STORE_PARTNERS } from '../src/constants/storeDirectory';
import PageTitle from '../src/components/PageTitle';
import AboutPartnerStore from '../src/components/AboutPartnerStore';
import StorePartnersCSS from '../src/styles/StorePartners.css';
import { 
    getWindowSize,
    shuffleStorePartners,
    addPlaceholderStorePartners } from '../src/utils/helpers';
import StorePartnerInfo from '../src/components/StorePartnerInfo';
  
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
    },[]);
    return (
        <>
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
                    {addPlaceHolders.map(partner=> 
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