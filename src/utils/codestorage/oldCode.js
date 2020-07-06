//LOGIN/SIGNUP CSS
// .check-input label:after {
            //     opacity: 0;
            //     content: "";
            //     position: absolute;
            //     width: 7px;
            //     height: 4px;
            //     background: transparent;
            //     top: 3px;
            //     left: 3px;
            //     border: 2px solid #FFF;
            //     border-top: none;
            //     border-right: none;
            //     -webkit-transform: rotate(-45deg);
            //     -moz-transform: rotate(-45deg);
            //     -o-transform: rotate(-45deg);
            //     -ms-transform: rotate(-45deg);
            //     transform: rotate(-45deg);
            // }
            
            // .check-input label:hover:after {
            //     -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            //     filter: alpha(opacity=50);
            //     opacity: 0.5;
            // }
            
            // .check-input input[type=checkbox]:checked + label:after {
            //     -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            //     filter: alpha(opacity=100);
            //     opacity: 1;
            // }



// <div className='longDesc'><span>Description</span><br></br>{longDesc?productLongDesc.substr(0,240):productLongDesc}              
// <span className='moreButton' onClick={()=>{
//    if (!longDesc) document.querySelector('.longDesc').style.overflowY='none';
//    if (longDesc) document.querySelector('.longDesc').style.overflowY='auto';
//    setLongDesc(!longDesc);
//  }} hidden={productLongDesc.length<240}>{longDesc?' more...':' less...'}</span></div>  */}
//<span className='moreButton' onClick={()=>setLongDesc(!longDesc)} hidden={productLongDesc.length<199}>{longDesc?' more...':' less...'}</span></p


// useEffect(() => {
        
//     const copyProds = [filteredproductscontainer];
     
//     console.lok('useEffect', copyProds);
    // let numNeeded;
    // if (size.width > 1200) {
    //     numNeeded = 5-(copyProds.length%5);
    //     console.lok(numNeeded);
    // }
    // if (size.width <= 1200 && size.width > 950) {
    //     numNeeded = 4-(copyProds.length%4);
    // }
    // if (size.width <= 950 && size.width > 700) {
    //     numNeeded = 3-(copyProds.length%3);
    //     console.lok(numNeeded);
    // }
    // let newAd = {
    //     divider: "00000000000000000000000",
    //     id: "d101837f-27dc-48ff-952f-175c5dc47d2d",
    //     productFinish: "walnut",
    //     productImageBestColor: "#eeeeee",
    //     productImageUrl: "./img/logo_findaharp.png",
    //     productLongDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis elit in ipsum commodo ornare. Vivamus luctus enim eget tortor sollicitudin laoreet. Curabitur ex tellus, fermentum interdum massa in, ullamcorper sollicitudin ex. Sed eu accumsan turpis. Suspendisse molestie velit eu rhoncus pharetra. Sed vel elementum metus. Pellentesque cursus eros sit amet erat suscipit dictum. Phasellus egestas leo risus, eget molestie tortor interdum ut. Proin non tempus massa. Ut viverra mi ac consectetur tristique. Pellentesque blandit ut felis fringilla blandit. Vivamus imperdiet quam vitae lectus pellentesque, laoreet malesuada elit dapibus. Suspendisse tristique interdum pellentesque. Ut nisl mi, eleifend sed nisl vel, convallis euismod dui. Mauris vitae dignissim enim. Ut imperdiet diam nunc, sed rutrum purus accumsan eu. Sed tempus lectus erat. Integer condimentum laoreet tempor. Nam ullamcorper odio eu mattis mollis. In vel ante tellus. Ut efficitur eros et faucibus egestas. Ut et turpis vitae quam auctor egestas. Sed tristique nunc sit amet est volutpat, sit amet ultricies diam consectetur. Donec arcu turpis, ornare volutpat felis placerat, sollicitudin pretium dui. Duis congue risus purus, sed hendrerit odio imperdiet sit amet. Cras id faucibus nunc. Vivamus sed metus sit amet lorem rhoncus pulvinar eu id sem.",
    //     productMaker: "_",
    //     productModel: "_",
    //     productPrice: "$17,500.00",
    //     productShortDesc: "Short description not available",
    //     productSize: 0,
    //     productTitle: "Filler Product",
    //     productType: "pedal",
    //     sellerCountry: "USA",
    //     sellerName: "_",
    //     sellerRegion: "Mid-West"
    // }
    // // // console.lok(iterProds.length)
    // for (var x = 0; x<numNeeded; x++) {
    //     const adId = {...newAd, id:x}
    //     copyProds.push(adId);
    // }
//     setAdjProducts(copyProds);

// }, []);



// function handlePedalLeverChange(e) {
//     // get text for menu buttons
//     let text;
//     if (e.target.value && e.target.value === 'all') text = 'Select Harp Model';       
//     if (e.target.value && e.target.value === 'pedal') text ='Select Pedal Model';
//     if (e.target.value && e.target.value === 'lever') text = 'Select Lever Model';      
//     // update state
//     setAllState({...allState, 
//         productType: e.target.value,
//         selectionType: '',
//         size: 'Select Harp Size',
//         maker: 'Select Harp Maker',
//         model: text
//     }); 
// }


// export function findModelHelper(products, model) {
//     products.find(product => {
//         if (product.productModel===model) {
//             return true;
//         }      
//     });
//     return false;
// }

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