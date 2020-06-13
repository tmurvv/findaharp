// packages
import React, {useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import ContactSellerFormCSS from '../styles/ContactSellerForm.css';
import {removeDashOE} from '../utils/helpers';

function ContactSellerForm(props) {
    if (!props.product || props.product===undefined) {props.handleCloseContact(); return null; }
    const {product} = props;
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
        contactmaker: product.productMaker||'',
        contactmodel: product.productModel||'',
        contactcomments: '',
        change: false
    });
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
            default :
        }
    }
    function resetResults() {
        document.querySelector('#loadingLogin').style.display='none';
        document.querySelector('#loadingLoginText').innerText='';
        document.querySelector('#loadingLoginOk').style.display='none';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!user.contactemail) return alert('Email is required');
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        resultContainer.style.display='block';
        resultImg.style.display='block';
        // BREAKING
        // alert('Under Construction. Email not sent'); 
        const contact = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.contactemail,
            sellername: product.sellerName,
            selleremail: product.sellerEmail,
            productmaker: user.contactmaker,
            productmodel: user.contactmodel,
            comments: user.contactcomments
        }
        try {
            // local
            const res = await axios.post(`http://localhost:3000/api/v1/contactsellerform`, contact);
            // testing
            // const res = await axios.post(`https://findaharp-api-testing.herokuapp.com/api/v1/contactsellerform`, contact);
            // staging
            // const res = await axios.post(`https://findaharp-api-staging.herokuapp.com/api/v1/contactsellerform`, contact);
            // production
            // const res = await axios.post(`https://findaharp-api.herokuapp.com/api/v1/contactsellerform`, contact);
            resultText.innerText=`Email has been sent to seller.`;
            // resultText.innerText=`Email regarding ${product.productMaker} ${product.productModel} has been sent to seller.`;
            resultImg.style.display='none';
            resultButton.style.display= 'block';
        } catch(e) {
            resultText.innerText=`Something went wrong. Please try again or contact the webmaster. ${e.message}`;
            resultImg.style.display='none';
            resultButtonTryAgain.style.display= 'block';
        }
        
        // props.handleCloseContact();
    }
   return (
        <>
        <div className='detailContainer'>
            <div id="loadingLogin">
                <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button id='loadingLoginOk' type='button' className='submit-btn' onClick={props.handleCloseContact}>OK</button>
                    <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div>
            <h1>Contact {removeDashOE(product.sellerName)}</h1>           
            <div className='heading'>
                <p>Communication with sellers can take place through findaharp.com at no charge.<br></br></p>
            </div>
            <div 
                className='clearModal' 
                onClick={() => 
                    {if (!user.change || user.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
                }} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='contactContainer'>
                <div className={`detailImg`}>
                    <img src= {product.productImageUrl} alt={product.productTitle}/>
                    <p><span className='label'>
                        {product.productMaker} {product.productModel}
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
                        <label className="label" name='contactcomments'>Comments </label>
                        <textarea
                            id={uuid()}
                            name='contactcomments'
                            value={user.contactcomments}
                            onChange={handleChange}
                            rows='6'
                        />
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
