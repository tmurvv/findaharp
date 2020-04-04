//leaf function helps find nested object keys,
const leafLocal = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj)); //from StackOverflow
export function leaf(obj, path) {(path.split('.').reduce((value,el) => value[el], obj))} //from StackOverflow

const findMakerFromModel = (model, makesModels) => {
    if (!model) throw 'from findMakerFromModel: model parameter is empty';
    if (!makesModels || (Object.keys(makesModels).length === 0 && makesModels.constructor === Object)) throw 'from findMakerFromModel: makesModels parameter is empty';
    
    let foundName;
    const makerList = Object.keys(makesModels);
    
    makerList.map(maker => {      
        Object.keys(leaf(makesModels,maker)).map(makerModel => {
            if (makerModel.toUpperCase() === model.toUpperCase()) {               
                foundName = maker;
            }
        });
    });
    return foundName;
}
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
function findProductType(productMakesModels, maker, model) {
    if (!model||!maker) return 'no model found';
   
    const makerHarps = leafLocal(productMakesModels, maker);
    if (leafLocal(makerHarps, model)&&leafLocal(makerHarps, model).harptype) {
        return leafLocal(makerHarps, model).harptype;
    } else {
        return 'harp type not found';
    }
}
export function getModelList(productMakesModels, productType, productMaker) {
    let productKeys = [];
    const makers = Object.keys(productMakesModels)
    makers.map(maker => {
        const models = Object.keys(leafLocal(productMakesModels, maker));
        if (productType !== 'model' && (productType === 'pedal' || productType === 'lever')) {
            models.map(model => {
                if (findProductType(productMakesModels, maker, model) === productType) productKeys.push(model);
            });
        } else if (productMaker) {
            models.map(model => {
                if (findMakerFromModel(model, productMakesModels) === productMaker) productKeys.push(model);
            });
        } else {
            models.map(model => productKeys.push(model));
        }     
    });
    productKeys = new Set(productKeys);
    return productKeys;
}
export function getFilteredProducts(filteredProducts, allState) {
    if (allState.productType !== 'all') filteredProducts = filteredProducts.filter(product => product.productType===allState.productType);    
    if (allState.maker && allState.selectionType === 'maker') return filteredProducts.filter(product => product.productMaker === allState.maker);
    if (allState.model && allState.selectionType === 'model') return filteredProducts.filter(product => product.productModel === allState.model);
    if (allState.size && allState.selectionType === 'size') return filteredProducts.filter(product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase()));
    
    return filteredProducts;
}

export function findModelHelper(products, model) {
    products.find(product => {
        if (product.productModel===model) {
            return true;
        }      
    });
    return false;
}    
