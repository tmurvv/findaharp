import uuid from 'react-uuid';

export const BUILDER_PARTNERS = [
    {
        id: 'blevinsharps',
        sellerCountry: "USA",
        currency: "usd",
        sellerRegion: "Western Colorado",
        productTitle: "Blevins Harps",
        productPrice: "",
        productLongDesc: `
            <div>
                <p>Welcome to <span>Blevins Harps</span> where our mission is to build quality instruments, one at a time, for our amazing customers. Because picking out a harp is personal, we endeavour to help each customer select just the right harp.</p>
                <p>Blevins Harps began in 1992 when Dwight Blevins left an audio engineering career in radio and TV broadcasting to set up a workshop in Western Colorado. Dwight not only loved the sound, but also the visual artistic form of the harp. This can be seen in every one of Dwight’s designs. He was willing to explore different shapes and wood types to bring out the best possible sound and visual beauty of each harp.   </p>
                <p>Since Blevins Harp's humble beginning, over 3200 harps have been lovingly built and shipped worldwide.</p>
                <p>Soon after Dwight’s retirement in 2018, we providentially found Dwight and purchased the Blevins brand. Dale and Jamin, a father and son team, previously worked as carpenters for many years and share a passion for woodworking. Laurie studied the harp at the University of Northern Colorado under Kathy Bundock Moore and our fourteen year old daughter also plays the harp. This was a great fit for our family and we so much enjoyed working with Dwight and Cindy in the transition.  </p>
                <p>We especially love the customer centered focus of Blevins Harps and consider it an honor to carry on the legacy of building harps with the same beauty, quality, and superior sound.</p>
                <p>All The Best, Dale, Laurie and Jamin Wright</p>
                <br />  
            </div>
        `,
        productMaker: "Blevins Harps",
        productImageUrl: "img/storePartners/blevins_harps_logo_brightness.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://blevinsharps.com',
        sellerWebsiteText: 'blevinsharps.com',
        sellerEmail: 'blevinsharps@gmail.com',
        sellerBanner: 'img/builderPartners/blevins_banner.png'
    },
    {
        id: 'vavraharp',
        sellerCountry: "USA",
        sellerRegion: "Upstate South Carolina",
        currency: "usd",
        productTitle: "Vavra Harp",
        productPrice: "",
        productLongDesc: `<p><span>Vavra Harp</span> It Is Our Pleasure to engage in the construction of harps. We use the finest materials we can find, applying a lifetime of skills to produce heirloom quality instruments that sound and look beautiful.</p><p>We create custom harps, repair, rebuilder, or re-create harps, and we clean, regulate, and tune harps. Sorry, but we do not service pedal harps. Located in Upstate South Carolina, we can ship anywhere.</p><p>We have found that crafting a harp requires the precise melding of calculation, skill, and experience. The overall 'voice' of the instrument results from the consideration of wood, strings, finish, and decoration.  ​​​We can do whatever it takes to deliver what  you want. Please, browse our SHOP and peruse our GALLERY; you may see something that inspires!</p><p>In addition to our Stock Harps, Vavra Harp offers Custom Harps, Rental Harps, Used Harps, Trade-Ins, Harp Repair, Harp Restoration, and Harp Recreations (from pictures, sketches, etc.)</p>`,
        productMaker: "Vavra Harp",
        productImageUrl: "img/builderPartners/vavra_banner.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'http://vavraharp.com',
        sellerWebsiteText: 'vavraharp.com',
        sellerEmail: 'vavra@vavraharp.com',
        sellerBanner: 'img/builderPartners/vavra_banner.png',
        bannerBackgroundColor: '#000'
    },
    {
        id: 'lewiscreek',
        sellerCountry: "USA",
        sellerRegion: "Michigan",
        currency: "usd",
        productTitle: "Lewis Creek Instruments",
        productPrice: "",
        productLongDesc: `
            <p align="justify">Jeff Lewis, Owner and Chief Luthier of <span>Lewis Creek Instruments and Harps</span>, is a Michigan native who holds degrees in both psychology and photography. He began building musical instruments while still attending college, and became truly captivated when he saw his first Celtic folk harp.</font>
            <p align="justify">Since that time, Jeff created Lewis Creek Instruments and Harps, turning his obsession into a fruitful and rewarding career. Continually refining and developing his skills as a Master Luthier, Jeff has achieved a full rich tone with superb balance and voice in each and every one of his harps and instruments .</font>
            <p align="justify">Even the most demanding of musicians will surely appreciate the beauty and response of a harp or musical instrument built by Lewis Creek Instruments.</p>`,
        productMaker: "Lewis Creek Instruments",
        productImageUrl: "img/builderPartners/LewisCreek/lewis_creek_banner.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'https://www.lewiscreek.net/',
        sellerWebsiteText: 'lewiscreek.net',
        sellerEmail: 'info@lewiscreek.net',
        sellerBanner: 'img/builderPartners/LewisCreek/lewis_creek_banner.png',
        bannerBackgroundColor: '#3e5909'
    },
    // {
    //     id: 'Fake Luthier, Inc.',
    //     sellerCountry: "USA",
    //     currency: "usd",
    //     sellerRegion: "Upstate New York",
    //     productTitle: "Fake Luthier, Inc.",
    //     productPrice: "",
    //     productLongDesc: `
    //         <div>
    //             <p>Welcome to <span>Fake Luthier, Inc.</span> where our goal is to give you the gift of music.</p>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    //             <br />  
    //         </div>
    //     `,
    //     productMaker: "Fake Luthier, Inc.",
    //     productImageUrl: "img/builderPartners/fakeluthier_banner.png",
    //     productImageBestColor: "#d6c3ab",
    //     sellerWebsite: '',
    //     sellerWebsiteText: 'FHLHarps.com',
    //     sellerEmail: '',
    //     sellerBanner: 'img/builderPartners/fakeluthier_banner.png',
    //     bannerBackgroundColor: '#214f0b'
    // },
    // {
    //     id: "Harps R Us",
    //     sellerCountry: "Bend, OR",
    //     currency: "usd",
    //     sellerRegion: "pacific",
    //     productTitle: "Harps R Us",
    //     productPrice: "",
    //     productLongDesc: `
    //         <div>
    //             <p>At <span>Harps R Us</span> we make your dreams a reality. We are also just a fake company to show the new builder showcase area on findaharp.com.</p>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    //             <br />  
    //         </div>
    //     `,
    //     productMaker: "Harps R Us",
    //     productImageUrl: "img/harpsrus_banner.jpg",
    //     productImageBestColor: "#d6c3ab",
    //     sellerWebsite: '',
    //     sellerWebsiteText: 'HarpsRUs.nada',
    //     sellerEmail: '',
    //     sellerBanner: 'img/harpsrus_banner.jpg',
    //     bannerBackgroundColor: '#fc6197'
    // }
];
