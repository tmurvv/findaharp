// packages
import { useEffect } from 'react';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../../../constants/FindaharpProducts'
import StoreProduct from '../../../components/onlineStore/StoreProduct';
import StoreProductContainer from '../../../components/onlineStore/StoreProductContainer';
import PageTitle from '../../../components/PageTitle';
import IndexCss from '../../../styles/index.css';
import FindaharpOnlineStoreCss from '../../../styles/onlineStore/onlinestores/FindaharpOnlineStore.css';
import StoreProductSearch from '../../../components/onlineStore/StoreProductSearch';

const Findaharp = () => {
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    return (
        <>
        <div className='index' style={{height: 'fit-content', backgroundColor: '#fffeee', padding: '15px', paddingTop: '70px'}}>
        <PageTitle maintitle="Find a Harp Online Store" subtitle='Pre-loved Music, CDs, Digital Downloads' /> 
            <StoreProductSearch />
            <StoreProductContainer />
            {/* <div className='fah'>
                <div>
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='fahproduct-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>Preloved Music</h1>
                        <div className="fahproduct-list">
                            {FINDAHARP_PRODUCTS.products_music.map((product, index) => <StoreProduct product={product} key={index}/>)}
                        </div>                  
                    </div>
                </div>
                <div>
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='fahproduct-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>CDs</h1>
                        <div className="fahproduct-list">
                            {FINDAHARP_PRODUCTS.products_cds.map((product, index) => <StoreProduct product={product} key={index}/>)}
                        </div>                   
                    </div>
                </div>
                <div >
                    <div className='divider'>
                        <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <div className='fahproduct-list-header'>
                        <h1 className="" style={{textAlign: 'center', letterSpacing: '2.5px'}}>Digital Downloads</h1>
                        <div className="fahproduct-list" style={{textAlign: 'center', width: '50%', margin: 'auto'}}>
                            Coming Soon!! Sign up for our newsletter to be notified when digital downloads is up and running. Choose Login/Profile from the above menu to sign up.
                        </div>                   
                    </div>
                </div>
            </div> */}
        </div>
        <IndexCss />
        <FindaharpOnlineStoreCss />
        </>
    )
}

export default Findaharp;
