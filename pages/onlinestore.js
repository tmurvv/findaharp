// packages
import { useEffect, useState } from 'react';
import axios from 'axios';
import lunr from "lunr";

// internal
import StoreProductModal from '../src/store/components/main/StoreProductModal';
import GlobalStoreSearch from '../src/store/components/main/GlobalStoreSearch';
import SearchBar from '../src/store/components/main/SearchBar';
import OnlineStoreCss from '../src/store/styles/OnlineStore.css';
import { ABBR } from '../src/store/constants/Abbreviations';
import { MENU_ABBR } from '../src/main/constants/constants';
import { getStoreSearchInfo,searchSearchBar } from '../src/store/utils/searchProductsHelpers';
import { STORE_INITIAL_STATE } from '../src/main/constants/constants';
import stringsOnly from '../src/store/constants/storeItemsListStrings.json';

const OnlineStore = (props) => {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ subMenuOpen, setSubMenuOpen ] = useState();
    const [ openStoreDetail, setopenStoreDetail ] = useState(false);
    const [ detailProduct2, setDetailProduct2 ] = useState();
    const [ searchResultsText, setSearchResultsText ] = useState('entry'); // entry, found, notfound, nosearch
    const [ catBreadCrumb, setCatBreadCrumb ] = useState('All Categories');
    const [ searchBreadCrumb, setSearchBreadCrumb ] = useState('searchBread');
    const [ ribbonmenuOpen, ribbonsetMenuOpen ] = useState(false);
    const [ ribbonsubMenuOpen, ribbonsetSubMenuOpen ] = useState();
    // from global
    const [ allState, setAllState ] = useState(STORE_INITIAL_STATE);
    const [ typeOfSearch, setTypeOfSearch ] = useState();
    const [ clearMenus, setClearMenus ] = useState(false);
    const [ musicSearch, setMusicSearch ] = useState();
    const [ stringSearch, setStringSearch ] = useState();
    const [idx, setIdx] = useState(0);
    const [hasMore, setHasMore] = useState(0);
    const [ anchor, setAnchor ] = useState([0,0]);
    const [ winWidth, setWinWidth ] = useState(4000);
    
    function findCatAbbr(fullCat) {
        let replace;
        ABBR.forEach(element => {
            if (element[0]===fullCat) {replace=element[1];}
        });
        return replace;
    }
    function handleCatChange(searchCategory, searchSubCategory, searchItem) {
        if (searchCategory.toUpperCase()==="MUSIC") {
            searchCategory='All Categories';
        } else {
            setMusicSearch(false);
        }
        let workingProducts = [...props.filteredProducts];
        
        document.querySelector('#searchTerm')?document.querySelector('#searchTerm').value='':'';
            if (searchItem.toUpperCase()==='GIFT CERTIFICATES') {
                alert('Please email orders@findaharp.com to purchase a gift certificate.');
                return;
            }
        const stringsOnly = props.filteredProducts.filter(res=>String(res.category).toUpperCase()==='STRINGS');
        if (String(searchCategory).toUpperCase()==='STRINGS BY TYPE') {
            setStringSearch(true);
            setAllState({...allState, octaves: 'All Octaves', notes: 'All Notes', brands: 'All Brands' })
        } else {
            setStringSearch(false);
        }
        if (String(searchCategory).toUpperCase()==='STRINGS BY HARP BUILDER') {
            setStringSearch(false);
            setAllState({...allState, octaves: 'All Octaves', notes: 'All Notes', brands: 'All Brands' })
            const searchTerm = searchItem;

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
                workingProducts.map(product=>{
                    results.map(result=> {
                        if (result.ref===product.title) {
                            returnArray.push({...product, score: result.score});
                        };
                    });
                });
                
                // sort and return
                setSearchResults(returnArray.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0)));             
            }
        } else {
            setSearchResults(workingProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&item.subsubcategory!==undefined&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));
        }
        setSearchResultsText('');
        setCatBreadCrumb(findCatAbbr(searchItem));
        setMenuOpen(false);
        setSubMenuOpen(false);
        getStoreSearchInfo({...allState, category: searchItem}, 'music');
        setAllState({...allState, category: searchItem, brands: 'All Brands', octaves: 'All Octaves'});
        setSearchBreadCrumb(searchItem);
        setTypeOfSearch(searchItem);
        handleChange('Cat', searchCategory, searchItem);
    }

    function handleChange(cat, type, menu, value1, value2, value3, value4) {
        console.log('topcat:', cat);
        console.log('toptype:', type);
        console.log('topmenu:', menu);
        // console.log('value1:', value1);
        // console.log('value2:', value2);
        // console.log('value3:', value3);
        const topMenu = menu;
        const topType = type;
        let category;
        menu === 'brands'?setCatBreadCrumb(value3):'';
        menu === 'brands'?category=value3:'';

        category===undefined&&cat==='Cat'&&menu!=='octaves'&&menu!=='brands'?category='Cat':'';
        let searchTerm = document.querySelector('#searchTerm')&&document.querySelector('#searchTerm').value;
        let newused = document.querySelector('#newused')&&document.querySelector('#newused').value;
        setClearMenus(false);
        setIdx(0);
        setHasMore(true);

        let productListCopy=[...props.filteredProducts];
        let preSearchProductList=[]
        let finalProductList=[];
        let categoryProductList = [];
        let newusedProductList=[];
        let searchProductList=[];
        // setAllState({...allState, category: type});

        if (musicSearch) {
            type='music';
            (!value2)||value2.startsWith('All')?value2=allState.level:'';
            value2==='clearone'?value2='All Levels':'';
        }
        if (stringSearch)  {
            (!value1)||(value1.startsWith('All')&&topMenu!=='octaves')?value1=allState.octaves:'';
            (!value2)||(value2.startsWith('All')&&topMenu!=='notes')?value2=allState.notes:'';
            (!value3)||(value2.startsWith('All')&&topMenu!=='brands')?value3=allState.brands:'';
        }
        // setSearchResults(workingProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));

        // Category
           
        if (cat!=='Cat'&&String(catBreadCrumb).toUpperCase()!=='ALL CATEGORIES') {
            cat='Cat';
            menu=category;   
        }
        if (String(topType).toUpperCase()==='STRINGS BY HARP BUILDER') {
            searchTerm=menu;
            String(searchTerm).toUpperCase()==='FH MODELS'?searchTerm="FH":'';
            productListCopy.map((prodItem, index)=>{
                if (prodItem&&prodItem.title.toUpperCase().includes(searchTerm.toUpperCase())) categoryProductList.push(prodItem);
            }); 
        } else if (cat==='Cat') {
            console.log('eleseif')
            console.log('productListCopy:', productListCopy.length)
            console.log('productListCopyzero:', productListCopy[0])
            console.log('menu', menu)
            console.log('topMenu:', topMenu)
            console.log('brands:', allState.brands)
            if (menu==='octaves') {
                categoryProductList=productListCopy.filter(item=>item&&item.subsubcategory&&item.subsubcategory!==undefined&&String(item.subsubcategory).toUpperCase()===allState.brands.toUpperCase())
            } else if (menu==='brands') {
                categoryProductList=productListCopy.filter(item=>item&&item.subsubcategory&&item.subsubcategory!==undefined&&String(item.subsubcategory).toUpperCase()===topMenu.toUpperCase());
            } else {
                categoryProductList = [...productListCopy]   
            }
        } else {
            console.log('else')
            categoryProductList = [...productListCopy]              
        }
        // newused
        console.log('newused:', newused)
        console.log('categoryProductList:', categoryProductList.length)
        if(newused&&newused!=='New/Used') {
            categoryProductList.map(product=>{
                if (newused&&newused.toUpperCase()===String(product.newused).toUpperCase()) {
                    newusedProductList.push(product);
                }
            });
        } else {
            newusedProductList = [...categoryProductList]
        }
        console.log('newusedprodlist', newusedProductList.length)
        // finalProductList=[...categoryProductList]
        if (category&&category.toUpperCase()==="MUSIC"||String(type).toUpperCase()==='MUSIC') {
            if (!value1||value1===undefined) value1="All Lever/Pedal/Ens";
            if (!value2||value2===undefined) value2="All Levels";
            if (!value3||value3===undefined) value3="All Publication Types";
            const soloensemble = menu==='soloensemble'?value1:allState.soloensemble;
            // const level = menu==='level'?value2:allState.level; //changed may 21,2021
            const level = value2&&value2;
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
            
        } else if (category&&category.toUpperCase()==='STRINGS'||String(type).toUpperCase()==="STRINGS"||stringSearch) {
            if (!value1||value1===undefined) value1="All Octaves";
            if (!value2||value2===undefined) value2=allState.note!=="All Notes"?allState.notes:'All Notes';
            if (!value3||value3===undefined) value3="All Brands";
            if (!value4||value4===undefined) value4="All Makes/Models";
            let octave = topMenu==='octaves'?value1.replace('ss', 's'):allState.octaves.replace('ss','s');
            let note = topMenu==='notes'?value2.replace('ss', 's'):allState.notes.replace('ss', 's');
            let brand = topMenu==='brands'?value3:allState.brands;
            topType.toUpperCase()==='STRINGS BY TYPE'?brand=topMenu:'';
            let makesmodels = menu==='makesmodels'?value4.replace('ss', 's'):allState.makesmodels.replace('ss', 's');
            if (makesmodels.toUpperCase().startsWith('ALL')&&makesmodels.toUpperCase()!=="ALL MAKES/MODELS") makesmodels=makesmodels.substr(4);
            // initialize variables
            let octavesProductList=[];
            let notesProductList=[];
            let brandsProductList=[];
            let makesmodelsProductList=[];
            // add clear searches button
            if (document&&document.querySelector('#clearSearch')) {document.querySelector('#clearSearch').style.display="flex"}
            // check octaves
            if (topType.toUpperCase()==='STRINGS BY HARP BUILDER') {octave='All Octaves'; brand='All Brands';}
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
            console.log('octavesProductList:', octavesProductList.length)
            finalProductList=[...octavesProductList];
            // check notes
            if (value2&&value2.toUpperCase()!=='ALL NOTES'&&value2!==undefined) {
                  octavesProductList.map(product=> {
                        if (stringSearch) {
                            // Not Yet Implement (search for notes by number)
                            if (value2==='E'&&Number.isInteger((product.order+6)/7)) notesProductList.push(product);
                            if (value2==='D'&&Number.isInteger((product.order+5)/7)) notesProductList.push(product);
                            if (value2==='C'&&Number.isInteger((product.order+4)/7)) notesProductList.push(product);
                            if (value2==='B'&&Number.isInteger((product.order+3)/7)) notesProductList.push(product);
                            if (value2==='A'&&Number.isInteger((product.order+2)/7)) notesProductList.push(product);
                            if (value2==='G'&&Number.isInteger((product.order+1)/7)) notesProductList.push(product);
                            if (value2==='F'&&Number.isInteger((product.order+0)/7)) notesProductList.push(product);
                            product.subcategories.map(cat=>cat.toUpperCase()===note.toUpperCase()&&notesProductList.push(product));
                        } else {
                            console.log('in else')
                            // console.log('notesProductList:', notesProductList.length)
                            // console.log('note:', note)
                            // Not Yet Implement (search for notes by number)
                            if (value2==='E'&&product.title.includes(' E ')) notesProductList.push(product);
                            if (value2==='D'&&product.title.includes(' D ')) notesProductList.push(product);
                            if (value2==='C'&&product.title.includes(' C ')) notesProductList.push(product);
                            if (value2==='B'&&product.title.includes(' B ')) notesProductList.push(product);
                            if (value2==='A'&&product.title.includes(' A ')) notesProductList.push(product);
                            if (value2==='G'&&product.title.includes(' G ')) notesProductList.push(product);
                            if (value2==='F'&&product.title.includes(' F ')) notesProductList.push(product);
                            // product.subcategories.map(cat=>cat.toUpperCase()===note.toUpperCase()&&notesProductList.push(product));
                        }
                    })
                    
                
            } else {
                notesProductList=[...octavesProductList];
            }
            finalProductList=[...notesProductList];
            console.log('notesProductList:', notesProductList.length)
            // check brands
            if (brand&&brand!==undefined&&brand.toUpperCase()!=='ALL BRANDS') {
                notesProductList.map(product=> {
                    if (String(product.subsubcategory).toUpperCase().includes(brand.toUpperCase())) brandsProductList.push(product);
                })
            } else {
                brandsProductList=[...notesProductList];
            }
            console.log('brandsProductList:', brandsProductList.length)
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
            finalProductList=[...makesmodelsProductList];
        } else {
            finalProductList=[...newusedProductList]
        }
        console.log(finalProductList.length)
        preSearchProductList = [...finalProductList]
        // search term
        if (document.querySelector('#searchTerm')&&document.querySelector('#searchTerm').value) searchTerm = document.querySelector('#searchTerm').value;
        if(searchTerm) {
            // remove 'harp' and 'music' from search terms
            const searchTermOld = searchTerm;
            searchTerm=searchTerm.toUpperCase().replace('HARP', '').replace('MUSIC', '');
            searchProductList = searchSearchBar(preSearchProductList, searchTerm, setMusicSearch, setStringSearch)
            // "strings by builder" only show strings, no music
            if (topType&&topType.toUpperCase()==='STRINGS BY HARP BUILDER') {
                setMusicSearch(false);
                searchProductList=searchProductList.filter(item=>item.category.toUpperCase()==='STRINGS');
            }
            if (searchProductList.length===0) {
                searchTerm=searchTermOld;
                searchProductList = searchSearchBar(preSearchProductList, searchTerm, setMusicSearch, setStringSearch);
            }
            type=searchTerm;
        } else {
            searchProductList=[...preSearchProductList]
        }
        finalProductList=[...searchProductList];
        finalProductList.length<1?setSearchResultsText('notfound'):setSearchResultsText('found');  
        setTypeOfSearch(type);
        setSearchResults(finalProductList);
        
        setMenuOpen(false);
        setSubMenuOpen(false);
        
        let abbr;
        
        MENU_ABBR.map(abbrConst => { 
            if (topMenu&&topMenu===abbrConst[0]) abbr=abbrConst[1];
        });
        if (abbr===undefined) abbr=topMenu;
        topType.toUpperCase()==="STRINGS BY TYPE"||topType.toUpperCase()==='BRANDS'
            ?setAllState({...allState, category: menu, brands: topMenu, brandAbbr: abbr})
            :setAllState({...allState, category: menu});
        setSearchBreadCrumb(getStoreSearchInfo({...allState, category: menu}, type));
        console.log('final', finalProductList.length);
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
        setWinWidth(window.innerWidth);
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    // reset variables
    useEffect(()=>{
        setSearchResultsText('entry');
        setMenuOpen(false);
        setSubMenuOpen(false);
        // setCatBreadCrumb('All Categories');
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
            {/* SearchResults: {searchResults&&searchResults.length} */}
            {/* <CategoryMenu 
                subMenuOpen={subMenuOpen} 
                setSubMenuOpen={setSubMenuOpen} 
                menuOpen={menuOpen} 
                setMenuOpen={setMenuOpen}
                handleCatChange={handleCatChange}
                setDetailProduct2={setDetailProduct2}
            /> */}
            {/* <div>{winWidth}-{String(menuOpen)}/{String(subMenuOpen)}</div> */}
            
            
            <div style={menuOpen?{background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4))'}:{}} className='storeIndex'>
                <div className='searchBarMainCont' style={{top: `${winWidth<751?'150px':'126px'}`, margin: 'auto', transform: 'none', marginLeft: `${winWidth<750?'0':`${winWidth>1200?'7%':'4%'}`}`}}>
                    <SearchBar 
                        subMenuOpen={subMenuOpen} 
                        setSubMenuOpen={setSubMenuOpen} 
                        menuOpen={menuOpen} 
                        setMenuOpen={setMenuOpen}
                        handleCatChange={handleCatChange}
                        setDetailProduct2={setDetailProduct2}
                        catBreadCrumb={catBreadCrumb}
                        setCatBreadCrumb={setCatBreadCrumb}
                        setSearchResultsText={setSearchResultsText}
                        handleChange={handleChange}
                    />
                </div> 
                {/* <PageTitle maintitle="Music, Strings and Things" subtitle='Featuring products from our store partners' />  */}
                <div style={{marginTop: '-60px'}}className='mainTitle'>
                    <h3>Music, Strings and Things</h3>
                    {/* <h4 style={{marginBlockStart: '0', width: '80%'}} className="subTitle">New and used products from across North America</h4> */}
                </div>
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
                    ribbonmenuOpen={ribbonmenuOpen}
                    ribbonsetMenuOpen={ribbonsetMenuOpen}
                    ribbonsubMenuOpen={ribbonsubMenuOpen}
                    ribbonsetSubMenuOpen={ribbonsetSubMenuOpen}
                    handleCatChange={handleCatChange}
                    searchBreadCrumb={searchBreadCrumb}
                    handleChange={handleChange}
                    idx={idx}
                    setIdx={setIdx}
                    hasMore={hasMore}
                    setHasMore={setHasMore}
                    typeOfSearch={typeOfSearch}
                    allState={allState}
                    setAllState={setAllState}
                    stringSearch={stringSearch}
                    setStringSearch={setStringSearch}
                    musicSearch={musicSearch}
                    setMusicSearch={setMusicSearch}
                    typeOfSearch={typeOfSearch}
                    catBreadCrumb={catBreadCrumb}
                    setCatBreadCrumb={setCatBreadCrumb}
                    setAnchor={setAnchor}
                />     
            </div>
            <OnlineStoreCss />
            <style jsx>{`
                * {
                    box-sizing: border-box;
                }
                .searchBarMainCont {
                    position: absolute;
                    top: 182px;
                    margin: 0 50%;
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
    // LOCAL BREAKING
    // Strings only constant
    const filteredProducts = stringsOnly;
    const usedProducts = filteredProducts.filter(product => product.newused==='used').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    const featuredProducts = filteredProducts.filter(product => (product.category&&product.category.toUpperCase()!=='STRINGS'&&(product.subcategories.includes("Featured")||product.category.toUpperCase()==='GIFTS'||product.newused==='used'))).sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 
    filteredProducts.sort((a,b) => (a.subcategory > b.subcategory) ? 1 : ((b.subcategory < a.subcategory) ? -1 : 0)  || (a.subsubcategory > b.subsubcategory) ? 1 : ((b.subsubcategory > a.subsubcategory) ? -1 : 0)  || a.order - b.order);   
    return {
        filteredProducts,
        usedProducts,
        featuredProducts,
        strings: filteredProducts.filter(product => product.title&&product.title.toUpperCase().startsWith("3RD OCTAVE C")),
        music: filteredProducts.filter(product => product.category==="music")
    };

    // // API - production
    // const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // // API - local BE
    // const res = await axios.get(`${process.env.backend}/api/v1/storeitems`);
    // API both local & production
    // const filteredProducts = res.data.storeitems;
    // const holidayProducts = res.data.storeitems.filter(product => product.title&&product.title.toUpperCase().includes("CHRISTMAS")||product.category==='gifts').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // const usedProducts = res.data.storeitems.filter(product => product.newused==='used').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // const featuredProducts = res.data.storeitems.filter(product => (product.category&&product.category.toUpperCase()!=='STRINGS'&&(product.subcategories.includes("Featured")||product.category.toUpperCase()==='GIFTS'||product.newused==='used'))).sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 
    // filteredProducts.sort((a,b) => (a.subcategory > b.subcategory) ? 1 : ((b.subcategory < a.subcategory) ? -1 : 0)  || (a.subsubcategory > b.subsubcategory) ? 1 : ((b.subsubcategory > a.subsubcategory) ? -1 : 0)  || a.order - b.order);   
    // return {
    //     filteredProducts,
    //     usedProducts,
    //     featuredProducts,
    //     strings: res.data.storeitems.filter(product => product.title&&product.title.toUpperCase().startsWith("3RD OCTAVE C")),
    //     music: res.data.storeitems.filter(product => product.category==="music")
    // };
}
export default OnlineStore;
