// packages
import React, {useReducer, useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
// styles
import FeaturedProductContainerCss from '../../styles/onlinestore/FeaturedProductContainer.css';
// internal
import StoreProductModal from './StoreProductModal';
import FeaturedProduct from './FeaturedProduct';
import StoreProduct from './StoreProduct';
import { addPlaceholderProducts, setOpacity, getWindowSize } from '../../utils/helpers';
import { productsReducer } from '../../reducers/reducers';
import {
    triggerLazy
} from '../../utils/helpers';
import { propTypes } from 'react-addons-css-transition-group';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const ProductScroll = ({ filteredproductscontainer, title, allstate, handleStringsChange }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [ detailProduct, setDetailProduct ] = useState([]);
    const [ numInCarousel, setNumInCarousel ] = useState(Math.floor(getWindowSize().width/270));
    const [windowSize, setWindowSize] = useState();
    const [ index, setIndex ] = useState(0);
    const indexStart = useRef(); 

    const size = getWindowSize();

    function handleOpenDetail(product) {
        console.log(product.title)
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BOW BRAND PEDAL NATURAL GUT')) return handleStringsChange("strings", "brands", "All Octaves", "Bow Brand Pedal Natural Gut", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BOW BRAND LEVER NATURAL GUT')) return handleStringsChange("strings", "brands", "All Octaves", "Bow Brand Lever Natural Gut", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('CONCEDO GUT')) return handleStringsChange("strings", "brands", "All Octaves", "Concedo Gut", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BURGUNDY GUT')) return handleStringsChange("strings", "brands", "All Octaves", "Burgundy Gut", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BOW BRAND PEDAL NYLON')) return handleStringsChange("strings", "brands", "All Octaves", "Bow Brand Pedal Nylon", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('SILVER-PLATED PEDAL BASE WIRE')) return handleStringsChange("strings", "brands", "All Octaves", "Silver-Plated Pedal Bass Wire", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('PEDAL BASS WIRE (TARNISH RESISTANT)')) return handleStringsChange("strings", "brands", "All Octaves", "Pedal Bass Wire (Tarnish-Resistant)", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BOW BRAND LEVER BASS WIRE')) return handleStringsChange("strings", "brands", "All Octaves", "Bow Brand Lever Bass Wire", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('PROFESSIONAL LEVER BASS WIRE')) return handleStringsChange("strings", "brands", "All Octaves", "Professional Lever Bass Wire", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BOW BRAND LEVER NYLON')) return handleStringsChange("strings", "brands", "All Octaves", "Bow Brand Lever Nylon", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('ARTIST NYLON')) return handleStringsChange("strings", "brands", "All Octaves", "Artist Nylon", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('BRONZE WIRE MONOFILAMENT')) return handleStringsChange("strings", "brands", "All Octaves", "Bronze Wire Monofilament", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('KF COMPOSITE')) return handleStringsChange("strings", "brands", "All Octaves", "KF Composite", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('NYLON MONOFILAMENT')) return handleStringsChange("strings", "brands", "All Octaves", "Nylon Monofilament", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('SILKGUT')) return handleStringsChange("strings", "brands", "All Octaves", "Silkgut", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('DUSTY STRINGS')) return handleStringsChange("strings", "brands", "All Octaves", "Dusty Strings", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('TRIPLETT')) return handleStringsChange("strings", "brands", "All Octaves", "Triplett", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('REES')) return handleStringsChange("strings", "brands", "All Octaves", "Rees", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('STONEY END')) return handleStringsChange("strings", "brands", "All Octaves", "Stoney End", "All Types");
        if (product.category.toUpperCase()==='STRINGS'&&product.title.toUpperCase().includes('DELTA')) return handleStringsChange("strings", "brands", "All Octaves", "Delta", "All Types");
        console.log('prod', product)
        if (String(product.category).toLowerCase() === "strings") 
        // dispatch({type:'detail', product});
        setDetailProduct(product);
        // setOpacity(true); 
    }
    function handlePhotoClick() {
        alert('imin')
        this.setState({
            detailProduct: e.target.name
        })
    }
    function moveLeft() {
        if (index<indexStart.current) indexStart.current -= 2;
        if (index === filteredproductscontainer.length) {
            setIndex(1);
            indexStart.current=2;
        } else if (index===0){
            setIndex(filteredproductscontainer.length-1)
            indexStart.current=filteredproductscontainer.length-2;
        } else {
            setIndex(indexStart.current);
            indexStart.current--
        }
        setNumInCarousel(Math.floor(size.width/270));
        // var newActive = this.state.active
        // newActive--
        // this.setState({
        //     active: newActive < 0 ? this.state.items.length - 1 : newActive,
        //     direction: 'left'
        // })
    }
    
    function moveRight() {
        if (index>indexStart.current) indexStart.current += 2;
        
        if (index === 0) {
            setIndex(1);
            indexStart.current=2;
        } else if (index===filteredproductscontainer.length-1) {
            setIndex(0);
            indexStart.current=0;
        } else {
            setIndex(indexStart.current);
            indexStart.current++
        }
        setNumInCarousel(Math.floor(size.width/270));
        
        // var newActive = this.state.active
        // setState({
        //     active: (newActive + 1) % this.state.items.length,
        //     direction: 'right'
        // })
    }
    function handleCloseDetail() {
        // dispatch({type: 'initial'})
        // setOpacity(false);
        // if (openContact) handleOpenContact(evt, product);
        setDetailProduct([]);
    }
    
    useEffect(() => {
        triggerLazy();
    },[]);
    useEffect(() => {
        // console.log('eff', getWindowSize())
        indexStart.current=0;
    },[]);
    if (filteredproductscontainer&&filteredproductscontainer.length>0) {
        // const addPlaces=addPlaceholderProducts(filteredproductscontainer, size.width);
        let addPlaces=filteredproductscontainer.slice(index, index+(Math.floor(size.width/270)));
        // console.log(index, Math.floor(size.width/270)-(index+1)%Math.floor(size.width/270))
        // console.log(filteredproductscontainer.length-index)
        let extraPlaces=filteredproductscontainer.slice(0,filteredproductscontainer.length-index+1);
        if (index+(Math.floor(size.width/270))>filteredproductscontainer.length) addPlaces=[...addPlaces, ...extraPlaces];
        // addPlaces=index+(Math.floor(size.width/270))>filteredproductscontainer.length?[...filteredproductscontainer, filteredproductscontainer.slice(0, length-index )]:[...filteredproductscontainer];

        // if (index+(Math.floor(size.width/270))>filteredproductscontainer.length) alert(extraPlaces.length, addPlaces.length);
        // filteredproductscontainer=[...filteredproductscontainer, filteredproductscontainer[0]]
    
        return(
            <div data-test='component-ProductContainer' className='featuredproductContainer'>
                {/* <div style={{display: 'flex'}}>
                    <h1>sz: {size.width} / </h1>
                    <h1>nc: {Math.floor(size.width/270)} / </h1>
                    <h1>index: {index} / </h1>
                    <h1>current: {indexStart.current} / </h1>
                    <h1>length: {filteredproductscontainer.length}</h1>
                </div> */}
                <h3>{title}</h3>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="arrow arrow-left" onClick={moveLeft} style={{fontSize: '70px', color: '#b9b9b9'}}>&#10094;</div>
                    <div id="carousel" className="noselect featuredgrid-container">                   
                        {addPlaces.map(product => <FeaturedProduct 
                            key={uuid()}
                            productdetail={product}
                            handleopendetail={handleOpenDetail} 
                            handleclosedetail={handleCloseDetail}
                            />
                        )}                     
                    </div>
                <div className="arrow arrow-right" onClick={moveRight} style={{fontSize: '70px', color: '#b9b9b9'}}>&#10095;</div>
                </div>
                {detailProduct&&detailProduct.title?
                    <StoreProductModal 
                        product={detailProduct} 
                        handleCloseDetail={handleCloseDetail}
                />:''
                }
                {/* {state.openContact
                    &&<ContactSellerForm 
                        product={state.productSelect}
                        handleCloseContact={handleCloseContact}     
                />} */}
                <FeaturedProductContainerCss />           
            </div>
        );
    } else {
        return (            
            <> 
            {/* {allstate.location!=='ltActivate'
                ? */}
                <>
                    <h3 style={{textAlign: 'center', marginBlockEnd: 0, width: '60%', margin: 'auto'}}>Not Found.<br />Strings, Accessories, Gifts and a much wider selection of Music coming in November.</h3>
                    <div data-test='component-ProductContainer' className='featurednotFoundContainer'>
                        <img src='./img/not_found.png' alt='not found, humourous harp with broken strings'/>
                    </div>
                    <FeaturedProductContainerCss />
                </>
                {/* :
                <div style={{height: '300px'}}>
                </div>
            } */}
            <style>{`
                #carousel {
                    height: 200px;
                    width: 100%;
                    margin: 70px auto;
                    // display: flex;
                    // justify-content: space-evenly;
                    position: relative;
                }

                #carousel span {
                    // display: flex;
                    // justify-content: space-evenly;
                    position: relative;
                    width: 80%;
                    margin-left: 15%;
                }
                
                .arrow {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: #f9bf1e;
                    text-align: center;
                    font-size: 150px;
                    border-radius: 50%;
                    cursor: pointer;
                    color: #fffeee;
                    line-height: 30px;
                    margin-top: 85px;
                    z-index: 1000;
                }
                
                .arrow-right {
                    right: 10%;
                }
                .arrow-left {
                    left: 10%;
                }
                
                .item {
                    text-align: center;
                    color: white;
                    font-size: 40px;
                    position: absolute;
                    transition: height 1s, width 1s, left 1s, margin-top 1s, line-height 1s, background-color 1s;
                    display: flex;
                    align-items: center;
                }
                
                .level-2 {
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    background-color: #fff;
                    left: 650px;
                    margin-top: 25px;
                }

                .level-1 {
                    height: 180px;
                    width: 130px;
                    line-height: 180px;
                    background-color: #fff;
                    left: 500px;
                    margin-top: 10px;
                }

                .level0 {
                    height: 200px;
                    width: 150px;
                    line-height: 200px;
                    background-color: #fff;
                    left: 330px;
                }

                .level1 {
                    height: 180px;
                    width: 130px;
                    line-height: 180px;
                    background-color: #fff;
                    margin-top: 10px;
                    left: 180px;
                }

                .level2 {
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    background-color: #fff;
                    margin-top: 25px;
                    left: 50px;
                }

                .left-enter {
                    opacity: 0;
                    left: 50px - 110px;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                }

                .left-enter.left-enter-active {
                    opacity: 1;
                    left: 50px;
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    margin-top: 25px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .left-leave {
                    opacity: 1;
                    left: 650px;
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    margin-top: 25px;
                }

                .left-leave.left-leave-active {
                    left: 650px + 110px + 20;
                    opacity: 0;
                    height: 150px - 30;
                    line-height: 120px;
                    margin-top: 40px;
                    width: 110px - 20;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .right-enter {
                    opacity: 0;
                    left: 650px + 110px;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                }

                .right-enter.right-enter-active {
                    left: 650px;
                    opacity: 1;
                    height: 150px;
                    margin-top: 25px;
                    line-height: 150px;
                    width: 110px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .right-leave {
                    left: 50px;
                    height: 150px;
                    opacity: 1;
                    margin-top: 25px;
                    line-height: 150px;
                    width: 110px;
                }

                .right-leave.right-leave-active {
                    left: 50px - 110px;
                    opacity: 0;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .noselect {
                    -webkit-user-select: none; 
                     -khtml-user-select: none; 
                       -moz-user-select: none; 
                        -ms-user-select: none;  
                            user-select: none;
                }
                `}
                </style>
            </>
        );
    }    
}

export default ProductScroll;
