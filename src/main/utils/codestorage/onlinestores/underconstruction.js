// packages
import { useEffect } from 'react';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../../../constants/FindaharpProducts'
import StoreProduct from '../../onlineStore/StoreProduct';
import PageTitle from '../../PageTitle';
import IndexCss from '../../../styles/index.css';
import HarpsEtcOnlineStoreCss from '../../../styles//onlinestores/HarpsEtcOnlineStore.css';

const UnderConstruction = () => {
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    return (
        <>
            <div className='index' style={{height: 'fit-content', padding: '15px'}}>
                <PageTitle maintitle="The Next Harp Store" subtitle='This Space Under Construction' /> 
            
                <div className='store' style={{width: '50%', paddingBottom: '50px', margin: 'auto', textAlign: 'center'}}>
                    <h3>Coming Soon!</h3>
                    Our Harp 'Mini-Mall' is brand new. More stores coming soon! Sign up for our newsletter to be notified when new stores move in. Choose Login/Profile from the above menu to sign up.
                </div>
                <button onClick={()=>Router.push('/storeentry')}
                    className='submit-btn'
                    style={{
                        margin: 'auto',
                        marginBottom: '50px',
                    }}>Back to MiniMall
                </button>
            </div>
            <IndexCss />
            <HarpsEtcOnlineStoreCss />
        </>
    )
}

export default UnderConstruction;
