// packages
import React, {useReducer, useEffect, useState } from 'react';
import uuid from 'react-uuid';
// styles
import StoreProductContainerCss from '../../../styles//StoreProductContainer.css';
// internal
import StoreProductModal from './StoreProductModal';
import StoreProduct from './StoreProduct';
import { addPlaceholderProducts, setOpacity, getWindowSize } from '../../helpers';
import { productsReducer } from '../../../reducers/reducers';
import {
    triggerLazy
} from '../../helpers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const StoreProductContainer = ({ filteredproductscontainer, allstate, clientlat, clientlong }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [ detailProduct, setDetailProduct ] = useState([]);

    const size = getWindowSize();
    function handleOpenDetail(product) {
        // dispatch({type:'detail', product});
        setDetailProduct(product);
        // setOpacity(true); 
    }
    function handleCloseDetail() {
        // dispatch({type: 'initial'})
        // setOpacity(false);
        // if (openContact) handleOpenContact(evt, product);
        setDetailProduct([]);
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
    useEffect(() => {
        triggerLazy();
    },[]);
    if (filteredproductscontainer&&filteredproductscontainer.length>0) {
        // get number per row


        // get length of results


        // get starting number


        // splice results

        // const addPlaces=addPlaceholderProducts(filteredproductscontainer, size.width);
        let addPlaces=filteredproductscontainer;


        return(
            
            <div data-test='component-ProductContainer' className='storeproductContainer'>
                <h3 style={{width: '100%', textAlign: 'left', margin:'auto', marginBottom: '-15px', marginTop: '50px', fontFamily: "Metropolis Extra Bold", textTransform: 'uppercase'}}>Search Results: </h3>
                <div className="storegrid-container">
                    {addPlaces.map(product => <StoreProduct 
                        key={uuid()}
                        productdetail={product}
                        handleopendetail={handleOpenDetail} 
                        handleclosedetail={handleCloseDetail}
                        />
                    )}
                </div>
                {detailProduct&&detailProduct.title?
                    <StoreProductModal 
                        product={detailProduct} 
                        handleCloseDetail={handleCloseDetail}
                />:''
                }
                <StoreProductContainerCss />           
            </div>
        );
    } else {
        return (            
            <> 
            {/* {allstate.location!=='ltActivate'
                ? */}
                <>
                    <h3 style={{textAlign: 'center', marginBlockEnd: 0, width: '60%', margin: 'auto'}}>Not Found.<br />Please 'clear all' searches to see other items.</h3>
                    <div data-test='component-ProductContainer' className='storenotFoundContainer'>
                        <img src='./img/not_found.png' alt='not found, humourous harp with broken strings'/>
                    </div>
                    <StoreProductContainerCss />
                </>
                {/* :
                <div style={{height: '300px'}}>
                </div>
            } */}
            </>
        );
    }    
}

export default StoreProductContainer;
