import uuid from 'uuid';

export const NOTES_IN_OCTAVE = [ "E","D","C","B","A","G","F" ];
export const SOLO_ENSEMBLE = [
    'solo',
    'fl/hp',
    'vn/hp',
    'voice/hp',
    'harp ensemble',
    'other',
    'concerto',
    'orchestra part'
];
export const RESULTS_INITIAL_STATE = {
    resultContainer: 'none',
    resultText: 'none',
    resultOkButton: 'none',
    resultTryAgainButton: 'none',
    tryAgainMarginLeft: '0',
    resultImg: 'none'
}
export const RESULTSWINDOW_INITIAL_STATE = {
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
    brandAbbr: 'All Brands',
    makesmodels: 'All Makes/Models',
    modelAbbr: 'All Makes/Models',
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
export const STRING_BRANDS = {
    gut: [
        'Bow Brand Pedal Natural Gut',
        'Bow Brand Lever Natural Gut',
        'Concedo Gut',
        'Burgundy Gut',
        'Silkgut'
    ],
    nylon: [
            'Bow Brand Pedal Nylon',
            'Bow Brand Lever Nylon',
            'Artist Nylon',
            'Nylon Monofilament'
    ],
    wires: [
        'Silver-Plated Pedal Bass Wire',
        'Pedal Bass Wire (Tarnish-Resistant)',
        'Bow Brand Lever Bass Wire',
        'Professional Lever Bass Wire'
    ],
    synthetic: [
            'Saverez KF Composite (synthetic)',
            'Silkgut'
    ]                       
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

export const MENU_ABBR = [
    ['FH','FH Models'],
    ['Aberdeen Meadows A to A', 'Aber Mead A-A'],
    ['Aberdeen Meadows C to C', 'Aber Mead C-C'],
    ['Special Edition Fullsicle', 'Sp Edit Fullsicle'],
    ['33 Wire Excelle II','33 Excelle II'],
    ['Christina Therapy Harp', 'Christina T.H.'],
    ['Bronze Wire Monofilament','Bronze Wire Mono'],
    ['Bow Brand Pedal Natural Gut','BB Pedal Gut'],  
    ['Bow Brand Lever Natural Gut','BB Lever Gut'],
    ['Bow Brand Pedal Nylon','BB Pedal Nylon'],
    ['Bow Brand Lever Nylon','BB Lever Nylon'],
    ['Silver-Plated Pedal Bass Wire', 'Silver Pedal Wires'],
    ['Pedal Bass Wire (Tarnish-Resistant)', 'Tarn-Res Pedal Wires'],
    ['Bow Brand Lever Bass Wire', 'BB Lever Wires'],
    ['Professional Lever Bass Wire', 'Prof Lever Wires'],
    ['KF Composite', 'Saverez KF Comp'],
    ['Nylon Monofilament', 'Nylon Mono']
]
