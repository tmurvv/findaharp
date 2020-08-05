import uuid from 'uuid';

export const RESULTS_INITIAL_STATE = {
    resultContainer: 'none',
    resultText: 'none',
    resultOkButton: 'none',
    resultTryAgainButton: 'none',
    tryAgainMarginLeft: '0',
    resultImg: 'none'
}

export const STOREPARTNER_PLACEHOLDER = {   
    id: "",
    sellerCountry: "",
    sellerRegion: "",
    productTitle: "",
    productPrice: "",
    productLongDesc: "",
    productMaker: "",
    productImageUrl: "",
    productImageBestColor: "",
    sellerWebsite: '',
    sellerEmail: ''   
}

export const PRODUCTAD_PLACEHOLDER = {
        id: "",
        productFinish: "",
        productImageBestColor: "",
        productImageUrl: "./img/logo_findaharp.png",
        productLongDesc: "",
        productMaker: "",
        productModel: "",
        productPrice: "",
        productShortDesc: "",
        productSize: 0,
        productTitle: "",
        productType: "",
        sellerCountry: "",
        sellerName: "",
        sellerRegion: ""
}

export const STORE_PARTNERS = [
    {
        id: uuid(),
        sellerCountry: "USA",
        sellerRegion: "Walnut Grove, CA",
        productTitle: "Harps Etc.",
        productPrice: "$2,900",
        productLongDesc: ` carries most major harp lines including: Lyon & Healy, Salvi, Dusty Strings, Triplett, Music Maker, William Rees, Sharpsicle, Stoney End and others.  We have numerous new and used pedal, lever and lap harps in our showroom.  We also have the ability to order any other harp for you.  In addition to harps, we keep harp cases, strings, sheet music and countless harp accessories available for purchase at our store and online. Harps Etc. Inc. was inspired by our love of the harp, teaching and working with the public.  By combining a storefront location with an online store, the mission at Harps Etc. Inc. is to create greater awareness, access and appreciation of the harp around the world. We are located in the San Francisco East Bay in beautiful Walnut Creek.`,
        productMaker: "Harps Etc.",
        productImageUrl: "/img/storePartners/harpsetc_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.harpsetc.com',
        sellerEmail: 'info@harpsetc.com'
    },
    {
        id: uuid(),
        sellerCountry: "USA",
        sellerRegion: "Clawson, MI",
        productTitle: "Michigan Harp Center",
        productPrice: "",
        productLongDesc: ` Welcome to the Michigan Harp Center. We have harps to rent or purchase for students of all ages and abilities. If you need a professional harpist for your special occasion, Ms Kelly Yousoufian,owner and teacher is available.`,
        productMaker: "Michigan Harp Center",
        productImageUrl: "/img/storePartners/michiganHarpCenter.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.michiganharpcenter.com',
        sellerEmail: 'michiganharpcenter@gmail.com'
    },
    {
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
        productImageUrl: "/img/storePartners/westCoastHarps.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.westcoastharps.com',
        sellerEmail: 'alison@westcoastharps.com'
    },
    {
        id: uuid(),
        sellerCountry: "Canada",
        sellerRegion: "Calgary, AB, Canada",
        productTitle: "Find a Harp",
        productLongDesc: " is mainly interested in connecting buyers with sellers, but also has a few harps of it's own for sale and rent. Located at the foot of the Rocky Mountains, Find a Harp is always searching for a wide variety of pre-owned instruments for harp lovers and aspiring students alike.",
        productMaker: "Find a Harp",
        productImageUrl: "/img/storePartners/findaharp_store_logo.png",
        sellerWebsite: 'www.findaharp.com',
        sellerEmail: 'tisha@findaharp.com'
    },
    {
        id: uuid(),
        sellerCountry: "Canada",
        sellerRegion: "Canmore, AB, Canada",
        productTitle: "Harp Angel Store",
        productPrice: "$2,900",
        productLongDesc: ` 
        sells pedal and lever harps as well as harps on consignment. It is located in the heart of the Canadian Rocky Mountains and run by harpist, Deborah Nyack, one of the premiere harpists in the world today. Deborah Nyack is the resident harpist Fairmont Banff Springs Hotel and performs every afternoon in the Main Lobby May through September and all holidays and long weekends.
        
        Harp Angel performs & concertizes extensively world-wide. Her harp performances include small intimate settings to famous concert halls such as Carnegie Hall, NY, and Kennedy Center, Washington DC. She has performed for royalty, heads of State, movie stars, and countless fans! Also, Harp Angel harpist performs for numerous types of special events, receptions, dinners and gala festivals.
        
        As an international recording harpist, her five solo Cds are best sellers and her music is heard regularly on TV and radio. Her harp performances are heralded as a creative blend of virtuosic technique and sensitive expressions of her interpretations and arrangements. She plays anything on the harp!
        
        Deborah trained at Eastman & Julliard , New York, USA, at the Royal Academy of Music London, England and the Banff Centre, Canada. She holds a Bachelor of Music, highest honours, Masters of Music, & awarded a Performer’s Diploma for outstanding performances. Harp Angel is on the Faculty of the Banff Centre for the Arts.`,
        productMaker: "Harp Angel Store",
        productImageUrl: "/img/storePartners/harpangel_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.harpangel.com',
        sellerEmail: 'info@harpangel.com'
    }
];
