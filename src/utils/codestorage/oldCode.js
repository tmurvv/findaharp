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