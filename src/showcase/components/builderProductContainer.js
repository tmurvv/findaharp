// packages
import React, {useReducer, useEffect, useState } from 'react';
import uuid from 'react-uuid';
// styles
import ProductContainerCss from '../styles/builderProductContainer.css';
// internal  
import ProductModal from './builderProductModal';
import ContactSellerForm from '../../main/components/main/ContactSellerForm';
import Product from './builderProduct';
import { addPlaceholderProducts, setOpacity, getWindowSize } from '../../main/utils/helpers';
import { productsReducer } from '../../main/reducers/reducers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const ProductContainer = ({ filteredproductscontainer, allstate, clientlat, clientlong }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
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
    function handleCloseContact(evt, product) {
        product?dispatch({type:'detail', product}):dispatch({type:'initial'});
        setOpacity(false);
    }
    
    if (filteredproductscontainer&&filteredproductscontainer.length>0) {
        const addPlaces=addPlaceholderProducts(filteredproductscontainer, size.width);
        return(  
            <div data-test='component-ProductContainer' className='productContainer'>
                {allstate&&allstate.maker&&allstate.maker!=='All Builders'&&
                    // <div style={{backgroundColor: 'tomato', textAlign: 'center', width: '100%', marginTop: '-30px', marginBottom: '30px', fontSize: '14px'}}>
                    //     Visit builder website: <a style={{fontStyle: 'italic', fontSize: '14px', color: '#6A75AA'}} href={`${allstate.builderInfo&&allstate.builderInfo.sellerWebsite&&allstate.builderInfo.sellerWebsite}`}> {allState.builderInfo&&allState.builderInfo.sellerWebsiteText&&allState.builderInfo.sellerWebsiteText}</a>
                    // </div>
                    <div style={{backgroundColor: `${allstate.builderInfo.bannerBackgroundColor}`, display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px'}}>
                        {allstate.maker!=="All Builders"&&<><img style={{height: '150px', borderRadius: '3px'}} src={`${allstate.builderInfo.sellerBanner&&allstate.builderInfo.sellerBanner}`} alt='harp maker logo' /></>}
                    </div>
                }
                <div className="grid-container" style={{'opacity': `${state.opacity}`}}>
                    {addPlaces.map(product => <Product 
                        key={uuid()}
                        productdetail={product}
                        handleopendetail={handleOpenDetail} 
                        handleclosedetail={handleCloseDetail} 
                        handleopencontact={handleOpenContact} 
                        handleclosecontact={handleCloseContact}
                        clientlat={clientlat} 
                        clientlong={clientlong}
                        />
                    )}
                </div> 
                {state.openDetail
                    &&<ProductModal 
                        product={state.productSelect} 
                        handleCloseDetail={handleCloseDetail} 
                        handleOpenContact={handleOpenContact} 
                        handleCloseContact={handleCloseContact}
                        clientlat={clientlat}
                        clientlong={clientlong}
                        // setOpenDetail={setOpenDetail}
                />}
                {state.openContact
                    &&<ContactSellerForm 
                        product={state.productSelect}
                        handleCloseContact={handleCloseContact}     
                />}
                <ProductContainerCss />           
            </div>
        );
    } else {
        return (            
            <> 
            {allstate.location!=='ltActivate'
                ?
                <>
                    <h3 style={{textAlign: 'center', marginBlockEnd: 0}}>Not Found. Select "Clear" to see harp listings.</h3>
                    <h3 style={{textAlign: 'center', marginBlockStart: 0}}>Searching by Driving Distance? Be sure location is enabled on your device.</h3>    
                    <div data-test='component-ProductContainer' className='notFoundContainer'>
                        <img src='./img/not_found.png' alt='not found, humourous harp with broken strings'/>
                    </div>
                    <ProductContainerCss />
                </>
                :
                <div style={{height: '300px'}}>
                </div>
            }
            </>
        );
    }    
}

export default ProductContainer;
