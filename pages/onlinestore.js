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
import { getStoreSearchInfo,searchSearchBar } from '../src/store/utils/searchProductsHelpers';
import { RESULTS_INITIAL_STATE, STORE_INITIAL_STATE } from '../src/main/constants/constants';

const OnlineStore = (props) => {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ subMenuOpen, setSubMenuOpen ] = useState();
    const [ openStoreDetail, setopenStoreDetail ] = useState(false);
    const [ detailProduct2, setDetailProduct2 ] = useState();
    const [ searchResultsText, setSearchResultsText ] = useState('entry'); // entry, found, notfound, nosearch
    const [ catBreadCrumb, setCatBreadCrumb ] = useState('Categories');
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
    
    function findCatAbbr(fullCat) {
        let replace;
        ABBR.forEach(element => {
            if (element[0]===fullCat) {replace=element[1];}
        });
        return replace;
    }
    function handleCatChange(searchCategory, searchSubCategory, searchItem) {
        if(searchCategory.toUpperCase()==="MUSIC") searchCategory='Categories';
        let workingProducts = [...props.filteredProducts];
        
        // if (document.querySelector('#newused').value!=='New/Used') {
        //     document.querySelector('#newused').value='New/Used';
        //     alert('Coming soon, searching by category and by "New" or "Used". For now searching by category finds all new and used products.')
        // }
        
        document.querySelector('#searchTerm').value='';
            if (searchItem.toUpperCase()==='GIFT CERTIFICATES') {
                alert('Please email orders@findaharp.com to purchase a gift certificate.');
                return;
            }
        const stringsOnly = props.filteredProducts.filter(res=>String(res.category).toUpperCase()==='STRINGS');
        if (String(searchCategory).toUpperCase()==='STRINGS BY HARP BUILDER') {
            
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
            setSearchResults(workingProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));
        }
        // String(searchCategory).toUpperCase().startsWith('STRINGS')?searchCategory='strings':'';
        setSearchResultsText('');
        setCatBreadCrumb(findCatAbbr(searchItem));
        setMenuOpen(false);
        setSubMenuOpen(false);
        getStoreSearchInfo({...allState, category: searchItem}, 'music');
        setAllState({...allState, category: searchItem});
        setSearchBreadCrumb(searchItem);
        setTypeOfSearch(searchItem);
        // setMusicSearch(false);
        // setStringSearch(false);
        console.log('from cat change', searchCategory,);
        console.log('searchItem:', searchItem);
        handleChange('Cat', searchCategory, searchItem);
    }

    function handleChange(cat, type, menu, value1, value2, value3, value4) {
        
        // if (document.querySelector('#category')&&document.querySelector('#category').value.toUpperCase()==="MUSIC") {
        //     setMusicSearch(true);
        //     setStringSearch(false);
        // } else if (document.querySelector('#category')&&document.querySelector('#category').value.toUpperCase()==="STRINGS") {
        //     setMusicSearch(false);
        //     setStringSearch(true);
        // } else {
        //     setMusicSearch(false);
        //     setStringSearch(false);
        // }

        
        // update menu text -- not for search term
        // if (type==='music') {           
        //     setAllState({...allState, soloensemble: value1, level: value2, publicationtype: value3 })
        // };
        // if (type==='strings') { 
        //     setAllState({...allState, octaves: value1, notes: value2, brands: value3, makesmodels: value4 })
        // };
        
        // get search items
        
        let category;
        ABBR.forEach(item=>{
            item[1]===catBreadCrumb?category=item[0]:'';
        });
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
        // if (category&&category.toUpperCase()!=='CATEGORIES') {
        //     if (category.toUpperCase()==="DIGITAL DOWNLOADS") {
        //         // document.querySelector('#category').value= 'All';
        //         return alert("Digital Downloads under construction. Expected by June 2021."); // NOT YET IMPLEMENTED
        //     }
        //     if (category.toUpperCase()==="STRINGS") type='strings';
        //     if (category.toUpperCase()==="MUSIC") type='music';
        // } 
        // if (menu==='soloensemble'||menu==='level'||menu==='publicationtype') {
        //     // category = "Music";
        //     // document.querySelector('#category').value='Music';
        //     type = 'music';
        // } 
        // if (menu==='octaves'||menu==='notes'||menu==='brands'||menu==='makesmodels') {
        //     // category = "Strings";
        //     // document.querySelector('#category')?document.querySelector('#category').value='Strings':'';
        //     type = 'strings'
        // }
        setAllState({...allState, category: type});

        if (musicSearch) {
            console.log('value2:', value2)
            type='music';
            (!value2)||value2.startsWith('All')?value2=allState.level:'';
            console.log('value2:', value2);
        }
        if (stringSearch) type='strings';
        // setSearchResults(workingProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));

        // Category
        console.log('menu:', menu)
        if (menu==='brands'||menu==='octaves'||menu==='notes') {
            setCatBreadCrumb('Categories');
            categoryProductList = [...productListCopy] 
        } else {    
            if (cat!=='Cat'&&String(catBreadCrumb).toUpperCase()!=='CATEGORIES') {cat='Cat'; menu=category;}
            if (String(type).toUpperCase()==='STRINGS BY HARP BUILDER') {
                searchTerm=menu;
                searchTerm==='FH Models'?searchTerm="FH":'';
                categoryProductList = [...productListCopy]
                categoryProductList=productListCopy.filter(item=>String(item.category).toUpperCase()==="STRINGS");
                
            } else if (cat==='Cat') {
                categoryProductList=productListCopy.filter(item=>String(item.subsubcategory).toUpperCase()===String(menu).toUpperCase()); 
            } else {
                categoryProductList = [...productListCopy]              
            }
        }
        // cat=category;
        
        // String(type).toUpperCase().startsWith('STRINGS')?type='strings':type='music';

        // console.log('category:', category)
        // console.log('cat:', cat);
        // console.log('type', type);
        // console.log('menu:', menu)
        // console.log('searchterm', searchTerm);
        console.log('bottbott', 'Cat:', categoryProductList.length);
        // console.log('newused:', newused)
        // newused
        if(newused!=='New/Used') {
            categoryProductList.map(product=>{
                if (newused.toUpperCase()===String(product.newused).toUpperCase()) {
                    newusedProductList.push(product);
                }
            });
        } else {
            newusedProductList = [...categoryProductList]
        }
        console.log('newusedprodlist', newusedProductList.length)
        // finalProductList=[...categoryProductList]
        if (category&&category.toUpperCase()==="MUSIC"||String(type).toUpperCase()==='MUSIC') {
            console.log('inmusic');
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
            console.log('level:', level);
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
            
        } else if (category&&category.toUpperCase()==='STRINGS'||String(type).toUpperCase()==="STRINGS") {
            console.log('in strings')
            console.log('newusedProductList:', newusedProductList.length)
            if (!value1||value1===undefined) value1="All Octaves";
            if (!value2||value2===undefined) value2="All Notes";
            if (!value3||value3===undefined) value3="All Brands";
            if (!value4||value4===undefined) value4="All Makes/Models";
            const octave = menu==='octaves'?value1.replace('ss', 's'):allState.octaves.replace('ss','s');
            const note = menu==='notes'?value2.replace('ss', 's'):allState.notes.replace('ss', 's');
            const brand = menu==='brands'?value3.replace('ss', 's'):allState.brands.replace('ss', 's');
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
            if (octave&&octave.toUpperCase()!=='ALL OCTAVES'&&octave!==undefined) {
                console.log('octave:', octave)
                console.log(newusedProductList.length)
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
                console.log(newusedProductList.length)
                octavesProductList=[...newusedProductList];
            }
            console.log('octavesProductList:', octavesProductList.length)
            finalProductList=[...octavesProductList];
            // check notes
            if (note&&note.toUpperCase()!=='ALL NOTES'&&note!==undefined) {
                octavesProductList.map(product=> {
                    // Not Yet Implement (search for notes by number)
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
                console.log('in brands')
                console.log('notesProductList:', notesProductList.length)
                notesProductList.map(product=> {
                    if (String(product.title).toUpperCase().includes(brand.toUpperCase())) brandsProductList.push(product);
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
        if (document.querySelector('#searchTerm').value) searchTerm = document.querySelector('#searchTerm').value;
        if(searchTerm) {
            searchProductList = searchSearchBar(preSearchProductList, searchTerm, setMusicSearch, setStringSearch)
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
        setAllState({...allState, category: menu})
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
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    // reset variables
    useEffect(()=>{
        setSearchResultsText('entry');
        setMenuOpen(false);
        setSubMenuOpen(false);
        // setCatBreadCrumb('Categories');
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
            <div className='searchBarMainCont'>
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
                    setCatBreadCrumb={setCatBreadCrumb}
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
    // const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
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
