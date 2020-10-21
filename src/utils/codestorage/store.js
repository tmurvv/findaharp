// packages
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

// internal
import { STORE_PARTNERS } from '../../constants/constants';
import StoreProduct from '../../StoreProduct';
import OnlineStorePartner from '../../components/onlinestore/OnlineStorePartner';
import PageTitle from '../../components/PageTitle';
import ContactUsForm from '../../components/ContactUsForm';
import IndexCss from '../../styles/index.css';
import StoreCss from '../../styles/store.css';

const Store = (props) => {
    const [ view, setView ] = useState('harps')
    const [ contactUsForm, setContactUsForm ] = useState(false);
    const [ harpName, setHarpName ] = useState(false);
    
    function handleClick(e) {
        console.log(e.target.getAttribute('data-id'))
        console.log(contactUsForm)
        setContactUsForm(true);
        setHarpName(e.target.getAttribute('data-id'))
    }
    function reset() {setContactUsForm(false)}
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    });
    return (
        <>
        <div className='index' style={{height: 'fit-content'}}>
        <PageTitle maintitle="Store Partner MiniMall" subtitle='Music, Strings, and Accessories Available Here' />  
        <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap'}}>
            <OnlineStorePartner 
                key={'findaharp'} 
                product={STORE_PARTNERS[3]} 
                placeholder={false}
            />
            <OnlineStorePartner 
                key={'harpsetc'} 
                product={STORE_PARTNERS[0]} 
                placeholder={false}
            />
            <OnlineStorePartner 
                key={'theharpplace'} 
                product={STORE_PARTNERS[8]} 
                placeholder={false}
            />
        </div>
        <PageTitle maintitle='Browse Our Stores' />
            <div className='store'>
                
                <div className='harpContact' hidden={!contactUsForm}>
                    <ContactUsForm harp={harpName} reset={reset} closeButton={true}/>
                </div>
                <img id="cds" className= 'divider' src="img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/>
                <h3 style={{marginTop: '40px', width: '100%', textAlign: 'center'}}>Find a Harp Online Store</h3>
                <h4 style={{width: '100%', textAlign: 'center'}}>pre-loved music and CDs by Tisha Murvihill</h4>
                <div >
                    {/* <h2 className="product-list-header">CDs by Tisha Murvihill</h2> */}
                    <div className="product-list">
                        {props.products_cds.map((product, index) => <StoreProduct product={product} key={index}/>)}
                    </div>
                </div>
                <img  id="music"className= 'divider' src="img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/>
                <div>
                    <h2 className="product-list-header">Preloved Music</h2>
                    <div className="product-list">
                        {props.products_music.map((product, index) => <StoreProduct product={product} key={index}/>)}
                    </div>
                </div>
            </div>
            
        </div>
        <IndexCss />
        <StoreCss />
        </>
    )
}

Store.getInitialProps = () => {
    return {   
        products_cds: [
            {
                id: uuid(), 
                name: "If Brahms Wrote For Harp CD", 
                price: 15.00, 
                image: "img/store/findaharp/cds/IfBrahmsWrote.webp", 
                description: "“Stunning Presentation of the music of Johannes Brahms” - The HarpColumn, Jan. ‘04. 11 Intermezzi and a Rhapsody Arranged and performed by Tisha Murvihill, harp."
            },
            {
                id: uuid(), 
                name: "A Quiet Afternoon CD", 
                price: 15.00, 
                image: "img/store/findaharp/cds/QuietAfternoon.webp", 
                description: "Winner, Instrumental Album of the Year, GMAC. Fourteen beautiful arrangements of some of our most beautiful worship melodies, including: I Exalt Thee; Oh, How He Loves You and Me; Fairest Lord Jesus; As the Deer; Jesus, Name Above All Names."
            },
            {
                id: uuid(), 
                name: "Come Just As You Are CD", 
                price: 15.00, 
                image: "img/store/findaharp/cds/ComeJustAs.webp", 
                description: "Nominee, Instrumental Album of the Year, GMAC​​.Come Just As You Are is a follow-up CD to Tisha’s award winning CD, A Quiet Afternoon. The CD features 14 inspirational praise and worship songs including Amazing Grace, Draw Me Close to You, Lord Be Glorified, and You Are My All in All."
            },
        ],  
        products_music: [
            {
                id: uuid(), 
                name: "Coming Soon", 
                price: 15.00, 
                image: "img/store/findaharp/sheetmusic/placeholder.jpg", 
                description: "Great Preowned Sheet Music Coming -- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                id: uuid(), 
                name: "Coming Soon", 
                price: 15.00, 
                image: "img/store/findaharp/sheetmusic/placeholder.jpg", 
                description: "Great Preowned Sheet Music Coming -- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                id: uuid(), 
                name: "Coming Soon", 
                price: 15.00, 
                image: "img/store/findaharp/sheetmusic/placeholder.jpg", 
                description: "Great Preowned Sheet Music Coming -- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                id: uuid(), 
                name: "Coming Soon", 
                price: 15.00, 
                image: "img/store/findaharp/sheetmusic/placeholder.jpg", 
                description: "Great Preowned Sheet Music Coming -- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                id: uuid(), 
                name: "Coming Soon", 
                price: 15.00, 
                image: "img/store/findaharp/sheetmusic/placeholder.jpg", 
                description: "Great Preowned Sheet Music Coming -- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
        ]   
    }
}
export default Store;
