// packages
import { useEffect, useState, useContext } from 'react';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../src/constants/FindaharpProducts'
import StoreProduct from '../src/components/onlinestore/StoreProduct';
import StoreProductContainer from '../src/components/onlinestore/StoreProductContainer';
import PageTitle from '../src/components/PageTitle';
import IndexCss from '../src/styles/index.css';
import OnlineStoreCss from '../src/styles/onlinestore/onlinestores/FindaharpOnlineStore.css';
import StoreProductSearch from '../src/components/onlineStore/StoreProductSearch';
import GlobalStoreSearch from '../src/components/onlineStore/GlobalStoreSearch';
import StoreProductContainerCss from '../src/styles/onlinestore/StoreProductContainer.css';
import { UserContext } from '../src/contexts/UserContext';

const OnlineStore = () => {
    const [ filteredProducts, setFilteredProducts ] = useState(FINDAHARP_PRODUCTS);
    const { user } = useContext(UserContext);
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    // sort products
    useEffect(()=>{
        console.log('abv', filteredProducts)
        
        setFilteredProducts(filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        console.log('bel', filteredProducts)
    },[]);
    return (
        <>
            <div className='index' style={{height: 'fit-content', backgroundColor: '#fffeee', padding: '15px', paddingTop: '70px'}}>
                <PageTitle maintitle="Online Store" subtitle='Thousands more items coming in November.' /> 
                <GlobalStoreSearch filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/>
                <StoreProductContainer filteredproductscontainer={filteredProducts}/>
            </div>
            <IndexCss />
            <OnlineStoreCss />
        </>
    )
}

export default OnlineStore;
