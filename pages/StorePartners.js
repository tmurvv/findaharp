// packages
import React from 'react';
import Head from 'next/head';

//internal
import { STORE_PARTNERS } from '../src/constants/constants';
import PageTitle from '../src/components/PageTitle';
import AboutPartnerStore from '../src/components/AboutPartnerStore';
import StorePartnersCSS from '../src/styles/StorePartners.css';
import { 
    getWindowSize,
    shuffleStorePartners,
    addPlaceholderStorePartners } from '../src/utils/helpers';
  
export default function StorePartners() {
    // randomize store partners
    const storePartnersShuffled = shuffleStorePartners(STORE_PARTNERS);
    // get grid size
    const size = getWindowSize();
    // add blank placeholders for grid
    const addPlaceHolders=addPlaceholderStorePartners(storePartnersShuffled, size.width);
    return (
        <>
        <Head>
            <title>findaharp.com -- Store Partners</title>
            <meta name="description" content="Pre-owned or used Harps of all types -- Stores partnering with findaharp.com, Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities" key="title" />
        </Head>
        <div className='storePartnersContainer'>
            <PageTitle 
                maintitle='Our Store Partners' 
                subtitle='Find a Harp is proud to partner with the following harp sellers' 
            />
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