// packages
import React, {useState, useContext} from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import { UserContext } from '../src/contexts/UserContext';
import LoginSignupCSS from '../src/styles/LoginSignup.css';

function UserProfile(props) {
    const { user, setUser} = useContext(UserContext);
    const [active, setActive] = useState('changePassword');
    const [needVerify, setNeedVerify] = useState(false);
    const [userSignup, setUserSignup] = useState({
        firstname: '',
        lastname: '',
        signupemail: '',
        signuppassword: '',
        confirmpassword: '',
        distanceunit: '',
        signupchange: false
    });
    const [userLogin, setUserLogin] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        loginchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setUserSignup({...userSignup, firstname: evt.target.value, signupchange: true});
                break
            case 'lastname': 
                setUserSignup({...userSignup, lastname: evt.target.value, signupchange: true});
                break
            case 'signupemail': 
                setUserSignup({...userSignup, signupemail: evt.target.value, signupchange: true});
                break
            case 'distanceunit': 
                setUserSignup({...userSignup, distanceunit: evt.target.value, signupchange: true});
                break
            case 'oldpassword': 
                setUserLogin({...userLogin, oldpassword: evt.target.value, loginchange: true});
                break
            case 'newpassword': 
                setUserLogin({...userLogin, newpassword: evt.target.value, loginchange: true});
                break
            case 'confirmpassword': 
                setUserLogin({...userLogin, confirmpassword: evt.target.value, loginchange: true});
                break
            default :
        }
    }
    function resetSignupForm() {
        setUserSignup({
            firstname: '',
            lastname: '',
            signupemail: '',
            signuppassword: '',
            confirmpassword: '',
            distanceUnit: 'miles',
            signupchange: false
        });
    }
    function resetLoginForm() { 
        setUserLogin({
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            loginchange: false
        });
    }
    function resetResults() {
        document.querySelector('#loadingLogin').style.display='none';
        document.querySelector('#loadingLoginText').innerText='';
        document.querySelector('#loadingLoginOk').style.display='none';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
    }
    function handleSignupClick(evt) {
        resetLoginForm();
        setActive('editProfile');
        const signup = document.querySelector('#signup');
        const login = document.querySelector('#login');
        signup.classList.remove("s-atbottom");
        signup.classList.add("s-attop");
        login.classList.remove("l-attop");
        login.classList.add("l-atbottom");
    }
    function handleLoginClick(evt) {
        if (userSignup.signupchange===true) {if (!confirm('changes will be lost')) return};
        resetSignupForm();
        setActive('changePassword');
        const signup = document.querySelector('#signup');
        const login = document.querySelector('#login');
        signup.classList.add("s-atbottom");
        signup.classList.remove("s-attop");
        login.classList.add("l-attop");
        login.classList.remove("l-atbottom");
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        console.log('active', active);
        if (active==='editProfile') {
            // shortcut
            if ((!userSignup.signuppassword)||userSignup.signuppassword.length<8) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            resultContainer.style.display='block';
            resultImg.style.display='block';
            console.log('control', userSignup)
            const updatedUser = {
                firstname: userSignup.firstname?userSignup.firstname:user[0],
                lastname: userSignup.lastname?userSignup.lastname:user[1],
                email: userSignup.signupemail?userSignup.signupemail:user[2],
                distanceunit: userSignup.distanceunit?userSignup.distanceunit:user[3],
                password: userSignup.signuppassword,
                userid: user[4]
            };
            console.log('update', updatedUser);
            try {
                /* LOCAL */
                const res = await axios.patch(`http://localhost:3000/api/v1/users/updateuser/${user[4]}`, updatedUser);
                /* TESTING */
                // const res = await axios.patch('https://findaharp-api-testing.herokuapp.com/api/v1/users/createuser', newUser);
                /* PRODUCTION */
                // const res = await axios.patch('https://findaharp-api.herokuapp.com/api/v1/users/createuser', newUser);
                console.log(res)
                if (res.status===200) {
                    resultImg.style.display='none';
                    resultButton.style.display='block';
                    resultText.innerText=`Update Successful.`;
                    setNeedVerify(true);
                    console.log(res.data);
                    const { userCopy } = res.data.data;
                    setUser([
                        userCopy.firstname, 
                        userCopy.lastname, 
                        userCopy.email, 
                        userCopy.distanceunit,
                        userCopy._id
                    ]);
                }
            } catch (e) {
                console.dir(e);
                resultImg.style.display='none';
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft='30px';
                resultText.innerText=`${process.env.next_env==='development'?e.response.data.message:e.response.data.message}`
                // resultText.innerText=`Something went wrong on signup. Log in as guest user?`
            }
        }       
        if (active==='changePassword') {   
            resultContainer.style.display='block';
            if (userLogin.oldpassword.length<8 || userLogin.newpassword.length<8) {
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            console.log('inchangepas',userLogin)
            // passwords match 
            if (userLogin.newpassword !== userLogin.confirmpassword) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords do not match.`;
                return
            }
            resultText.innerText='Loading...';
            resultImg.style.display='block';
            try {
                /* LOCAL */
                const res = await axios.patch(`http://localhost:3000/api/v1/users/updateuser/${user[4]}`, {userid: user[4], password: userLogin.newpassword, oldpassword: userLogin.oldpassword});
                /* TESTING */
                // const res = await axios.patch(`https://findaharp-api-testing.herokuapp.com/api/v1/users/updateuser/${user[4]}`, {userid: user[4], password: userLogin.newpassword, oldpassword: userLogin.oldpassword});
                /* PRODUCTION */
                // const res = await axios.patch(`https://findaharp-api.herokuapp.com/api/v1/users/updateuser/${user[4]}`, {userid: user[4], password: userLogin.newpassword, oldpassword: userLogin.oldpassword});
                
                const returnedUser = res.data.userCopy;
                await setUser([returnedUser.firstname, returnedUser.distanceunit]);
                resultText.innerText=`Password change successful.`;
                resultImg.style.display='none';
                resultButton.style.display= 'block';
            } catch(e) {
                console.dir(e)
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('verified')) {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.message:'Something went wrong on login.'} Login as guest?`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
                } else {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.message:'Something went wrong on login.'} Login as guest?`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
                }
            }
        }
        resetSignupForm();
        resetLoginForm();
    }
    function loginGuest() {
        resetResults();
        Router.push('/');
    }
    return (
       <>
        <div className='login-signup-container'>
            <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
            <div id="loadingLogin">
                <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button id='loadingLoginOk' type='button' className='submit-btn' onClick={loginGuest}>OK</button>
                    <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div>
            <div className="login-signup s-atbottom" id="signup" onClick={()=>handleSignupClick()}>
                <form onSubmit={()=>handleSubmit()}>
                    <div className="login-signup-title">
                        Edit User Profile
                    </div>
                    <div className='login-form'>
                        <div className="input-name input-margin">
                            <h3>Please re-enter Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={userSignup.editpassword}
                            onChange={handleChange}
                            name='editpassword'
                            required={active==='editProfile'}
                            disabled={active==='changePassword'}
                        />
                        <div className="input-name">
                            <h3>First Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userSignup.firstname}
                            onChange={handleChange}
                            name='firstname'
                            placeholder={user[0]}
                            disabled={active==='changePassword'}
                        />
                        <div className="input-name">
                            <h3>Last Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userSignup.lastname}
                            onChange={handleChange}
                            name='lastname'
                            placeholder={user[1]}
                            disabled={active==='passwordChange'}
                        />
                        <div className="input-name input-margin">
                            <h3>E-Mail</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            id={uuid()}
                            value={userSignup.signupemail}
                            onChange={handleChange}
                            name='signupemail'
                            placeholder={user[2]}
                            required={active==='editProfile'}
                            disabled={active==='changePassword'}
                        />
                        <div className="input-name input-margin">
                            <h3>I prefer distances in</h3>
                        </div>
                        <div className='flex'>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='miles'
                                onChange={handleChange}
                                name='distanceunit'
                                disabled={active==='changePassword'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked = {user[3]==='miles'}
                            />
                            <label style={{marginRight: '30px'}} htmlFor="miles">Miles</label>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='kms'
                                onChange={handleChange}
                                name='distanceunit'
                                disabled={active==='changePassword'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked = {user[3]!=='miles'}
                            />
                            <label htmlFor="Kms">Kms</label>
                        </div>   
                    </div>
                    <button type='submit' className="submit-btn login-signup-title" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
            <div style={{transform: 'translate(28%, -120%)'}} className="login-signup l-attop" id="login" onClick={handleLoginClick}>
                <div className="login-signup-title">
                    {needVerify&&active==='changePassword'?"Email not verified. Please check inbox for verification email from Findaharp.com.": "Change Password"}
                </div>
                <form onSubmit={handleSubmit}>
                        {needVerify&&active==='changePassword'
                        ?
                            <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                                <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                                <img height='100%' src='./img/not_found.png' alt='golden harp' />}
                            </div>
                        :
                        <>
                            <div style={{padding: '25px'}}>   
                            <div className="input-name input-margin">
                                    <h3>Old Password</h3>
                                </div>
                                <input 
                                    className="field-input"
                                    type='password'
                                    id={uuid()}
                                    value={userLogin.oldpassword}
                                    onChange={handleChange}
                                    name='oldpassword'
                                    required={active==='changePassword'}
                                    disabled={active==='editProfile'}
                                />
                                <div className="input-name input-margin">
                                    <h3>New Password</h3>
                                </div>
                                <input 
                                    className="field-input"
                                    type='password'
                                    id={uuid()}
                                    value={userLogin.newpassword}
                                    onChange={handleChange}
                                    name='newpassword'
                                    required={active==='changePassword'}
                                    disabled={active==='editProfile'}
                                />
                                <div className="input-name input-margin">
                                    <h3>Confirm New Password</h3>
                                </div>
                                <input 
                                    className="field-input"
                                    type='password'
                                    id={uuid()}
                                    value={userLogin.confirmnewpassword}
                                    onChange={handleChange}
                                    name='confirmpassword'
                                    required={active==='changePassword'}
                                    disabled={active==='editProfile'}
                                />
                            </div>
                            <button type='submit' className="submit-btn login-signup-title">
                                Submit
                            </button>
                            <div className="forgot-pass" onClick={()=>alert('forgot password under construction')}>
                                <a href="#">Forgot Old Password?</a>
                            </div>
                        </>
                    }
                </form>
            </div>
            <LoginSignupCSS />
        </div>
        </>
    )
}

export default UserProfile;
