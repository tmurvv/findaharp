// packages
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

// internal
import { STORE_PARTNERS } from '../src/constants/constants';
import StoreProduct from '../src/components/StoreProduct';
import OnlineStorePartner from '../src/components/OnlineStorePartner';
import PageTitle from '../src/components/PageTitle';
import ContactUsForm from '../src/components/ContactUsForm';
import IndexCss from '../src/styles/index.css';
import StoreDirectoryCSS from '../src/styles/onlinestore/StoreDirectory.css';

const StoreDirectory = (props) => {
    const [ view, setView ] = useState('harps')
    const [ contactUsForm, setContactUsForm ] = useState(false);
    const [ harpName, setHarpName ] = useState(false);
    
    function handleClick(e) {
        console.log(e.target.getAttribute('data-id'))
        console.log(contactUsForm)
        setContactUsForm(true);
        setHarpName(e.target.getAttribute('data-id'))
    }
    function reset() {setContactUsForm(false)}
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    });
    return (
        <>
        <div className='index' style={{height: 'fit-content'}}>
            <PageTitle maintitle="Store Partner MiniMall" subtitle='Music, Strings, and Accessories Available Here' />  
            <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap'}}>
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
                    key={'theharpplace'} 
                    product={STORE_PARTNERS[8]} 
                    placeholder={false}
                />
            </div>
        </div>
        <StoreDirectoryCSS />
        </>
    )
}
export default StoreDirectory;
