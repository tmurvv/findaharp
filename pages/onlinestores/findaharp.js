// packages
import { useEffect } from 'react';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../../src/constants/FindaharpProducts'
import StoreProduct from '../../src/components/onlinestore/StoreProduct';
import PageTitle from '../../src/components/PageTitle';
import IndexCss from '../../src/styles/index.css';
import FindaharpOnlineStoreCss from '../../src/styles/onlinestore/onlinestores/FindaharpOnlineStore.css';

const Findaharp = () => {
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    });
    return (
        <>
        <div className='index' style={{height: 'fit-content', backgroundColor: '#fffeee'}}>
        <PageTitle maintitle="Find a Harp Online Store" subtitle='Pre-loved Music, CDs, Digital Downloads' /> 
            <div className='store'>
                <div >
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='product-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>CDs</h1>
                        <div className="product-list">
                            {FINDAHARP_PRODUCTS.products_cds.map((product, index) => <StoreProduct product={product} key={index}/>)}
                        </div>                   
                    </div>
                </div>
                {/* <img  id="music"className= 'divider' src="../../../img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/> */}
                <div>
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='product-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>Preloved Music</h1>
                        <div className="product-list">
                            {FINDAHARP_PRODUCTS.products_music.map((product, index) => <StoreProduct product={product} key={index}/>)}
                        </div>                  
                    </div>
                </div>
                <div >
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='product-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>Digital Downloads</h1>
                        <div className="product-list" style={{textAlign: 'center', width: '50%', margin: 'auto'}}>
                            Coming Soon!! Sign up for our newsletter to be notified when digital downloads is up and running. Choose login/profile from the above menu to sign up.
                            {/* {FINDAHARP_PRODUCTS.products_cds.map((product, index) => <StoreProduct product={product} key={index}/>)} */}
                        </div>                   
                    </div>
                </div>
            </div>
            
        </div>
        <IndexCss />
        <FindaharpOnlineStoreCss />
        </>
    )
}

export default Findaharp;
