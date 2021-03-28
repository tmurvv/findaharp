// packages
import React, { useState, useContext, useReducer, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';

// internal
import LoginSignupCSS from '../../../styles/LoginSignup.css';
import PageTitle from '../../PageTitle';
import Carousel from '../../onlineStore/Carousel';

import StoreProductModal from '../../onlineStore/StoreProductModal';
import Results from '../../Results';
import { resultInfoReducer, activeWindowReducer } from '../../../reducers/reducers';
import { getFilteredProducts } from '../../helpers';


// initialize reducer object
const activeWindowInitialState = {
    activeWindow: 'login',
    loginClasses: 'login-signup l-attop',
    signupClasses: 'login-signup s-atbottom'
}
function StoreItemsHighlight(props) {
    // declare variables
    const [activeWindow, dispatchActiveWindow] = useReducer(activeWindowReducer, activeWindowInitialState);
    const [ featureList, setFeatureList ] = useState();
    const [ detailProduct, setDetailProduct ] = useState();
    var items2 = [];
    function handleCloseDetail() {
        // dispatch({type: 'initial'})
        // setOpacity(false);
        // if (openContact) handleOpenContact(evt, product);
        setDetailProduct(null);
    }
    function resetResults() {
        // if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        // document.querySelector('#loadingLoginText').innerText='';
        // dispatchResultInfo({type: 'initial'});
    }
    
    async function loginGuest(evt) {
        // if (needVerify) {
        //     // display loader
        //     const resultText = document.querySelector('#loadingLoginText');
        //     dispatchResultInfo({ type: 'loadingImage' });  
        //     //create user object
        //     const forgotPasswordUser = {
        //         firstname: 'findaharp.com',
        //         lastname: 'user',
        //         email: userLogin.loginemail
        //     }
        //     try {
        //         // this is a hack because program not returning for axios post, needs to be debugged and next three lines put below axios call
        //         // display result
        //         resultText.innerText=`Verify email sent.`;
        //         dispatchResultInfo({type: 'OK'});
        //         setNeedVerify(false);
        //         // send forgot password email
        //         await axios.post(`${process.env.backend}/api/v1/resendverify`, forgotPasswordUser);
        //     } catch (e) {
        //         // display error
        //         resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong sending verification email. Please check your network connection.'} Log in as guest user?`;
        //         dispatchResultInfo({type: 'okTryAgain'});
        //     }
        // }
        // resetResults();
        // // go to main window
        // Router.push('/');
    }
    const handlePhotoClick = (e) => {
        console.log('under construction', e.target.id)
        if(e.target&&e.target.id) {
            const handleDetail = props.filteredProducts.find(product=>product.id===e.target.id);
            setDetailProduct(handleDetail)
        }
        
    }
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    // display cart??
    useEffect(()=>{
        // console.log('here', props.filteredProducts)
        
        // props.filteredProducts.splice(0,10).map(item=> {
        //     const element = React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/RotaSonata.jpg', style: {width: '100%', height: 'auto'}})
        //     items2.push(element);
        // })
        // console.log(items2);
        // setFeatureList(items2);
    },[]);
    
    const topFeaturedList = [];
    props.filteredProducts.map(item=> {
        const element = React.createElement('img', {
                                                        id: `${item.id}`, 
                                                        onClick: handlePhotoClick, 
                                                        src: `${item.image}`, 
                                                        style: {width: '100%', height: 'auto'}
                                                    })
        topFeaturedList.push(element);
    });
    return ( 
        <>
            <Carousel products={props.filteredProducts} items={topFeaturedList} active={0}/>
            {detailProduct?<StoreProductModal 
                    product={detailProduct} 
                    handleCloseDetail={handleCloseDetail} 
                    // handleOpenContact={handleOpenContact} 
                    // handleCloseContact={handleCloseContact}
                />
            :''}
        </>
    )
}


export default StoreItemsHighlight;

// var items = [
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/PlayTheF.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/PlayTheF.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/cds/QuietAfternoon.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/Pathfinder.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/OnlyTime.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/LittleHarpBook.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/Theseus.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/cds/IfBrahmsWrote.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/CanYouFeel.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/Carols.jpg', style: {width: '100%', height: 'auto'}}),
//     React.createElement('img', {id:'img1', onClick: {handleOpenModal}, src: '/img/store/findaharp/sheetmusic/Classiques2.jpg', style: {width: '100%', height: 'auto'}}) 
// ]


// {/* <div className='login-signup-container'>
            
//             <div style={{display: 'flex', alignItems: 'center', height: '400px'}} className={activeWindow.signupClasses} id="signup" onClick={()=>handleSignupClick()}>
//                 <img style={{maxWidth: '100%'}} src='/img/store/findaharp/SheetMusic/AmericanClassicPopBroadway.jpg' alt='feature store item one' />
//             </div>
//             <div id='right' style={{display: 'flex', alignItems: 'center', height: '400px', transform: 'translate(72%, -90%)'}} className={activeWindow.loginClasses} id="login" onClick={handleLoginClick}>
//                 <img style={{maxWidth: '100%'}} src='/img/store/findaharp/cds/QuietAfternoon.jpg' alt='feature store item one' />
//             </div>
//             <LoginSignupCSS />
//             <style>
//                 {`
//                     #signup {
//                       opacity: .4;
//                       animation-name: example;
//                       animation-duration: 2.5s;
//                       animation-iteration-count: infinite;
                      
//                         animation-direction: alternate-reverse;
//                     }
//                     #login {
//                         opacity: 1;
//                         animation-name: example2;
//                         animation-duration: 4s;
//                         animation-iteration-count: infinite;
//                         animation-direction: alternate-reverse;
//                     }
                    
//                     @keyframes example {
//                       from {opacity: .4;}
//                       to {opacity: 1;}
//                     }
//                     @keyframes example2 {
//                       from {opacity: 1;}
//                       to {opacity: .4;}
//                     }
//                 `}
//             </style>
//         </div> */}