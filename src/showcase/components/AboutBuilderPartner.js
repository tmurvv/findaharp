import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import AboutPartnerBuildersCSS from '../styles/AboutPartnerBuilders.css';

function AboutBuilderPartner(props) {
    let partnerBuilder = props.product;
    if (!partnerBuilder) props.handleClose;
    if (!partnerBuilder.productLongDesc) partnerBuilder={...partnerBuilder, productLongDesc: "description not found"};
    function handleImageLoad(evt) {
        evt.target.parentElement.style.backgroundColor="#ffffff";
        if (evt.target.style.height !== '85%') evt.target.style.height="90%";
    }
    return (
        <>
        <div 
            key={partnerBuilder.id} 
            id={partnerBuilder.id} 
            className={`builderproductSmallDisplay`}
            style={props.placeholder?{opacity:'0'}:{}} 
        >
            <div className={`builderproductSmallDisplay-img`}>
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with builder logo" />}
                >
                    <img 
                        id={partnerBuilder.id} 
                        src={partnerBuilder.productImageUrl} 
                        onError={(evt) => {evt.target.src='./img/not_found.png'; evt.target.style.height='85%';}} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={partnerBuilder.productTitle}
                    />
                </LazyLoad>
            </div>
            <button onClick={()=>alert('under construction')} style={{cursor: 'pointer', fontSize: '14px', marginTop: '-20px', marginBottom: '20px', color: 'rgb(106, 117, 170)', outline: 'none', backgroundColor: 'transparent', border: 'none', textDecoration: 'none'}}>View Harp Models</button>
            <div className='buyerDivider'>
                <img src='./img/dkblue_tapered_line.png' alt="decorative divider"/>
            </div>
            <div className='longDesc builderproductSmallDisplay-LongDesc' dangerouslySetInnerHTML={{__html: partnerBuilder.productLongDesc}} />
            <div className={`grid-item builderproductSmallDisplay-text`}>
                <p><a href={`${partnerBuilder.sellerWebsite}`} style={{color: '#6A75AA', fontSize: '18px'}} target="_blank">{partnerBuilder.sellerWebsiteText}</a></p>
                <p>{partnerBuilder.sellerRegion}</p>     
            </div>           
            <AboutPartnerBuildersCSS />          
        </div>
        </>

    )
}

export default AboutBuilderPartner;
