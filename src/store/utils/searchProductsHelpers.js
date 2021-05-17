import lunr from "lunr";

/**
 * Searches for the occurance of text with the value of any key/value pair in an object
 * @function findNested
 * @param {Sbject} obj product object
 * @param {String} key recursively goes through each key/value pair to check for value
 * @param {String} value text being searched for
 * @returns {Object} - if value occurs, object is returned
 */
export function findNested(obj, key, value) {
    // Base case
    if (String(obj[key]).toUpperCase().indexOf(value.toUpperCase())>-1) {
        return obj;
    } else {
        for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
            if (typeof obj[i] == 'object') {
                var found = this.findNested(obj[i], key, value);
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    return found;
                }
            }
        }
    }
}
/**
 * Finds the artist of a certain Title from artists/titles JSON-style object
 * @function soloensembleFilter
 * @param {array} allProducts Product list
 * @param {categoryFilter} allState category filter selected by user
 * @returns {String} - Product List with filter Applied
 */
function soloensembleFilter(filteredProducts, soloensemble) {
    const returnProducts=[];

    filteredProducts.map(product=>{
        if (product.subcategories) product.subcategories.map(subcategory => {
            if (subcategory.toUpperCase()===soloensemble.toUpperCase()) returnProducts.push(product);
        });
    });  
    return returnProducts;
}
/**
 * Finds the artist of a certain Title from artists/titles JSON-style object
 * @function categoryFilter
 * @param {array} allProducts Product list
 * @param {categoryFilter} allState category filter selected by user
 * @returns {String} - Product List with filter Applied
 */
function categoryFilter(filteredProducts, category) {
    if (category==='ALL HARP MUSIC') 
        return filteredProducts.filter(
            product => product.category&&product.category === 'music'
        );    
    if (category==="LEVER HARP MUSIC ONLY")
        return filteredProducts.filter(
            product => product.harptype&&(product.harptype.toUpperCase() === 'LEVER'|| product.harptype.toUpperCase() === 'ALL')
        );
    if (category==="PEDAL HARP MUSIC ONLY")
        return filteredProducts.filter(
            product => product.harptype&&(product.harptype.toUpperCase() === 'PEDAL'|| product.harptype.toUpperCase() === 'ALL')
        ); 
    if (category!=="ALL CATEGORIES"&&category!=="ALL CATEGORYS")
        return filteredProducts.filter(
            product => String(product.category).toUpperCase() === category.toUpperCase()
        );   
    return filteredProducts;
}
/**
 * Finds the artist of a certain Title from artists/titles JSON-style object
 * @function getFilteredProducts
 * @param {array} allProducts Product list
 * @param {array} allState list of filters selected by user
 * @returns {String} - Product List with filetersApplied
 */
export function getFilteredStoreProducts(allProducts, allState, user, rate) {
    let filteredProducts = [...allProducts];
    filteredProducts = categoryFilter(filteredProducts, allState.category.toUpperCase());
    // if (allState.category&&allState.category.toUpperCase()!=="ALL CATEGORIES") categoryFilter(allProducts, allState.category.toUpperCase())
    // apply filters // not yet implemented map from array or refactor to function
       
     
    if (allState.soloensemble&&allState.soloensemble.toUpperCase() !== "ALL Lever/Pedal/Ens")
        filteredProducts = soloensembleFilter(filteredProducts, allState.soloensemble);
    // if (allState.title&&allState.title.toUpperCase() !== "ALL MODELS") 
    //     filteredProducts = filteredProducts.filter(
    //         product => product.productTitle&&product.productTitle === allState.title
    //     );
    // if (allState.artist && allState.artist.toUpperCase() !== "ALL MAKERS") 
    //     filteredProducts = filteredProducts.filter(
    //         product => product.productArtist&&product.productArtist === allState.artist
    //     );
    // if (allState.publicationtype&&allState.publicationtype.toUpperCase() !== "ALL LOCATIONS") {
    //     if (allState.publicationtype.startsWith('Less than')) {
    //         if(allState.publicationtype.startsWith('Less than 100')) {
    //             filteredProducts = filteredProducts.filter(
    //                 product => (product.distance&&product.distance<100)||product.distance===0
    //             );
    //         }
    //         if(allState.publicationtype.startsWith('Less than 300')) {
    //             filteredProducts = filteredProducts.filter(
    //                 product => (product.distance&&product.distance<300)||product.distance===0
    //             );
    //         }
    //         if(allState.publicationtype.startsWith('Less than 500')) {
    //             filteredProducts = filteredProducts.filter(
    //                 product => (product.distance&&product.distance<500)||product.distance===0
    //             );
    //         }
    //     } else {
    //         filteredProducts = filteredProducts.filter(
    //             product => product.sellerRegion&&product.sellerRegion === allState.publicationtype
    //         );
    //     }
    // }
    // if (allState.soloensemble&&allState.soloensemble.toUpperCase() !== "ALL FINISHES") 
    //     filteredProducts = filteredProducts.filter(
    //         product => product.productSoloEnsemble&&product.productSoloEnsemble.toUpperCase() === allState.soloensemble.toUpperCase()
    //     );
    // if (allState.category&&allState.level.toUpperCase() !== "ALL PRICES") {
    //     filteredProducts = filteredProducts.filter(product => product.productLevel&&findLevelRange(product.productLevel, user.currency==="USD"?1:rate)===allState.level);
    // }
    // // if category all pedal or all lever ready for return
    // if (allState.category&&(allState.category.toUpperCase() === "ALL PEDAL"||allState.category.toUpperCase() === "ALL LEVER"||allState.category.toUpperCase() === "LEVER-FREE"))
    //     return filteredProducts;
    // // category filter
    // if (allState.category&&allState.category.toUpperCase() !== "ALL SIZES") {
    //     filteredProducts = filteredProducts.filter(
    //         product => allState.category.toUpperCase().startsWith(findCategoryWords(product.productCategory, product.productType).toUpperCase())
    //     );
    // }
    return filteredProducts;
}
export const getStoreSearchInfo = (allState, type) => {
    // shortcut if no filters selected
    // if (allState.searchInfo&&allState.searchInfo.indexOf("All Harps")>-1) allState.searchInfo = '';
    // if (document&&document.querySelector('.clearAll')) document.querySelector('.clearAll').style.display='none';
    // append searchInfo string with only selected filter information
    let searchInfo='';
    if (type&&type!=='music'&&type!=='strings') return `Showing: ${type}`;
    if (type==='music') {
        [allState.soloensemble, allState.level, allState.publicationtype].map(menuItem => {
            if(!['All Lever/Pedal/Ens', 'All Levels', 'All Publication Types'].includes(menuItem)) searchInfo += `${menuItem} | `
            // if (document&&document.querySelector('.clearAll')) document.querySelector('.clearAll').style.display='flex';
        });
        if (searchInfo.substr(searchInfo.length-2,1)==='|') searchInfo = searchInfo.substr(0, searchInfo.length-2);
        return `Showing ${allState.category}: ${searchInfo}`;
    }   
    if (type==='strings') {
        [allState.octaves, allState.brands, allState.makesmodels].map(menuItem => {
            if(!['All Octaves', 'All Brands', 'All Makes/Models'].includes(menuItem)) searchInfo += `${menuItem} | `
            // if (document&&document.querySelector('.clearAll')) document.querySelector('.clearAll').style.display='flex';
        });
    }
    if (searchInfo.substr(searchInfo.length-2,1)==='|') searchInfo = searchInfo.substr(0, searchInfo.length-2);
    return `Showing ${allState.category}: ${searchInfo}`;
}

export function searchSearchBar(filteredProducts, query, setMusicSearch, setStringSearch) {
    const returnArray = [];
    let music;
    let strings;

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
        filteredProducts.forEach(function (doc) { 
            // clean up data for search engine
            doc.artist_first=String(doc.artist_first).replace(/\//g,'-') 
            doc.artist_last=String(doc.artist_last).replace(/\//g,'-') 
            doc.title=String(doc.title).replace(/\//g,'-')
            doc.descriptiontext=String(doc.descriptiontext).replace(/\//g,'-')          
            this.add(doc)
        }, this)
    });
       
    // clean up query and search
    const results = idx.search(String(query).replace(/\//g,'-'));
    // map found item ids to items list
    filteredProducts.map(product=>{
        results.map(result=> {
            if (result.ref===product.title) {
                if (product.category==='music') music=true;
                if (product.category==='strings') strings=true;
                returnArray.push({...product, score: result.score});
            };
        });
        setMusicSearch(music);
        setStringSearch(strings);
    });
    // sort and return
    return returnArray.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
}