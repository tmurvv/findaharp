import {useState, useEffect} from 'react';
import parseNum from 'parse-num';

//leaf function helps find nested object keys,
export function leaf(obj, path) {(path.split('.').reduce((value,el) => value[el], obj))} //from StackOverflow

export function triggerLazy() {
    window.scrollBy(0,1); //hack to trigger lazyload after search
    window.scrollBy(0,-1); //hack to trigger lazyload after search
}
export function removeDashOE(sellerName) {
    return sellerName.includes("-o")||sellerName.includes("-e")
        ?sellerName.substr(0,sellerName.length-2)
        :sellerName;
}
//courtesy of Gabe Ragland useHooks.com
export function useWindowSize() { 
    const isClient = typeof window === 'object';
  
    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    useEffect(() => {
      if (!isClient) {
        return false;
      }
      
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return windowSize;
}
export function setOpacity(yesNo) {
    if (yesNo) {
        document.body.style.overflowY='hidden';
        document.querySelector('.searchLine1').style.opacity='.1';
        document.querySelector('.searchLine2').style.opacity='.1';
        document.querySelector('.searchLine1Sub').style.opacity='.1';
        document.querySelector('.searchLine2Sub').style.opacity='.1';
        return
    }
    document.body.style.overflowY='auto';
    document.querySelector('.searchLine1').style.opacity='1';
    document.querySelector('.searchLine2').style.opacity='1';
    document.querySelector('.searchLine1Sub').style.opacity='1';
    document.querySelector('.searchLine2Sub').style.opacity='1';
}
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
export function findPriceRange(price) {
    price = parseNum(price);
    if (price<2000) return 'Less than $2,000';
    if (price>=2000&&price<5000) return '$2,000-4,999';
    if (price>=5000&&price<9999) return '$5,000-9,999';
    if (price>=10000&&price<19999) return '$10,000-19,999'; 
    if (price>=20000&&price<29999) return '$20,000-29,999'; 
    if (price>29999&&price<150000) return '$30,000 plus';
    return 'price not found'
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
export function getModelList(productMakesModels, size) {
    // short circuit
    if (!productMakesModels || productMakesModels.length === 0) throw new Error("from getModelList: productMakesModels parameter empty");
    let modelList = [];
    
    productMakesModels.map(maker => {
        if (maker.sellerProducts) {
            if (size && size.toUpperCase() !== "HARP SIZE" && size.toUpperCase() !== "ALL SIZES") {
                if (size && (size.toUpperCase()==="ALL LEVER" || size.toUpperCase()=== "ALL PEDAL")) {
                    maker.sellerProducts.map(product => { 
                        if (size.toUpperCase().includes(product.productType.toUpperCase())) {
                            modelList.push(product.productTitle);        
                        }       
                    });
                    return;  
                } else {
                    maker.sellerProducts.map(product => { 
                        if (size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase())) {
                            modelList.push(product.productTitle);        
                        }       
                    });
                    return;
                }
            }
            maker.sellerProducts.map(product => modelList.push(product.productTitle));
        }        
    });
    
    modelList = new Set(modelList);
    
    return modelList; 
}
export function getFilteredProducts(filteredProducts, allState) {
    if (allState.model && allState.model.toUpperCase() !== "HARP MODEL" && allState.model.toUpperCase() !== "ALL MODELS") {   
        return filteredProducts.filter(product => product.productModel === allState.model);
    }
    if (allState.maker && allState.maker.toUpperCase() !== "HARP MAKER" && allState.maker.toUpperCase() !== "ALL MAKERS") filteredProducts = filteredProducts.filter(product => product.productMaker === allState.maker);
    if (allState.location && allState.location.toUpperCase() !== "LOCATION" && allState.location.toUpperCase() !== "ALL LOCATIONS") filteredProducts = filteredProducts.filter(product => product.sellerRegion === allState.location);
    if (allState.finish && allState.finish.toUpperCase() !== "FINISH" && allState.finish.toUpperCase() !== "ALL FINISHES") filteredProducts = filteredProducts.filter(product => product.productFinish&&product.productFinish.toUpperCase() === allState.finish.toUpperCase());
    if (allState.size && allState.size.toUpperCase() === "ALL PEDAL") return filteredProducts.filter(product => product.productType === 'pedal');
    if (allState.size && allState.size.toUpperCase() === "ALL LEVER") return filteredProducts.filter(product => product.productType === 'lever');
    if (allState.size && allState.size.toUpperCase() !== "HARP SIZE" && allState.size.toUpperCase() !== "ALL SIZES") filteredProducts = filteredProducts.filter(product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase()));
    if (allState.size && allState.price.toUpperCase() !== "PRICE RANGE" && allState.price.toUpperCase() !== "ALL PRICES") filteredProducts = filteredProducts.filter(product => allState.price===findPriceRange(product.productPrice));
    filteredProducts = filteredProducts.filter(product => product.productMaker !== 'findaharpFinishes');
    // if (allState.price && allState.price.toUpperCase() !== "PRICE RANGE" && allState.price.toUpperCase() !== "ALL PRICES") filteredProducts = filteredProducts.filter(product => findPriceRange(product.productPrice)) == allState.price;
    return filteredProducts;
}
export function addPlaceholderProducts(filteredproductscontainer, width) {
    let numNeeded;
    if (width > 1200) {
        numNeeded = 5-(filteredproductscontainer.length%5);
    }
    if (width <= 1200 && width > 950) {
        numNeeded = 4-(filteredproductscontainer.length%4);
    }
    if (width <= 950 && width > 700) {
        numNeeded = 3-(filteredproductscontainer.length%3);
        console.log(numNeeded);
    }
    let newAd = {
        divider: "00000000000000000000000",
        id: "d101837f-27dc-48ff-952f-175c5dc47d2d",
        productFinish: "walnut",
        productImageBestColor: "#eeeeee",
        productImageUrl: "./img/logo_findaharp.png",
        productLongDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis elit in ipsum commodo ornare. Vivamus luctus enim eget tortor sollicitudin laoreet. Curabitur ex tellus, fermentum interdum massa in, ullamcorper sollicitudin ex. Sed eu accumsan turpis. Suspendisse molestie velit eu rhoncus pharetra. Sed vel elementum metus. Pellentesque cursus eros sit amet erat suscipit dictum. Phasellus egestas leo risus, eget molestie tortor interdum ut. Proin non tempus massa. Ut viverra mi ac consectetur tristique. Pellentesque blandit ut felis fringilla blandit. Vivamus imperdiet quam vitae lectus pellentesque, laoreet malesuada elit dapibus. Suspendisse tristique interdum pellentesque. Ut nisl mi, eleifend sed nisl vel, convallis euismod dui. Mauris vitae dignissim enim. Ut imperdiet diam nunc, sed rutrum purus accumsan eu. Sed tempus lectus erat. Integer condimentum laoreet tempor. Nam ullamcorper odio eu mattis mollis. In vel ante tellus. Ut efficitur eros et faucibus egestas. Ut et turpis vitae quam auctor egestas. Sed tristique nunc sit amet est volutpat, sit amet ultricies diam consectetur. Donec arcu turpis, ornare volutpat felis placerat, sollicitudin pretium dui. Duis congue risus purus, sed hendrerit odio imperdiet sit amet. Cras id faucibus nunc. Vivamus sed metus sit amet lorem rhoncus pulvinar eu id sem.",
        productMaker: "",
        productModel: "",
        productPrice: "$17,500.00",
        productShortDesc: "Short description not available",
        productSize: 0,
        productTitle: "Filler Product",
        productType: "pedal",
        sellerCountry: "USA",
        sellerName: "",
        sellerRegion: "Mid-West"
    }
    // // console.log(iterProds.length)
    for (var x = 0; x<numNeeded; x++) {
        const adId = {...newAd, id:x}
        filteredproductscontainer.push(adId);
    }
    return filteredproductscontainer;
} 
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function findMakerFromModel
 * @param {String} model model name to search on
 * @param {array} makesModels array product makers with models
 * @returns {String} - Maker name
 */
export function getMakerFromModel(makesModels, model) {   
    if (!model) throw new AppError('from findMakerFromModel: model parameter is empty');
    if (!makesModels || makesModels.length === 0) throw new AppError('from findMakerFromModel: makesModels parameter is empty');
    
    let foundName;
    makesModels.map((maker,idx) => {
        maker.sellerProducts.map(sellerProduct => {
            if (sellerProduct.productTitle.toUpperCase() === model.toUpperCase()) {               
                foundName = maker.sellerName;
            }
        });
    });

    return foundName;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function findMakerFromModel
 * @param {String} model model name to search on
 * @param {array} makesModels array product makers with models
 * @returns {String} - Maker name
 */
export function getSizeFromModel(makesModels, model) {   
    if (!model) throw new AppError('from findMakerFromModel: model parameter is empty');
    if (!makesModels || makesModels.length === 0) throw new AppError('from findMakerFromModel: makesModels parameter is empty');
    let foundName;
    makesModels.map((maker,idx) => {
        maker.sellerProducts.map(sellerProduct => {
            if (sellerProduct.productTitle.toUpperCase() === model.toUpperCase()) {               
                foundName = sellerProduct.productSize;
            }
        });
    });

    return foundName;
}
export const getSearchInfo = (searchInfo, oldValue, update) => {
    if (searchInfo.indexOf("All Harps")>-1) searchInfo = '';
    let idx = searchInfo.indexOf(oldValue);
    if (idx>-1) searchInfo = searchInfo.slice(0,idx) + searchInfo.slice(idx+oldValue.length+2);
    return `${update}, ${searchInfo}`;
}
export const itemsSortByDisabled = (items, currentItems) => {
    let itemsWithDisabled = [];
    const sortItems = [];
    items.map(model => {
        itemsWithDisabled.push({name:model,disabled:!currentItems.find(currentModel => currentModel === model)})  
    });
    itemsWithDisabled.sort((a, b) => a.disabled-b.disabled || a.name.localeCompare(b.name));  
    let lastValue=false; //to add 'no listings'
    itemsWithDisabled.map(modelboo => {
        if (lastValue !== modelboo.disabled) sortItems.push('---no listings---');
        sortItems.push(modelboo.name)
        lastValue = modelboo.disabled;
    });
    return sortItems;
}
