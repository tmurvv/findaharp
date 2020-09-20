// packages
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

// internal
import StoreProduct from '../src/components/StoreProduct';
import PageTitle from '../src/components/PageTitle';
import ContactUsForm from '../src/components/ContactUsForm';
import IndexCss from '../src/styles/index.css';
import StoreCss from '../src/styles/store.css';

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
            <div className='store'>
                <div className='harpContact' hidden={!contactUsForm}>
                    <ContactUsForm harp={harpName} reset={reset} closeButton={true}/>
                </div>
                <div className='storeButtons flexSB' style={{marginBottom: '40px'}}>
                    <button className="blueButton storeButton" style={{padding: '0'}}><a href='#harps'>Harps</a></button>
                    <button className="blueButton storeButton" style={{padding: '0'}}><a href='#cds'>CDs</a></button>
                    <button className="blueButton storeButton" style={{padding: '0'}}><a href='#music'>Music</a></button>
                </div>
                <img className= 'divider' src="img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/>
                <img id="cds" className= 'divider' src="img/purplegrey_tapered_line.png" style={{width: '100%', maxHeight: '7px'}}/>
                <div >
                    <h2 className="product-list-header">CDs by Tisha Murvihill</h2>
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
