// packages
import React, {useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import ContactUsFormCSS from '../styles/ContactUsForm.css';

function ContactUsForm(props) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
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
            case 'contactcomments': 
                setUser({...user, contactcomments: evt.target.value, change: true});
                break     
            default :
        }
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!user.contactemail) return alert('Email is required');
        const contact = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.contactemail,
            comments: user.contactcomments
        }
        try {
            // const res = await axios.post(
            //     `https://findaharp-api-testing.herokuapp.com/api/v1/contactform`, 
            //     contact
            // );
            // alert("Email sent.")
            alert('under construction, contact form not sent')
        } catch(e) {
            alert("Something went wrong. Please try again or contact the webmaster.", e.message)
        }
        
        props.handleCloseContact();
    }
   return (
        <>    
            <div 
                className='clearModal' 
                onClick={() => 
                    {if (!user.change || user.change && confirm('Email not sent. Changes will be lost. Exit contact form?')) props.handleCloseContact();
                }} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <div className='contactFormContainer'> 
                <h2>Contact Find a Harp</h2> 
                <p className='subTitle' style={{textAlign: 'center'}}>We want to hear from you!<br></br></p>
                
                <div className='flexSB'>
                <div className={`contactText`}>    
                    <h3>Problems with Harp Advertisements</h3>
                    <p>Our harp advertisements are automatically updated from our store partner websites. Please let us know if you see something that is confusing or incorrect.</p>
                    <h3>Suggestions</h3>
                    <p>We welcome your suggestions to make our site as thorough and as easy to use as possible.</p> 
                </div>
            
                <form className='contactForm'>     
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
                    <div>
                        <button
                            className='detailButton'
                            type='submit'
                            onClick={handleSubmit} 
                        >Submit
                        </button>
                        <button
                            className={`detailButton detailButton-cancel`}
                            type='reset'
                            onClick={() => setUser({
                                firstname: '',
                                lastname: '',
                                email: '',
                                comments: '',
                                change: false})
                            }
                        >Clear
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
