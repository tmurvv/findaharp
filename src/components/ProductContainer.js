// packages
import React, {useReducer, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
// styles
import ProductContainerCss from '../styles/ProductContainer.css';
// internal
import ProductModal from './ProductModal';
import ContactForm from './ContactForm';
import Product from './Product';
import { addPlaceholderProducts, setOpacity, useWindowSize } from '../utils/helpers';
import { productsReducer } from '../utils/reducers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const ProductContainer = ({ filteredproductscontainer, allstate }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [adjProducts, setAdjProducts] = useState(filteredproductscontainer);
    const size = useWindowSize();
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
    
    if (filteredproductscontainer&&filteredproductscontainer.length>0) {
        const addPlaces=addPlaceholderProducts(filteredproductscontainer, size.width);
        return(  
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container" style={{'opacity': `${state.opacity}`}}>
                    {addPlaces.map(product => <Product 
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
                <ProductContainerCss />           
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
                <ProductContainerCss />
            </>
        );
    }    
}

export default ProductContainer;


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