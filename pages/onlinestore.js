// packages
import { useEffect, useState } from 'react';
import axios from 'axios';

// internal
import PageTitle from '../src/main/components/main/PageTitle';
import CategoryMenu from '../src/store/components/menus/CategoryMenu';
import GlobalStoreSearch from '../src/store/components/main/GlobalStoreSearch';
import OnlineStoreCss from '../src/store/styles/OnlineStore.css';

const OnlineStore = (props) => {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen ] = useState(false);
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    // sort products
    useEffect(()=>{
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    return (
        <>
            <CategoryMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <div style={menuOpen?{background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4))'}:{}} className='storeIndex'>
                <PageTitle maintitle="Music, Strings and Things" subtitle='Featuring products sold by our store partners' /> 
                <GlobalStoreSearch 
                    usedProducts={props.usedProducts}
                    filteredProducts={props.filteredProducts} 
                    featuredProducts={props.featuredProducts} 
                    music={props.music} 
                    strings={props.strings} 
                    setSearchResults={setSearchResults}
                    menuOpen={menuOpen}
                />     
            </div>
            <OnlineStoreCss />
        </>
    )
}
OnlineStore.getInitialProps = async (props) => {
    /******************
     * LOCAL DATA
     ******************/
    //LOCAL DATA Populate variables
    // const products = testData;
    // const makesModels = testMakesModels;
    // return {filteredProducts: FINDAHARP_PRODUCTS}
    /*******************
     * API DATA
     *******************/
    // API
    const res = await axios.get(`${process.env.backend}/api/v1/storeitems`);
    const filteredProducts = res.data.storeitems;
    // const holidayProducts = res.data.storeitems.filter(product => product.title&&product.title.toUpperCase().includes("CHRISTMAS")||product.category==='gifts').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    const usedProducts = res.data.storeitems.filter(product => product.newused==='used').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    const featuredProducts = res.data.storeitems.filter(product => (product.category&&product.category.toUpperCase()!=='STRINGS'&&(product.subcategories.includes("Featured")||product.category.toUpperCase()==='GIFTS'||product.newused==='used'))).sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 
    filteredProducts.sort((a,b) => (a.subcategory > b.subcategory) ? 1 : ((b.subcategory < a.subcategory) ? -1 : 0)  || (a.subsubcategory > b.subsubcategory) ? 1 : ((b.subsubcategory > a.subsubcategory) ? -1 : 0)  || a.order - b.order);   
    return {
        filteredProducts,
        usedProducts,
        featuredProducts,
        strings: res.data.storeitems.filter(product => product.title&&product.title.toUpperCase().startsWith("3RD OCTAVE C")),
        music: res.data.storeitems.filter(product => product.category==="music")
    };
}
export default OnlineStore;
