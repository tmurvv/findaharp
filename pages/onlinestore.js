// packages
import { useEffect, useState } from 'react';
import axios from 'axios';
import lunr from "lunr";

// internal
import PageTitle from '../src/main/components/main/PageTitle';
import CategoryMenu from '../src/store/components/menus/CategoryMenu';
import StoreProductModal from '../src/store/components/main/StoreProductModal';
import GlobalStoreSearch from '../src/store/components/main/GlobalStoreSearch';
import SearchBar from '../src/store/components/main/SearchBar';
import OnlineStoreCss from '../src/store/styles/OnlineStore.css';
import { ABBR } from '../src/store/constants/Abbreviations';

const OnlineStore = (props) => {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ subMenuOpen, setSubMenuOpen ] = useState();
    const [ openStoreDetail, setopenStoreDetail ] = useState(false);
    const [ detailProduct2, setDetailProduct2 ] = useState();
    const [ searchResultsText, setSearchResultsText ] = useState('entry'); // entry, found, notfound, nosearch
    const [catBreadCrumb, setCatBreadCrumb ] = useState('Categories  ');
    
    function findCatAbbr(fullCat) {
        console.log(fullCat);
        console.log(ABBR.length);
        console.log(ABBR[0][0]);
        console.log(fullCat);
        let replace;
        ABBR.forEach(element => {
            if (element[0]===fullCat) {console.log('FOUND IT', element[1]);replace=element[1];}
        });
        return replace;
    }
    function handleCatChange(searchCategory, searchSubCategory, searchItem) {

        // console.log('CAT', searchCategory);
        // console.log('SubCAT', searchSubCategory);
        // console.log('item', searchItem);
        console.log('product', props.filteredProducts[500])
        
        // console.log(String(searchCategory).toUpperCase());
        // console.log('inif')
            if (searchItem.toUpperCase()==='GIFT CERTIFICATES') {
                alert('Please email orders@findaharp.com to purchase a gift certificate.');
                return;
            }
        const stringsOnly = props.filteredProducts.filter(res=>String(res.category).toUpperCase()==='STRINGS');
        if (String(searchCategory).toUpperCase()==='STRINGS BY HARP BUILDER') {
            
            const searchTerm = searchItem;
            console.log('in', searchTerm, stringsOnly.length)

            if(searchTerm) {
                // searchProductList = searchSearchBar(preSearchProductList, searchTerm, setMusicSearch, setStringSearch)

                const returnArray = [];
            
                // create index on filteredProducts for search engine
                var idx = lunr(function () {
                    this.ref('title');
                    this.field('title')
                    this.field('descriptiontext')
                    this.field('description')
                    this.field('artist_last');
                    this.field('artist_first');
                    this.field('subcategory');
                    this.field('subsubcategory');
                    this.field('category')
                    stringsOnly.forEach(function (doc) { 
                        // clean up data for search engine
                        doc.artist_first=String(doc.artist_first).replace(/\//g,'-') 
                        doc.artist_last=String(doc.artist_last).replace(/\//g,'-') 
                        doc.title=String(doc.title).replace(/\//g,'-')
                        doc.descriptiontext=String(doc.descriptiontext).replace(/\//g,'-')          
                        this.add(doc)
                    }, this)
                });
                   
                // clean up query and search
                const results = idx.search(String(searchTerm).replace(/\//g,'-'));
                
                // map found item ids to items list
                props.filteredProducts.map(product=>{
                    results.map(result=> {
                        if (result.ref===product.title) {
                            returnArray.push({...product, score: result.score});
                        };
                    });
                });
                
                // sort and return
                setMenuOpen(false);
                setSubMenuOpen(false);
                setSearchResults(returnArray.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0)));
                setSearchResultsText('');
                setCatBreadCrumb(findCatAbbr(searchItem));
                return;
            }
        }
        String(searchCategory).toUpperCase().startsWith('STRINGS')?searchCategory='strings':'';
        setSearchResults(props.filteredProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));
        setSearchResultsText('');
        
        setCatBreadCrumb(findCatAbbr(searchItem));
        setMenuOpen(false);
        setSubMenuOpen(false);
    }
    function handleCloseDetail() {
        setDetailProduct2([]);
        setopenStoreDetail(false); 
    }
    function handleResults(msg) {
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
        document.querySelector('#SP-loadingLogin').style.display = "block";
        dispatchResultInfo({type: 'OK'});
    }
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    // sort products
    useEffect(()=>{
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    // reset variables
    useEffect(()=>{
        setSearchResultsText('entry');
        setMenuOpen(false);
        setSubMenuOpen(false);
        setCatBreadCrumb('Categories');
    },[]);
    return (
        <> 
            {detailProduct2&&detailProduct2.title?
                    <>
                    <StoreProductModal 
                        product={detailProduct2} 
                        handleCloseDetail={handleCloseDetail}
                        handleResults={handleResults}
                /></>:''
                } 
            {/* <div style={{height: '300px', marginTop: '70px'}}>
                <PageTitle maintitle='Store not installed on demo site' subtitle="This is the builder showcase demo site. Please go to findaharp.com to view store." />
            </div> */}
            SearchResults: {searchResults&&searchResults.length}
            {/* <CategoryMenu 
                subMenuOpen={subMenuOpen} 
                setSubMenuOpen={setSubMenuOpen} 
                menuOpen={menuOpen} 
                setMenuOpen={setMenuOpen}
                handleCatChange={handleCatChange}
                setDetailProduct2={setDetailProduct2}
            /> */}
            <div className='searchBarMainCont'>
                <SearchBar 
                    subMenuOpen={subMenuOpen} 
                    setSubMenuOpen={setSubMenuOpen} 
                    menuOpen={menuOpen} 
                    setMenuOpen={setMenuOpen}
                    handleCatChange={handleCatChange}
                    setDetailProduct2={setDetailProduct2}
                    catBreadCrumb={catBreadCrumb}
                />
            </div>
            
            <div style={menuOpen?{background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4))'}:{}} className='storeIndex'>
                <PageTitle maintitle="Music, Strings and Things" subtitle='Featuring products sold by our store partners' /> 
                <GlobalStoreSearch 
                    usedProducts={props.usedProducts}
                    filteredProducts={searchResults} 
                    featuredProducts={props.featuredProducts} 
                    music={props.music} 
                    strings={props.strings} 
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchResultsText={searchResultsText}
                    setSearchResultsText={setSearchResultsText}
                    menuOpen={menuOpen}
                />     
            </div>
            <OnlineStoreCss />
            <style jsx>{`
                * {
                    box-sizing: border-box;
                }
                .searchBarMainCont {
                    position: absolute;
                    top: -160px;
                    margin: 50%;
                    transform: translate(-50%, 0);
                    z-index: 9995;
                    display: flex;
                    justify-content: center;
                }
            `}</style>
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
