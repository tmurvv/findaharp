// packages
import React, {useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import ContactUsFormCSS from '../styles/ContactUsForm.css';
import ProductModalCSS from '../styles/ProductModal.css';

function ContactUsForm(props) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
        contactcomments: '',
        change: false
    });
    const [openStoreOwnerInq, setOpenStoreOwnerInq] = useState(false);
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
            case 'contactcomments': 
                setUser({...user, contactcomments: evt.target.value, change: true});
                break     
            default :
        }
    }
    function clearForm() {
        setUser({
            firstname: '',
            lastname: '',
            contactemail: '',
            contactcomments: '',
            change: false
        });
    }
    const handleSubmit = async (evt) => {
        // {if (!user.change || user.change && confirm('Email not sent. Changes will be lost. Clear contact form?')) clearForm();}
        evt.preventDefault();
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        if (!user.contactemail) return alert('Email is required');
        resultContainer.style.display='block';
        resultImg.style.display='block';
        
        if (!user.contactemail) return alert('Email is required');
        const contact = {
            contactid: uuid(),
            date: new Date(Date.now()),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.contactemail,
            comments: user.contactcomments,
            selleremail: 'tisha@findaharp.com'
        }
        try {
            // local
            const res = await axios.post(`${process.env.backend}/api/v1/contactform`, contact);
            // testing
            // const res = await axios.post(`https://findaharp-api-testing.herokuapp.com/api/v1/contactform`, contact);
            // staging
            // const res = await axios.post(`https://findaharp-api-staging.herokuapp.com/api/v1/contactform`, contact);
            // production
            // const res = await axios.post(`https://findaharp-api.herokuapp.com/api/v1/contactform`, contact);
            // alert("Email sent.");
            // alert('under construction, contact form not sent')
            resultText.innerText=`Contact form has been sent to findaharp.com.`;
            resultImg.style.display='none';
            resultButton.style.display= 'block';
        } catch(e) {
            resultText.innerText=`Something went wrong. Please try again or send an email to harps@findaharp.com. ${e.message}`;
            resultImg.style.display='none';
            resultButtonTryAgain.style.display= 'block';
        }  
        clearForm();
    }
    function resetResults() {
        document.querySelector('#loadingLogin').style.display='none';
        document.querySelector('#loadingLoginText').innerText='';
        document.querySelector('#loadingLoginOk').style.display='none';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
    }
   return (
        <>  
        <div className='detailContainer' hidden={!openStoreOwnerInq}>
            <h2>Store Partner Program Details</h2>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='detailInfo'>
            <div className={`detailImg`} style={{marginTop: '43px'}}>
                <img src= '/img/golden_harp_cropped.png' alt='findaharp golden harp logo' />
                <img src= '/img/logo_findaharp_black.png' alt='findaharp golden harp logo' />
            </div>
            <div className={`detailText`}>
                <p><span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No monthly fee<br></br>
                <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No per harp fee<br></br>
                <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No signup time requirements<br></br>
                <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> No extra working uploading or updating your listings, ask for details (free)<br></br>
                <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Small finders fee only if findaharp connects you with a customer that eventually purchases a harp<br></br>
                <span><img src='/img/golden_harp_full.png' style={{transform: 'translateY(2.5px)', width: '14px', marginRight: '3px'}}/></span> Email tisha@findaharp.com for more information or to sign up</p>
                
                <br></br>
                <br></br>
                <div className='longDesc'><span>Testimonials and Statistics</span><br></br>Coming soon !! Testimonials. Findaharp.com website traffic statistics. Number of findaharp.com community members. Number of referrals.</div>
                <br></br>
                {/* <p><span>Location</span> {sellerRegion?sellerRegion:'unavailable'}<br></br>
                <span>Seller</span> {sellerName?removeDashOE(sellerName):'unavailable'}<br></br></p> */}
                <button className='detailButton'><a href='mailto:tisha@findaharp.com?subject=store partner inquiry&body="I would like more information about the Store Partner Program at findaharp.com."' style={{color: 'black'}}>Store Partner Inquiry</a></button>        
            </div>

            <div onClick={(evt) => setOpenStoreOwnerInq(false)} className='clearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>  
        </div>
        </div>
        <ProductModalCSS />
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
                    <div id="loadingLogin">
                        <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                        <p id="loadingLoginText"></p>
                        <div className='flex-sb'>
                            <button id='loadingLoginOk' type='button' className='submit-btn' onClick={resetResults}>OK</button>
                            <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                        </div>
                    </div>    
                    <div className='inputGroup'>
                        <label name='firstname'>First Name </label>
                        <input
                            id={uuid()}
                            value={user.firstname}
                            onChange={handleChange}
                            name='firstname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label name='lastname'>Last Name </label>
                        <input
                            id={uuid()}id="outlined-helperText"
                            label="Last Name"
                            value={user.lastname}
                            onChange={handleChange}
                            name ='lastname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label name='email'>Email </label>
                        <input
                            id={uuid()}
                            name='contactemail'
                            value={user.contactemail}
                            onChange={handleChange}
                            required
                        />
                    </div>                 
                    <div className='inputGroup'>
                        <label name='contactcomments'>Comments </label>
                        <textarea
                            id={uuid()}
                            name='contactcomments'
                            value={user.contactcomments}
                            onChange={handleChange}
                            rows='6'
                        />
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
                            onClick={handleSubmit}
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
