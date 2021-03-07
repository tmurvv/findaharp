// packages
import React, { useState, useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import NewsletterSignup from '../src/components/NewsletterSignup';
import Results from '../src/components/Results';
import SellerAgreement from '../src/components/SellerAgreement';
import UserProfileCSS from '../src/styles/UserProfile.css';
import { RESULTS_INITIAL_STATE } from '../src/constants/constants';
import ResultsWindow from '../src/components/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../src/constants/constants';
import { UserContext } from '../src/contexts/UserContext';
import { resultInfoReducer, activeWindowReducer } from '../src/reducers/reducers';
import { resultsWindowReducer } from '../src/reducers/ResultsWindowReducer';
import { StringFormContext } from '../src/contexts/StringFormContext';
import { STRING_FORM_INFO_INIT, STRING_FORM_INIT } from '../src/constants/inits';

const activeWindowInitialState = {
    activeWindow: 'changePassword',
    loginClasses: 'login-signup l-attop',
    signupClasses: 'login-signup s-atbottom'
}
function UserHarpProfile(props) {
    const { user, setUser} = useContext(UserContext);
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const Router = useRouter();
    const [ resultInfo, dispatchResultInfo ] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    // const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [activeWindow, dispatchActiveWindow] = useReducer(activeWindowReducer, activeWindowInitialState);
    const [ harpList, setHarpList ] = useState([]);
    const [openAgreement, setOpenAgreement] = useState(false);
    const [userEdit, setUserEdit] = useState({
        emailCurrentHarp: user.emailCurrentHarp?user.emailCurrentHarp:'',
        currentHarpname: user.currentHarpname?user.currentHarpname:'',
    });
    const [selectHarp, setSelectHarp] = useState({
        selectemail: user.emailCurrentHarp?user.emailCurrentHarp:'',
        selectharpname: user.currentHarpname?user.currentHarpname:'',
        updateSelectchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'currentHarpname': 
                setUserEdit({...userEdit, currentHarpname: evt.target.value, editchange: true});
                break
            case 'lastname': 
                setUserEdit({...userEdit, lastname: evt.target.value, editchange: true});
                break
            case 'emailCurrentHarp': 
                setUserEdit({...userEdit, emailCurrentHarp: evt.target.value, editchange: true});
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
            case 'selectemail': 
                setSelectHarp({...selectHarp, selectemail: evt.target.value, updateSelectchange: true});
                break
            case 'selectharpname': 
                setSelectHarp({...selectHarp, selectharpname: evt.target.value, updateSelectchange: true});
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
                emailCurrentHarp: '',
                currentHarpname: '',
            });
        };
        const clearPassword= () => {
            setSelectHarp({
                selectemail: '',
                selectharpname: '',
                updateSelectchange: false
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
        if (evt) console.log('yes', harpList)
        if (evt) evt.preventDefault();
        // if (harpList.length===0) {
        //     console.log('ingetlist')
        //     document.querySelector('#harplist').style.display='block';
        //     // getHarpList();
        //     return;
        // }
        
        const resultText = document.querySelector('#loadingLoginText');
        if (activeWindow.active==='signup') {
            // shortcut
            const updatedUser = {
                harpname: userEdit.currentHarpname?userEdit.currentHarpname:user.currentHarpname,
                email: userEdit.emailCurrentHarp?userEdit.emailCurrentHarp:user.emailCurrentHarp,
                newsletter: userEdit.newsletter ,
                oldharpname: user.currentHarpname,
                oldemail: user.emailCurrentHarp 
            };
            try {
                //update user
                console.log('updateuser', updatedUser)
                const res = await axios.patch(`${process.env.backend}/api/v1/userharps/updateuserharp/`, updatedUser);
                
                if (res.status===200) {
                    resultText.innerText=`Update Successful.`;
                    dispatchResultInfo({type: 'OK'});
                    
                    const userCopy = res.data;
                    console.log('res', res.data)
                    setUser({
                            ...user,
                            emailCurrentHarp: userCopy.email,
                            currentHarpname: userCopy.harpname
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
            // resultText.innerText=``;
            const oldemail = document.querySelector('#selectemail').value||user.emailCurrentHarp;
            const oldharpname = document.querySelector('#harplist').value;
            console.log(oldemail, oldharpname)
            dispatchResultInfo({type: 'loadingImage', payload: ''})
            try {
                // login harp
                const res = await axios.post(`${process.env.backend}/api/v1/userharps/loginuserharp`, {oldemail, oldharpname});
                const returnedHarp = res.data.userharp;
                const jwt = res.data.harpToken;
                let parseStringForm = await JSON.parse(returnedHarp.stringform);
                
                // purge quantities
                if (parseStringForm&&parseStringForm.length>0) {
                    for (var i = 0; i<parseStringForm.length; i++) {
                        if (i===0) {
                            parseStringForm[0].G.qty=0; 
                            parseStringForm[0].G.qty=0; 
                            break;
                        }
                        if (i===7) {
                            parseStringForm[0].E.qty=0; 
                            parseStringForm[0].D.qty=0; 
                            parseStringForm[0].C.qty=0; 
                            break;
                        }
                        parseStringForm[0].E.qty=0; 
                        parseStringForm[0].D.qty=0; 
                        parseStringForm[0].C.qty=0;
                        parseStringForm[0].B.qty=0;
                        parseStringForm[0].A.qty=0;
                        parseStringForm[0].G.qty=0;
                        parseStringForm[0].F.qty=0;
                    }
                } else {
                    parseStringForm = JSON.parse(JSON.stringify(STRING_FORM_INIT));
                }
                
                // set harp context to login harp
                setUser({
                    ...user,
                    _idCurrentHarp: returnedHarp._id,
                    emailCurrentHarp: returnedHarp.email,
                    currentHarpname: returnedHarp.harpname,
                    stringform: parseStringForm,
                    harplist: returnedHarp.harplist
                });
                setStringForm(parseStringForm);
                // set JWT cookie
                 document.cookie = `JWT=${jwt}`
                // display result window
                // resultText.innerText=`Login Successful: Welcome Harp ${returnedHarp.harpname}`;
                dispatchResultInfo({type: 'OK', payload: `Login Successful: Welcome Harp ${returnedHarp.harpname}`});
            } catch(e) {
                console.log('error', e.message)
                // email not found #1
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message==="Cannot read property 'emailverified' of null") {
                    // resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain', payload: `${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`});
                // email not found #2
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('Email')) {
                    // resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain', payload: `${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`});
                // other error
                } else {
                    // resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on login. Please check your network connection.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain', payload: `Something went wrong on login. Please check your network connection. Login as guest?`});
                }
            }
            document.querySelector('#spinner').style.display='block';     
            Router.push('/stringform')
        }
    }
    async function getHarpList() {
        console.log('ingetharplist')
        try {
            //update password
            console.log('select', selectHarp.selectemail)
            console.log('currentharp', user.emailCurrentHarp)
            const searchEmail = selectHarp.selectemail||user.emailCurrentHarp;
            console.log("search email", searchEmail);
            const res = await axios.post(`${process.env.backend}/api/v1/userharps/getuserharplist`, {email: searchEmail});
            console.log('251')
            const parseList = res.data.harplist;
            console.log('253')
            console.log(res.data.harplist)
            setHarpList(parseList);
            console.log(parseList)
            document.querySelector('#harplist').disabled = false;
            // dispatchResultInfo({type: 'OK', payload: 'found'});
            clearForm('Both');
        } catch(e) {
            dispatchResultInfo({type: 'okTryAgain', payload: `Something went wrong finding harps for the email: ${selectHarp.selectemail}.`});
            console.log('error', e.message)
            // resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong on updatePassword.'}`;
        }
        // dispatchResultInfo({type: 'OK', payload: `Harp list loaded`});
    }
    function resetResultsWindow() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResultsWindow();
    }
    async function handleDelete(e) {
        e.preventDefault();
        alert('Delete Harp Profile function under construction.')
        // const resultText = document.querySelector('#loadingLoginText');
        // e.preventDefault();
        // if ((!userEdit.editpassword)||userEdit.editpassword.length<8) {
        //     dispatchResultInfo({type: 'tryAgain'});
        //     resultText.innerText=`Passwords must be at least 8 characters long.`;
        //     return
        // }
        // if (prompt('Are you sure you want to delete your account? Please type in your account email to confirm.')!==user.email) return alert('Email does not match.');
        
        // try {
        //     // Delete User
        //     const res=await axios.delete(`${process.env.backend}/api/v1/users/deleteuser/${user._id}?editpassword=${userEdit.editpassword}`, {editpassword: userEdit.editpassword});
        //     dispatchResultInfo({type: 'OK'});
        //     resultText.innerText=`Account ${user.email} has been deleted`;
        //     await setUser({
        //         firstname: '',
        //         lastname: '',
        //         email: '',
        //         newsletter: false,
        //         distanceunit: 'miles',
        //         currency: 'USD',
        //         _id: '',
        //         role: 'not set'
        //     });
        // } catch(e) {
        //     if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
        //         resultText.innerText=`${process.env.next_env==='development'?e.message:'Password does not match our records.'} Login as guest?`;
        //         dispatchResultInfo({type: 'okTryAgain'});
        //     } else {
        //         dispatchResultInfo({type: 'okTryAgain'})
        //         resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on delete.'}`;
        //     }   
        // }
        // clearForm('Both');
    }
    function logoutUser() {
        
        document.querySelector('#spinner').style.display="block";
        document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
        setUser({
            currentHarpname: null,
            emailCurrentHarp: null,
            stringform: JSON.parse(JSON.stringify(STRING_FORM_INIT)),
            _idCurrentHarp: null
        }); 
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        clearForm('both');
        Router.push('/stringform')
    }
    // display cart??
    useEffect(()=>{
        // console.log('ineffect')
        setSelectHarp({...selectHarp, selectemail: user.emailCurrentHarp});
        console.log('effect', user)
        // getHarpList();
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    if (openAgreement===true) {
        return <SellerAgreement setOpenAgreement={setOpenAgreement}/>
    } else { 
    return (
       <>
        <div className='updatePassword-edit-container'>
            <img id='spinner' style={{
                    display: 'none', 
                    position: 'fixed', 
                    top: '25%', 
                    left: '50%', 
                    transform: 'translate(-50%,-50%)',
                    zIndex: '9000',
                    height: '75px'
                }} 
                src='/img/spinner.gif' 
                alt='spinner' 
            />
            <PageTitle maintitle='Harp Profile' subtitle='Change Password / Edit Profile' />
            {/* <Results 
                resultInfo={resultInfo} 
                resetResults={resetResults}
                loginGuest={loginGuest}
            /> */}
            <ResultsWindow 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResultsWindow={resetResultsWindow} 
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '25%', margin: '0 50px 50px', boxShadow: '3px 3px 5px 0px grey'}}>
                    <button className='submit-btn updatePassword-edit-title' onClick={()=> logoutUser()}>Logout</button>
                </div>
            </div>
            <div className={activeWindow.signupClasses} id="signup" onClick={()=>handleEditClick()}>
                <form onSubmit={()=>handleSubmit()}>
                    <div className="updatePassword-edit-title">
                        Edit Current Harp
                    </div>
                        
                    <div className='updatePassword-form'>
                        <div className="input-name input-margin">
                            <h3>E-Mail</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            id={uuid()}
                            value={userEdit.emailCurrentHarp}
                            onChange={handleChange}
                            name='emailCurrentHarp'
                            placeholder={user.emailCurrentHarp}
                            required={activeWindow.active==='editProfile'}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        <div className="input-name">
                            <h3>Harp Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userEdit.currentHarpname}
                            onChange={handleChange}
                            name='currentHarpname'
                            placeholder={user.currentHarpname}
                            disabled={activeWindow.active==='changePassword'}
                        />
                        <div style={{marginTop: '20px'}}>
                            <NewsletterSignup handleChange={()=>alert('Newsletter signup under construction.')}/> 
                        </div>                 
                    </div>
                    <button type='submit' className="submit-btn updatePassword-edit-title" onClick={handleSubmit}>
                        Submit
                    </button>
                    <div className='profileDivider'>
                        <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                    </div>
                    <button type='submit' style={{backgroundColor: 'tomato', color: 'white', marginBottom: '30px'}} className="submit-btn updatePassword-edit-title" onClick={handleDelete}>
                        Delete Harp Profile
                    </button>
                </form>
            </div>
            <div className={activeWindow.loginClasses} id="login" style={{transform: 'translate(10%, -142%)'}} onClick={handleUpdatePasswordClick}>
                <div className="updatePassword-edit-title">
                    Login Another Harp
                </div>
                <form onSubmit={handleSubmit}>
                   
                    <div style={{padding: '25px'}}>   
                        <div className="input-name input-margin">
                                <h3>Email</h3>
                            </div>
                            <input 
                                className="field-input"
                                type='email'
                                id='selectemail'
                                value={selectHarp.selectemail}
                                placeholder={user.emailCurrentHarp}
                                onChange={handleChange}
                                name='selectemail'
                                required={activeWindow.active==='changePassword'}
                                disabled={activeWindow.active==='editProfile'}
                            />
                            <div className='harplist' className="input-name input-margin">
                                <h3>Enter Email for List of Harps</h3>
                            </div>
                            <select id='harplist' onChange={()=>handleSubmit()} style={{padding: '7px 10px', width: '100%'}}>
                                <option key={uuid()} name='selectharpname'>select harp</option>
                                {
                                    user.harplist&&user.harplist.map(harp => <option key={uuid()} value={harp.harpname}>{harp.harpname}</option>)
                                }
                            </select>
                            
                        </div>
                        <button type='submit' className="submit-btn updatePassword-edit-title">
                            Submit Change
                        </button>
                    </form>
                </div>
                <UserProfileCSS />
            </div>  
        </>
    )
    }
}

export default UserHarpProfile;
