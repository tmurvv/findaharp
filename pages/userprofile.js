// packages
import React, { useState, useContext, useReducer } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import Results from '../src/components/Results';
import UserProfileCSS from '../src/styles/UserProfile.css';
import { RESULTS_INITIAL_STATE } from '../src/constants/constants';
import { UserContext } from '../src/contexts/UserContext';
import { resultInfoReducer, activeWindowReducer } from '../src/reducers/reducers';

const activeWindowInitialState = {
    activeWindow: 'changePassword',
    loginClasses: 'login-signup l-attop',
    signupClasses: 'login-signup s-atbottom'
}
function UserProfile(props) {
    const { user, setUser} = useContext(UserContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
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
        editchange: false,
        currency: 'USD'
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
            case 'currency': 
                setUserEdit({...userEdit, currency: evt.target.value, editchange: true});
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
    // reset result window
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function loginGuest() { 
        // called from the 'OK' button, no need to login guest here, just to reset results
        clearForm('Both');
        resetResults();
    }
    function clearForm(form) {
        const clearEdit = () => {
            setUserEdit({
                firstname: '',
                lastname: '',
                editemail: '',
                editpassword: '',
                confirmpassword: '',
                distanceUnit: 'miles',
                editchange: false,
                currency: 'USD'
            });
        };
        const clearPassword= () => {
            setUserUpdatePassword({
                oldpassword: '',
                newpassword: '',
                confirmpassword: '',
                updatePasswordchange: false
            });
        };
        switch (form) {
            case 'Password': 
                clearEdit();
                break;
            case 'Edit': 
                clearPassword();
                break;
            default:
                clearPassword();
                clearEdit();
        }  
    }
    function handleEditClick(evt) {
        dispatchActiveWindow({type: 'signup'});
        clearForm('Edit');
    }
    function handleUpdatePasswordClick(evt) {
        dispatchActiveWindow({type: 'login'});
        clearForm('Password');
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
                firstname: userEdit.firstname?userEdit.firstname:user.firstname,
                lastname: userEdit.lastname?userEdit.lastname:user.lastname,
                email: userEdit.editemail?userEdit.editemail:user.email,
                distanceunit: userEdit.distanceunit?userEdit.distanceunit:user.distanceunit,
                password: userEdit.editpassword,
                userid: user._id,
                newsletter: userEdit.newsletter,
                currency: userEdit.currency?userEdit.currency:user.currency
            };
            try {
                //update user
                const res = await axios.patch(`${process.env.backend}/api/v1/users/updateuser/${user._id}`, updatedUser);
                
                if (res.status===200) {
                    resultText.innerText=`Update Successful.`;
                    dispatchResultInfo({type: 'OK'});
                    setNeedVerify(true);
                    
                    const { userCopy } = res.data;
                    setUser({
                            firstname: userCopy.firstname, 
                            lastname: userCopy.lastname, 
                            email: userCopy.email,
                            newsletter: userCopy.newsletter,
                            distanceunit: userCopy.distanceunit,
                            _id: userCopy._id,
                            currency: userCopy.currency
                        }
                    );
                }
                clearForm('Both');
            } catch (e) {
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Password does not match our records.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                } else if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('not valid')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Please enter a valid email address. Log in as guest user?'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                } else {
                    dispatchResultInfo({type: 'tryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on update. Please check your network connection.'}`
                }
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
                //update password
                await axios.patch(`${process.env.backend}/api/v1/users/updatepassword/${user._id}`, {password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                dispatchResultInfo({type: 'OK'});
                resultText.innerText=`Password change successful.`;
                clearForm('Both');
            } catch(e) {
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
                    dispatchResultInfo({type: 'okTryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Old password does not match our records.'}`;
                } else {
                    dispatchResultInfo({type: 'okTryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong on updatePassword.'}`;
                }
            }
        }
    }
    async function handleDelete(e) {
        const resultText = document.querySelector('#loadingLoginText');
        e.preventDefault();
        if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
            dispatchResultInfo({type: 'tryAgain'});
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            return
        }
        if (prompt('Are you sure you want to delete your account? Please type in your account email to confirm.')!==user.email) return alert('Email does not match.');
        
        try {
            // Delete User
            const res=await axios.delete(`${process.env.backend}/api/v1/users/deleteuser/${user._id}?editpassword=${userEdit.editpassword}`, {editpassword: userEdit.editpassword});
            dispatchResultInfo({type: 'OK'});
            resultText.innerText=`Account ${user.email} has been deleted`;
            await setUser({
                firstname: '',
                lastname: '',
                email: '',
                newsletter: false,
                distanceunit: 'miles',
                currency: 'USD',
                _id: '',
            });
        } catch(e) {
            if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Password does not match our records.'} Login as guest?`;
                dispatchResultInfo({type: 'okTryAgain'});
            } else {
                dispatchResultInfo({type: 'okTryAgain'})
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on delete.'}`;
            }   
        }
        clearForm('Both');
    }
    return (
       <>
        <div className='updatePassword-edit-container'>
            <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
            <Results 
                resultInfo={resultInfo} 
                resetResults={resetResults}
                loginGuest={loginGuest}
            />
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
                            placeholder={user.firstname}
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
                            placeholder={user.lastname}
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
                            placeholder={user.email}
                            required={activeWindow.active==='editProfile'}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        
                        <div className="input-name input-margin">
                                <input 
                                type='checkbox'
                                name='newsletter'
                                onChange={handleChange}
                                style={{marginLeft: '0'}}
                                defaultChecked = {user.newsletter}
                                />
                                <label htmlFor="newsletter" style={{marginLeft: '7px'}}>Signup for newsletter? Fun talk about harps every other month.</label>
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
                                defaultChecked = {user.distanceunit==='miles'}
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
                                defaultChecked = {user.distanceunit!=='miles'}
                            />
                            <label htmlFor="Kms">Kms</label>
                        </div>   
                        <div className="input-name input-margin">
                            <h3>I prefer prices in</h3>
                        </div>
                        <div className='flex'>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='USD'
                                onChange={handleChange}
                                name='currency'
                                disabled={activeWindow.active==='changePassword'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked = {user.currency==='USD'}
                            />
                            <label style={{marginRight: '30px'}} htmlFor="miles">USD</label>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='CAD'
                                onChange={handleChange}
                                name='currency'
                                disabled={activeWindow.active==='changePassword'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked = {user.currency!=='USD'}
                            />
                            <label htmlFor="Kms">CAD</label>
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
            <div className={activeWindow.loginClasses} id="login" onClick={handleUpdatePasswordClick}>
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
