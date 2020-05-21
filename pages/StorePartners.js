import React from 'react';
import AboutPartnerStore from '../src/components/AboutPartnerStore';
import StorePartnersCSS from '../src/styles/StorePartners.css';

export default function StorePartners() {
    const product = {
        id: "aa6503a9-a295-45fd-aa1c-4f6f4918c88f",
        sellerCountry: "USA",
        sellerRegion: "Topeka, Kansas",
        productTitle: "Your Store Name",
        productPrice: "$2,900",
        productLongDesc: " was started in 2003 after a local harpist felt the community of harpists was under-served in the region. The store creates a convenient central location where harpists can come to view harps, select music, and have a little bit of harp-chat time with other passionate players. Currently Harps Central features a wide selection of pre-owned lever and pedal harps, as well as harp music, harp strings and all of those fun harp trinkets that we love to display around our homes.",
        productMaker: "Harps Central",
        productImageUrl: "/img/generic-logo-horizontal.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.yourstoresite.com',
        sellerEmail: 'yourstore@email.com'
    }
    return (
        <div className='storePartnersContainer'>
            <h2>Find a Harp is proud to partner with the following harp sellers</h2>
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container">
                    <AboutPartnerStore product={product}/>
                    <AboutPartnerStore product={product}/>
                    <AboutPartnerStore product={product}/>
                    <AboutPartnerStore product={product}/>
                    <AboutPartnerStore product={product}/>
                </div>
            </div>
            <StorePartnersCSS />
        </div>
    )
}