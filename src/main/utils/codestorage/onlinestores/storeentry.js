// packages
import { useState, useEffect } from 'react';

// internal
import { STORE_PARTNERS } from '../../../constants/storeDirectory';
import StoreProduct from '../../onlineStore/StoreProduct';
import OnlineStorePartner from '../../onlineStore/OnlineStorePartner';
import PageTitle from '../../PageTitle';
import ContactUsForm from '../../ContactUsForm';
import IndexCss from '../../../styles/index.css';
import StoreEntryCSS from '../../../styles//StoreEntry.css';

const StoreEntry = (props) => {
    const [ view, setView ] = useState('harps')
    const [ contactUsForm, setContactUsForm ] = useState(false);
    const [ harpName, setHarpName ] = useState(false);
    
    function handleClick(e) {
        setContactUsForm(true);
        setHarpName(e.target.getAttribute('data-id'))
    }
    function reset() {setContactUsForm(false)}
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    return (
        <>
        <div className='index' style={{height: 'fit-content'}}>
            <PageTitle maintitle="Store Partner MiniMall" subtitle='Music, Strings, and Accessories Available Here' />  
            <div className='storeEntriesContainer'>
                <OnlineStorePartner 
                    key={'findaharp'} 
                    product={STORE_PARTNERS[3]} 
                    placeholder={false}
                />
                <OnlineStorePartner 
                    key={'harpsetc'} 
                    product={STORE_PARTNERS[0]} 
                    placeholder={false}
                />
                <OnlineStorePartner 
                    key={'underConstruction'} 
                    product={STORE_PARTNERS[9]} 
                    placeholder={false}
                />
            </div>
        </div>
        <StoreEntryCSS />
        </>
    )
}
export default StoreEntry;
