// code forked from Somto M.Ugeh dev.to

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { FINDAHARP_PRODUCTS } from '../../constants/FindaharpProducts';
import StoreProduct from './StoreProduct';

export default function InfiniteProducts({searchResults}) {
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // track data page numbber
  const page = useRef(1);
  // track scroll position
  const prevY = useRef(0);

  // create observer
  const observer = useRef(
      typeof window != 'undefined' && window.document?
      new IntersectionObserver(
          entries => {
              const firstEntry = entries[0];
              const y = firstEntry.boundingClientRect.y;

              if (prevY.current > y) {
                  setTimeout(() => loadMore(), 1000); // 1 sec delay
              }

              prevY.current = y;
          },
          { threshold: 1 }
      )
      :''
  );
  //get next chunk of data        
  const fetchData = useCallback(async pageNumber => {
    // const url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=15`;
    // setLoading(true);
    console.log('fetchData', searchResults&&searchResults.length)
    try {
      // const res = await axios.get(url);
      // const { status, data } = res;
      return searchResults.slice(pageNumber*15, pageNumber*15+15)
      const addedProducts = searchResults.slice(pageNumber*15, pageNumber*15+15)
      console.log("addedproducts", addedProducts)
      setLoading(false);
      const status=200;
      return { status, addedProducts };
      // return { status, data };
    } catch (e) {
      setLoading(false);
      return e;
    }
  }, []);

  // add next chunk of data to product list
  const handleInitial = useCallback(
    async page => {
      const data = await fetchData(page);
      // const { status, data } = newProducts;
      console.log(data);
      setProducts(products => [...products, ...data]);
    },
    [fetchData]
  );
  // increase track page number and initiate adding a chunk of data
  const loadMore = () => {
    page.current++;
    handleInitial(page.current);
  };
  // get first chunk of data 
  useEffect(() => {
    console.log("useEfftee", searchResults&&searchResults.length)
    handleInitial(page.current);
  }, [handleInitial]);
  // initiate observer position
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <div className="appStyle">
      {products && (
        <div className="imageGrid">
          {products.map((product, index) => (
              <StoreProduct 
                  key={uuid()}
                  productdetail={product}
                  // handleopendetail={handleOpenDetail} 
                  // handleclosedetail={handleCloseDetail}
              />
          ))}
        </div>
      )}

      {loading && <div>Loading ...</div>}

      {/* <div ref={setElement} className="buttonContainer">
        <button className="buttonStyle">Load More</button>
      </div> */}
      <style>{`
          .imageGrid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            width: 100%;
            margin: auto;
          }
          .imageContainer {
            width: 23%;
            margin: 4px;
          }
          .imageStyle {
            max-width: 100%
          }
      `}
      </style>
    </div>
  );
}


            // {/* <div key={index} className="imageContainer">*/}
            // {/* <img src={image.download_url} alt={image.author} className="imageStyle" /> */}