import {useState, useEffect} from 'react';
import axios from 'axios';
import parseNum from 'parse-num';
import { STOREPARTNER_PLACEHOLDER, PRODUCTAD_PLACEHOLDER } from '../constants/constants';

//leaf function helps find nested object keys,
export function leaf(obj, path) {(path.split('.').reduce((value,el) => value[el], obj))} //from StackOverflow

async function getDrivingDistance(lat1, long1, lat2, long2) {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidG11cnZ2IiwiYSI6ImNrMHUxcTg5ZTBpN3gzbm4wN2MxYnNyaTgifQ.7p5zmmb6577ofkAIGVUcwA`);
        return response.data.routes[0].distance;
    } catch (error) {
        console.error(error);
    }
}

export function triggerLazy() {
    window.scrollBy(0,1); //hack to trigger lazyload after search
    window.scrollBy(0,-1); //hack to trigger lazyload after search
}
export function removeDashOE(sellerName) {
    return sellerName.includes("-o")||sellerName.includes("-e")
        ?sellerName.substr(0,sellerName.length-2)
        :sellerName;
}
/**
 * Gets window size (innerWidth) only if on client side
 * courtesy of Gabe Ragland useHooks.com
 * @function getWindowSize
 * @returns {Number} - innerWidth from window
 */
export function getWindowSize() { 
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
    // short cut if not lever or pedal harp
    if (type && type=='lever-free'&&!strings.toString().toUpperCase().startsWith('WIRE')) return 'lever-free';
    if (type && type.toUpperCase()==='ELECTRIC') return 'Electric';
    //#region added for builder harp menu
    if (strings&&strings.toString().toUpperCase()=='WIRE') return 'Wire';
    if (strings&&strings.toString().toUpperCase()=='CROSS') return 'Cross';
    if (strings&&strings.toString().toUpperCase()=='DOUBLE') return 'Double';
    if (strings&&strings.toString().toUpperCase()=='TRIPLE') return 'Triple';
    if (strings&&strings.toString().toUpperCase()=='CARBON FIBER') return 'Carbon Fiber';
    //#endregion
    if (strings&&strings.toString().toUpperCase()=='WIRE/CROSS/DOUBLE/TRIPLE') return 'wire/cross/double/triple';
    // strings to number type
    strings = parseInt(strings);
    // return size ranges
    if (strings<29&&type==='lever') return 'small lever';
    if (strings<35&&type==='lever') return 'medium lever';
    if (strings<44&&type==='lever' ) return 'large lever';  
    if (strings<46) return 'small pedal';
    if (strings===46) return 'semi-grand pedal';
    if (strings>46) return 'concert grand pedal';
    // return not found
    return 'size not found'
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function findPriceRange
 * @param {string} price price from seller website listing
 * @requires parseNum turns price string into number with typeof number
 * @returns {String} - Price Range from Price Menu
 */
export function findPriceRange(price, rate) {
    // HACK 'Contact 4harpmusic.com' returns 4
    if (price&&price.toUpperCase().indexOf('CONTACT')>-1) price = 'contact seller';
    // convert price string to number and convert currency if necessary
    price = parseNum(price)*rate;
    // determine price range
    if (price<2000) return 'Less than $2,000';
    if (price>=2000&&price<5000) return '$2,000-4,999';
    if (price>=5000&&price<9999) return '$5,000-9,999';
    if (price>=10000&&price<19999) return '$10,000-19,999'; 
    if (price>=20000&&price<29999) return '$20,000-29,999'; 
    if (price>29999&&price<150000) return '$30,000 plus';
    // if no number
    return 'contact seller'
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
    if (productMaker.toUpperCase() !== "ALL MAKERS"){
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
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function getFilteredProducts
 * @param {array} allProducts Product list
 * @param {array} allState list of filters selected by user
 * @returns {String} - Product List with filetersApplied
 */
export function getFilteredProducts(allProducts, allState, user, rate) {
    let filteredProducts = [...allProducts];
    // Eliminate findaharp known finish listing in object NOT YET IMPLEMENTED - transfer this info to Mongo
    filteredProducts = filteredProducts.filter(product => product.productMaker !== 'findaharpFinishes');
    // apply filters // not yet implemented map from array or refactor to function
    if (allState.size&&allState.size.toUpperCase() === "ALL PEDAL") 
        filteredProducts = filteredProducts.filter(
            product => product.productType&&product.productType === 'pedal'
        );    
    if (allState.size&&allState.size.toUpperCase() === "ALL LEVER") 
        filteredProducts = filteredProducts.filter(
            product => product.productType&&product.productType === 'lever'
        );
    if (allState.model&&allState.model.toUpperCase() !== "ALL MODELS") 
        filteredProducts = filteredProducts.filter(
            product => product.productModel&&product.productModel === allState.model
        );
    if (allState.maker && allState.maker.toUpperCase() !== "ALL MAKERS") 
        filteredProducts = filteredProducts.filter(
            product => product.productMaker&&product.productMaker === allState.maker
        );
    if (allState.location&&allState.location.toUpperCase() !== "ALL LOCATIONS") {
        if (allState.location.startsWith('Less than')) {
            if(allState.location.startsWith('Less than 100')) {
                filteredProducts = filteredProducts.filter(
                    product => (product.distance&&product.distance<100)||product.distance===0
                );
            }
            if(allState.location.startsWith('Less than 300')) {
                filteredProducts = filteredProducts.filter(
                    product => (product.distance&&product.distance<300)||product.distance===0
                );
            }
            if(allState.location.startsWith('Less than 500')) {
                filteredProducts = filteredProducts.filter(
                    product => (product.distance&&product.distance<500)||product.distance===0
                );
            }
        } else {
            filteredProducts = filteredProducts.filter(
                product => product.sellerRegion&&product.sellerRegion === allState.location
            );
        }
    }
    if (allState.finish&&allState.finish.toUpperCase() !== "ALL FINISHES") 
        filteredProducts = filteredProducts.filter(
            product => product.productFinish&&product.productFinish.toUpperCase() === allState.finish.toUpperCase()
        );
    if (allState.price&&allState.price.toUpperCase() !== "ALL PRICES") {
        filteredProducts = filteredProducts.filter(product => product.productPrice&&findPriceRange(product.productPrice, user.currency==="USD"?1:rate)===allState.price);
    }
    // if size all pedal or all lever ready for return
    if (allState.size&&(allState.size.toUpperCase() === "ALL PEDAL"||allState.size.toUpperCase() === "ALL LEVER"||allState.size.toUpperCase() === "LEVER-FREE"))
        return filteredProducts;
    // size filter
    if (allState.size&&allState.size.toUpperCase() !== "ALL SIZES") {
        filteredProducts = filteredProducts.filter(
            product => allState.size.toUpperCase().startsWith(findSizeWords(product.productSize, product.productType).toUpperCase())
        );
    }
    return filteredProducts;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function addPlaceholderProducts
 * @param {array} filteredproductscontainer Filtered Product Array
 * @param {number} width inner window width
 * @returns {array} - Product array with placeholders
 */
export function addPlaceholderProducts(filteredproductscontainer, width) {
    // copy data and remove current placeholders
    const filteredProductsCopy = filteredproductscontainer.filter(product => product.productTitle !== '');  
    //shortcut
    if (width<=850) return filteredProductsCopy;
    //determine number of placeholders needed
    let numNeeded;
    if (width > 1200) {
        numNeeded = 5-(filteredProductsCopy.length%5);
    }
    if (width <= 1200 && width > 950) {
        numNeeded = 4-(filteredProductsCopy.length%4);
    }
    if (width <= 950 && width > 700) {
        numNeeded = 3-(filteredProductsCopy.length%3);
    }
    //add placeholders
    let blankAd = {...PRODUCTAD_PLACEHOLDER}
    for (var x = 0; x<numNeeded; x++) {
        const adId = {...blankAd, id:x}
        filteredProductsCopy.push(adId);
    }
    //return array
    return filteredProductsCopy;
}
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function addPlaceholderStorePartners
 * @param {array} storePartnersContainer Store Partner Array
 * @param {number} width inner window width
 * @returns {array} - Store Partner array with placeholders
 */
export function addPlaceholderStorePartners(storePartnersContainer, width) {
    //shortcut
    if (width<=850) return storePartnersContainer;
    // determine number of placeholders needed
    let numNeeded = 0;
    if (width > 1800) {
        numNeeded = 5-(storePartnersContainer.length%5);
    }
    if (width <= 1800 && width >1500) {
        numNeeded = 4-(storePartnersContainer.length%4);
    }
    if (width <= 1500 && width >1250) {
        numNeeded = 3-(storePartnersContainer.length%3);
    }
    if (width <= 1250 && width > 850) {
        numNeeded = 2-(storePartnersContainer.length%2);
    }
    //add placeholders
    let storePartner = {...STOREPARTNER_PLACEHOLDER}; 
    for (var x = 0; x < numNeeded; x++) {
        const adId = {...storePartner, id:x}
        storePartnersContainer.push(adId);
    }
    //return array
    return storePartnersContainer;
} 
/**
 * Finds the maker of a certain Model from makers/models JSON-style object
 * @function getMakerFromModel
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
 * @function getSizeFromModel
 * @param {array} makesModels array product makers with models
 * @param {String} model model name to search on
 * @returns {String} - Model size
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
/**
 * Returns string of all currently selected filters
 * @function getSearchInfo
 * @param {object} current state including filter selections
 * @returns {String} - search info string
 */
export const getSearchInfo = (allState) => {
    // shortcut if no filters selected
    if (allState.searchInfo&&allState.searchInfo.indexOf("All Harps")>-1) allState.searchInfo = '';
    if (document&&document.querySelector('.clearAll')) document.querySelector('.clearAll').style.display='none';
    // prepare comparison array to eliminate not-selected filters
    const initArr = ['All Sizes', 'All Makers', 'All Models', 'All Finishes', 'All Prices', 'All Locations']
    // prepare array of only filter selections from state
    const menuArr = [allState.size, allState.maker, allState.model, allState.finish, allState.price, allState.location];
    // append searchInfo string with only selected filter information
    let searchInfo='';
    menuArr.map(menuItem => {
        if(!initArr.includes(menuItem)) searchInfo += `${menuItem} | `
        if (document&&document.querySelector('.clearAll')) document.querySelector('.clearAll').style.display='flex';
    });
    
    return searchInfo;
}
export const itemsSortByDisabled = (items, currentItems) => {
    let itemsWithDisabled = [];
    const sortItems = [];
    items.map(model => {
        itemsWithDisabled.push({name:model,disabled:!currentItems.find(currentModel => currentModel === model)})  
    });
    itemsWithDisabled.sort((a, b) => a.disabled-b.disabled || (a.name&&b.name&&a.name.localeCompare(b.name)));  
    let lastValue=false; //to add 'no listings'
    itemsWithDisabled.map(modelboo => {
        if (lastValue !== modelboo.disabled) sortItems.push('---no listings---');
        sortItems.push(modelboo.name)
        lastValue = modelboo.disabled;
    });
    return sortItems;
}
/**
 * Returns distance, unit
 * @function getDrivingDistance - based on function from GeoDataSource
 * @param {number} lat1
 * @param {number} long1
 * @param {number} lat2
 * @param {number} long2
 * @returns {number} - driving distance in meters
 */
// export const getDrivingDistance = async (lat1, long1, lat2, long2) => {
//     try {
//         const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidG11cnZ2IiwiYSI6ImNrMHUxcTg5ZTBpN3gzbm4wN2MxYnNyaTgifQ.7p5zmmb6577ofkAIGVUcwA`);
//         return response.data.routes[0].distance;
//     } catch (error) {
//         console.error(error);
//     }
// }

/**
 * Returns distance, unit
 * @function getGeoDistance - based on function from GeoDataSource
 * @param {number} lat1
 * @param {number} long1
 * @param {number} lat2
 * @param {number} long2
 * @param {string} unit 'm','k','n' miles, kms, nautical miles respectively
 * @returns {number} - distance
 */
export const getGeoDistance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function shuffle(array) { // based on Fisher-Yates
    // initialize variables
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

export function shuffleStorePartners(partnerArray) {
    const storePartners = [];
    // create array of indexes for shuffling
    let indexArray = [...Array(partnerArray.length).keys()];
    // shuffle indexes
    shuffle(indexArray);
    // push stores objects to array in randomized order
    indexArray.map(idx => storePartners.push(partnerArray[idx]));
    return storePartners
}

export function parseJwt (token) {
    if (!token) {console.log('From /utils/parseJwt: Token is Null'); return;}
    var base64Url = token.split('.')[1];
    if (!base64Url) {console.log('From /utils/parseJwt: base64 split on "." not successful.'); return;}
    
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
