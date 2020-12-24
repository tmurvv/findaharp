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
    notes: 'All Notes',
    brands: 'All Brands',
    types: 'All Types',
    searchInfo: ''
}

function GlobalStoreSearch(props) {
    const [ allState, setAllState ] = useState(initialStateText);
    const [ typeOfSearch, setTypeOfSearch ] = useState();
    const [ clearMenus, setClearMenus ] = useState(false);
    const [ octavesSearch, setOctavesSearch ] = useState();
    const [ notesSearch, setNotesSearch ] = useState();
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
    function handleChange(type, menu, value1, value2, value3, value4) {
        console.log('allState', allState)
        // update menu text -- not for search term
        if (type==='music') setAllState({...allState, soloensemble: value1, level: value2, publicationtype: value3 });
        if (type==='strings') setAllState({...allState, octaves: value1, notes: value2, brands: value3, types: value4 });
        // get search items
        let category = document.querySelector('#category').value;
        let searchTerm = document.querySelector('#searchTerm').value;
        let newused = document.querySelector('#newused').value;
        console.log('params', type, menu, value1, value2, value3, value4)
        setClearMenus(false);
        setResetSearch(false);
        setIdx(0);
        setHasMore(true);
        let productListCopy=[...props.filteredProducts];
        let preSearchProductList=[]
        let finalProductList=[];
        let categoryProductList=[];
        let newusedProductList=[];
        let searchProductList=[];

        if (category&&category.toUpperCase()!=='ALL') {
            if (category.toUpperCase()==="DIGITAL DOWNLOADS") {
                // document.querySelector('#category').value= 'All';
                return alert("Digital Downloads under construction. Expected by February 2021."); // NOT YET IMPLEMENTED
            }
            if (category.toUpperCase()==="STRINGS") type='strings';
            if (category.toUpperCase()==="MUSIC") type='music';
        } 
        if (menu==='soloensemble'||menu==='level'||menu==='publicationtype') {
            category = "Music";
            document.querySelector('#category').value='Music';
            type = 'music';
        } 
        if (menu==='octaves'||menu==='notes'||menu==='brands'||menu==='types') {
            category = "Strings";
            document.querySelector('#category').value='Strings';
            type = 'strings'
        }
        setAllState({...allState, category: category});

        // if (resetSearch) {
        //     category="All";
        //     setAllState({...allState, category: "All"});
        //     return productListCopy;
        // }
        if(category&&category.toUpperCase()!=="ALL") {
            productListCopy.map(product=>{
                if (String(product.category).toUpperCase()===category.toUpperCase()) {
                    categoryProductList.push(product);
                } 
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===category.toUpperCase()) categoryProductList.push(product);
                    })
                }
            });
        } else {
            categoryProductList = [...productListCopy]
        }
        // newused
        if(newused!=='New/Used') {
            categoryProductList.map(product=>{
                if (newused.toUpperCase().startsWith(String(product.newused).toUpperCase())) {
                    newusedProductList.push(product);
                }
            });
        } else {
            newusedProductList = [...categoryProductList]
        }
        // finalProductList=[...categoryProductList]
        if (category.toUpperCase()==='MUSIC') {
            if (!value1||value1===undefined) value1="All Lever/Pedal/Ens";
            if (!value2||value2===undefined) value2="All Levels";
            if (!value3||value3===undefined) value3="All Publication Types";
            const soloensemble = menu==='soloensemble'?value1:allState.soloensemble;
            const level = menu==='level'?value2:allState.level;
            const publicationType = menu==='publicationtype'?value3:allState.publicationtype;
            // initialize variables
            let levelProductList=[];
            let soloensembleProductList=[];
            let publicationProductList=[];
            
            // add clear searches button
            if (document&&document.querySelector('#clearSearch')) {document.querySelector('#clearSearch').style.display="flex"}
            
            // check level
            if (level&&level.toUpperCase()!=='ALL LEVELS') {  
                newusedProductList.map(product=> {
                    if (String(product.level).toUpperCase()===level.toUpperCase()) levelProductList.push(product);
                })
            } else {
                levelProductList=[...newusedProductList];
            }

            finalProductList=[...levelProductList];

            // check soloensemble
            if (soloensemble&&soloensemble.toUpperCase()!=="ALL LEVER/PEDAL/ENS") {
                levelProductList.map(product=> {
                    if (soloensemble.toUpperCase()==="LEVER HARP") {
                        if (product.harptype) {
                            if (String(product.harptype).toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                        }
                    } else if (String(soloensemble).toUpperCase()==="PEDAL HARP") {
                        if (product.harptype) {
                            if (String(product.harptype).toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                        }
                    } else if (product.subcategories) {
                        product.subcategories.map(subcategory=>{
                            if (subcategory.toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                        })
                    }
                });
            } else {
                soloensembleProductList=[...levelProductList];
            }
            finalProductList=[...soloensembleProductList];
            console.log('soloens', soloensembleProductList.length)
            // check publication
            if (publicationType&&publicationType.toUpperCase()!=="ALL PUBLICATION TYPES") {
            soloensembleProductList.map(product=> {
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===publicationType.toUpperCase()) publicationProductList.push(product);
                    })
                }
            }); 
            } else {
                publicationProductList=[...soloensembleProductList];
            }
            finalProductList=[...publicationProductList];
            console.log('pubs', publicationProductList.length)
            
        } else if (category.toUpperCase()==='STRINGS') {
            if (!value1||value1===undefined) value1="All Octaves";
            if (!value2||value2===undefined) value2="All Notes";
            if (!value3||value3===undefined) value3="All Brands";
            if (!value4||value4===undefined) value4="All Types";
            const octave = menu==='octaves'?value1:allState.octaves;
            const note = menu==='notes'?value2:allState.notes;
            const brand = menu==='brands'?value3:allState.brands;
            const type = menu==='types'?value4:allState.types;
            // initialize variables
            let octavesProductList=[];
            let notesProductList=[];
            let brandsProductList=[];
            let typesProductList=[];
            // add clear searches button
            if (document&&document.querySelector('#clearSearch')) {document.querySelector('#clearSearch').style.display="flex"}
            // check octaves
            if (octave&&octave.toUpperCase()!=='ALL OCTAVES'&&octave!==undefined) {
                newusedProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(octave.toUpperCase())) octavesProductList.push(product);
                    product.subcategories.map(cat=> {
                        cat.toUpperCase()===octave.toUpperCase()&&octavesProductList.push(product);
                        if(cat.toUpperCase()==='WIRE') {
                            if(product.title.toUpperCase().includes('5TH OCTAVE')&&octave.toUpperCase().includes('5TH OCTAVE')) octavesProductList.push(product);
                            if(product.title.toUpperCase().includes('6TH OCTAVE')&&octave.toUpperCase().includes('6TH OCTAVE')) octavesProductList.push(product);
                            if(product.title.toUpperCase().includes('7TH OCTAVE')&&octave.toUpperCase().includes('7TH OCTAVE')) octavesProductList.push(product);
                        }
                    });
                })
            } else {
                octavesProductList=[...newusedProductList];
            }
            finalProductList=[...octavesProductList];
            // check notes
            if (note&&note.toUpperCase()!=='ALL NOTES'&&note!==undefined) {
                octavesProductList.map(product=> {
                    // Note Yet Implement (search for notes by number)
                    if (note==='E'&&Number.isInteger((product.order+6)/7)) notesProductList.push(product);
                    if (note==='D'&&Number.isInteger((product.order+5)/7)) notesProductList.push(product);
                    if (note==='C'&&Number.isInteger((product.order+4)/7)) notesProductList.push(product);
                    if (note==='B'&&Number.isInteger((product.order+3)/7)) notesProductList.push(product);
                    if (note==='A'&&Number.isInteger((product.order+2)/7)) notesProductList.push(product);
                    if (note==='G'&&Number.isInteger((product.order+1)/7)) notesProductList.push(product);
                    if (note==='F'&&Number.isInteger((product.order+0)/7)) notesProductList.push(product);
                    product.subcategories.map(cat=>cat.toUpperCase()===note.toUpperCase()&&notesProductList.push(product));
                })
            } else {
                notesProductList=[...octavesProductList];
            }
            finalProductList=[...notesProductList];
            console.log('notes', notesProductList.length)

            // check brands
            if (brand&&brand!==undefined&&brand.toUpperCase()!=='ALL BRANDS') {
                notesProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(brand.toUpperCase())) brandsProductList.push(product);
                })
            } else {
                brandsProductList=[...notesProductList];
            }

            finalProductList=[...brandsProductList];
            console.log('brands', brandsProductList.length)
            // check string types
            if (type&&type!==undefined&&type.toUpperCase()!=="ALL TYPES") {
                brandsProductList.map(product=> {
                    if (type.toUpperCase()==='NEW' || type.toUpperCase()==='USED') {
                        if (product.newused.toUpperCase()==='NEW'&&type.toUpperCase()==='NEW') typesProductList.push(product); 
                        if (product.newused.toUpperCase()==='USED'&&type.toUpperCase()==='USED') typesProductList.push(product); 
                    }
                    else if (String(product.title).toUpperCase().includes(type.toUpperCase())) {
                        typesProductList.push(product);
                    } else if (product.subcategories) {
                        product.subcategories.map(subcategory=>{
                            if (subcategory.toUpperCase()===type.toUpperCase()) typesProductList.push(product);
                        });
                    }
                }); 
            } else {
                typesProductList=[...brandsProductList];
            }
            finalProductList=[...typesProductList];
        } else {
            finalProductList=[...newusedProductList]
        }
        preSearchProductList = [...finalProductList]
        // search term
        if (document.querySelector('#searchTerm').value) searchTerm = document.querySelector('#searchTerm').value;
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
        
        finalProductList.length<1?setSearchResultsText('notfound'):setSearchResultsText('found');  
        setTypeOfSearch(type);

        setSearchResults(finalProductList)
    }
    
    function handleClear() {
        document.querySelector('#category').value='All';
        document.querySelector('#searchTerm').value='';
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
                    <select onChange={()=>handleChange('','category')} id='category'>
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
                    <input type="text" id="searchTerm" style={{width: '100%'}} onChange={handleChange} placeholder="Search" />
                    <select onChange={()=>handleChange('','newused')} id='newused' style={{width: '25%', minWidth: '95px', fontSize: '12px', padding: '13.4px 7px'}}>
                        <option value='New/Used' name='All newused'>New/Used</option>
                        <option value='New' name='New'>New Only</option>
                        <option value='Used' name='Used'>Used Only</option>
                    </select>
                    <div style={{flex: '2'}}>
                        <img style={{padding: '5px', backgroundColor: '#f9bf1e', height: '43px'}} src='/img/searchicon.png' alt='search icon' />
                    </div>
                </div>
                <div className='selectContainer'>    
                    
                    {/* <span style={{fontSize: '36px'}}>&#711;</span> */}
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
                setNotesSearch={setNotesSearch} 
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
                <ProductScroll handleStringsChange={handleChange} filteredproductscontainer={props.strings} title="Browse String Brands"/>
                <ProductScroll filteredproductscontainer={props.music} title="Browse Music Titles"/>
            </>
            }
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
            <StoreProductContainerCss />
        </>
    )
}

export default GlobalStoreSearch;
