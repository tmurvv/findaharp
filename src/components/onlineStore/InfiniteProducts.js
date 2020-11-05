// code forked from Somto M.Ugeh dev.to

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

export default function InfiniteProducts() {
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const page = useRef(1);
  const prevY = useRef(0);
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

  const fetchData = useCallback(async pageNumber => {
    const url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=15`;
    setLoading(true);

    try {
      const res = await axios.get(url);
      const { status, data } = res;

      setLoading(false);
      return { status, data };
    } catch (e) {
      setLoading(false);
      return e;
    }
  }, []);

  const handleInitial = useCallback(
    async page => {
      const newImages = await fetchData(page);
      const { status, data } = newImages;
      if (status === 200) setImages(images => [...images, ...data]);
    },
    [fetchData]
  );

  const loadMore = () => {
    page.current++;
    handleInitial(page.current);
  };

  useEffect(() => {
    handleInitial(page.current);
  }, [handleInitial]);

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
      {images && (
        <div className="imageGrid">
          {images.map((image, index) => (
            <div key={index} className="imageContainer">
              <img src={image.download_url} alt={image.author} className="imageStyle" />
            </div>
          ))}
        </div>
      )}

      {loading && <div>Loading ...</div>}

      <div ref={setElement} className="buttonContainer">
        <button className="buttonStyle">Load More</button>
      </div>
      <style>{`
          .imageGrid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            width: 90%;
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