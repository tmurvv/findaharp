import React, {useReducer} from 'react';

// internal
import ProductModal from './ProductModal';
import ContactForm from './ContactForm';
import ProductContainerCss from '../styles/ProductContainer.css';
import {removeDashOE} from '../utils/helpers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
function reducer(state, action) {
    switch (action.type) {
        case 'detail':
            return {
                openDetail: true,
                openContact: false,
                productSelect: action.product,
                opacity: .1
            }
        case 'contact':
            return {
                openDetail: false,
                openContact: true,
                productSelect: action.product,
                opacity: .1,
            }
        case 'initial':
            return {
                openDetail: false,
                openContact: false,
                productSelect: null,
                opacity: 1
            }
    }
}
function ProductContainer(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleOpenDetail(product) {
        dispatch({type:'detail', product})
        document.body.style.overflowY='hidden';
    }
    function handleCloseDetail(evt, product, openContact) {
        dispatch({type: 'initial'})
        document.body.style.overflowY='auto';
        if (openContact) handleOpenContact(evt, product);
    }
    function handleOpenContact(evt, product) {
        evt.stopPropagation();
        dispatch({type:'contact', product})
        document.body.style.overflowY='hidden'; 
    }
    function handleCloseContact() {
        dispatch({type:'initial'})
        document.body.style.overflowY='auto';
    }
    function handleImageLoad(evt) {
        evt.target.hidden=false; evt.target.nextElementSibling.hidden=true;
        evt.target.parentElement.style.backgroundColor="#FFFFFF";
        evt.target.style.height="100%";
    }
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        const gridProducts = props.filteredproducts.map(product => (
            <div key={product.id} id={product.id} className={`grid-item productSmallDisplay`} onClick={() => handleOpenDetail(product)}>
                <div className={`productSmallDisplay-img image`}>
                    <img 
                        hidden={true}
                        src= {product.productImageUrl} 
                        onLoad={(evt) => handleImageLoad(evt)} 
                        onError={(evt) => {evt.target.src='./img/golden_harp_full_not_found.png';evt.target.style.backgroundColor='#000000'}} 
                        alt={product.productTitle}
                    />
                    <img 
                        id={product.id} 
                        src= 'https://findaharp-api.herokuapp.com/assets/img/golden_harp_full.png' 
                        height='60%' 
                        alt={product.productTitle}
                    />
                </div>
                <div className={`grid-item productSmallDisplay-text`}>
                    <p>{product.productMaker} {product.productModel}/{product.productSize}<br></br>
                    {removeDashOE(product.sellerName)}<br></br>
                    <span onClick={(e)=>handleOpenContact(e, product)}>Contact Seller</span>
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
                
                {state.openDetail&&<ProductModal product={state.productSelect} handleCloseDetail={handleCloseDetail} handleOpenContact={handleOpenContact} handleCloseContact={handleCloseContact}/>}
                {state.openContact&&<ContactForm handleCloseContact={handleCloseContact} product={state.productSelect}/>}  
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
                <img src= './img/golden_harp_full_not_found.png' alt='harp in silhouette'/>
            </div>
            <ProductContainerCss />
            </>
        );
    }    
}

export default ProductContainer;
