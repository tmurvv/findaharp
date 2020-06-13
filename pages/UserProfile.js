// packages
import React, {useState, useContext} from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import { UserContext } from '../src/contexts/UserContext';
import UserProfileCSS from '../src/styles/UserProfile.css';

function UserProfile(props) {
    const { user, setUser} = useContext(UserContext);
    const [active, setActive] = useState('changePassword');
    const [needVerify, setNeedVerify] = useState(false);
    const [userEdit, setUserEdit] = useState({
        firstname: '',
        lastname: '',
        editemail: '',
        editpassword: '',
        confirmpassword: '',
        distanceunit: '',
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
        document.querySelector('#loadingUpdatePassword').style.display='none';
        document.querySelector('#loadingUpdatePasswordText').innerText='';
        document.querySelector('#loadingUpdatePasswordOk').style.display='none';
        document.querySelector('#loadingUpdatePasswordTryAgain').style.display='none';
        document.querySelector('#loadingUpdatePasswordImg').style.display='none';
    }
    function handleEditClick(evt) {
        resetUpdatePasswordForm();
        setActive('editProfile');
        const edit = document.querySelector('#edit');
        const updatePassword = document.querySelector('#updatePassword');
        edit.classList.remove("s-atbottom");
        edit.classList.add("s-attop");
        updatePassword.classList.remove("l-attop");
        updatePassword.classList.add("l-atbottom");
    }
    function handleUpdatePasswordClick(evt) {
        if (userEdit.editchange===true) {if (!confirm('changes will be lost')) return};
        resetEditForm();
        setActive('changePassword');
        const edit = document.querySelector('#edit');
        const updatePassword = document.querySelector('#updatePassword');
        edit.classList.add("s-atbottom");
        edit.classList.remove("s-attop");
        updatePassword.classList.add("l-attop");
        updatePassword.classList.remove("l-atbottom");
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultContainer = document.querySelector('#loadingUpdatePassword');
        const resultText = document.querySelector('#loadingUpdatePasswordText');
        const resultButton = document.querySelector('#loadingUpdatePasswordOk');
        const resultButtonTryAgain = document.querySelector('#loadingUpdatePasswordTryAgain');
        const resultImg = document.querySelector('#loadingUpdatePasswordImg');
        if (active==='editProfile') {
            // shortcut
            if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            resultContainer.style.display='block';
            resultImg.style.display='block';
            const updatedUser = {
                firstname: userEdit.firstname?userEdit.firstname:user[0],
                lastname: userEdit.lastname?userEdit.lastname:user[1],
                email: userEdit.editemail?userEdit.editemail:user[2],
                distanceunit: userEdit.distanceunit?userEdit.distanceunit:user[3],
                password: userEdit.editpassword,
                userid: user[4]
            };
            
            try {
                /* LOCAL */
                // const res = await axios.patch(`http://localhost:3000/api/v1/users/updateuser/${user[4]}`, updatedUser);
                /* TESTING */
                // const res = await axios.patch('https://findaharp-api-testing.herokuapp.com/api/v1/users/updateuser/${user[4]}', newUser);
                /* STAGING */
                const res = await axios.patch('https://findaharp-api-staging.herokuapp.com/api/v1/users/updateuser/${user[4]}', newUser);
                /* PRODUCTION */
                // const res = await axios.patch('https://findaharp-api.herokuapp.com/api/v1/users/updateuser/${user[4]}', newUser);
                if (res.status===200) {
                    console.log('result', res.data)
                    resultImg.style.display='none';
                    resultButton.style.display='block';
                    resultText.innerText=`Update Successful.`;
                    setNeedVerify(true);
                    
                    const { userCopy } = res.data;
                    setUser([
                        userCopy.firstname, 
                        userCopy.lastname, 
                        userCopy.email, 
                        userCopy.distanceunit,
                        userCopy._id
                    ]);
                }
            } catch (e) {
                resultImg.style.display='none';
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft='30px';
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on update.'}`
                // resultText.innerText=`Something went wrong on edit. Log in as guest user?`
            }
        }       
        if (active==='changePassword') {   
            resultContainer.style.display='block';
            if (userUpdatePassword.oldpassword.length<8 || userUpdatePassword.newpassword.length<8) {
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            // passwords match 
            if (userUpdatePassword.newpassword !== userUpdatePassword.confirmpassword) {
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
                // await axios.patch(`http://localhost:3000/api/v1/users/updatepassword/${user[4]}`, {password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* TESTING */
                // const res = await axios.patch(`https://findaharp-api-testing.herokuapp.com/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* STAGING */
                const res = await axios.patch(`https://findaharp-api-staging.herokuapp.com/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                /* PRODUCTION */
                // const res = await axios.patch(`https://findaharp-api.herokuapp.com/api/v1/users/updatepassword/${user[4]}`, {userid: user[4], password: userUpdatePassword.newpassword, oldpassword: userUpdatePassword.oldpassword});
                console.log('gothere')
                resultText.innerText=`Password change successful.`;
                resultImg.style.display='none';
                resultButton.style.display= 'block';
            } catch(e) {
                console.dir(e)
                if (e.response&&e.response.data&&e.response.data.data.message&&e.response.data.data.message.includes('verified')) {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'A.Something went wrong on updatePassword.'}`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
                } else {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'B.Something went wrong on updatePassword.'}`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
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
        const resultContainer = document.querySelector('#loadingUpdatePassword');
        const resultText = document.querySelector('#loadingUpdatePasswordText');
        const resultButton = document.querySelector('#loadingUpdatePasswordOk');
        const resultButtonTryAgain = document.querySelector('#loadingUpdatePasswordTryAgain');
        const resultImg = document.querySelector('#loadingUpdatePasswordImg');
        e.preventDefault();
        if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
            resultContainer.style.display='block';
            resultImg.style.display='none';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft=0;
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            return
        }
        if (prompt('Are you sure you want to delete your account? Please type in your account email to confirm.')!==user[2]) return alert('Email does not match.');
        
        try {
            // LOCAL
            // const res=await axios.delete(`http://localhost:3000/api/v1/users/deleteuser/${user[4]}`);
            // TESTING
            // const res=await axios.delete(`https://findaharp-api-testing.herokuapp.com/api/v1/users/deleteuser/${user[4]}`);
            // STAGING
            const res=await axios.delete(`https://findaharp-api-staging.herokuapp.com/api/v1/users/deleteuser/${user[4]}`);
            // PRODUCTION
            // const res=await axios.delete(`https://findaharp-api.herokuapp.com/api/v1/users/deleteuser/${user[4]}`);
            // const returnedUser = res.user;
            resultText.innerText=`Account ${user[2]} has been deleted`;
            resultContainer.style.display='block';
            resultImg.style.display='none';
            resultButton.style.display= 'block';
            await setUser(['Login','','','miles','']);
        } catch(e) {
            console.dir(e)
            resultContainer.style.display='block';
            resultImg.style.display='none';
            resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on delete.'}`;
            resultButton.style.display='block';
        }
        
    }
    return (
       <>
        <div className='updatePassword-edit-container'>
            <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
            <div id="loadingUpdatePassword">
                <img id='loadingUpdatePasswordImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingUpdatePasswordText"></p>
                <div className='flex-sb'>
                    <button id='loadingUpdatePasswordOk' type='button' className='submit-btn' onClick={updatePasswordGuest}>OK</button>
                    <button id='loadingUpdatePasswordTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div>
            <div className="updatePassword-edit s-atbottom" id="edit" onClick={()=>handleEditClick()}>
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
                            required={active==='editProfile'}
                            disabled={active==='changePassword'}
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
                            disabled={active==='changePassword'}
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
                            disabled={active==='passwordChange'}
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
            <div style={{transform: 'translate(28%, -145%)'}} className="updatePassword-edit l-attop" id="updatePassword" onClick={handleUpdatePasswordClick}>
                <div className="updatePassword-edit-title">
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
                                    value={userUpdatePassword.oldpassword}
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
                                    value={userUpdatePassword.newpassword}
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
                                    value={userUpdatePassword.confirmpassword}
                                    onChange={handleChange}
                                    name='confirmpassword'
                                    required={active==='changePassword'}
                                    disabled={active==='editProfile'}
                                />
                            </div>
                            <button type='submit' className="submit-btn updatePassword-edit-title">
                                Submit
                            </button>
                            <div className="forgot-pass" onClick={()=>alert('forgot password under construction')}>
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
