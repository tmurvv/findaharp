// packages
import React, { useState, useContext, useReducer } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import UserProfileCSS from '../src/styles/UserProfile.css';
import { UserContext } from '../src/contexts/UserContext';
import { resultInfoReducer, activeWindowReducer } from '../src/reducers/reducers';

const resultInfoInitialState = {
    resultContainer: 'none',
    resultText: 'none',
    resultOkButton: 'none',
    resultTryAgainButton: 'none',
    tryAgainMarginLeft: '0',
    resultImg: 'none'
}
const activeWindowInitialState = {
    activeWindow: 'changePassword',
    loginClasses: 'login-signup l-attop',
    signupClasses: 'login-signup s-atbottom'
}
function UserProfile(props) {
    const { user, setUser} = useContext(UserContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, resultInfoInitialState);
    const [activeWindow, dispatchActiveWindow] = useReducer(activeWindowReducer, activeWindowInitialState);
    const [needVerify, setNeedVerify] = useState(false);
    const [userEdit, setUserEdit] = useState({
        firstname: '',
        lastname: '',
        editemail: '',
        editpassword: '',
        confirmpassword: '',
        distanceunit: '',
        newsletter: false,
        editchange: false
    });
    const [userUpdatePassword, setUserUpdatePassword] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        updatePasswordchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setUserEdit({...userEdit, firstname: evt.target.value, editchange: true});
                break
            case 'lastname': 
                setUserEdit({...userEdit, lastname: evt.target.value, editchange: true});
                break
            case 'editemail': 
                setUserEdit({...userEdit, editemail: evt.target.value, editchange: true});
                break
            case 'editpassword':
                setUserEdit({...userEdit, editpassword: evt.target.value, editchange: true});
                break
            case 'newsletter': 
                setUserEdit({...userEdit, newsletter: evt.target.checked, editchange: true});
                break
            case 'distanceunit': 
                setUserEdit({...userEdit, distanceunit: evt.target.value, editchange: true});
                break
            case 'oldpassword': 
                setUserUpdatePassword({...userUpdatePassword, oldpassword: evt.target.value, updatePasswordchange: true});
                break
            case 'newpassword': 
                setUserUpdatePassword({...userUpdatePassword, newpassword: evt.target.value, updatePasswordchange: true});
                break
            case 'confirmpassword': 
                setUserUpdatePassword({...userUpdatePassword, confirmpassword: evt.target.value, updatePasswordchange: true});
                break
            default :
        }
    }
    function resetEditForm() {
        setUserEdit({
            firstname: '',
            lastname: '',
            editemail: '',
            editpassword: '',
            confirmpassword: '',
            distanceUnit: 'miles',
            editchange: false
        });
    }
    function resetUpdatePasswordForm() { 
        setUserUpdatePassword({
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            updatePasswordchange: false
        });
    }
    function resetResults() {
        dispatchResultInfo({type: 'initial'});
    }
    function handleEditClick(evt) {
        dispatchActiveWindow({type: 'signup'});
        resetUpdatePasswordForm();
    }
    function handleUpdatePasswordClick(evt) {
        dispatchActiveWindow({type: 'login'});
        resetEditForm();
    } 
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        if (activeWindow.active==='signup') {
            // shortcut
            if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
                dispatchResultInfo({type: 'tryAgain'})
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            const updatedUser = {
                firstname: userEdit.firstname?userEdit.firstname:user[0],
                lastname: userEdit.lastname?userEdit.lastname:user[1],
                email: userEdit.editemail?userEdit.editemail:user[2],
                distanceunit: userEdit.distanceunit?userEdit.distanceunit:user[3],
                password: userEdit.editpassword,
                userid: user[4],
                newsletter: userEdit.newsletter
            };
            try {
                /* LOCAL */
                const res = await axios.patch(`${process.env.backend}/api/v1/users/updateuser/${user[4]}`, updatedUser);
                /* TESTING */
                // const res = await axios.patch('https://findaharp-api-testing.herokuapp.com/api/v1/users/updateuser/${user[4]}', updatedUser);
                /* STAGING */
                // const res = await axios.patch('http://localhost:3000/api/v1/users/updateuser/${user[4]}', updatedUser);
                /* PRODUCTION */
                // const res = await axios.patch('https://findaharp-api.herokuapp.com/api/v1/users/updateuser/${user[4]}', updatedUser);
                if (res.status===200) {
                    resultText.innerText=`Update Successful.`;
                    dispatchResultInfo({type: 'OK'});
                    setNeedVerify(true);
                    
                    const { userCopy } = res.data;
                    setUser([
                        userCopy.firstname, 
                        userCopy.lastname, 
                        userCopy.email,
                        userCopy.newsletter,
                        userCopy.distanceunit,
                        userCopy._id
                    ]);
                }
            } catch (e) {
                dispatchResultInfo({type: 'tryAgain'});
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on update.'}`
            }
        }       
        if (activeWindow.active==='login') {   
            // check password length
            if (userUpdatePassword.oldpassword.length<8 || userUpdatePassword.newpassword.length<8) {
                dispatchResultInfo({type: 'tryAgain'});
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            // check if passwords match 
            if (userUpdatePassword.newpassword !== userUpdatePassword.confirmpassword) {
                dispatchResultInfo({type: 'tryAgain'});
                resultText.innerText=`Passwords do not match.`;
                return
            }
            resultText.innerText=``;
            dispatchResultInfo({type: 'loadingImage'})
            try {
                /* LOCAL */
                await axios.patch(`${process.env.backend}/api/v1/users/updatepassword/${user[4]}`, {password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* TESTING */
                // const res = await axios.patch(`https://findaharp-api-testing.herokuapp.com/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* STAGING */
                // const res = await axios.patch(`http://localhost:3000/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* PRODUCTION */
                // const res = await axios.patch(`https://findaharp-api.herokuapp.com/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                dispatchResultInfo({type: 'OK'});
                resultText.innerText=`Password change successful.`;
            } catch(e) {
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('verified')) {
                    dispatchResultInfo({type: 'okTryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'A.Something went wrong on updatePassword.'}`;
                } else {
                    dispatchResultInfo({type: 'okTryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'B.Something went wrong on updatePassword.'}`;
                }
            }
        }
        resetEditForm();
        resetUpdatePasswordForm();
    }
    function updatePasswordGuest() {
        resetResults();
        Router.push('/');
    }
    async function handleDelete(e) {
        const resultText = document.querySelector('#loadingLoginText');
        e.preventDefault();
        if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
            dispatchResultInfo({type: 'tryAgain'});
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            return
        }
        if (prompt('Are you sure you want to delete your account? Please type in your account email to confirm.')!==user[2]) return alert('Email does not match.');
        
        try {
            // LOCAL
            const res=await axios.delete(`${process.env.backend}/api/v1/users/deleteuser/${user[4]}`);
            // TESTING
            // const res=await axios.delete(`https://findaharp-api-testing.herokuapp.com/api/v1/users/deleteuser/${user[4]}`);
            // STAGING
            // const res=await axios.delete(`http://localhost:3000/api/v1/users/deleteuser/${user[4]}`);
            // PRODUCTION
            // const res=await axios.delete(`https://findaharp-api.herokuapp.com/api/v1/users/deleteuser/${user[4]}`);
            // const returnedUser = res.user;
            dispatchResultInfo({type: 'OK'});
            resultText.innerText=`Account ${user[2]} has been deleted`;
            await setUser(['Login','','','miles','']);
        } catch(e) {
            dispatchResultInfo({type: 'OK'})
            resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on delete.'}`;
        }    
    }
    return (
       <>
        <div className='updatePassword-edit-container'>
            <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
            <div id="loadingLogin" style={{display: resultInfo.resultContainer}}>
                <img id='loadingLoginImg' style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button 
                        id='loadingLoginOk'
                        type='button' 
                        className='submit-btn' 
                        onClick={updatePasswordGuest}
                        style={{display: resultInfo.resultOkButton}} 
                    >
                        OK
                    </button>
                    <button 
                        id='loadingLoginTryAgain' 
                        type='button' 
                        className='submit-btn submit-btn-tryAgain' 
                        onClick={()=>dispatchResultInfo({type:'initial'})}
                        style={{display: resultInfo.resultTryAgainButton, marginLeft: resultInfo.tryAgainMarginLeft}} 
                    >
                        Try Again
                    </button>
                </div>
            </div>           
            {/* <div id="loadingUpdatePassword">
                <img id='loadingUpdatePasswordImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingUpdatePasswordText"></p>
                <div className='flex-sb'>
                    <button id='loadingUpdatePasswordOk' type='button' className='submit-btn' onClick={updatePasswordGuest}>OK</button>
                    <button id='loadingUpdatePasswordTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div> */}
            <div className={activeWindow.signupClasses} id="signup" onClick={()=>handleEditClick()}>
                <form onSubmit={()=>handleSubmit()}>
                    <div className="updatePassword-edit-title">
                        Edit User Profile
                    </div>
                    <div className='updatePassword-form'>
                        <div className="input-name input-margin">
                            <h3>Please re-enter Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={userEdit.editpassword}
                            onChange={handleChange}
                            name='editpassword'
                            required={activeWindow.active==='editProfile'}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        <div className="input-name">
                            <h3>First Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userEdit.firstname}
                            onChange={handleChange}
                            name='firstname'
                            placeholder={user[0]}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        <div className="input-name">
                            <h3>Last Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userEdit.lastname}
                            onChange={handleChange}
                            name='lastname'
                            placeholder={user[1]}
                            disabled={activeWindow.active==='passwordChange'}
                        />
                        <div className="input-name input-margin">
                            <h3>E-Mail</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            id={uuid()}
                            value={userEdit.editemail}
                            onChange={handleChange}
                            name='editemail'
                            placeholder={user[2]}
                            required={activeWindow.active==='editProfile'}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        
                        <div className="input-name input-margin">
                            <h3>
                                <input 
                                type='checkbox'
                                name='newsletter'
                                onChange={handleChange}
                                style={{marginLeft: '0'}}
                                defaultChecked = {user[5]}
                            />Signup for newsletter?</h3>
                        </div>
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
                                disabled={activeWindow.active==='changePassword'}
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
                                disabled={activeWindow.active==='changePassword'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked = {user[3]!=='miles'}
                            />
                            <label htmlFor="Kms">Kms</label>
                        </div>   
                    </div>
                    <button type='submit' className="submit-btn updatePassword-edit-title" onClick={handleSubmit}>
                        Submit
                    </button>
                    <div className='profileDivider'>
                        <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <button type='submit' style={{backgroundColor: 'tomato', color: 'white', marginBottom: '30px'}} className="submit-btn updatePassword-edit-title" onClick={handleDelete}>
                        Delete Account
                    </button>
                </form>
            </div>
            <div style={{transform: 'translate(28%, -145%)'}} className={activeWindow.loginClasses} id="login" onClick={handleUpdatePasswordClick}>
                <div className="updatePassword-edit-title">
                    {needVerify&&activeWindow.active==='changePassword'?"Email not verified. Please check inbox for verification email from Findaharp.com.": "Change Password"}
                </div>
                <form onSubmit={handleSubmit}>
                        {needVerify&&activeWindow.active==='changePassword'
                        ?
                            <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                                <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                                <img height='100%' src='./img/not_found.png' alt='golden harp' />
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
                                    value={userUpdatePassword.oldpassword}
                                    onChange={handleChange}
                                    name='oldpassword'
                                    required={activeWindow.active==='changePassword'}
                                    disabled={activeWindow.active==='editProfile'}
                                />
                                <div className="input-name input-margin">
                                    <h3>New Password</h3>
                                </div>
                                <input 
                                    className="field-input"
                                    type='password'
                                    id={uuid()}
                                    value={userUpdatePassword.newpassword}
                                    onChange={handleChange}
                                    name='newpassword'
                                    required={activeWindow.active==='changePassword'}
                                    disabled={activeWindow.active==='editProfile'}
                                />
                                <div className="input-name input-margin">
                                    <h3>Confirm New Password</h3>
                                </div>
                                <input 
                                    className="field-input"
                                    type='password'
                                    id={uuid()}
                                    value={userUpdatePassword.confirmpassword}
                                    onChange={handleChange}
                                    name='confirmpassword'
                                    required={activeWindow.active==='changePassword'}
                                    disabled={activeWindow.active==='editProfile'}
                                />
                            </div>
                            <button type='submit' className="submit-btn updatePassword-edit-title">
                                Submit
                            </button>
                            <div className="forgot-pass" onClick={()=>alert('Forgot old password under construction. To reset your password, refresh page, go to login, select "forgot password."')}>
                                <a href="#">Forgot Old Password?</a>
                            </div>
                        </>
                    }
                </form>
            </div>
            <UserProfileCSS />
        </div>
        </>
    )
}

export default UserProfile;
