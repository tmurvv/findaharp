import react from 'React';
import AboutPartnerStore from '../src/components/AboutPartnerStore';

export default function StorePartners() {
    const product = {
        id: "aa6503a9-a295-45fd-aa1c-4f6f4918c88f",
        sellerCountry: "USA",
        sellerRegion: "Serving Topeka, Kansas since 2003",
        productTitle: "Your Store Name",
        productPrice: "$2,900",
        
        productLongDesc: "About your store... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        productMaker: "YOUR STORE NAME",
        productImageUrl: "/img/genericLogo.png",
        productImageBestColor: "#d6c3ab",
        sellerWebsite: 'www.yourstoresite.com',
        sellerEmail: 'yourstore@email.com'
    }
    return (
        <>
        <h2>Find a Harp is proud to partner with the following harp sellers</h2>
            <AboutPartnerStore product={product}/>
            <AboutPartnerStore product={product}/>
            <AboutPartnerStore product={product}/>
            <AboutPartnerStore product={product}/>
            <AboutPartnerStore product={product}/>
            <style jsx='true'>{`
                h2 {
                    text-align: center;
                    margin: 50px auto;
                    width: 60%;
                }

            `}</style>
        </>
    )
}