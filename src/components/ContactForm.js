import React, {useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

import ContactFormCSS from '../styles/ContactForm.css';

function ContactForm(props) {
    const {product} = props;
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
        contactmaker: product.productMaker,
        contactmodel: product.productModel,
        contactcomments: ''
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setUser({...user, firstname: evt.target.value});
                break
            case 'lastname': 
                setUser({...user, lastname: evt.target.value});
                break
            case 'contactemail': 
                setUser({...user, contactemail: evt.target.value});
                break
            case 'contactmaker': 
                setUser({...user, contactmaker: evt.target.value});
                break
            case 'contactmodel': 
                setUser({...user, contactmodel: evt.target.value});
                break     
            case 'contactcomments': 
                setUser({...user, contactcomments: evt.target.value});
                break     
            default :
        }
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const contact = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.contactemail,
            sellername: product.sellerName,
            productmaker: user.contactmaker,
            productmodel: user.contactmodel,
            comments: user.contactcomments
        }
        try {
            const res = await axios.post(
                `https://findaharp-api-testing.herokuapp.com/api/v1/contactform`, 
                contact
            );
            alert("Email sent.")
        } catch(e) {
            alert("Something went wrong. Please try again or contact the webmaster.", e.message)
        }
        
        props.handleCloseContact();
    }
   return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}>
                <img src= {product.productImageUrl} alt={product.productTitle}/>
                <p><span style={{fontWeight: 600}}>
                    {product.productTitle}
                </span><br></br><span>{product.sellerName}</span></p>
            </div>
            <div 
                className='clearModal' 
                onClick={() => 
                    confirm('Email not sent. Exit contact form?')
                    && props.handleCloseContact()} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <form className='detailText'>             
                <div className='heading'>
                    <p>Your contact information will not be shared. Communication with sellers can take place through findaharp.com at no charge.<br></br></p>
                </div>              
                <div className={`flex marginTopLarge`}>
                    <div className='inputGroup'>
                        <label name='firstname'>First Name: </label>
                        <input
                            id={uuid()}
                            value={user.firstname}
                            onChange={handleChange}
                            name='firstname'
                        />
                    </div>
                    <div className='inputGroup'>
                        <label name='lastname'>Last Name: </label>
                        <input
                            id={uuid()}id="outlined-helperText"
                            label="Last Name"
                            value={user.lastname}
                            onChange={handleChange}
                            name ='lastname'
                        />
                    </div>
                </div>
                <div className='inputGroup'>
                    <label name='email'>Email: </label>
                    <input
                        id={uuid()}
                        name='contactemail'
                        value={user.contactemail}
                        onChange={handleChange}
                    />
                </div>         
                <div className='inputGroup'>
                    <label name='contactmaker'>Maker: </label>
                    <input
                        id={uuid()}
                        name='contactmaker'
                        value={user.contactmaker}
                        onChange={handleChange}
                    />
                </div>         
                <div className='inputGroup'>
                    <label name='contactmodel'>Model: </label>
                    <input
                        id={uuid()}
                        name='contactmodel'
                        value={user.contactmodel}
                        onChange={handleChange}
                    />
                </div>         
                <div className='inputGroup'>
                    <label name='contactcomments'>Comments: </label>
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
                        onClick={() => confirm('Changes not saved. Exit contact form?')&& props.handleCloseContact()} 
                    >Cancel
                    </button>
                </div>         
            </form>
        </div>
        <ContactFormCSS />
        </>
    )
}

export default ContactForm;
