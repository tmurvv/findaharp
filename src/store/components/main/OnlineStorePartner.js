import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import Router from 'next/router';

import OnlineStorePartnerCSS from '../../styles//OnlineStorePartner.css';

function OnlineStorePartner(props) {
    let partnerStore = props.product;
    if (!partnerStore) props.handleClose;
    if (!partnerStore.productLongDesc) partnerStore={...partnerStore, productLongDesc: "description not found"};
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '85%') evt.target.style.height="90%";
    }
    return (
        <>
        <div 
            key={partnerStore.id} 
            id={partnerStore.id} 
            className={`onlineSmallDisplay`}
            style={props.placeholder?{opacity:'0'}:{}} 
        >
            <div 
                className={`productSmallDisplay-img`}
            >
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                >
                    <img 
                        id={partnerStore.id} 
                        src={partnerStore.productImageUrl} 
                        onError={(evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%';}} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={partnerStore.productTitle}
                    />
                </LazyLoad>
            </div>
            <div className='buyerDivider'>
                <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
            </div>
            <div className={`grid-item productSmallDisplay-text`}>
                <div className='longDesc productSmallDisplay-LongDesc' dangerouslySetInnerHTML={{__html: partnerStore.onlinestoreBlurb}} /> 
                <div>Ships: {partnerStore.onlinestoreShipsTo}</div>
                <div>{partnerStore.sellerRegion}</div>     
            </div> 
            <div className='buyerDivider'>
                <img src='../../img/golden_tapered_line.png' alt="decorative divider"/>
            </div>
            <div className='enterStore'>
                <button onClick={()=>Router.push(partnerStore.onlinestoreUrl)} style={{width:'80%',margin:'auto'}} className='submit-btn'>Enter store here</button>
            </div>        
        </div>
        <OnlineStorePartnerCSS /> 
        </>
    )
}

export default OnlineStorePartner;
