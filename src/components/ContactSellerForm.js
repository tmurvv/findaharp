// packages
import React, { useState, useReducer } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import ContactSellerFormCSS from '../styles/ContactSellerForm.css';
import { resultInfoReducer } from '../reducers/reducers';
import {removeDashOE} from '../utils/helpers';

const resultInfoInitialState = {
    resultContainer: 'none',
    resultText: 'none',
    resultOkButton: 'none',
    resultTryAgainButton: 'none',
    tryAgainMarginLeft: '0',
    resultImg: 'none'
}

function ContactSellerForm(props) {
    // shortcut
    if (!props.product || props.product===undefined) {props.handleCloseContact(); return null; }
    // declare variables
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, resultInfoInitialState);
    const {product} = props;
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
        contactmaker: product.productMaker||'',
        contactmodel: product.productModel||'',
        contactcomments: '',
        contactnewsletter: false,
        change: false
    });
    // handle controlled input
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setUser({...user, firstname: evt.target.value, change: true});
                break
            case 'lastname': 
                setUser({...user, lastname: evt.target.value, change: true});
                break
            case 'contactemail': 
                setUser({...user, contactemail: evt.target.value, change: true});
                break
            case 'contactmaker': 
                setUser({...user, contactmaker: evt.target.value, change: true});
                break
            case 'contactmodel': 
                setUser({...user, contactmodel: evt.target.value, change: true});
                break     
            case 'contactcomments': 
                setUser({...user, contactcomments: evt.target.value, change: true});
                break     
            case 'contactnewsletter': 
                setUser({...user, contactnewsletter: !user.contactnewsletter, change: true});
                break     
            default :
        }
    } 
    // reset result window
    function resetResults() {
        document.querySelector('#loadingLoginTextContactSeller').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    // handle form submit
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginTextContactSeller');
        // shortcut
        if (!user.contactemail) {
            resultText.innerText = "Email is required";
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        // prepare communication object
        const contact = {
            contactid: uuid(),
            date: new Date(Date.now()),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.contactemail,
            sellername: product.sellerName,
            selleremail: product.sellerEmail,
            productmaker: user.contactmaker,
            productmodel: user.contactmodel,
            productprice: product.productPrice,
            comments: user.contactcomments,
            newsletter: user.contactnewsletter
        }
        // send communication
        try {
            await axios.post(`${process.env.backend}/api/v1/contactsellerform`, contact);   
            resultText.innerText=`Inquiry has been sent to seller.`;
            dispatchResultInfo({type: 'OK'});
        } catch(e) {
            resultText.innerText=`Something went wrong. Please try again or contact the webmaster. ${e.message}`;
            dispatchResultInfo({type: 'tryAgain'});
        }
    }
   return (
        <>
        <div className='detailContainer'>
            <div 
                className='clearModal' 
                onClick={() => 
                    {if (!user.change || user.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
                }} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <div id="loadingLoginContactSeller" style={{display: resultInfo.resultContainer}}>
                <img id='loadingLoginImgContactSeller'style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginTextContactSeller"></p>
                <div className='flex-sb'>
                    <button 
                        id='loadingLoginOkContactSeller' 
                        type='button'
                        className='submit-btn'
                        style={{display: resultInfo.resultOkButton}}
                        onClick={props.handleCloseContact}
                    >OK</button>
                    <button 
                        id='loadingLoginTryAgainContactSeller' 
                        type='button' 
                        className='submit-btn submit-btn-tryAgain' 
                        style={{display: resultInfo.resultTryAgainButton, marginLeft: resultInfo.tryAgainMarginLeft}}
                        onClick={resetResults}
                    >Try Again</button>
                </div>
            </div>
            <h1>Contact {removeDashOE(product.sellerName)}</h1>           
            <div className='heading'>
                <p>Your name, email, and inquiry will be forwarded to {product.sellerName}.<br></br></p>
            </div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='contactContainer'>
                <div className={`detailImg`}>
                    <img src= {product.productImageUrl} alt={product.productTitle}/>
                    <p><span className='label'>
                    {product.productModel.indexOf(product.productMaker)>-1?'':product.productMaker} {product.productModel}
                    </span></p><p>{removeDashOE(product.sellerName)}</p>
                </div>
                
                <form className='detailText'>     
                    <div className='inputGroup'>
                        <label className="label" className="label" name='firstname'>First Name </label>
                        <input
                            id={uuid()}
                            value={user.firstname}
                            onChange={handleChange}
                            name='firstname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label className="label" name='lastname'>Last Name </label>
                        <input
                            id={uuid()}id="outlined-helperText"
                            label="Last Name"
                            value={user.lastname}
                            onChange={handleChange}
                            name ='lastname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label className="label" name='email'>Email </label>
                        <input
                            id={uuid()}
                            name='contactemail'
                            value={user.contactemail}
                            onChange={handleChange}
                            required
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label className="label" name='contactmaker'>Maker </label>
                        <input
                            id={uuid()}
                            name='contactmaker'
                            value={user.contactmaker}
                            onChange={handleChange}
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label className="label" name='contactmodel'>Model </label>
                        <input
                            id={uuid()}
                            name='contactmodel'
                            value={user.contactmodel}
                            onChange={handleChange}
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label className="label" name='contactcomments'>Inquiry </label>
                        <textarea
                            id={uuid()}
                            name='contactcomments'
                            value={user.contactcomments}
                            onChange={handleChange}
                            rows='6'
                        />
                    </div>   
                    <div style={{marginBottom: '10px', marginTop:'35px', display: 'flex', justifyContent: 'center'}}>
                        <input 
                            id={uuid()}
                            type='checkbox'
                            name='contactnewsletter'
                            onChange={handleChange}
                            style={{transform: 'translate(20px, 3px)', zIndex: '3000'}}
                            checked={user.contactnewsletter}
                        />
                        <label style={{marginLeft: '5px'}} name='contactnewsletter'>
                            <p>Signup for Find a Harp newsletter?</p>
                            <p>Fun talk about harps every other month.</p>
                        </label>
                    </div>       
                    <div>
                        <button
                            className='detailButton'
                            type='submit'
                            onClick={handleSubmit} 
                        >Submit
                        </button>
                        <button
                            className={`detailButton detailButton-cancel`}
                            type='button'
                            onClick={() => 
                                {if (!user.change || user.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
                            }}
                        >Cancel
                        </button>
                    </div>         
                </form>
            </div>
        </div>
        <ContactSellerFormCSS />
        </>
    )
}

export default ContactSellerForm;
