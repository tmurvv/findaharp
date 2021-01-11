import uuid from 'uuid';

export const SOLO_ENSEMBLE = [
    'solo',
    'fl/hp',
    'vn/hp',
    'voice/hp',
    'harp ensemble',
    'other',
    'concerto',
    'orchestra part'
]
export const RESULTS_INITIAL_STATE = {
    resultContainer: 'none',
    resultText: 'none',
    resultOkButton: 'none',
    resultTryAgainButton: 'none',
    tryAgainMarginLeft: '0',
    resultImg: 'none'
}
export const STORE_INITIAL_STATE = {
    selectionType: '',
    artist: 'All Artists',
    title: 'All Titles',
    category: 'All Categories',
    soloensemble: 'All Lever/Pedal/Ens',
    level: 'All Levels',
    publicationtype: 'All Publication Types',
    octaves: 'All Octaves',
    notes: 'All Notes',
    brands: 'All Brands',
    types: 'All Types',
    searchInfo: ''
}
export const RESET_SHIPPING_INFO = {
    shippingfname: '',
    shippinglname: '',
    shippingaddress: '',
    shippingaddress2: '',
    shippingcity: '',
    shippingregion: '',
    shippingzip_postal: '',
    shippingcountry: '',
    shippingemail: '',
    shippingphone: '',
    shippingaltphone: ''
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
export const SHIPPING_CALCULATIONS = {
    Canada: 20,
    default: -1
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
export const STRING_NUMBER = {
    "0G": -.5,
    "0F": -.3,
    "1E": 1,
    "1D": 2,
    "1C": 3,
    "1B": 4,
    "1A": 5,
    "1G": 6,
    "1F": 7,
    "2E": 8,
    "2D": 9,
    "2C": 10,
    "2B": 11,
    "2A": 12,
    "2G": 13,
    "2F": 14,
    "3E": 15,
    "3D": 16,
    "3C": 17,
    "3B": 18,
    "3A": 19,
    "3G": 20,
    "3F": 21,
    "4E": 22,
    "4D": 23,
    "4C": 24,
    "4B": 25,
    "4A": 26,
    "4G": 27,
    "4F": 28,
    "5E": 29,
    "5D": 30,
    "5C": 31,
    "5B": 32,
    "5A": 33,
    "5G": 34,
    "5F": 35,
    "6E": 36,
    "6D": 37,
    "6C": 38,
    "6B": 39,
    "6A": 40,
    "6G": 41,
    "6F": 42,
    "7E": 43,
    "7D": 44,
    "7C": 45
}

export const TERMS_CONDITIONS = [` 	                                              
    <p style="width: 100%; text-align: center">(in this agreement Findaharp.com means “Find Stuff Ltd. Operating as Findaharp.com”)</p>
    <p>Our services include the use of our website including the listing for sale, selling and purchasing of certain items as approved by us (collectively the “Services”). To access and use our Services, you are required to register with us and set up an account with your email address and a password (your “Account”). The email address you provide will be your email address, and you are solely responsible for maintaining the confidentiality of your password. You are solely responsible for all activities that occur under your Account. Therefore, you should protect your password and make your password difficult for others to guess. </p>
    <p>You agree not to do any of the following: </p>
    <ul style='margin-left: 40px'>
        <li>violate any laws; </li>
        <li>be false or misleading; </li>
        <li>infringe any third-party right; </li>
        <li>distribute viruses or any other technologies that may harm Findaharp.com or the interests or property of Findaharp.com; </li>
        <li>impose an unreasonable load on our infrastructure or interfere with the proper working of Findaharp.com; </li>
        <li>copy, modify, or distribute any other person's content; </li>
        <li>harvest or otherwise collect information about others, including email addresses, without their consent.</li>
    </ul>

    <p>
        We may limit or terminate our Services, remove hosted content and take technical and legal steps to keep users off Findaharp.com if we think that they are creating problems or acting inconsistently with the letter or spirit of our policies. However, whether we decide to take any of these steps, remove hosted content or keep a user off Findaharp.com or not, we do not accept 
        any liability for monitoring Findaharp.com or for unauthorized or unlawful content on Findaharp.com or use of Findaharp.com by users.
    </p>
    <p>
        The use of our Services is not free. We charge fees for our Services. We may change them from time to time. We will notify you of changes to our fees. We may choose to temporarily change our fees for promotional events or new clients. Our fees are non-refundable, and you are responsible for paying them when they are due. If fees are not remitted, we may terminate your ability to use our Services.
    </p>
    <p>
        If, as a party listing an item for sale using our Services, you sell the item to a buyer introduced to you because of exposure on Findaharp.com, you will pay to us the Findaharp.com fee. In the 180 days after this agreement ends, if you sell the item to a buyer introduced to you during the term of this agreement because of exposure on Findaharp.com,  you will pay to us the Findaharp.com fee. 
    </p>
    <p>
        Taxes associated with our Services will be collected when applicable. You agree to provide accurate address information necessary for Findaharp.com to comply with its obligations under applicable law. To the extent that such information is not provided, Findaharp.com will in its discretion determine and collect appropriate taxes. 
    </p>
    <p>
        You are solely responsible to collect and remit any applicable taxes resulting from the sale of your items listed on Findaharp.com.
    </p>            
    <p>
        The Services contain items from us, you, and other users. You agree not to copy, modify, resell or distribute the Services, our copyrights or trademarks. When you post content, you are granting us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable right to exercise the copyright, publicity, and database rights to that content. We reserve the right to remove any content at our sole discretion. 
    </p>
    <p>
        The Services are provided “as is” and “as available”. You agree not to hold us responsible for things other users post or do. You agree not to hold us responsible for the payment processing of other service providers. As most of the items on the Services comes from other users, we do not guarantee the accuracy, completeness, efficacy or timeliness of any postings or user communications or the quality, safety, or legality of what is offered. We also cannot guarantee continuous or secure access to our Services. Notification functionality in our Services may not occur in real time. Such functionality is subject to delays beyond our control, including without limitation, delays or latency due to your physical location or your wireless data service provider’s network. Accordingly, to the extent legally permitted we expressly disclaim all warranties, representations and conditions, express or implied, including those of quality, merchantability, merchantable quality, durability, fitness for a particular purpose and those arising by statute. We are not liable for any loss, whether of money (including profit), goodwill, or reputation, or any special, indirect, or consequential damages arising out of your use of Findaharp.com even if you advise us or we could reasonably foresee the possibility of any such damage occurring. Some jurisdictions do not allow the disclaimer of warranties or exclusion of damages, so such disclaimers and exclusions may not apply to you. 
    </p>
    <p>
        Despite the previous paragraph, if we are found to be liable, our liability to you or any third party (whether in contract, tort, negligence, strict liability in tort, by statute or otherwise) is limited to the greater of (a) the total fees you pay to us in the 12 months prior to the action giving rise to liability, and (b) 25 Canadian Dollars. 
    </p>
    <p>
        You will indemnify and hold harmless Findaharp.com and its affiliates and our and their respective officers, directors, agents and employees (each an “Indemnified Party”), from any claim made by any third party, together with any amounts payable to the third party whether in settlement or as may otherwise be awarded, and reasonable legal costs incurred by any of the Indemnified Parties, arising from or relating to your use of the Services, any alleged violation by you of the applicable terms, and any alleged violation by you of any applicable law or regulation. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter subject to indemnification by you, but doing so will not excuse your indemnity obligations. 
    </p>
    <p>
        By using the Services, you agree to the collection, transfer, storage and use of your personal information by Findaharp.com (the "data controller") on our servers. 
    </p>
    <p>
        These terms constitute the entire agreement between us and you, superseding any prior agreements. The specific fees charged by us, for the Services, shall be described in a separate agreement or schedule, subject to the terms herein described. This agreement is governed by the laws of the Province of Alberta and the federal laws of Canada applicable therein. We both submit to the jurisdiction of the courts of the Province of Alberta. If we don't enforce any particular provision, we are not waiving our right to do so later. If a court strikes down any of these terms, the remaining terms will survive. We may automatically assign this agreement in our sole discretion. 
    </p>
`]









// export const STORE_PARTNERS = [
//     {
//         id: "harpsetc",
//         sellerCountry: "USA",
//         sellerRegion: "Walnut Creek, CA",
//         productTitle: "Harps Etc.",
//         productPrice: "$2,900",
//         productLongDesc: `<p><span>Harps Etc.</span> carries most major harp lines including: Lyon &amp; Healy, Salvi, Dusty Strings, Triplett, Music Maker, William Rees, Sharpsicle, Stoney End and others.&nbsp; We have numerous new and used pedal, lever and lap harps in our showroom.&nbsp; We also have the ability to order any other harp for you.&nbsp; In addition to harps, we keep harp cases, strings, sheet music and countless harp accessories available for purchase at our store and online.</p>
    
//     <p>Harps Etc. Inc. was inspired by our love of the harp, teaching and working with the public.&nbsp; By combining a storefront location with an online store, the mission at Harps Etc. Inc. is to create greater awareness, access and appreciation of the harp around the world.&nbsp;</p>
    
//     <p>We pledge to:</p>
    
//     <ul>
//         <li>Provide customer service beyond your expectations</li>
//         <li>Offer excellent musical education programs, workshops and performance opportunities</li>
//         <li>Help you keep your harp in great condition with our Harp Doctor hints, workshops and by bringing harp technicians to you</li>
//         <li>Bring the world closer together through music</li>
//         <li>Offer a wide variety of pedal and lever harps, music, strings, CDs, accessories and musical gift items</li>
//     </ul>
    
//     <p>Harps Etc. Inc. is staffed by professional harpists with over 75 years of combined experience and knowledge. &nbsp;</p>
    
//     <p>We are located in the San Francisco East Bay in beautiful Walnut Creek.&nbsp; Walnut Creek is known as the shopping mecca of the East Bay and is the gateway to the Diablo Valley, Livermore and Napa Valley wine country, Lake Tahoe and Reno.&nbsp; Come visit our store when you are in the area.&nbsp; We’re a 40-minute ride from downtown San Francisco by car or by BART. Harps Etc. Inc. is just a few blocks away from the Walnut Creek BART station and the Ygnacio Valley Rd. exit on Interstate 680.</p>`,
//         productMaker: "Harps Etc.",
//         productImageUrl: "/img/storePartners/harpsetc_logo.png",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'https://harpsetc.com',
//         sellerWebsiteText: 'harpsetc.com',
//         sellerEmail: 'info@harpsetc.com',
//         onlinestoreUrl: 'onlinestores/harpsetc',
//         onlinestoreShipsTo: 'US only',
//         onlinestoreBlurb: '<h3 style="text-align:center">Harps Etc. moving in late October, 2020. Check back soon!! </h3><p>We offer a wide selection of music, strings, accessories and workshops along with service that exceeds your expectations. </p>'
//     },
//     {
//         id: 'michiganharpcenter',
//         sellerCountry: "USA",
//         sellerRegion: "Clawson, MI",
//         productTitle: "Michigan Harp Center",
//         productPrice: "",
//         productLongDesc: `<p><span>Michigan Harp Center</span> Welcome to the Michigan Harp Center. We have harps to rent or purchase for students of all ages and abilities.</p>
//         <p>If you need a professional harpist for your special occasion, Ms Kelly Yousoufian,owner and teacher is available.</p>`,
//         productMaker: "Michigan Harp Center",
//         productImageUrl: "/img/storePartners/michiganHarpCenter.jpg",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'https://michiganharpcenter.com',
//         sellerWebsiteText: 'michiganharpcenter.com',
//         sellerEmail: 'michiganharpcenter@gmail.com'
//     },
//     {
//         id: 'westcoastharps',
//         sellerCountry: "Canada",
//         sellerRegion: "Nanaimo, BC, Canada",
//         productTitle: "West Coast Harps",
//         productPrice: "$2,900",
//         productLongDesc: `<p><span>West Coast Harps</span> Welcome! Come Visit Our Studio & Have Your New Harp Shipped Home.
//         If you are travelling, Vancouver Island is a great tourist destination for Canadians and there are many good reasons to pay us a visit if you are interested in starting with the harp or are thinking of upgrading. We most certainly enjoy meeting our past customers and assorted stray harpists just passing through.</p>
        
//         <p>We are an online business with our separate WCH Studio in a private residence so an appointment is necessary as harp lessons may be in progress. Short notice is fine if you are already in our area. </p>
        
//         <p>We are located within a few kilometres of two major ferries to the British Columbia mainland and close to the TransCanada highway. You can visit from Vancouver and return the same day.  View our street map. BC Ferries will deliver you as a car or foot passenger from West Vancouver or Tsawwassen to Nanaimo or Duke Point and then it's a short drive to the rural community of Cedar where our Studio is located.</p>
        
//         <p>Subscribe to our free Harp Notes Newsletter - emailed to you 2 - 4 X per year</p>`,
//         productMaker: "West Coast Harps",
//         productImageUrl: "/img/storePartners/westCoastHarps.jpg",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'https://westcoastharps.com',
//         sellerWebsiteText: 'westcoastharps.com',
//         sellerEmail: 'alison@westcoastharps.com'
//     },
//     {
//         id: 'findaharp',
//         sellerCountry: "Canada",
//         sellerRegion: "Calgary, AB, Canada",
//         productTitle: "Find a Harp",
//         productLongDesc: "<p><span>Find a Harp</span> is mainly interested in connecting buyers with sellers, but also has a few harps of it's own for sale and rent.</p> <p>Located at the foot of the Rocky Mountains, Find a Harp is always searching for a wide variety of pre-owned instruments for harp lovers and aspiring students alike.<p>",
//         productMaker: "Find a Harp",
//         productImageUrl: "/img/storePartners/findaharp_store_logo.png",
//         sellerWebsite: 'https://findaharp.com',
//         sellerWebsiteText: 'findaharp.com',
//         sellerEmail: 'tisha@findaharp.com',
//         onlinestoreUrl: '/findaharp',
//         onlinestoreShipsTo: "International",
//         onlinestoreBlurb: "<h3 style='text-align: center'>Find a Harp Online Store</br>Available now:</h3><ul style='list-style: none; text-align: center'><li>&bull;&nbsp;Pre-loved music</li><li>&bull;&nbsp;CDs</li><li>&bull;&nbsp;Digital Downloads (coming soon)</li></ul>"
//     },
//     {
//         id: 'harpangelstore',
//         sellerCountry: "Canada",
//         sellerRegion: "Canmore, AB, Canada",
//         productTitle: "Harp Angel Store",
//         productPrice: "$2,900",
//         productLongDesc: ` 
//         <p><span>Harp Angel Store</span> sells pedal and lever harps as well as harps on consignment. It is located in the heart of the Canadian Rocky Mountains and run by harpist, Deborah Nyack, one of the premiere harpists in the world today. </p>
//         <p>Deborah Nyack is the resident harpist Fairmont Banff Springs Hotel and performs every afternoon in the Main Lobby May through September and all holidays and long weekends.</p>
//         <p>Harp Angel performs & concertizes extensively world-wide. Her harp performances include small intimate settings to famous concert halls such as Carnegie Hall, NY, and Kennedy Center, Washington DC. She has performed for royalty, heads of State, movie stars, and countless fans! Also, Harp Angel harpist performs for numerous types of special events, receptions, dinners and gala festivals.</p>
//         <p>As an international recording harpist, her five solo Cds are best sellers and her music is heard regularly on TV and radio. Her harp performances are heralded as a creative blend of virtuosic technique and sensitive expressions of her interpretations and arrangements. She plays anything on the harp!</p>
//         <p>Deborah trained at Eastman & Julliard , New York, USA, at the Royal Academy of Music London, England and the Banff Centre, Canada. She holds a Bachelor of Music, highest honours, Masters of Music, & awarded a Performer’s Diploma for outstanding performances. Harp Angel is on the Faculty of the Banff Centre for the Arts.</p>`,
//         productMaker: "Harp Angel Store",
//         productImageUrl: "/img/storePartners/harpangel_logo.png",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'https://harpangel.com',
//         sellerWebsiteText: 'harpangel.com',
//         sellerEmail: 'info@harpangel.com'
//     },
//     {
//         id: 'fourharpmusic',
//         sellerCountry: "USA",
//         sellerRegion: "Dallas, TX",
//         productTitle: "4HarpMusic",
//         productPrice: "",
//         productLongDesc: `<p><span>4HarpMusic</span> Owner Margaret Weymann Atkinson, Dallas wedding harpist and special event harpist, sought after not only in the Dallas/Ft. Worth metroplex, but across the U.S. and Canada as well.</p> <p>Buyers are welcome from anywhere in the Dallas metroplex, including Dallas, Plano, McKinney, Denton, and Fort Worth, are welcome to schedule an appointment to view any of these beautiful harps.</p> <p>Margaret gladly serves all of North Texas, South Oklahoma to Oklahoma City, and the Tulsa, OK area. If you are outside the areas listed above, contact us. We occasionally have trucks headed to Alabama and Atlanta, Georgia.</p> `,
//         productMaker: "4HarpMusic",
//         productImageUrl: "/img/storePartners/4HarpMusicLogo.jpg",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'http://4harpmusic.com',
//         sellerWebsiteText: '4harpmusic.com',
//         sellerEmail: 'txabby@gmail.com'
//     },
//     {
//         id: 'vavraharp',
//         sellerCountry: "USA",
//         sellerRegion: "Upstate South Carolina",
//         productTitle: "Vavra Harp",
//         productPrice: "",
//         productLongDesc: `<p><span>Vavra Harp</span> It Is Our Pleasure to engage in the construction of harps. We use the finest materials we can find, applying a lifetime of skills to produce heirloom quality instruments that sound and look beautiful.</p><p>We create custom harps, repair, restore, or re-create harps, and we clean, regulate, and tune harps. Sorry, but we do not service pedal harps. Located in Upstate South Carolina, we can ship anywhere.</p><p>We have found that crafting a harp requires the precise melding of calculation, skill, and experience. The overall 'voice' of the instrument results from the consideration of wood, strings, finish, and decoration.  ​​​We can do whatever it takes to deliver what  you want. Please, browse our SHOP and peruse our GALLERY; you may see something that inspires!</p><p>In addition to our Stock Harps, Vavra Harp offers Custom Harps, Rental Harps, Used Harps, Trade-Ins, Harp Repair, Harp Restoration, and Harp Recreations (from pictures, sketches, etc.)</p>`,
//         productMaker: "Vavra Harp",
//         productImageUrl: "/img/storePartners/vavra_logo.png",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'http://vavraharp.com',
//         sellerWebsiteText: 'vavraharp.com',
//         sellerEmail: 'vavra@vavraharp.com'
//     },
//     {
//         id: 'vixenharps',
//         sellerCountry: "Canada",
//         sellerRegion: "Ottawa, ON, Canada",
//         productTitle: "Vixen Harps",
//         productPrice: "",
//         productLongDesc: `<p>At <strong>Vixen Harps</strong> we know that quantity and quality are not synonymous. Our expertise stems from being the first harp specialty retailer of our kind in Canada since 1994.</p>
//         <p>We are a business that has chosen to focus foremost on quality of service, customer satisfaction and sustaining after-care.&nbsp; We believe these goals can only be met through personalized attention to each client and his/her needs.&nbsp; As a family-run business we understand the importance of knowing our clients, not just as potential customers, but as people first. At Vixen Harps you have a name, not an order number.</p>
//         <p>This unique business model has enabled Vixen Harps to remain loyal to our early ideals in offering personalized service, expert harp-fitting, sustained after-service care, and great savings for all our clients.</p>
//         <p>Our dedication to honest business coupled with a strong backing of integrity has provided Vixen Harps with the truest measure of success we could have hoped for; a solid and respected name in the Harp community. Through the years our clients have ranged from internationally acclaimed artists to budding beginners seeking their own special place in the world of music. We consider it a privilege and an honour to continue serving our musical community on all levels.</p>
//         <p>We invite you to <a href="http://www.vixenharps.com/contact.html" target="_self">contact us</a> for more information about our services and products.</p>
//         <p>Again, welcome to Vixen Harps. We hope to see you soon!</p>
//         <p>~ <a href="http://www.vixenharps.com/kathy.html" target="_self">Kathy Elarte</a>,<br />
//         Owner of Vixen Harps</p>
//         <p>To learn more about the inspiration behind Vixen Harps, <a href="http://www.vixenharps.com/kathy.html" target="_self">click here</a>.</p>
//         `,
//         productMaker: "Vixen Harps",
//         productImageUrl: "/img/storePartners/vixen_logo.gif",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'http://vixenharps.com',
//         sellerWebsiteText: 'vixenharps.com',
//         sellerEmail: 'info@vixenharps.com'
//     },
//     {
//         id: uuid(),
//         sellerCountry: "USA",
//         sellerRegion: "Philadelphia Area",
//         productTitle: "Harp and Heart",
//         productPrice: "",
//         productLongDesc: `
//             <div>
//                 <p><span>Harp and Heart</span>, Nancy Beal, owner
//                 <br />
//                 <br />-Heal your body, mind, and spirit...
//                 <br />-Experience deep relaxation...
//                 <br />-Strengthen your immune  and nervous systems through the 'relaxation response'...
//                 <br />-Deepen your yoga and meditation practice...
//                 <br />-Increase your brain's ability to focus and concentrate...
//                 <br />-Relieve stress...
//                 <br />-Achieve deeper, more refreshing, more rejuvenating sleep...
//                 <br />-Increase your mental, emotional, spiritual and artistic creativity...
//                 <br />-Enjoy a daily sense of well being and enhanced energy...
//                 <br />Holistic healing with Nancy Beal
//                 <br />
//                 <br /><span>Clients say . . .</span>
//                 <br />
//                 <br />"Various chakras felt like they were being opened and cleared."
//                 <br />
//                 <br />"This is a wonderful way to relax and feel the tension being released from my body. I hope to have the opportunity for future classes."
//                 <br />
//                 <br />"In a world where we never stop to relax, how fundamentally blissful to relax at a very deep level. There were moments of joy, bliss, and oneness with all that is."
//                 <br />
//                  <br />"I wanted to thank you so much for the wonderful treatment you gave to me. It felt wonderful to be  spoiled like that on your table. You were so generous with your time, knowledge and your gifts. I  felt relaxed for a long time afterward, which was nice especially since I have been so stressed out lately."
                
//             </div>`,
//         productMaker: "Harp and Heart",
//         productImageUrl: "/img/storePartners/harpandheart_logo.png",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'https://blevinsharps.com',
//         sellerWebsiteText: 'blevinsharps.com',
//         sellerEmail: 'blevinsharps@gmail.com'
//     },
//     {
//         id: uuid(),
//         sellerCountry: "USA",
//         sellerRegion: "Philadelphia Area",
//         productTitle: "Harp and Heart",
//         productPrice: "",
//         productLongDesc: `
//             <div>
//                 <p><span>Harp and Heart</span>, Nancy Beal, owner
//                 <br />
//                 <br />-Heal your body, mind, and spirit...
//                 <br />-Experience deep relaxation...
//                 <br />-Strengthen your immune  and nervous systems through the 'relaxation response'...
//                 <br />-Deepen your yoga and meditation practice...
//                 <br />-Increase your brain's ability to focus and concentrate...
//                 <br />-Relieve stress...
//                 <br />-Achieve deeper, more refreshing, more rejuvenating sleep...
//                 <br />-Increase your mental, emotional, spiritual and artistic creativity...
//                 <br />-Enjoy a daily sense of well being and enhanced energy...
//                 <br />Holistic healing with Nancy Beal
//                 <br />
//                 <br /><span>Clients say . . .</span>
//                 <br />
//                 <br />"Various chakras felt like they were being opened and cleared."
//                 <br />
//                 <br />"This is a wonderful way to relax and feel the tension being released from my body. I hope to have the opportunity for future classes."
//                 <br />
//                 <br />"In a world where we never stop to relax, how fundamentally blissful to relax at a very deep level. There were moments of joy, bliss, and oneness with all that is."
//                 <br />
//                     <br />"I wanted to thank you so much for the wonderful treatment you gave to me. It felt wonderful to be  spoiled like that on your table. You were so generous with your time, knowledge and your gifts. I  felt relaxed for a long time afterward, which was nice especially since I have been so stressed out lately."
                
//             </div>`,
//         productMaker: "Harp and Heart",
//         productImageUrl: "/img/storePartners/harpHeart_logo.png",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'http://harpandheart.com',
//         sellerWebsiteText: 'harpandheart.com',
//         sellerEmail: 'harpandheart@yahoo.com'
//     },
//     {
//         id: uuid(),
//         sellerCountry: "USA",
//         sellerRegion: "San Diego Area",
//         productTitle: "Chiara Arpa",
//         productPrice: "",
//         productLongDesc: `<p><span>Chiara Arpa</span> Owner Chiara Capobianco was born in Milano (Italy) in 1980; she is a Music Graduate in Harp (10 year course) at Conservatorio “G. Verdi” of Milano (Italy). University graduate in Musicology (3 year course) at Scuola di Paleografia e Filologia Musicale di Cremona (Università degli Studi di Pavia-Italy). She started playing with many different Orchestras (Opera and Symphonic) touring all over Europe since she was fifteen years old.</p>
//         <p>She has performed at many concerts and events with both classic and Irish harp as solo harpist, alongside other musicians. She studied different types of music, which have given her a varied repertoire ranging from classical, medieval, renaissance, Irish, popular and contemporary music.</p>
//         <p>In 2003 she moved to London UK where she performed in several renowned venues. Since September 2004 she has been playing on the prestigious Cunard ships Queen Mary 2, Queen Elizabeth 2 and Queen Victoria travelling all over the world visiting all the continents.</p>
//         <p>At the moment she is  enjoyng a free-lance career as solo harpist that takes her to perform all over the globe. She has lived and performed in Europe, Middle East, Asia, South America, & around the world (on luxury cruise ships).</p>
//         <p>She is now based in the USA.</p>`,
//         productMaker: "Chiara Arpa",
//         productImageUrl: "/img/storePartners/chiara_arpa_logo.jpg",
//         productImageBestColor: "#d6c3ab",
//         sellerWebsite: 'http://chiaracapobianco.com',
//         sellerWebsiteText: 'chiaracapobianco.com',
//         sellerEmail: 'chiara_arpa@yahoo.it'
//     }
//     // {
//     //     id: 'theharpplace',
//     //     sellerCountry: "USA",
//     //     sellerRegion: "Albany, New York area",
//     //     productTitle: "The Harp Place",
//     //     productLongDesc: ` 
//     //     <p><strong>Bring Music to Your Life!</strong><p>
//     //     <p>A whole new world can open to you when you begin playing harp. The harp is an instrument you can play by yourself, in duets, or with a group.</p>
//     //     <p>Enrich your life with a new experience! Harp rentals, sales, and lessons in Albany, NY.</p>
//     //     <p><i>About Owner Claudia Place</i></p>
//     //     <p>Ms. Place studied at Boston University and Westminster Choir College in Princeton and privately with Marjorie Hartzell and Elizabeth Huntley. She has performed in a variety of sacred and secular venues. An experienced music teacher, she has taught in public and private schools including The Emma Willard School in Troy, NY and churches as well as privately.</p>
//     //     <p>Ms. Place studied with Alice Parker, composer and arranger for the Robert Shaw Chorale. She was also a church organist and music director for many years. With a real sense of “what works” in the different musical venues, Ms. Place is an arranger of duet, ensemble, and solo harp pieces, filling the many musical needs of the “harp world”.</p>`,
//     //     productMaker: "The Harp Place",
//     //     productImageUrl: "/img/storePartners/harpplace_logo.png",
//     //     sellerWebsite: 'https://theharpplace.com',
//     //     sellerWebsiteText: 'theharpplace.com',
//     //     sellerEmail: 'harpgal1@gmail.com',
//     //     onlinestoreUrl: 'storeentry/theharpplace',
//     //     onlinestoreShipsTo: 'US and Canada',
//     //     onlinestoreBlurb: 'Offering digital download music and accessories'
//     // }
// ];
