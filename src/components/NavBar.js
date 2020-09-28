import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

//internal
import NavBarCss from '../styles/NavBar.css';
import { UserContext } from '../contexts/UserContext';

export default function NavBar(props) {
    const { user, setUser } = useContext(UserContext);
    useEffect(()=> {
        if (!user.firstname) setUser({
            firstname: 'login',
            lastname: '',
            email: '',
            newsletter: false,
            distanceunit: 'miles',
            currency: 'USD',
            _id: '',
            role: 'not set'
        });
    },[]);
    
    return(
        <>
        <div className='navBarOuter'>
            {/* show mobile menu icon */}
            {props.mobile&&(!props.open||props.open===undefined)?
                <div className='hamburgerMenu' onClick={() => props.handleNavOpen()}>
                    <img src='/img/hamburger.png' alt="open mobile menu icon"/>
                </div>:''
            }
            {/* show menu */}
            {!props.mobile || props.mobile&&props.open?
                <div className='navLinks'>
                    {props.mobile&&props.open?
                        <div className='closeIcon' onClick={props.handleNavOpen}>
                            <img src='/img/clear_search.png' alt="close mobile menu icon"/>
                        </div>:''
                    }
                    <Link href='/'>
                        <a onClick={props.handleNavOpen}>Find a Harp</a>
                    </Link>
                    <Link href='/storepartners' as='/storepartners'>
                        <a onClick={props.handleNavOpen}>Our Store Partners</a>
                    </Link>
                    <Link href='/storeentry' as='/storeentry'>
                        <a onClick={props.handleNavOpen}>Music/Strings...</a>
                    </Link>        
                    <Link href='/contact' as='contact'>
                        <a onClick={props.handleNavOpen}>Contact/About</a>
                    </Link>
                    <Link href={user&&user.firstname&&user.firstname.toUpperCase()!=='LOGIN'?'/userprofile':'/loginsignup'} as={user.firstname.toUpperCase()==='LOGIN'?'/loginsignup':'/userprofile'}>
                        <a id='userName' onClick={props.handleNavOpen}>login/profile</a>
                    </Link>
                    {/* <Link href={user&&user.firstname&&user.firstname.toUpperCase()!=='LOGIN'?'/userprofile':'/loginsignup'} as={user.firstname.toUpperCase()==='LOGIN'?'/loginsignup':'/userprofile'}>
                        <a id='userName' onClick={props.handleNavOpen}>{user.firstname}</a>
                    </Link> */}
                    <Link href='/ActivateEmail' as='/activateemail'>
                        <a style={{display: 'none'}} onClick={props.handleNavOpen}>Activate Email</a>
                    </Link>
                    <Link href='/ResetPassword' as='/resetpassword'>
                        <a style={{display: 'none'}} onClick={props.handleNavOpen}>Reset Password</a>
                    </Link>
                    <Link href='/cart' as='/cart'>
                        <a style={{display: 'none'}} onClick={props.handleNavOpen}>Cart</a>
                    </Link>
                    <Link href='/storeentry/findaharp' as='/storeentry/findaharp'>
                        <a style={{display: 'none'}} onClick={props.handleNavOpen}>Cart</a>
                    </Link>
                </div>:''
            }
        </div>
        <NavBarCss />
        </>   
    )
}
