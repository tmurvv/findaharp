//leaf function helps find nested object keys,
export function leaf(obj, path) {(path.split('.').reduce((value,el) => value[el], obj))} //from StackOverflow

// const findMakerFromModel = (model, makesModels) => {
//     if (!model) throw 'from findMakerFromModel: model parameter is empty';
//     if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from findMakerFromModel: makesModels parameter is empty';
    
//     let foundName;
//     const makerList = Object.keys(makesModels);
    
//     makerList.map(maker => {      
//         Object.keys(leaf(makesModels,maker)).map(makerModel => {
//             if (makerModel.toUpperCase() === model.toUpperCase()) {               
//                 foundName = maker;
//             }
//         });
//     });
//     return foundName;
// }
export function findSizeWords(strings, type) {
    strings = parseInt(strings);
    if (strings<29) return 'small lever';
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
    productMakesModels.map(maker => {   
        if (productMaker === maker.sellerName) {
            maker.sellerProducts.map(model => {
                modelList.push(model.productTitle);
            });
        }    
    });
    return modelList;    
}
export function getModelList(productMakesModels, productType, productMaker) {
    // short circuit
    if (!productMakesModels || productMakesModels.length === 0) throw new Error("from getModelList: productMakesModels parameter empty");
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",productMakesModels.length, productType)
    let modelList = [];
    productMakesModels.map(maker => {
        //for type
        if (maker.sellerProducts) {
            // select pedal, lever, or lever-free
            if (productType === 'pedal' || productType==='lever-free' || productType === 'lever') { // lever-free come up in lever also which is intentional
                maker.sellerProducts.map(model => {
                    if (model.productType === productType) modelList.push(model.productTitle);
                });
            //all
            } else if (productType === 'all') {
                maker.sellerProducts.map(product => {                   
                    modelList.push(product.productTitle);
                });
            }
        }        
    });
    modelList = new Set(modelList);
    return modelList; 
}
export function getFilteredProducts(filteredProducts, allState) {
    if (allState.productType !== 'all') filteredProducts = filteredProducts.filter(product => product.productType===allState.productType);    
    if (allState.maker && allState.selectionType === 'maker') return filteredProducts.filter(product => product.productMaker === allState.maker);
    if (allState.model && allState.selectionType === 'model') return filteredProducts.filter(product => product.productModel === allState.model);
    if (allState.size && allState.selectionType === 'size') return filteredProducts.filter(product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase()));
    
    return filteredProducts;
}    
