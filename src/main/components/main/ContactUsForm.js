// packages
import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import Results from './Results';
import StorePartnerInfo from './StorePartnerInfo';
import ContactUsFormCSS from '../../styles/ContactUsForm.css';
import { UserContext } from '../../contexts/UserContext';
import { RESULTS_INITIAL_STATE } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';

function ContactUsForm(props) {
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const { user } = useContext(UserContext);
    const [userContact, setUserContact] = useState({
        firstname: user.firstname!=="login"?user.firstname:'',
        lastname: user.lastname,
        contactemail: user.email,
        contactcomments: '',
        newsletter: false,
        change: false
    });
    const [openStoreOwnerInq, setOpenStoreOwnerInq] = useState(false);
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
            case 'contactcomments': 
                setUserContact({...userContact, contactcomments: evt.target.value, change: true});
                break     
            case 'newsletter': 
                setUserContact({...userContact, newsletter: !user.newsletter, change: true});
                break     
            default :
        }
    }
    function clearForm() {
        setUserContact({
            firstname: '',
            lastname: '',
            contactemail: '',
            contactcomments: '',
            newsletter: false,
            change: false
        });
    }
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');        
        if (!userContact.contactemail) {
            resultText.innerText = "Email is required";
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }   
        const contact = {
            contactid: uuid(),
            date: new Date(Date.now()),
            firstname: userContact.firstname,
            lastname: userContact.lastname,
            email: userContact.contactemail,
            comments: userContact.contactcomments,
            selleremail: 'tisha@findaharp.com',
            newsletter: userContact.newsletter
        }
        try {
            // send contactUs inq
            const res = await axios.post(`${process.env.backend}/api/v1/contactform`, contact);
            resultText.innerText=`Contact Us form has been sent to findaharp.com.`;
            dispatchResultInfo({type: 'OK'});
        } catch(e) {
            resultText.innerText=`Something went wrong. Please check your network connection.`;
            dispatchResultInfo({type: 'tryAgain'});
        }
    }
    function loginGuest() { 
        resetResults();
        clearForm();
    }
   return (
        <>  
            <Results 
                resultInfo={resultInfo} 
                resetResults={resetResults}
                loginGuest={loginGuest}
            />
            {openStoreOwnerInq?<StorePartnerInfo open={openStoreOwnerInq} close={()=>setOpenStoreOwnerInq(false)}/>:''}
            <div className='contactFormContainer'> 
                <div className={`contactArea`}>
                <div className={`contactText`}>    
                    <h3>Suggestions</h3>
                    <p>We welcome your suggestions to make our site as thorough and as easy to use as possible.</p><br></br><br></br>
                    <h3>Do you sell harps?</h3>
                    <p>We are always looking for more harps to list on our site to show off our extensive search capabilities. <button onClick={()=>setOpenStoreOwnerInq(true)} style={{margin: '0', padding: '5px 7px', fontSize: '16px', backgroundColor: 'transparent', border: 'none', color: '#6A75AA', textDecoration: 'underline'}}>Click here</button> for information on becoming a store partner at findaharp.com.</p><br></br><br></br>
                    <h3>Submissions to our Buyer's Guide</h3>
                    <p>We would love for our Buyer's Guide to be a collaborative undertaking by the harp community. Please submit anything you feel we have left out.</p><br></br><br></br>
                    <h3>Problems with Harp Advertisements</h3>
                    <p>Our harp advertisements are automatically updated from our store partner websites. Please let us know if you see something that is confusing or incorrect.</p>
                </div>
                <form className='contactForm'> 
                    <div className='inputGroup'>
                        <label name='firstname'>First Name </label>
                        <input
                            id={uuid()}
                            value={userContact.firstname}
                            onChange={handleChange}
                            name='firstname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label name='lastname'>Last Name </label>
                        <input
                            id={uuid()}id="outlined-helperText"
                            label="Last Name"
                            value={userContact.lastname}
                            onChange={handleChange}
                            name ='lastname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label name='email'>Email </label>
                        <input
                            id={uuid()}
                            name='contactemail'
                            value={userContact.contactemail}
                            onChange={handleChange}
                            required
                        />
                    </div>                 
                    <div className='inputGroup'>
                        <label name='contactcomments'>Comments </label>
                        <textarea
                            id={uuid()}
                            name='contactcomments'
                            value={userContact.contactcomments}
                            onChange={handleChange}
                            rows='6'
                        />
                    </div>   
                    <div style={{marginBottom: '-15px', marginTop:'25px'}}>
                        <input 
                            id={uuid()}
                            type='checkbox'
                            name='newsletter'
                            onChange={handleChange}
                            style={{marginLeft: '0'}}
                            checked={userContact.newsletter}
                        />
                        <label style={{marginLeft: '5px'}} name='newsletter'>
                            Signup for Find a Harp newsletter?<br />
                            Fun talk about harps every other month.
                        </label>
                    </div>      
                    <div className='buttons'>
                        <button
                            className='detailButton'
                            type='submit'
                            onClick={handleSubmit} 
                            style={{marginBottom: '0'}}
                        >Submit
                        </button>
                        <button
                            className={`detailButton detailButton-cancel`}
                            type='button'
                            onClick={()=>userContact.change&&confirm('Clear the "Contact Us" form?')?loginGuest():""}
                        >Cancel
                        </button>
                    </div>         
                </form>
                </div>   
        </div>
            
        <ContactUsFormCSS />
        </>
    )
}

export default ContactUsForm;
