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
    console.log('catfilt', filteredProducts[1],category, category)
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
    console.log('here', filteredProducts.length);
    console.log(filteredProducts[5])
    console.log(allState.category.toUpperCase())
    filteredProducts = categoryFilter(filteredProducts, allState.category.toUpperCase());
    // if (allState.category&&allState.category.toUpperCase()!=="ALL CATEGORIES") categoryFilter(allProducts, allState.category.toUpperCase())
    // apply filters // not yet implemented map from array or refactor to function
       
     
    // if (allState.category&&allState.category.toUpperCase() === "ALL LEVER") 
    //     filteredProducts = filteredProducts.filter(
    //         product => product.productType&&product.productType === 'lever'
    //     );
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