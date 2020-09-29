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
        <div className='index' style={{height: 'fit-content'}}>
        <PageTitle maintitle="Find a Harp Online Store" subtitle='Pre-loved Music, CDs, Digital Downloads' /> 
        <button style={{width: '30%', margin:'0 35% 40px 35%'}} onClick={()=>Router.push('/')}><a>Back to Harp Listings</a></button>
            <div className='store'>
                <div >
                    <div className="product-list-header" style={{textAlign: 'center', letterSpacing: '2.5px'}}>CDs</div>
                    <div className="product-list">
                        {FINDAHARP_PRODUCTS.products_cds.map((product, index) => <StoreProduct product={product} key={index}/>)}
                    </div>
                </div>
                {/* <img  id="music"className= 'divider' src="../../../img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/> */}
                <div>
                    <div className="product-list-header" style={{textAlign:'center', letterSpacing:'2.5px'}}>Preloved Music</div>
                    <div className="product-list">
                        {FINDAHARP_PRODUCTS.products_music.map((product, index) => <StoreProduct product={product} key={index}/>)}
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
