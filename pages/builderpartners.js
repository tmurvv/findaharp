// packages
import React, {useState, useEffect} from 'react';
import Head from 'next/head';

//internal
import { BUILDER_PARTNERS } from '../src/main/constants/builderDirectory';
import PageTitle from '../src/main/components/main/PageTitle';
import AboutBuilderPartner from '../src/showcase/components/AboutBuilderPartner';
import BuilderPartnersCSS from '../src/showcase/styles/BuilderPartners.css';
import { 
    getWindowSize,
    shuffleStorePartners,
    addPlaceholderStorePartners } from '../src/main/utils/helpers';
  
export default function BuilderPartners() {
    const [openBuilderOwnerInq, setOpenBuilderOwnerInq] = useState(false);
    // randomize builder partners
    const builderPartnersShuffled = shuffleStorePartners(BUILDER_PARTNERS);
    // get grid size
    const size = getWindowSize();
    // add blank placeholders for grid
    const addPlaceHolders=addPlaceholderStorePartners(builderPartnersShuffled, size.width);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <img id='spinner' style={{
                    display: 'none', 
                    position: 'fixed', 
                    top: '25%', 
                    left: '50%', 
                    transform: 'translate(-50%,-50%)',
                    zIndex: '9000',
                    height: '75px'
                }} 
                src='/img/spinner.gif' 
                alt='spinner' 
            />
        <Head>
            <title>findaharp.com -- Builder Partners</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Builders partnering with findaharp.com, Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities" key="title" />
        </Head>
        {openBuilderOwnerInq?<AboutBuilderPartner open={openBuilderOwnerInq} close={()=>setOpenBuilderOwnerInq(false)}/>:''}
        <div className='builderPartnersContainer'>
            <PageTitle   
                maintitle='Our Builder and Business Partners' 
                subtitle='Find a Harp is proud to partner with the following harp sellers' 
            />
            {/* <div onClick={()=>document.querySelector('#spinner').style.display='block'} style={{position: 'absolute', top: '15px', left: '15px'}}>
                    <FastNEasyStringForm />
            </div> */}
            <h3 className={`subTitle`} style={{width: 'fit-content', marginTop: '-45px'}}><button onClick={()=>setOpenBuilderOwnerInq(true)} style={{margin: 'auto', padding: '5px 7px', fontSize: '16px', backgroundColor: 'transparent', border: 'none', color: '#6A75AA'}}>Click here</button>for more information.</h3>
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container">
                    {addPlaceHolders.map(partner=>!partner.doNotList&&
                        <AboutBuilderPartner 
                            key={partner.id} 
                            product={partner} 
                            placeholder={!partner.productTitle}
                        />)
                    }
                </div>
            </div>
            <BuilderPartnersCSS />
        </div>
        </>
    )
}