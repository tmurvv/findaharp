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
    const [ catBreadCrumb, setCatBreadCrumb ] = useState('Categories  ');
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
        // console.log(fullCat);
        // console.log(ABBR.length);
        // console.log(ABBR[0][0]);
        // console.log(fullCat);
        let replace;
        ABBR.forEach(element => {
            if (element[0]===fullCat) {console.log('FOUND IT', element[1]);replace=element[1];}
        });
        return replace;
    }
    function handleCatChange(searchCategory, searchSubCategory, searchItem) {
        let workingProducts = [...props.filteredProducts];
        console.log('here',document.querySelector('#newused').value.toUpperCase());
        console.log(workingProducts[0])
        if (document.querySelector('#newused').value!=='New/Used') {
            document.querySelector('#newused').value='New/Used';
            alert('Coming soon, searching by category and by "New" or "Used". For now searching by category finds all new and used products.')
        }
        
        document.querySelector('#searchTerm').value='';
        // console.log('CAT', searchCategory);
        // console.log('SubCAT', searchSubCategory);
        // console.log('item', searchItem);
        // console.log('product', props.filteredProducts[500])
        
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
                workingProducts.map(product=>{
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
                setSearchBreadCrumb(searchItem);
                setTypeOfSearch(searchItem);
                return;
            }
        }
        String(searchCategory).toUpperCase().startsWith('STRINGS')?searchCategory='strings':'';
        console.log('128', workingProducts.length)
        setSearchResults(workingProducts.filter(item=>String(item.category).toUpperCase()===String(searchCategory).toUpperCase()&&String(item.subsubcategory).toUpperCase()===String(searchItem).toUpperCase()));
        setSearchResultsText('');
        
        setCatBreadCrumb(findCatAbbr(searchItem));
        setMenuOpen(false);
        setSubMenuOpen(false);
        getStoreSearchInfo({category: 'music'}, 'music')
        setSearchBreadCrumb(searchItem);
        setTypeOfSearch(searchItem);
    }

    function handleChange(type, menu, value1, value2, value3, value4) {
        // console.log('handleChange', type, menu, value1, value2, value3, value4)
        // console.log(props.filteredProducts[600]);
        // console.log(props.filteredProducts[props.filteredProducts.length-550]);
        setCatBreadCrumb('Categories');
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
        if (type==='music') {           
            setAllState({...allState, soloensemble: value1, level: value2, publicationtype: value3 })
        };
        if (type==='strings') { 
            setAllState({...allState, octaves: value1, notes: value2, brands: value3, makesmodels: value4 })
        };
        if (musicSearch) type='music';
        if (stringSearch) type='strings';
        console.log('handlechangetype', type)
        console.log('handlechangetype', type)
        // get search items
        let category = document.querySelector('#category')&&document.querySelector('#category').value;
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
                return alert("Digital Downloads under construction. Expected by June 2021."); // NOT YET IMPLEMENTED
            }
            if (category.toUpperCase()==="STRINGS") type='strings';
            if (category.toUpperCase()==="MUSIC") type='music';
        } 
        if (menu==='soloensemble'||menu==='level'||menu==='publicationtype') {
            category = "Music";
            // document.querySelector('#category').value='Music';
            type = 'music';
        } 
        if (menu==='octaves'||menu==='notes'||menu==='brands'||menu==='makesmodels') {
            category = "Strings";
            // document.querySelector('#category')?document.querySelector('#category').value='Strings':'';
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
            console.log('NEWSUERD', newused,categoryProductList.length)

            categoryProductList.map(product=>{
                if (newused.toUpperCase()===String(product.newused).toUpperCase()) {
                    newusedProductList.push(product);
                }
            });
            console.log('NEWSUERD', newused,newusedProductList.length)
        } else {
            newusedProductList = [...categoryProductList]
        }
        // finalProductList=[...categoryProductList]
        if (category&&category.toUpperCase()==="MUSIC"||String(type).toUpperCase()==='MUSIC') {
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
            
        } else if (category&&category.toUpperCase()==='STRINGS'||String(type).toUpperCase()==="STRINGS") {
            console.log("INSTRINGS")
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
            searchProductList = searchSearchBar(preSearchProductList, searchTerm, setMusicSearch, setStringSearch)
            type=searchTerm;
        } else {
            searchProductList=[...preSearchProductList]
        }
        finalProductList=[...searchProductList];
        // console.log('final', finalProductList.length)
        finalProductList.length<1?setSearchResultsText('notfound'):setSearchResultsText('found');  
        setTypeOfSearch(type);
        setSearchResults(finalProductList)
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
