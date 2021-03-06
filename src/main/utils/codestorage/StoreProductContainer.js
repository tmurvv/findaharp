// packages
import React, { useReducer, useEffect, useState, useCallback, useRef } from 'react';
import uuid from 'react-uuid';
import InfiniteScrollLoading from "react-infinite-scroll-loading";
import debounce from "lodash.debounce";
import axios from "axios";
// Components
import StoreProduct from '../onlineStore/StoreProduct';
import StoreResults from '../onlineStore/StoreResults';
// other internal
import StoreProductContainerCss from '../../styles//StoreProductContainer.css';
import { setOpacity } from '../helpers';
import { productsReducer } from '../../reducers/reducers';
import { triggerLazy } from '../helpers';
 
const GITHUB_API = "https://api.github.com";

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const StoreProductContainer = ({ filteredproductscontainer, allstate, clientlat, clientlong }) => {
  const repoArray = Symbol.iterator in Object(filteredproductscontainer)?[...filteredproductscontainer]:[];  
  const [state, dispatch] = useReducer(productsReducer, initialState);
    const [ detailProduct, setDetailProduct ] = useState([]);
    const [ repoList, setRepoList] = useState([]);
    const [ hasMore, setHasMore] = useState(false);
    const [ resetPage, setResetPage] = useState(false);
    const [ isLoading, setIsLoading] = useState(false);
    const [ winWidth, setWinWidth ] = useState(4000);
    const idx = useRef(0)

    
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

    const getStarted = () => {
      setRepoList([...repoList, ...repoArray.slice(idx.current,idx.current+3)]);
      setHasMore(true);
      setIsLoading(false);
      if (repoArray.slice(idx.current,idx.current+3).length < 3) {
        setHasMore(false);
      } else {
        idx.current = idx.current + 3;
      }
    }
    const debounceSearch = useCallback(
        debounce(val => {
          axios
            .get(`${GITHUB_API}/search/repositories`, {
              params: { page: 1, q: val }
            })
            .then(res => {
              setRepoList(res.data.items);
              setIsLoading(false);
              setResetPage(false);
              if (res.data.items.length < 30) {
                setHasMore(false);
              } else {
                setHasMore(true);
              }
            });
        }, 500),
        []
      );
    
      const loadMore = page => {
        if (repoList.length===repoArray.length) return;
        setIsLoading(true);
        
        // axios
        //   .get(`${GITHUB_API}/search/repositories`, {
        //     params: { page, q: searchVal }
        //   })
        //   .then(res => {
            setRepoList([...repoList, ...repoArray.slice(idx.current,idx.current+3)]);
            setHasMore(true);
            setIsLoading(false);
            if (repoArray.slice(idx.current,idx.current+3).length < 3) {
              setHasMore(false);  
            } else {
              idx.current = idx.current + 3;
            }
          // });
      };
    useEffect(() => {
        triggerLazy();
        getStarted();
        setWinWidth(window.innerWidth);
    },[]);
    if (filteredproductscontainer&&filteredproductscontainer.length>0) {
        // const addPlaces=addPlaceholderProducts(filteredproductscontainer, size.width);
        let addPlaces=filteredproductscontainer;
        return(
            <>
            <div className="storeproductContainer" style={{marginTop: `${winWidth<750?'50px':''}`}}>
                
                <InfiniteScrollLoading
                    element="div"
                    pageStart={1}
                    hasMore={hasMore && !isLoading}
                    loadMore={loadMore}
                    resetPage={resetPage}
                >
                  {!!repoList.length &&
                      repoList.map(product => <StoreProduct 
                        key={uuid()}
                        productdetail={product}
                        handleopendetail={handleOpenDetail} 
                        handleclosedetail={handleCloseDetail}
                        handleClick={handleClick}
                        />
                  )}
                
              </InfiniteScrollLoading>
            </div>
                
                
                
                
            {/* <div data-test='component-ProductContainer' className='storeproductContainer'>
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
                {state.openContact
                    &&<ContactSellerForm 
                        product={state.productSelect}
                        handleCloseContact={handleCloseContact}     
                />}
                          
            </div> */}
            <StoreProductContainerCss /> 
            </>
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
