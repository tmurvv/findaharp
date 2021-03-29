// packages
import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
// contexts
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { StringFormContext } from '../../contexts/StringFormContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
// other internal
import NewsletterSignup from '../NewsletterSignup';
import RememberHarpModalCSS from '../../styles/stringForm/RememberHarpModal.css';
import { STORE_PARTNERS } from '../../constants/storeDirectory';
import { incQty } from '../../utils/storeHelpers';
import { setlocalCart } from '../../utils/checkoutHelpers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE } from '../../../main/constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';

function RememberHarpModal(props) {
    const [ localHarpname, setLocalHarpname] = useState();
    const [ localEmail, setLocalEmail] = useState();
    const [ localNews, setLocalNews] = useState();
    const [ change, setChange ] = useState(false);
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [ showAddNew, setShowAddNew ] = useState(props.step.startsWith('add'));
    function handleClose() {
        if (change&&!confirm('Changes will be lost. Continue?')) return;
        props.setRememberModal(false);
    }
    async function handleSubmit() {
        const resultText = document.querySelector('#loadingLoginText');
        let submitHarpname = localHarpname || props.userharp.harpname;
        let submitEmail = localEmail || props.userharp.email;
        if (!submitHarpname) {
            resultText.innerText=`Harp name is required.`;
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        if (!submitEmail) {
            resultText.innerText=`Email is required.`;
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        document.querySelector('#spinnerRemember').style.display='block';
        const harpObject = {
            harpname: submitHarpname,
            email: submitEmail,
            stringform: JSON.stringify(stringForm)
            // newsletter: localNews
        }
        props.setUserharp({...harpObject});
        try {
            const res = await axios.post(`${process.env.backend}/api/v1/userharps/createuserharp`, harpObject);
            setChange(false);
            console.log('axios', res.data.userharp.stringform)
            const parseStringForm = await JSON.parse(res.data.userharp.stringform)
            setStringForm(parseStringForm);
            resultText.innerText=res&&res.data&&res.data.login?`Remember My Harp login successful for ${harpObject.harpname}.`:`Remember My Harp signup successful for ${harpObject.harpname}.`;
            dispatchResultInfo({type: 'OK'});    
        } catch(e) {
            setChange(false);
            console.log(e.message);
            resultText.innerText=`Something went wrong on harp signup. Please contact tisha@findaharp.com.`;
            dispatchResultInfo({type: 'tryAgain'});
        }
        document.querySelector('#spinnerRemember').style.display='none';
    }    
    const handleChange = (e) => {
        setChange(true);
        // handle newsletter change
        if (e===true||e===false) {
            setLocalNews(e);
            return;
        }
        // handle other change
        if (e.target.name==='harpname') setLocalHarpname(e.target.value);
        if (e.target.name==='email') setLocalEmail(e.target.value);
    }
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResults();
        handleClose();
    }
    useEffect(()=>{
        // setLocalHarp&&setLocalHarp(props.userharp)
        // setLocalHarpname&&setLocalHarpname(props.userharp.harpname);
        // setLocalEmail&&setLocalEmail(props.userharp.email);
        setShowAddNew&&console.log(showAddNew)
        console.log(props)
        if (setShowAddNew&&props.userharp&&props.userharp.harpname) setShowAddNew(true);
    });
    return (
        <>
        <Results 
            resultInfo={resultInfo} 
            loginGuest={loginGuest}
            resetResults={resetResults} 
        />
        <div className='rememberdetailContainer' style={{display: 'block'}}>
            <div 
                id={`spinnerRemember`} 
                style={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    zIndex: '6000',
                    display: 'none', 
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <img src="img/spinner.gif" alt="spinner" />
            </div>
            <div onClick={() => handleClose()} className='rememberclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '24px'}}>Remember My Harp(s)</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='rememberdetailInfo' style={{marginTop: '25px'}}>
                <div className={`rememberdetailImg`}><img src= './img/store/speedy_harp.png' alt='speedy harpist pushing harp on dolly' /></div>
                <div className={`rememberdetailText`}>  
                    <div style={{textAlign: 'center', fontSize: '22px', marginBottom: '10px', fontWeight: 'bold'}}>Save valuable time!! </div>
                    {showAddNew
                    ?<button  style={{
                        padding: '5px 10px', 
                        color: '#6A75AA', 
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        width: 'fit-content',
                        margin: 'auto',
                        marginBottom: '15px'
                    }} onClick={()=>{
                        setLocalEmail(''); 
                        setLocalHarpname('');
                    }}>Add New Harp Profile</button>
                    :<div style={{
                        textAlign: 'center',  
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        marginBottom: '25px'}}
                    >Signup / Login</div>}
                    <div className='rememberInput'>
                        <div style={{textAlign: 'right', flex: '4'}}>
                            <label htmlFor="harpname"><span style={{color: 'red'}}>*</span>&nbsp;Harp Name:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                name='harpname' 
                                value={localHarpname}
                                defaultValue={props.userharp.harpname}
                            />
                        </div>
                        <div style={{textAlign: 'right', flex: '6'}}>
                            <label><span style={{color: 'red'}}>*</span>&nbsp;Email:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                type='email' 
                                name='email' 
                                value={localEmail}
                                defaultValue={props.userharp.email}
                            />
                        </div>
                    </div>
                    <NewsletterSignup handleChange={handleChange}/>
                    <div style={{
                        margin: '25px auto -20px', 
                        width: '100%', 
                        textAlign: 'center'}}
                    >
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%', cursor: 'pointer'}}
                            onClick={()=>handleSubmit()}
                        >
                            Signup/Login
                        </button>
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%', cursor: 'pointer'}}
                            onClick={() => handleClose()}
                        >
                            No Thank You
                        </button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul> Instructions:
                            <li>Enter a name and email for your harp</li>
                            <li>Signup as many harps as you like</li>
                            <li>We will remember your string brands</li>
                            <li>Teachers, you can enter your students' harps!</li>
                            <li>Rentors, you can enter your rental harps!</li>
                            <li>What a great idea!</li>
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
        <RememberHarpModalCSS />
        </>
    )
}

export default RememberHarpModal;


// async function updateCart(e) {
    //     if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
    //         const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
    //         if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
    //             props.handleResults('Only 1 in stock. Item already in cart.'); 
    //         } else {
    //             incQty(cart, setCart, e.target.getAttribute('data-item-title'), cartSubtotals, setCartSubtotals, user, currencyMultiplier);
    //             props.handleResults('Item added to cart.');
    //         }   
    //     } else {
    //         const cartCopy = [...cart];
    //         const thisItem = {
    //             id: uuid(), 
    //             store: e.target.getAttribute('data-item-store'),
    //             title: e.target.getAttribute('data-item-title'),
    //             artist_first: e.target.getAttribute('data-item-artist_first'),
    //             artist_last: e.target.getAttribute('data-item-artist_last'),
    //             description: e.target.getAttribute('data-item-description'), 
    //             price: e.target.getAttribute('data-item-price'), 
    //             condition: e.target.getAttribute('data-item-condition'),
    //             level: e.target.getAttribute('data-item-level'),
    //             harptype: e.target.getAttribute('data-item-harptype'),
    //             newprice: e.target.getAttribute('data-item-newprice'),
    //             notes: e.target.getAttribute('data-item-notes'),
    //             newused: e.target.getAttribute('data-item-newused'),
    //             product_image: e.target.getAttribute('data-item-url'),
    //             product_quantity: '1'    
    //         }
    //         cartCopy.push(thisItem);
    //         cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
    //         const tempCartJson = await JSON.stringify(cartCopy);
    //         props.handleResults('Item added to cart.');
    //         setlocalCart('fah-cart', tempCartJson);
    //         setCart(cartCopy);
    //         // handleClick(e,props.product,false);
    //     }
    // }
    // function handleAdd(e) {
    //     updateCart(e);
    //     e.target.classList.add("storeflyToCart");
    // }
    // useEffect(() => {
    //     Array.from(STORE_PARTNERS).filter(seller => {
    //         if (seller.id===props.product.store) setSellerInfo(seller);
    //     });
    // });