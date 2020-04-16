//leaf function helps find nested object keys,
export function leaf(obj, path) {(path.split('.').reduce((value,el) => value[el], obj))} //from StackOverflow

export function findSizeWords(strings, type) {
    strings = parseInt(strings);
    if (strings<29&&type==='lever-free') return 'lever-free';
    if (strings<29&&type==='lever') return 'small lever';
    if (strings<35&&type==='lever') return 'medium lever';
    if (strings<44&&type==='lever' ) return 'large lever';  
    if (strings<46) return 'small pedal';
    if (strings===46) return 'semi-grand pedal';
    if (strings>29) return 'concert grand pedal';
    return 'size not found'
}
export const findProductType= (productMakesModels, maker, model) => {
    // short circuit
    if (!productMakesModels || productMakesModels.length === 0) throw new Error("from findProductType: productMakesModels parameter empty");
    if (!maker) throw new Error("from findProductType: maker parameter empty");
    if (!model) throw new Error("from findProductType: model parameter empty");  
    
    let foundName;
    productMakesModels.map(makesModelsMaker => {
        if (makesModelsMaker.sellerName === maker) {
            makesModelsMaker.sellerProducts.map(product => {
                if (product.productTitle === model) foundName = product.productType
            });
        }        
    })

    if (foundName) return foundName;
    return 'not found';
}
export function getModelListForMaker(productMakesModels, productMaker) {
    if (!productMakesModels || productMakesModels.length === 0) throw new Error("from getModelListForMaker: productMakesModels parameter empty");
    if (!productMaker) throw new Error("from getModelListForMaker: maker parameter empty");

    let modelList = [];
    if (productMaker.toUpperCase !== "HARP MAKER" && productMaker.toUpperCase() !== "ALL MAKERS"){
        productMakesModels.filter(product => product.productMaker === productMaker);
    } 
    productMakesModels.map(maker => {   
        if (productMaker === maker.sellerName) {
            maker.sellerProducts.map(model => {
                modelList.push(model.productTitle);
            });
        }    
    });
    
    
    return modelList;    
}
export function getModelList(productMakesModels, productMaker) {
    console.log('func', productMakesModels)
    // short circuit
    if (!productMakesModels || productMakesModels.length === 0) throw new Error("from getModelList: productMakesModels parameter empty");
    let modelList = [];
    productMakesModels.map(maker => {
        if (maker.sellerProducts) {maker.sellerProducts.map(product => { 
                // console.log(maker)                  
                modelList.push(product.productTitle);
            });
        }        
    });
    
    modelList = new Set(modelList);
    console.log(modelList)
    return modelList; 
}
export function getFilteredProducts(filteredProducts, allState) {
    
    if (allState.model.toUpperCase() !== "HARP MODEL" && allState.maker.toUpperCase() !== "ALL MODELS") {
        
        return filteredProducts.filter(product => product.productModel === allState.model);
    }
    if (allState.maker.toUpperCase() !== "HARP MAKER" && allState.maker.toUpperCase() !== "ALL MAKERS") filteredProducts = filteredProducts.filter(product => product.productMaker === allState.maker);
    if (allState.size.toUpperCase() !== "HARP SIZE" && allState.size.toUpperCase() !== "ALL SIZES") filteredProducts = filteredProducts.filter(product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase()));
    return filteredProducts;
    
    
    // // if (allState.productType !== 'all') 
    // console.log('from get filtered', allState)
    
    // if (allState.maker && allState.selectionType === 'maker') return filteredProducts.filter(product => product.productMaker === allState.maker);
    // if (allState.model && allState.selectionType === 'model') return filteredProducts.filter(product => product.productModel === allState.model);
    // if (allState.size && allState.selectionType === 'size') return filteredProducts.filter(product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase()));
    
    return filteredProducts.sort();
} 

export const itemsSortByDisabled = (items, currentItems) => {
    let itemsWithDisabled = [];
    const sortItems = [];
    items.map(model => {
        itemsWithDisabled.push({name:model,disabled:!currentItems.find(currentModel => currentModel === model)})  
    });
    itemsWithDisabled.sort((a, b) => a.disabled-b.disabled || a.name.localeCompare(b.name));  
    itemsWithDisabled.map(modelboo => sortItems.push(modelboo.name))
    return sortItems;
}
