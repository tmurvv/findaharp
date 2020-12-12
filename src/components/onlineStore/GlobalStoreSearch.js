import { useEffect, useState, useRef } from 'react';
import InfiniteScrollLoading from "react-infinite-scroll-loading";
import uuid from 'react-uuid';

import StoreProduct from '../../components/onlineStore/StoreProduct';
import StoreProductModal from '../../components/onlineStore/StoreProductModal';
import StoreProductSearch from '../../components/onlineStore/StoreProductSearch';
import StoreProductSearchStrings from '../../components/onlineStore/StoreProductSearchStrings';
import ProductScroll from '../../components/onlineStore/ProductScroll';
import StoreProductContainer from '../../components/onlineStore/StoreProductContainer';
import InfiniteProducts from '../../components/onlineStore/InfiniteProducts';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import GlobalStoreSearchCss from '../../styles/onlinestore/GlobalStoreSearch.css';
import StoreProductSearchCss from '../../styles/onlinestore/StoreProductSearch.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import { FINDAHARP_PRODUCTS } from '../../constants/FindaharpProducts'
import {
    getFilteredProducts,
    getSearchInfo,
    triggerLazy
} from '../../utils/helpers';
import { 
    selectRegion,
    tax
} from '../../utils/checkoutHelpers';
import { 
    findNested,
    getStoreSearchInfo
} from '../../utils/searchProductsHelpers';
import { PublicTwoTone } from '@material-ui/icons';
import StoreProductContainerCss from '../../styles/onlinestore/StoreProductContainer.css';

const initialStateText = {
    selectionType: '',
    artist: 'All Artists',
    title: 'All Titles',
    category: 'All Categories',
    soloensemble: 'All Lever/Pedal/Ens',
    level: 'All Levels',
    publicationtype: 'All Publication Types',
    octaves: 'All Octaves',
    brands: 'All Brands',
    types: 'All Types',
    searchInfo: ''
}

function GlobalStoreSearch(props) {
    const [ allState, setAllState ] = useState(initialStateText);
    const [ typeOfSearch, setTypeOfSearch ] = useState();
    const [ clearMenus, setClearMenus ] = useState(false);
    const [ octavesSearch, setOctavesSearch ] = useState();
    const [ brandsSearch, setBrandsSearch ] = useState();
    const [ typesSearch, setTypesSearch ] = useState();
    const [ searchResults, setSearchResults ] = useState();
    const [ resetSearch, setResetSearch ] = useState(true);
    const [ searchResultsText, setSearchResultsText ] = useState('entry'); // entry, found, notfound, nosearch
    const [ openStoreDetail, setopenStoreDetail ] = useState(false);
    const [ detailProduct, setDetailProduct ] = useState([]);
    
    const repoArray = [...props.filteredProducts];  
    const [hasMore, setHasMore] = useState(false);
    const [resetPage, setResetPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idx, setIdx] = useState(0);
 
    // filter by category
    function handleChange(type, menu, value1, value2, value3) {
        setClearMenus(false);
        setResetSearch(false);
        setIdx(0);
        setHasMore(true);
        let productListCopy=[...props.filteredProducts];
        let preSearchProductList=[]
        let finalProductList=[];
        let categoryProductList=[];
        let searchProductList=[];
        let categoryFilter;
        let searchTerm;

        if (document.querySelector('#categoryfilter')&&document.querySelector('#categoryfilter').value.toUpperCase()!=='ALL') {
            categoryFilter = document.querySelector('#categoryfilter').value;
            if (categoryFilter.toUpperCase()==="STRINGS") type='strings';
            if (categoryFilter.toUpperCase()==="MUSIC") type='music';
        } else if (type==='category') {
            type='';
        }
        if (menu==='soloensemble'||menu==='level'||menu==='publicationtype') {
            categoryFilter = "Music";
            document.querySelector('#categoryfilter').value='Music';
            type = 'music';
        } 
        if (menu==='octaves'||menu==='brands'||menu==='types') {
            categoryFilter = "Strings";
            document.querySelector('#categoryfilter').value='Strings';
            type = 'strings'
        }

        setAllState({...allState, category: categoryFilter});

        // if (resetSearch) {
        //     categoryFilter="All";
        //     setAllState({...allState, category: "All"});
        //     return productListCopy;
        // }
        if(categoryFilter&&categoryFilter.toUpperCase()!=="ALL") {
            productListCopy.map(product=>{
                if (String(product.category).toUpperCase()===categoryFilter.toUpperCase()) {
                    categoryProductList.push(product);
                } 
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===categoryFilter.toUpperCase()) categoryProductList.push(product);
                    })
                }
            });
        } else {
            categoryProductList = [...productListCopy]
        }
        // finalProductList=[...categoryProductList]
        if (type==='music') {
            if (!value1||value1===undefined) value1="All Lever/Pedal/Ens";
            if (!value2||value2===undefined) value2="All Levels";
            if (!value3||value3===undefined) value3="All Publication Types";
            // initialize variables
            let productListCopy = [...props.filteredProducts];
            let levelProductList=[];
            let soloensembleProductList=[];
            let publicationProductList=[];
            let searchProductList=[];
            let searchTerm;
            
            // add clear searches button
            if (document&&document.querySelector('#clearSearch')) {document.querySelector('#clearSearch').style.display="flex"}
            
            // check level
            if (value2&&value2.toUpperCase()!=='ALL LEVELS') {
                
                categoryProductList.map(product=> {
                    if (String(product.level).toUpperCase()===value2.toUpperCase()) levelProductList.push(product);
                })
            } else {
                levelProductList=[...categoryProductList];
            }

            finalProductList=[...levelProductList];

            // check soloensemble
            if (value1&&value1.toUpperCase()!=="ALL LEVER/PEDAL/ENS") {
                levelProductList.map(product=> {
                    if (value1.toUpperCase()==="LEVER HARP") {
                        if (product.harptype) {
                            if (String(product.harptype).toUpperCase()===value1.toUpperCase()) soloensembleProductList.push(product);
                        }
                    } else if (String(value1).toUpperCase()==="PEDAL HARP") {
                        if (product.harptype) {
                            if (String(product.harptype).toUpperCase()===value1.toUpperCase()) soloensembleProductList.push(product);
                        }
                    } else if (product.subcategories) {
                        product.subcategories.map(subcategory=>{
                            if (subcategory.toUpperCase()===value1.toUpperCase()) soloensembleProductList.push(product);
                        })
                    }
                });
            } else {
                soloensembleProductList=[...levelProductList];
            }
            finalProductList=[...soloensembleProductList];
        
            // check publication
            if (value3&&value3.toUpperCase()!=="ALL PUBLICATION TYPES") {
            soloensembleProductList.map(product=> {
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===value3.toUpperCase()) publicationProductList.push(product);
                    })
                }
            }); 
            } else {
                publicationProductList=[...soloensembleProductList];
            }
            finalProductList=[...publicationProductList];
            
        } else if (type==='strings') {
            if (!value1||value1===undefined) value1="All Octaves";
            if (!value2||value2===undefined) value2="All Brands";
            if (!value3||value3===undefined) value3="All Types";
            // initialize variables
            let productListCopy = [...props.filteredProducts];
            let octavesProductList=[];
            let brandsProductList=[];
            let typesProductList=[];
            let searchProductList=[];
            let searchTerm;
            
            // add clear searches button
            if (document&&document.querySelector('#clearSearch')) {document.querySelector('#clearSearch').style.display="flex"}
            // check octaves
            if (value1&&value1.toUpperCase()!=='ALL OCTAVES'&&value1!==undefined) {
                categoryProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(value1.toUpperCase())) octavesProductList.push(product);
                })
            } else {
                octavesProductList=[...categoryProductList];
            }
            finalProductList=[...octavesProductList];
            
            // check brands
            if (value2&&value2!==undefined&&value2.toUpperCase()!=='ALL BRANDS') {
                octavesProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(value2.toUpperCase())) brandsProductList.push(product);
                })
            } else {
                brandsProductList=[...octavesProductList];
            }

            finalProductList=[...brandsProductList];

            // check string types
            if (value3&&value3.toUpperCase()!=="ALL TYPES") {
                brandsProductList.map(product=> {
                    if (product.title.toUpperCase().includes(value3.toUpperCase())) {
                        typesProductList.push(product);
                    } else if (product.subcategories) {
                        product.subcategories.map(subcategory=>{
                            if (subcategory.toUpperCase()===value3.toUpperCase()) typesProductList.push(product);
                        });
                    }
                }); 
            } else {
                typesProductList=[...brandsProductList];
            }
            finalProductList=[...typesProductList];
        } else {
            finalProductList=[...categoryProductList]
        }
        preSearchProductList = [...finalProductList]
        // search term
        if (document.querySelector('#searchInput').value) searchTerm = document.querySelector('#searchInput').value;
        if(searchTerm) {
            preSearchProductList.map(product=> {
                const keyList = Object.keys(product);
                keyList.every(key=>{
                    if (findNested(product, key, searchTerm)) {searchProductList.push(product); return false;}
                    return true;
                })
            });
        } else {
            searchProductList=[...preSearchProductList]
        }
        finalProductList=[...searchProductList];
        // update menu text
        if (type==='music') setAllState({...allState, soloensemble: value1, level: value2, publicationtype: value3 });
        if (type==='strings') setAllState({...allState, octaves: value1, brands: value2, types: value3 });
        finalProductList.length<1?setSearchResultsText('notfound'):setSearchResultsText('found');  
        setTypeOfSearch(type);

        setSearchResults(finalProductList)
    }
    
    function handleClear() {
        document.querySelector('#categoryfilter').value='All';
        document.querySelector('#searchInput').value='';
        setAllState(initialStateText);
        setSearchResults(props.filteredProducts);
        setResetSearch(true);
        setSearchResultsText('entry');
        if (document.querySelector('#clearSearch')) document.querySelector('#clearSearch').style.display='none';
    }
    function handleopenStoreDetail(product) {
        setopenStoreDetail(true);
        // dispatch({type:'detail', product});
        setDetailProduct(product);
        // setOpacity(true); 
    }
    function handleCloseDetail() {
        // dispatch({type: 'initial'})
        // setOpacity(false);
        // if (openContact) handleOpenContact(evt, product);
        setDetailProduct([]);
        setopenStoreDetail(false);
    }
    const loadMore = page => {

        // alert('loadMore')
        setIsLoading(true);
        // axios
        //   .get(`${GITHUB_API}/search/repositories`, {
        //     params: { page, q: searchVal }
        //   })
        //   .then(res => {
            // setRepoList([...repoList, ...repoArray.slice(idx,idx+30)]);
            setHasMore(true);
            setIsLoading(false);
            if (idx+30 > searchResults.length) {
              setHasMore(false);  
            } else {
              setIdx(idx+30);
            }
          // });
      };

    useEffect(()=>{
        if(props.filteredProducts&&props.filteredProducts.length===0) {
            document.querySelector('#searchInput').focus();
            setSearchResults(props.filteredProducts);
        }
        // alert('useEffect')
        if (searchResults) {
            // setRepoList([...repoList, ...repoArray.slice(idx,idx+30)]);
            setHasMore(true);
            setIsLoading(false);
            if (props.filteredProducts.slice(0,idx+30).length > props.filteredProducts.length) {
              setHasMore(false);
            }
        }
    })
    
    return (
        <>
            <div className='storeSearchLine' >
            <h3 className='searchHelperText'>Search by category</h3>
                <div className='selectContainer'>    
                    <select onChange={()=>handleChange('category')} id='categoryfilter'>
                        <option name='All'>All</option>
                        <option name='Strings'>Strings</option>
                        <option name='Music'>Music</option>
                        <option name='Accessories'>Accessories</option>
                        <option name='Books'>Books</option>
                        <option name='Gifts'>Gifts</option>
                        <option name='CDs'>CDs</option>
                        <option name='Digital Downloads'>Digital Downloads</option>
                    </select>
                    {/* <span style={{fontSize: '36px'}}>&#711;</span> */}
                </div>
                <h3 className='searchHelperText'>and / or search term</h3>
            
                <div className="searchTextImg">
                    <input type="text" id="searchInput" onChange={handleChange} placeholder="Search" />
                    <div style={{flex: '2'}}>
                        <img style={{padding: '5px', backgroundColor: '#f9bf1e', height: '43px'}} src='/img/searchicon.png' alt='search icon' />
                    </div>
                </div>
            </div>
            <StoreProductSearch 
                clearMenus={clearMenus} 
                setTypeOfSearch={setTypeOfSearch} 
                handleClear={handleClear} 
                handleChange={handleChange}
                allState={allState}
                setAllState={setAllState} 
            />
            <StoreProductSearchStrings              
                clearMenus={clearMenus} 
                setTypeOfSearch={setTypeOfSearch} 
                handleClear={handleClear} 
                handleChange={handleChange} 
                allState={allState}
                setAllState={setAllState} 
                setOctavesSearch={setOctavesSearch} 
                setBrandsSearch={setBrandsSearch} 
                setTypesSearch={setTypesSearch}
            />
            {/* {searchResults&&<StoreProductContainer filteredproductscontainer={searchResults}/>} */}
            {searchResults&&searchResults.length>0&&
            <>
            <div className="storeproductContainer">
                <div>
                <div className='searchInfo clearAll' id='clearSearch'>
                    <div className='searchInfoWrapper'>
                        <h3>{getStoreSearchInfo(allState,typeOfSearch)}</h3>
                        {/* <h3>hear{getStoreSearchInfo(allState,typeOfSearch)!==''?getStoreSearchInfo(allState,typeOfSearch):"All Items"}</h3> */}
                        <div onClick={handleClear} className='clearAll clearSearch'>
                            <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                            <p style={{whiteSpace: 'nowrap'}}>Clear All</p> 
                        </div>
                    </div>
                </div>
                </div>
                
                <InfiniteScrollLoading
                    element="div"
                    pageStart={1}
                    hasMore={hasMore && !isLoading}
                    loadMore={loadMore}
                    resetPage={resetPage}
                >
                    {(searchResults.slice(0,idx+30)).map(product => <StoreProduct 
                        key={uuid()}
                        productdetail={product}
                        handleopenstoredetail={handleopenStoreDetail} 
                        handleclosedetail={handleCloseDetail}
                        />
                    )}
                    {isLoading && <div>Loading...</div>}
                </InfiniteScrollLoading>
                {openStoreDetail
                    &&<StoreProductModal 
                        product={detailProduct} 
                        handleCloseDetail={handleCloseDetail} 
                />}
            </div>
            </>
            }
            {searchResultsText==='notfound'&&
                <div>
                <div className='storeselected clearAll' id='clearSearch' style={{display:'flex', paddingTop: '40px'}}>
                    <h3>No items match your search.</h3>
                    <div onClick={handleClear} className='clearAll clearSearch'>
                        <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                        <p style={{whiteSpace: 'nowrap'}}>Clear All</p> 
                    </div>
                </div>
                </div>
            }
            {searchResultsText==='entry'&&
            <>
                <ProductScroll filteredproductscontainer={props.featuredProducts} title="Holiday Features and gifts"/>
                <ProductScroll filteredproductscontainer={props.music} title="Browse Music Titles"/>
                <ProductScroll handleStringsChange={handleChange} filteredproductscontainer={props.strings} title="Browse String Brands"/>
            </>
            }
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
            <StoreProductContainerCss />
        </>
    )
}

export default GlobalStoreSearch;
