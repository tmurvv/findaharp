// packages
import { useEffect } from 'react';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../../src/constants/FindaharpProducts'
import StoreProduct from '../../src/components/onlinestore/StoreProduct';
import PageTitle from '../../src/components/PageTitle';
import IndexCss from '../../src/styles/index.css';
import HarpsEtcOnlineStoreCss from '../../src/styles/onlinestore/onlinestores/HarpsEtcOnlineStore.css';

const HarpsEtc = () => {
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    return (
        <>
            <div className='index' style={{height:'fit-content',padding:'15px'}}>
                <PageTitle maintitle="HarpsEtc Online Store" subtitle='music, strings, accessories and more' /> 
            
                <div className='store' style={{width: '50%', paddingBottom: '50px', margin: 'auto', textAlign: 'center'}}>
                    <h3>Moving in Late October, 2020</h3>
                    HarpsEtc offers a wide selection of music, strings, accessories and workshops along with service that exceeds your expectations.
                </div>
                <button onClick={()=>Router.push('/storeentry')}
                    className='submit-btn'
                    style={{
                        margin: 'auto',
                        marginBottom: '50px',
                    }}>Back to MiniMall</button>
            </div>
            <IndexCss />
            <HarpsEtcOnlineStoreCss />
        </>
    )
}

export default HarpsEtc;
