// packages
import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import { RESULTS_INITIAL_STATE } from '../constants/constants';
import ContactSellerFormCSS from '../styles/ContactSellerForm.css';
import { UserContext } from '../contexts/UserContext';
import Results from './Results';
import { resultInfoReducer } from '../reducers/reducers';
import {removeDashOE} from '../utils/helpers';

function ContactSellerForm(props) {
    // shortcut
    if (!props.product || props.product===undefined) {props.handleCloseContact(); return null; }
    // declare variables
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const {product} = props;
    const { user } = useContext(UserContext);
    
    const [userContact, setUserContact] = useState({
        firstname: user.firstname!=="login"?user.firstname:'',
        lastname: user.lastname,
        contactemail: user.email,
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
                setUserContact({...userContact, firstname: evt.target.value, change: true});
                break
            case 'lastname': 
                setUserContact({...userContact, lastname: evt.target.value, change: true});
                break
            case 'contactemail': 
                setUserContact({...userContact, contactemail: evt.target.value, change: true});
                break
            case 'contactmaker': 
                setUserContact({...userContact, contactmaker: evt.target.value, change: true});
                break
            case 'contactmodel': 
                setUserContact({...userContact, contactmodel: evt.target.value, change: true});
                break     
            case 'contactcomments': 
                setUserContact({...userContact, contactcomments: evt.target.value, change: true});
                break     
            case 'contactnewsletter': 
                setUserContact({...userContact, contactnewsletter:!userContact.contactnewsletter, change: true});
                break     
            default :
        }
    } 
    function clearForm() {
        setUserContact({
            firstname: '',
            lastname: '',
            contactemail: '',
            contactmaker: '',
            contactmodel: '',
            contactcomments: '',
            contactnewsletter: false,
            change: false
        });
    }
    // reset result window
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function loginGuest() { 
        // called from the 'OK' button, no need to login guest here, just to reset results
        resetResults();
        clearForm();
        props.handleCloseContact()
    }
    // handle form submit
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        // shortcut
        if (!userContact.contactemail) {
            resultText.innerText = "Email is required";
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        // prepare communication object
        const contact = {
            contactid: uuid(),
            date: new Date(Date.now()),
            firstname:userContact.firstname,
            lastname:userContact.lastname,
            email:userContact.contactemail,
            sellername: product.sellerName,
            selleremail: product.sellerEmail,
            productmaker:userContact.contactmaker,
            productmodel:userContact.contactmodel,
            productprice: product.productPrice,
            comments:userContact.contactcomments,
            newsletter:userContact.contactnewsletter
        }
        // send communication
        try {
            await axios.post(`${process.env.backend}/api/v1/contactsellerform`, contact);   
            resultText.innerText=`Inquiry has been sent to seller.`;
            dispatchResultInfo({type: 'OK'});
        } catch(e) {
            resultText.innerText=`Something went wrong. Please check your network connection.`;
            dispatchResultInfo({type: 'tryAgain'});
        }
    }
   return (
        <>
        <div className='detailContainer'>
            <div 
                className='clearModal' 
                onClick={() => 
                    {if (!userContact.change ||userContact.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
                }} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <Results 
                resultInfo={resultInfo} 
                resetResults={resetResults}
                loginGuest={loginGuest}
            />
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
                        <h2 name='contactmaker' style={{width: '100%', textAlign: 'center'}}>Inquiry for {userContact.contactmaker}, {userContact.contactmodel} </h2>
                        <input
                            id={uuid()}
                            name='contactmaker'
                            value={userContact.contactmaker}
                            disabled
                            hidden
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label className="label" name='contactmodel'></label>
                        <input
                            id={uuid()}
                            name='contactmodel'
                            value={userContact.contactmodel}
                            disabled
                            hidden
                        />
                    </div>    
                    <div className='inputGroup'>
                        <label className="label" className="label" name='firstname'>First Name </label>
                        <input
                            id={uuid()}
                            value={userContact.firstname}
                            onChange={handleChange}
                            name='firstname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label className="label" name='lastname'>Last Name </label>
                        <input
                            id={uuid()}id="outlined-helperText"
                            label="Last Name"
                            value={userContact.lastname}
                            onChange={handleChange}
                            name ='lastname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label className="label" name='email'>Email </label>
                        <input
                            id={uuid()}
                            name='contactemail'
                            value={userContact.contactemail}
                            onChange={handleChange}
                            required
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label className="label" name='contactcomments'>Inquiry </label>
                        <textarea
                            id={uuid()}
                            name='contactcomments'
                            value={userContact.contactcomments}
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
                            style={{transform: 'translate(20px, 3px)', zIndex: '3500'}}
                            checked={userContact.contactnewsletter}
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
                                {if (!userContact.change ||userContact.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
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
