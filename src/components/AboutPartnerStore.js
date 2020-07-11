import React from 'react';
import LazyLoad from 'react-lazyload';
import AboutPartnerStoresCSS from '../styles/AboutPartnerStores.css';

function AboutPartnerStore(props) {
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
            className={`productSmallDisplay`}
            style={props.placeholder?{opacity:'0'}:{}} 
        >
            <div className={`productSmallDisplay-img`}>
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
                <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
            </div>
            <div className={`detailText`}>
                <p className='longDesc productSmallDisplay-LongDesc'>
                    <span>{partnerStore.productMaker}</span>{partnerStore.productLongDesc}       
                </p>
            </div>
            <div className={`grid-item productSmallDisplay-text`}>
                <p><a href={`${partnerStore.sellerWebsite}`} style={{color: '#6A75AA', fontSize: '18px'}} target="_blank">{partnerStore.sellerWebsiteText}</a></p>
                <p>{partnerStore.sellerRegion}</p>     
            </div>           
            <AboutPartnerStoresCSS />          
        </div>
        </>

    )
}

export default AboutPartnerStore;
