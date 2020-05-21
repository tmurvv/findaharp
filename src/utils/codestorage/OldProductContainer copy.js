// packages
import React, {useReducer, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
// styles
import ProductContainerCss from '../styles/ProductContainer.css';
// internal
import ProductModal from './ProductModal';
import ContactForm from './ContactForm';
import { removeDashOE,setOpacity } from '../utils/helpers';
import { productsReducer } from '../utils/reducers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
function ProductContainer(props) {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const { filteredproducts } = props;
    
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
    if (filteredproducts&&filteredproducts.length>0) {
        const gridProducts = filteredproducts.map(product => (
            <div 
                key={product.id} 
                id={product.id} 
                className={`grid-item productSmallDisplay`} 
                onClick={() => handleOpenDetail(product)}
            >
                <div className={`productSmallDisplay-img`}>
                    <LazyLoad
                        once={true}
                        offset={300}
                        placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                    >
                        <img 
                            id={product.id} 
                            src={product.productImageUrl} 
                            onError={(evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%';}} 
                            onLoad={(evt) => handleImageLoad(evt)}
                            alt={product.productTitle}
                        />
                    </LazyLoad>
                </div>
                <div className={`grid-item productSmallDisplay-text`}>
                    <p>{product.productMaker} {product.productModel}<br></br>
                    {product.productSize} Strings<br></br>
                    <span 
                        onClick={(e)=>handleOpenContact(e, product)} 
                        style={{textDecoration: 'underline'}}
                    >
                        {removeDashOE(product.sellerName)}
                    </span>
                    </p>
                </div>           
            </div>
        ));
        return( 
            <>      
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container" style={{'opacity': `${state.opacity}`}}>
                    {gridProducts}
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
            </div>
            <ProductContainerCss />           
            </>
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
