// packages
import React, {useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import LoginSignupCSS from '../src/styles/LoginSignup.css';
import PageUnderConstructionCSS from '../src/styles/PageUnderConstuction.css';

function LoginSignup(props) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        contactemail: '',
        password: '',
        confirmpassword: '',
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
            case 'password': 
                setUser({...user, password: evt.target.value, change: true});
                break
            case 'confirmpassword': 
                setUser({...user, confirmpassword: evt.target.value, change: true});
                break
               
            default :
        }
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        alert('Signup new user under construction.');
        // if (!user.contactemail) return alert('Email is required');
        // const contact = {
        //     firstname: user.firstname,
        //     lastname: user.lastname,
        //     email: user.contactemail,
        //     sellername: product.sellerName,
        //     productmaker: user.contactmaker,
        //     productmodel: user.contactmodel,
        //     comments: user.contactcomments
        // }
        // try {
        //     const res = await axios.post(
        //         `https://findaharp-api-testing.herokuapp.com/api/v1/contactform`, 
        //         contact
        //     );
        //     alert("Email sent.")
        // } catch(e) {
        //     alert("Something went wrong. Please try again or contact the webmaster.", e.message)
        // }
        
        // props.handleCloseContact();
    }
    function handleClose() {
        document.querySelector('.detailContainer').style.display="none";
    }
   return (
        <>
        <div className='underConstruction'>           
            <h2>Login/Signup Page Under Construction</h2>
        </div>
        <PageUnderConstructionCSS />
        <div className='detailContainer'>
            <div className={`detailImg`}>
                <img src= {`./img/golden_harp_full.png`} alt={"logo"}/>
            </div>
            <div 
                className='clearModal' 
                onClick={() => 
                    {if (!user.change || user.change && confirm('Signup not completed. Changes will be lost. Exit signup?')) handleClose();
                }} 
            >
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <form className='detailText'>             
                <div className='heading'>
                    <p>Easy Sign-up <button className={`detailButton`}>Login</button><br></br></p>
                </div>              
                <div className={`flex marginTopLarge`}>
                    <div className='inputGroup'>
                        <label name='firstname'>First Name: </label>
                        <input
                            id={uuid()}
                            value={user.firstname}
                            onChange={handleChange}
                            name='firstname'
                            placeholder="optional"
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
                            placeholder="optional"
                        />
                    </div>
                </div>
                <div className='inputGroup'>
                    <label name='email'>Email: </label>
                    <input
                        id={uuid()}
                        name='contactemail'
                        type='email'
                        value={user.contactemail}
                        onChange={handleChange}
                        required
                    />
                </div>         
                <div className='inputGroup'>
                    <label name='password'>password: </label>
                    <input
                        id={uuid()}
                        type='password'
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>         
                <div className='inputGroup'>
                    <label name='confirmpassword'>confirm password: </label>
                    <input
                        id={uuid()}
                        name='confirmpassword'
                        type='password'
                        value={user.confirmpassword}
                        onChange={handleChange}
                        required
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
                            {if (!user.change || user.change && confirm('Signup not completed. Changes will be lost. Exit signup?')) handleClose();
                        }}
                    >Cancel
                    </button>
                </div>         
            </form>
        </div>
        <LoginSignupCSS />
        </>
    )
}

export default LoginSignup;
