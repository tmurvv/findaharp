// packages
import React, {useReducer, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
// styles
import TestGridCss from '../styles/TestGrid.css';
// internal
import ProductModal from './ProductModal';
import ContactForm from './ContactForm';
import Product from './Product';
import { removeDashOE, setOpacity, getWindowSize } from '../utils/helpers';
import { productsReducer } from '../utils/reducers';
// Hook

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const TestGrid = ({ filteredproducts }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [adjProducts, setAdjProducts] = useState(filteredproducts);
    const size = getWindowSize();

    function handleOpenDetail(product) {
        dispatch({type:'detail', product});
        setOpacity(true); 
    }
    function handleCloseDetail(evt, product, openContact) {
        dispatch({type: 'initial'})
        setOpacity(false);
        if (openContact) handleOpenContact(evt, product);
    }
    function handleOpenContact(evt, product) {
        evt.stopPropagation();
        dispatch({type:'contact', product})
        setOpacity(true);
    }
    function handleCloseContact() {
        dispatch({type:'initial'})
        setOpacity(false);
    }
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '85%') evt.target.style.height="100%";
    }
    useEffect(() => {
        console.log('here', size.width);
        const copyProds = [...filteredproducts]
        // console.log(filteredProductsCopy[15])
        let numNeeded;
        if (size.width > 1200) {
            numNeeded = 5-(copyProds.length%5);
            console.log(numNeeded);
        }
        const newAd = {
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
            copyProds.push(newAd);
        }
        
        
        setAdjProducts(copyProds);
        // console.log(filteredProductsCopy[58])

    }, []);
    if (filteredproducts&&filteredproducts.length>0) {
        return(  
            <div data-test='component-ProductContainer' className='productContainer'>    
                {size.width}
                <div className="grid-container" style={{'opacity': `${state.opacity}`}}>
                    {adjProducts.map(product => <Product 
                        key={product.id}
                        productdetail={product}
                        handleopendetail={handleOpenDetail} 
                        handleclosedetail={handleCloseDetail} 
                        handleopencontact={handleOpenContact} 
                        handleclosecontact={handleCloseContact} 
                        />
                    )}
                </div>
                {state.openDetail
                    &&<ProductModal 
                        product={state.productSelect} 
                        handleCloseDetail={handleCloseDetail} 
                        handleOpenContact={handleOpenContact} 
                        handleCloseContact={handleCloseContact}
                />}
                {state.openContact
                    &&<ContactForm 
                        product={state.productSelect}
                        handleCloseContact={handleCloseContact}     
                />}
                <TestGridCss />           
            </div>
        );
    } else {
        return(
            <>
                <h3 style={{textAlign: 'center'}}>Not found in our listings</h3>
                <h3 style={{textAlign: 'center'}}>Please try again using fewer filters.</h3>    
                <div data-test='component-ProductContainer' className='notFoundContainer'>
                    <img src= './img/not_found.png' alt='not found, humourous harp with broken strings'/>
                </div>
                <TestGridCss />
            </>
        );
    }    
}

export default TestGrid;


// let newDiv = props => React.createElement('div', { className: 'productSmallDisplay', onClick: props.onClick })
                
//                 // newDiv.classList.add('productSmallDisplay');
//                 //image Div 
//                 const imgDiv = document.createElement("div");
//                 imgDiv.classList.add('productSmallDisplay-img');
//                 imgDiv.onclick=() => handleOpenDetail;
//                 //lazyload div
//                 const lazyDiv = document.createElement("LazyLoad");
//                 lazyDiv.classList.add('productSmallDisplay-img');
//                 lazyDiv.once=true
//                 lazyDiv.offset=300
//                 lazyDiv.placeholder='<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />'
//                 //image
//                 const productImg = document.createElement("img");
//                 productImg.src = product.productImageUrl;
//                 productImg.id=product.id
//                 productImg.onError= (evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%'};
//                 productImg.onLoad= (evt) => handleImageLoad(evt)
//                 productImg.alt=product.productTitle
                //*** insert divs */
                // imgDiv.insertAdjacentElement('beforeend', productImg);
                // lazyDiv.insertAdjacentElement('beforeend', imgDiv);
                // newDiv.insertAdjacentElement('beforeend', lazyDiv);
                    
                // //****Make Divs--text */
                // const textDiv = document.createElement('div');
                // textDiv.classList.add('productSmallDisplay-text');
                // textDiv.classList.add('grid-item');
                // const textDivP0 = document.createElement('p');
                // textDivP0.innerHTML = `${product.productMaker} ${product.productModel}`;
                // const textDivP1 = document.createElement('p');
                // textDivP1.innerHTML = `${product.productSize} Strings`;
                // const textDivP2 = document.createElement('p');
                // textDivP2.innerHTML = removeDashOE(product.sellerName);
                // textDivP2.onClick = ()=>handleOpenContact(e, product);
                // textDivP2.style.textDecoration='underline';
                // //insert divs
                // textDiv.insertAdjacentElement('beforeend', textDivP0);
                // textDiv.insertAdjacentElement('beforeend', textDivP1);
                // textDiv.insertAdjacentElement('beforeend', textDivP2);
                // newDiv.insertAdjacentElement('beforeend', textDiv);
                // document.querySelector('.grid-container').insertAdjacentElement('beforeend', newDiv); 