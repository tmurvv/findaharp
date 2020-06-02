import React from 'react';
import uuid from 'uuid';
import AboutPartnerStore from '../src/components/AboutPartnerStore';
import PageTitle from '../src/components/PageTitle';
import StorePartnersCSS from '../src/styles/StorePartners.css';
import { addPlaceholderStorePartners, getWindowSize } from '../src/utils/helpers';

export default function StorePartners() {
    const size = getWindowSize();
    const storePartner0 = {
        id: uuid(),
        sellerCountry: "USA",
        sellerRegion: "Walnut Grove, CA",
        productTitle: "Harps Etc.",
        productPrice: "$2,900",
        productLongDesc: ` carries most major harp lines including: Lyon & Healy, Salvi, Dusty Strings, Triplett, Music Maker, William Rees, Sharpsicle, Stoney End and others.  We have numerous new and used pedal, lever and lap harps in our showroom.  We also have the ability to order any other harp for you.  In addition to harps, we keep harp cases, strings, sheet music and countless harp accessories available for purchase at our store and online.

        Harps Etc. Inc. was inspired by our love of the harp, teaching and working with the public.  By combining a storefront location with an online store, the mission at Harps Etc. Inc. is to create greater awareness, access and appreciation of the harp around the world. 
        
        We pledge to:
        
        Provide customer service beyond your expectations
        Offer excellent musical education programs, workshops and performance opportunities
        Help you keep your harp in great condition with our Harp Doctor hints, workshops and by bringing harp technicians to you
        Bring the world closer together through music
        Offer a wide variety of pedal and lever harps, music, strings, CDs, accessories and musical gift items
        Harps Etc. Inc. is staffed by professional harpists with over 75 years of combined experience and knowledge.  
        
        We are located in the San Francisco East Bay in beautiful Walnut Creek.  Walnut Creek is known as the shopping mecca of the East Bay and is the gateway to the Diablo Valley, Livermore and Napa Valley wine country, Lake Tahoe and Reno.  Come visit our store when you are in the area.  We’re a 40-minute ride from downtown San Francisco by car or by BART. Harps Etc. Inc. is just a few blocks away from the Walnut Creek BART station and the Ygnacio Valley Rd. exit on Interstate 680.`,
        productMaker: "Harps Etc.",
        productImageUrl: "/img/StorePartners/harpsetc_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.harpsetc.com',
        sellerEmail: 'info@harpsetc.com'
    }
    const storePartner1 = {
        id: uuid(),
        sellerCountry: "Canada",
        sellerRegion: "Nanaimo, BC, Canada",
        productTitle: "West Coast Harps",
        productPrice: "$2,900",
        productLongDesc: ` Welcome! Come Visit Our Studio & Have Your New Harp Shipped Home
        If you are travelling, Vancouver Island is a great tourist destination for Canadians and there are many good reasons to pay us a visit if you are interested in starting with the harp or are thinking of upgrading. We most certainly enjoy meeting our past customers and assorted stray harpists just passing through.
        
        We are an online business with our separate WCH Studio in a private residence so an appointment is necessary as harp lessons may be in progress. Short notice is fine if you are already in our area. 
        
        We are located within a few kilometres of two major ferries to the British Columbia mainland and close to the TransCanada highway. You can visit from Vancouver and return the same day.  View our street map. BC Ferries will deliver you as a car or foot passenger from West Vancouver or Tsawwassen to Nanaimo or Duke Point and then it's a short drive to the rural community of Cedar where our Studio is located.
        
        Subscribe to our free Harp Notes Newsletter - emailed to you 2 - 4 X per year`,
        productMaker: "West Coast Harps",
        productImageUrl: "/img/StorePartners/westCoastHarps.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.westcoastharps.com',
        sellerEmail: 'alison@westcoastharps.com'
    }
    const storePartner2 = {
        id: uuid(),
        sellerCountry: "Canada",
        sellerRegion: "Calgary, AB",
        productTitle: "Tisha Murvihill, harp services",
        productPrice: "$2,900",
        productLongDesc: " offers lessons, Skype lessons, and used harps. Located near Calgary, Alberta at the foot of the Canadian Rockies.",
        productMaker: "Tisha Murvihill, harp services",
        productImageUrl: "/img/StorePartners/murvihillHarpServices.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.harptisha.com',
        sellerEmail: 'harp@harptisha.com'
    }
    const storePartner = {
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
    const storePartners = [ storePartner0, storePartner1, storePartner2 ];
    const addPlaceHolders=addPlaceholderStorePartners(storePartners, size.width);
    return (
        <div className='storePartnersContainer'>
            <PageTitle maintitle='Our Store Partners' subtitle='Find a Harp is proud to partner with the following harp sellers' />
            <div data-test='component-ProductContainer' className='productContainer'>    
                <div className="grid-container">
                    {addPlaceHolders.map(partner=> <AboutPartnerStore product={partner} placeholder={!partner.productTitle}/>)}
                </div>
            </div>
            <StorePartnersCSS />
        </div>
    )
}