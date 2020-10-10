import { Help } from '@material-ui/icons';
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
    Canada: 15,
    USA: 20,
    default: 30
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
        id: "harpsetc",
        sellerCountry: "USA",
        sellerRegion: "Walnut Creek, CA",
        productTitle: "Harps Etc.",
        productPrice: "$2,900",
        productLongDesc: `<p><span>Harps Etc.</span> carries most major harp lines including: Lyon &amp; Healy, Salvi, Dusty Strings, Triplett, Music Maker, William Rees, Sharpsicle, Stoney End and others.&nbsp; We have numerous new and used pedal, lever and lap harps in our showroom.&nbsp; We also have the ability to order any other harp for you.&nbsp; In addition to harps, we keep harp cases, strings, sheet music and countless harp accessories available for purchase at our store and online.</p>
    
    <p>Harps Etc. Inc. was inspired by our love of the harp, teaching and working with the public.&nbsp; By combining a storefront location with an online store, the mission at Harps Etc. Inc. is to create greater awareness, access and appreciation of the harp around the world.&nbsp;</p>
    
    <p>We pledge to:</p>
    
    <ul>
        <li>Provide customer service beyond your expectations</li>
        <li>Offer excellent musical education programs, workshops and performance opportunities</li>
        <li>Help you keep your harp in great condition with our Harp Doctor hints, workshops and by bringing harp technicians to you</li>
        <li>Bring the world closer together through music</li>
        <li>Offer a wide variety of pedal and lever harps, music, strings, CDs, accessories and musical gift items</li>
    </ul>
    
    <p>Harps Etc. Inc. is staffed by professional harpists with over 75 years of combined experience and knowledge. &nbsp;</p>
    
    <p>We are located in the San Francisco East Bay in beautiful Walnut Creek.&nbsp; Walnut Creek is known as the shopping mecca of the East Bay and is the gateway to the Diablo Valley, Livermore and Napa Valley wine country, Lake Tahoe and Reno.&nbsp; Come visit our store when you are in the area.&nbsp; We’re a 40-minute ride from downtown San Francisco by car or by BART. Harps Etc. Inc. is just a few blocks away from the Walnut Creek BART station and the Ygnacio Valley Rd. exit on Interstate 680.</p>`,
        productMaker: "Harps Etc.",
        productImageUrl: "/img/storePartners/harpsetc_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://harpsetc.com',
        sellerWebsiteText: 'harpsetc.com',
        sellerEmail: 'info@harpsetc.com',
        onlinestoreUrl: 'onlinestores/harpsetc',
        onlinestoreShipsTo: 'US only',
        onlinestoreBlurb: '<h3 style="text-align:center">Harps Etc. moving in late October, 2020. Check back soon!! </h3><p>We offer a wide selection of music, strings, accessories and workshops along with service that exceeds your expectations. </p>'
    },
    {
        id: 'michiganharpcenter',
        sellerCountry: "USA",
        sellerRegion: "Clawson, MI",
        productTitle: "Michigan Harp Center",
        productPrice: "",
        productLongDesc: `<p><span>Michigan Harp Center</span> Welcome to the Michigan Harp Center. We have harps to rent or purchase for students of all ages and abilities.</p>
        <p>If you need a professional harpist for your special occasion, Ms Kelly Yousoufian,owner and teacher is available.</p>`,
        productMaker: "Michigan Harp Center",
        productImageUrl: "/img/storePartners/michiganHarpCenter.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://michiganharpcenter.com',
        sellerWebsiteText: 'michiganharpcenter.com',
        sellerEmail: 'michiganharpcenter@gmail.com'
    },
    {
        id: 'westcoastharps',
        sellerCountry: "Canada",
        sellerRegion: "Nanaimo, BC, Canada",
        productTitle: "West Coast Harps",
        productPrice: "$2,900",
        productLongDesc: `<p><span>West Coast Harps</span> Welcome! Come Visit Our Studio & Have Your New Harp Shipped Home.
        If you are travelling, Vancouver Island is a great tourist destination for Canadians and there are many good reasons to pay us a visit if you are interested in starting with the harp or are thinking of upgrading. We most certainly enjoy meeting our past customers and assorted stray harpists just passing through.</p>
        
        <p>We are an online business with our separate WCH Studio in a private residence so an appointment is necessary as harp lessons may be in progress. Short notice is fine if you are already in our area. </p>
        
        <p>We are located within a few kilometres of two major ferries to the British Columbia mainland and close to the TransCanada highway. You can visit from Vancouver and return the same day.  View our street map. BC Ferries will deliver you as a car or foot passenger from West Vancouver or Tsawwassen to Nanaimo or Duke Point and then it's a short drive to the rural community of Cedar where our Studio is located.</p>
        
        <p>Subscribe to our free Harp Notes Newsletter - emailed to you 2 - 4 X per year</p>`,
        productMaker: "West Coast Harps",
        productImageUrl: "/img/storePartners/westCoastHarps.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://westcoastharps.com',
        sellerWebsiteText: 'westcoastharps.com',
        sellerEmail: 'alison@westcoastharps.com'
    },
    {
        id: 'findaharp',
        sellerCountry: "Canada",
        sellerRegion: "Calgary, AB, Canada",
        productTitle: "Find a Harp",
        productLongDesc: "<p><span>Find a Harp</span> is mainly interested in connecting buyers with sellers, but also has a few harps of it's own for sale and rent.</p> <p>Located at the foot of the Rocky Mountains, Find a Harp is always searching for a wide variety of pre-owned instruments for harp lovers and aspiring students alike.<p>",
        productMaker: "Find a Harp",
        productImageUrl: "/img/storePartners/findaharp_store_logo.png",
        sellerWebsite: 'https://findaharp.com',
        sellerWebsiteText: 'findaharp.com',
        sellerEmail: 'tisha@findaharp.com',
        onlinestoreUrl: '/findaharp',
        onlinestoreShipsTo: "International",
        onlinestoreBlurb: "<h3 style='text-align: center'>Find a Harp Online Store</br>Available now:</h3><ul style='list-style: none; text-align: center'><li>&bull;&nbsp;Pre-loved music</li><li>&bull;&nbsp;CDs</li><li>&bull;&nbsp;Digital Downloads (coming soon)</li></ul>"
    },
    {
        id: 'harpangelstore',
        sellerCountry: "Canada",
        sellerRegion: "Canmore, AB, Canada",
        productTitle: "Harp Angel Store",
        productPrice: "$2,900",
        productLongDesc: ` 
        <p><span>Harp Angel Store</span> sells pedal and lever harps as well as harps on consignment. It is located in the heart of the Canadian Rocky Mountains and run by harpist, Deborah Nyack, one of the premiere harpists in the world today. </p>
        <p>Deborah Nyack is the resident harpist Fairmont Banff Springs Hotel and performs every afternoon in the Main Lobby May through September and all holidays and long weekends.</p>
        <p>Harp Angel performs & concertizes extensively world-wide. Her harp performances include small intimate settings to famous concert halls such as Carnegie Hall, NY, and Kennedy Center, Washington DC. She has performed for royalty, heads of State, movie stars, and countless fans! Also, Harp Angel harpist performs for numerous types of special events, receptions, dinners and gala festivals.</p>
        <p>As an international recording harpist, her five solo Cds are best sellers and her music is heard regularly on TV and radio. Her harp performances are heralded as a creative blend of virtuosic technique and sensitive expressions of her interpretations and arrangements. She plays anything on the harp!</p>
        <p>Deborah trained at Eastman & Julliard , New York, USA, at the Royal Academy of Music London, England and the Banff Centre, Canada. She holds a Bachelor of Music, highest honours, Masters of Music, & awarded a Performer’s Diploma for outstanding performances. Harp Angel is on the Faculty of the Banff Centre for the Arts.</p>`,
        productMaker: "Harp Angel Store",
        productImageUrl: "/img/storePartners/harpangel_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://harpangel.com',
        sellerWebsiteText: 'harpangel.com',
        sellerEmail: 'info@harpangel.com'
    },
    {
        id: 'fourharpmusic',
        sellerCountry: "USA",
        sellerRegion: "Dallas, TX",
        productTitle: "4HarpMusic",
        productPrice: "",
        productLongDesc: `<p><span>4HarpMusic</span> Owner Margaret Weymann Atkinson, Dallas wedding harpist and special event harpist, sought after not only in the Dallas/Ft. Worth metroplex, but across the U.S. and Canada as well.</p> <p>Buyers are welcome from anywhere in the Dallas metroplex, including Dallas, Plano, McKinney, Denton, and Fort Worth, are welcome to schedule an appointment to view any of these beautiful harps.</p> <p>Margaret gladly serves all of North Texas, South Oklahoma to Oklahoma City, and the Tulsa, OK area. If you are outside the areas listed above, contact us. We occasionally have trucks headed to Alabama and Atlanta, Georgia.</p> `,
        productMaker: "4HarpMusic",
        productImageUrl: "/img/storePartners/4HarpMusicLogo.jpg",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'http://4harpmusic.com',
        sellerWebsiteText: '4harpmusic.com',
        sellerEmail: 'txabby@gmail.com'
    },
    {
        id: 'vavraharp',
        sellerCountry: "USA",
        sellerRegion: "Upstate South Carolina",
        productTitle: "Vavra Harp",
        productPrice: "",
        productLongDesc: `<p><span>Vavra Harp</span> It Is Our Pleasure to engage in the construction of harps. We use the finest materials we can find, applying a lifetime of skills to produce heirloom quality instruments that sound and look beautiful.</p><p>We create custom harps, repair, restore, or re-create harps, and we clean, regulate, and tune harps. Sorry, but we do not service pedal harps. Located in Upstate South Carolina, we can ship anywhere.</p><p>We have found that crafting a harp requires the precise melding of calculation, skill, and experience. The overall 'voice' of the instrument results from the consideration of wood, strings, finish, and decoration.  ​​​We can do whatever it takes to deliver what  you want. Please, browse our SHOP and peruse our GALLERY; you may see something that inspires!</p><p>In addition to our Stock Harps, Vavra Harp offers Custom Harps, Rental Harps, Used Harps, Trade-Ins, Harp Repair, Harp Restoration, and Harp Recreations (from pictures, sketches, etc.)</p>`,
        productMaker: "Vavra Harp",
        productImageUrl: "/img/storePartners/vavra_logo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'http://vavraharp.com',
        sellerWebsiteText: 'vavraharp.com',
        sellerEmail: 'vavra@vavraharp.com'
    },
    {
        id: 'vixenharps',
        sellerCountry: "Canada",
        sellerRegion: "Ottawa, ON, Canada",
        productTitle: "Vixen Harps",
        productPrice: "",
        productLongDesc: `<p>At <strong>Vixen Harps</strong> we know that quantity and quality are not synonymous. Our expertise stems from being the first harp specialty retailer of our kind in Canada since 1994.</p>
        <p>We are a business that has chosen to focus foremost on quality of service, customer satisfaction and sustaining after-care.&nbsp; We believe these goals can only be met through personalized attention to each client and his/her needs.&nbsp; As a family-run business we understand the importance of knowing our clients, not just as potential customers, but as people first. At Vixen Harps you have a name, not an order number.</p>
        <p>This unique business model has enabled Vixen Harps to remain loyal to our early ideals in offering personalized service, expert harp-fitting, sustained after-service care, and great savings for all our clients.</p>
        <p>Our dedication to honest business coupled with a strong backing of integrity has provided Vixen Harps with the truest measure of success we could have hoped for; a solid and respected name in the Harp community. Through the years our clients have ranged from internationally acclaimed artists to budding beginners seeking their own special place in the world of music. We consider it a privilege and an honour to continue serving our musical community on all levels.</p>
        <p>We invite you to <a href="http://www.vixenharps.com/contact.html" target="_self">contact us</a> for more information about our services and products.</p>
        <p>Again, welcome to Vixen Harps. We hope to see you soon!</p>
        <p>~ <a href="http://www.vixenharps.com/kathy.html" target="_self">Kathy Elarte</a>,<br />
        Owner of Vixen Harps</p>
        <p>To learn more about the inspiration behind Vixen Harps, <a href="http://www.vixenharps.com/kathy.html" target="_self">click here</a>.</p>
        `,
        productMaker: "Vixen Harps",
        productImageUrl: "/img/storePartners/vixen_logo.gif",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'http://vixenharps.com',
        sellerWebsiteText: 'vixenharps.com',
        sellerEmail: 'info@vixenharps.com'
    },
    {
        id: 'theharpplace',
        sellerCountry: "USA",
        sellerRegion: "Albany, New York area",
        productTitle: "The Harp Place",
        productLongDesc: ` 
        <p><strong>Bring Music to Your Life!</strong><p>
        <p>A whole new world can open to you when you begin playing harp. The harp is an instrument you can play by yourself, in duets, or with a group.</p>
        <p>Enrich your life with a new experience! Harp rentals, sales, and lessons in Albany, NY.</p>
        <p><i>About Owner Claudia Place</i></p>
        <p>Ms. Place studied at Boston University and Westminster Choir College in Princeton and privately with Marjorie Hartzell and Elizabeth Huntley. She has performed in a variety of sacred and secular venues. An experienced music teacher, she has taught in public and private schools including The Emma Willard School in Troy, NY and churches as well as privately.</p>
        <p>Ms. Place studied with Alice Parker, composer and arranger for the Robert Shaw Chorale. She was also a church organist and music director for many years. With a real sense of “what works” in the different musical venues, Ms. Place is an arranger of duet, ensemble, and solo harp pieces, filling the many musical needs of the “harp world”.</p>`,
        productMaker: "The Harp Place",
        productImageUrl: "/img/storePartners/harpplace_logo.png",
        sellerWebsite: 'https://theharpplace.com',
        sellerWebsiteText: 'theharpplace.com',
        sellerEmail: 'harpgal1@gmail.com',
        onlinestoreUrl: 'storeentry/theharpplace',
        onlinestoreShipsTo: 'US and Canada',
        onlinestoreBlurb: 'Offering digital download music and accessories'
    },
    {
        id: 'underConstruction',
        sellerCountry: "Canada",
        sellerRegion: "North America",
        productTitle: "The Next Harp Store",
        productLongDesc: "Look here for the next harp store to be added!",
        productMaker: "under construction",
        productImageUrl: "/img/harpLogo.png",
        sellerWebsite: '',
        sellerWebsiteText: '',
        sellerEmail: '',
        onlinestoreUrl: 'onlinestores/underconstruction',
        onlinestoreShipsTo: "We'll find out soon!",
        onlinestoreBlurb: "<p><strong>Our Harp 'Mini-Mall'</strong> is brand new. More stores coming soon! Sign up for our newsletter to be notified when new stores move in. Choose Login/Profile from the above menu to sign up.<p>"
    }
];
