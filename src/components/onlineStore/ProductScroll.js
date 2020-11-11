// packages
import React, {useReducer, useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
// styles
import StoreProductContainerCss from '../../styles/onlinestore/StoreProductContainer.css';
// internal
import StoreProductModal from './StoreProductModal';
import FeaturedProduct from './FeaturedProduct';
import StoreProduct from './StoreProduct';
import { addPlaceholderProducts, setOpacity, getWindowSize } from '../../utils/helpers';
import { productsReducer } from '../../reducers/reducers';
import {
    triggerLazy
} from '../../utils/helpers';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
const ProductScroll = ({ filteredproductscontainer, title, allstate }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [ detailProduct, setDetailProduct ] = useState([]);
    const [ numInCarousel, setNumInCarousel ] = useState(Math.floor(getWindowSize().width/270));
    const [windowSize, setWindowSize] = useState();
    const [ index, setIndex ] = useState(0);
    const indexStart = useRef(); 

    const size = getWindowSize();
    function handleOpenDetail(product) {
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
    function handleOpenContact(evt, product) {
        evt.stopPropagation();
        dispatch({type:'contact', product})
        setOpacity(true);
    }
    function handleCloseContact() {
        dispatch({type:'initial'})
        setOpacity(false);
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
        let addPlaces=filteredproductscontainer.slice(index, index+numInCarousel);
        return(
            
            <div data-test='component-ProductContainer' className='storeproductContainer'>
                {/* <h1>sz: {size.width}</h1>
                <h1>nc: {Math.floor(size.width/270)}</h1>
                <h1>index: {index}</h1>
                <h1>current: {indexStart.current}</h1> */}
                <h3 style={{width: '100%', textAlign: 'left', margin:'auto', marginBottom: '-15px', marginTop: '50px', fontFamily: "Metropolis Extra Bold", textTransform: 'uppercase'}}>{title}</h3>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="arrow arrow-left" onClick={moveLeft} style={{fontSize: '70px', color: '#b9b9b9'}}>&#10094;</div>
                    <div id="carousel" className="noselect storegrid-container">                   
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
                <StoreProductContainerCss />           
            </div>
        );
    } else {
        return (            
            <> 
            {/* {allstate.location!=='ltActivate'
                ? */}
                <>
                    <h3 style={{textAlign: 'center', marginBlockEnd: 0, width: '60%', margin: 'auto'}}>Not Found.<br />Strings, Accessories, Gifts and a much wider selection of Music coming in November.</h3>
                    <div data-test='component-ProductContainer' className='storenotFoundContainer'>
                        <img src='./img/not_found.png' alt='not found, humourous harp with broken strings'/>
                    </div>
                    <StoreProductContainerCss />
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
