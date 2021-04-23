// packages
import { useEffect, useState, useReducer } from 'react';
import InfiniteScrollLoading from "react-infinite-scroll-loading";
import uuid from 'react-uuid';
// components
import StoreProduct from './StoreProduct';
import StoreProductModal from './StoreProductModal';
import StoreProductSearch from './StoreProductSearch';
import StoreProductSearchStrings from './StoreProductSearchStrings';
import ProductScroll from './ProductScroll';
import StoreResults from './StoreResults';
// other internal
import GlobalStoreSearchCss from '../../styles/GlobalStoreSearch.css';
import StoreProductSearchCss from '../../styles/StoreProductSearch.css';
import StoreProductContainerCss from '../../styles/StoreProductContainer.css';
import { resultInfoReducer } from '../../../main/reducers/reducers';
import { RESULTS_INITIAL_STATE, STORE_INITIAL_STATE } from '../../../main/constants/constants';
import { getStoreSearchInfo, searchBar } from '../../utils/searchProductsHelpers';
import FastNEasyStringForm from './FastNEasyStringForm';

function GlobalStoreSearch(props) {
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [ allState, setAllState ] = useState(STORE_INITIAL_STATE);
    const [ typeOfSearch, setTypeOfSearch ] = useState();
    const [ clearMenus, setClearMenus ] = useState(false);
    const [ octavesSearch, setOctavesSearch ] = useState();
    const [ notesSearch, setNotesSearch ] = useState();
    const [ brandsSearch, setBrandsSearch ] = useState();
    const [ makesmodelsSearch, setMakesmodelsSearch ] = useState();
    const [ searchResults, setSearchResults ] = useState();
    const [ searchResultsText, setSearchResultsText ] = useState('entry'); // entry, found, notfound, nosearch
    const [ openStoreDetail, setopenStoreDetail ] = useState(false);
    const [ detailProduct, setDetailProduct ] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [resetPage, setResetPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idx, setIdx] = useState(0);
    const [screenWidth, setScreenWidth] = useState();
 
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleResults(msg) {
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
        document.querySelector('#SP-loadingLogin').style.display = "block";
        dispatchResultInfo({type: 'OK'});
    }
    function loginGuest(evt) { 
        resetResults();
    }

    function handleChange(type, menu, value1, value2, value3, value4) {
        console.log('handleChange', type, menu, value1, value2, value3, value4)
        // update menu text -- not for search term
        if (type==='music') setAllState({...allState, soloensemble: value1, level: value2, publicationtype: value3 });
        if (type==='strings') setAllState({...allState, octaves: value1, notes: value2, brands: value3, makesmodels: value4 });
        // get search items
        let category = document.querySelector('#category').value;
        let searchTerm = document.querySelector('#searchTerm').value;
        let newused = document.querySelector('#newused').value;
        setClearMenus(false);
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
        if (menu==='octaves'||menu==='notes'||menu==='brands'||menu==='makesmodels') {
            category = "Strings";
            document.querySelector('#category').value='Strings';
            type = 'strings'
        }
        setAllState({...allState, category: category});

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
                    if (String(product.level).toUpperCase().startsWith('BEGIN')&&level.toUpperCase().startsWith("BEGIN")) {
                        levelProductList.push(product);
                    } else {
                        if (String(product.level).toUpperCase()===level.toUpperCase()) levelProductList.push(product);
                    }    
                });
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
            
        } else if (category.toUpperCase()==='STRINGS') {
            if (!value1||value1===undefined) value1="All Octaves";
            if (!value2||value2===undefined) value2="All Notes";
            if (!value3||value3===undefined) value3="All Brands";
            if (!value4||value4===undefined) value4="All Makes/Models";
            const octave = menu==='octaves'?value1:allState.octaves;
            const note = menu==='notes'?value2:allState.notes;
            const brand = menu==='brands'?value3:allState.brands;
            let makesmodels = menu==='makesmodels'?value4:allState.makesmodels;
            if (makesmodels.toUpperCase().startsWith('ALL')&&makesmodels.toUpperCase()!=="ALL MAKES/MODELS") makesmodels=makesmodels.substr(4);
            // initialize variables
            let octavesProductList=[];
            let notesProductList=[];
            let brandsProductList=[];
            let makesmodelsProductList=[];
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

            // check brands
            if (brand&&brand!==undefined&&brand.toUpperCase()!=='ALL BRANDS') {
                notesProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(brand.toUpperCase())) brandsProductList.push(product);
                })
            } else {
                brandsProductList=[...notesProductList];
            }

            finalProductList=[...brandsProductList];
            // check string makesmodels
            if (makesmodels&&makesmodels!==undefined&&makesmodels.toUpperCase()!=="ALL MAKES/MODELS") {
                brandsProductList.map(product=> {
                    if (makesmodels.toUpperCase()==='NEW' || makesmodels.toUpperCase()==='USED') {
                        if (product.newused.toUpperCase()==='NEW'&&makesmodels.toUpperCase()==='NEW') makesmodelsProductList.push(product); 
                        if (product.newused.toUpperCase()==='USED'&&makesmodels.toUpperCase()==='USED') makesmodelsProductList.push(product); 
                    }
                    else if (String(product.title).toUpperCase().includes(makesmodels.toUpperCase())) {
                        makesmodelsProductList.push(product);
                    } else if (product.subcategories) {
                        product.subcategories.map(subcategory=>{
                            if (subcategory.toUpperCase()===makesmodels.toUpperCase()) makesmodelsProductList.push(product);
                        });
                    }
                }); 
            } else {
                makesmodelsProductList=[...brandsProductList];
            }
            // console.log('dusty', makesmodelsProductList.length)
            finalProductList=[...makesmodelsProductList];
        } else {
            finalProductList=[...newusedProductList]
        }
        preSearchProductList = [...finalProductList]
        // search term
        if (document.querySelector('#searchTerm').value) searchTerm = document.querySelector('#searchTerm').value;
        if(searchTerm) {
            searchProductList = searchBar(preSearchProductList, searchTerm)
        } else {
            searchProductList=[...preSearchProductList]
        }
        finalProductList=[...searchProductList];
        // console.log('final', finalProductList.length)
        finalProductList.length<1?setSearchResultsText('notfound'):setSearchResultsText('found');  
        setTypeOfSearch(type);
        setSearchResults(finalProductList)
    }
    
    function handleClear() {
        document.querySelector('#category').value='All';
        document.querySelector('#searchTerm').value='';
        setAllState(STORE_INITIAL_STATE);
        setSearchResults(props.filteredProducts);
        setSearchResultsText('entry');
        if (document.querySelector('#clearSearch')) document.querySelector('#clearSearch').style.display='none';
    }
    function handleopenStoreDetail(product) {
        setopenStoreDetail(true);
        setDetailProduct(product);
    }
    function handleCloseDetail() {
        setDetailProduct([]);
        setopenStoreDetail(false); 
    }
    const loadMore = page => {  
        setHasMore(true);
        if (idx+30 > searchResults.length) {
            setHasMore(false);  
        } else {
            setIdx(idx+30);
        }
      };
    
    useEffect(()=>{
            setScreenWidth(window.innerWidth);
    })
    
    return (
        <>
            <StoreResults 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
                idprefix={`SP`}
                zipMsg='Only 1 in stock. Item already in cart.'
            />
            <img id='spinner' style={{
                    display: 'none', 
                    position: 'fixed', 
                    top: '25%', 
                    left: '50%', 
                    transform: 'translate(-50%,-50%)',
                    zIndex: '9000',
                    height: '75px'
                }} 
                src='/img/spinner.gif' 
                alt='spinner' 
            />
            <div className='storeSearchLine' >
                {screenWidth>750
                ?
                <>
                
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
                    <span>&#711;</span>
                </div>
                <h3 className='searchHelperText'>and / or search term</h3>
                <div className="searchTextImg">
                    <form style={{display: 'flex'}}>
                        <input type="text" style={{marginBottom: '0'}} id="searchTerm" placeholder="Search" /> 
                        <button id="searchMagnify" onClick={(e)=>{e.preventDefault();handleChange()}}>
                            <img src='/img/searchicon.png' alt='search icon' />
                        </button>
                    </form> 
                </div>
                <div className='selectContainer'>
                    <select onChange={()=>handleChange('','newused')} id='newused' style={{width: '25%', minWidth: '95px', fontSize: '14px', padding: '13.4px 7px'}}>
                        <option value='New/Used' name='All newused'>New/Used</option>
                        <option value='New' name='New'>New Only</option>
                        <option value='Used' name='Used'>Used Only</option>
                    </select>
                    <span>&#711;</span>
                </div>
                </>
                :
                <>
                <h3 className='searchHelperText'>Search by category</h3>
                <div style={{display: 'flex', margin:'auto'}}>
                <div className='selectContainer'>    
                    <select onChange={()=>handleChange('','category')} id='category' style={{WebkitAppearance: 'none'}}>
                        <option name='All'>All</option>
                        <option name='Strings'>Strings</option>
                        <option name='Music'>Music</option>
                        <option name='Accessories'>Accessories</option>
                        <option name='Books'>Books</option>
                        <option name='Gifts'>Gifts</option>
                        <option name='CDs'>CDs</option>
                        <option name='Digital Downloads'>Digital Downloads</option>
                    </select>
                    <span>&#711;</span>
                </div>
                <div className='selectContainer'> 
                    <select onChange={()=>handleChange('','newused')} id='newused' style={{width: '25%', minWidth: '110px', fontSize: '14px', padding: '13.4px 7px', WebkitAppearance: 'none'}}>
                        <option value='New/Used' name='All newused'>New/Used</option>
                        <option value='New' name='New'>New Only</option>
                        <option value='Used' name='Used'>Used Only</option>
                    </select>
                    <span>&#711;</span>
                </div>
                </div>
                <h3 className='searchHelperText'>and / or search term</h3>
                <div className="searchTextImg">
                    <form style={{display: 'flex'}}>
                        <input type="text" style={{marginBottom: '0'}} id="searchTerm" placeholder="Search" /> 
                        <button id="searchMagnify" onClick={(e)=>{e.preventDefault();handleChange()}}>
                            <img src='/img/searchicon.png' alt='search icon' />
                        </button>
                    </form> 
                </div>
                </>
                }
            </div>
            <StoreProductSearch 
                clearMenus={clearMenus} 
                setTypeOfSearch={setTypeOfSearch} 
                handleClear={handleClear} 
                handleChange={handleChange}
                allState={allState}
                setAllState={setAllState} 
            />
            <div onClick={()=>document.querySelector('#spinner').style.display='block'} style={{width: 'fit-content', margin: 'auto', marginTop: '30px', marginBottom: '-20px', zIndex: '2000'}}>
                <FastNEasyStringForm />
            </div>
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
                setMakesmodelsSearch={setMakesmodelsSearch}
            />
            {searchResults&&searchResults.length>0&&
            <>
            <div className="storeproductContainer">
                <div>
                    <div className='searchInfo clearAll' id='clearSearch'>
                        <div className='searchInfoWrapper'>
                            <h3>{getStoreSearchInfo(allState,typeOfSearch)}</h3>
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
                        handleResults={handleResults}
                        />
                    )}
                    {isLoading && <div>Loading...</div>}
                </InfiniteScrollLoading>
                {openStoreDetail
                    &&<StoreProductModal 
                        product={detailProduct} 
                        handleCloseDetail={handleCloseDetail} 
                        handleResults={handleResults}
                />}
            </div>
            </>
            }
            {searchResultsText==='notfound'&&
                <div className='storeselected clearAll' id='clearSearch' style={{display:'flex', paddingTop: '40px'}}>
                    <h3>No items match your search.</h3>
                    <div onClick={handleClear} className='clearAll clearSearch'>
                        <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                        <p style={{whiteSpace: 'nowrap'}}>Clear All</p> 
                    </div>
                </div>
            }
            {searchResultsText==='entry'&&
            <>
                <ProductScroll filteredproductscontainer={props.featuredProducts} handleResults={handleResults} title="Browse Featured Items"/>
                <ProductScroll filteredproductscontainer={props.strings} handleStringsChange={handleChange} handleResults={handleResults} title="Browse String Brands"/>
                <ProductScroll filteredproductscontainer={props.music} handleResults={handleResults} title="Browse Music Titles"/>
            </>
            }
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
            <StoreProductContainerCss />
        </>
    )
}

export default GlobalStoreSearch;