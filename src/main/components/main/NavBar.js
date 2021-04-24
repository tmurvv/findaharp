import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

//internal
import NavBarCss from '../../styles/NavBar.css.js';
import { UserContext } from '../../contexts/UserContext';

export default function NavBar(props) {
    const { user, setUser } = useContext(UserContext);
    useEffect(()=> {
        if (!user.firstname) setUser({
            ...user,
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
    // if (process.browser&&Router.route==='/stringform'||Router.route==='/rememberdetails'||Router.route==='/harploginsignup'||Router.route==='/userharpprofile') {
    return(
        <>
        {process.browser&&(Router.route==='/stringform'||Router.route==='/rememberdetails'||Router.route==='/harploginsignup'||Router.route==='/userharpprofile')
        ?
        <><div className='navBarOuter'>
            {/* show mobile menu icon */}
            {props.mobile&&(!props.open||props.open===undefined)?
                <div className='hamburgerMenu' onClick={() => props.handleNavOpen()}>
                    <img src='/img/hamburger.png' alt="open mobile menu icon"/>
                </div>:''
            }
            {/* show menu */}
            {!props.mobile || props.mobile&&props.open?
                <div className='navLinks' id='navLinks'>
                    {props.mobile&&props.open?
                        <div className='closeIcon' onClick={props.handleNavOpen}>
                            <img src='/img/clear_search.png' alt="close mobile menu icon"/>
                        </div>:''
                    }
                    <Link href='/'>
                        <a onClick={props.handleNavOpen}>Find a Used Harp</a>
                    </Link>
                    <Link href='/buildersshowcase'>
                        <a onClick={props.handleNavOpen}>Harp Builder Showcase</a>
                    </Link>
                    {!Router.route.includes('builder')
                        ?<Link href='/storepartners' as='/storepartners'>
                            <a onClick={props.handleNavOpen}>Our Store Partners</a>
                        </Link>
                        :<Link href='/builderpartners'>
                            <a onClick={props.handleNavOpen}>Our Builder Partners</a>
                        </Link>
                    }
                    <Link href='/onlinestore' as='/onlinestore'>
                        <a onClick={(e)=>{if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen(e);}}>Music, Strings & Things</a>
                    </Link>        
                    <Link href='/contact' as='contact'>
                        <a onClick={props.handleNavOpen}>Contact/About</a>
                    </Link>
                    {/* <Link href={user&&user.firstname&&user.firstname!==undefined&&user.firstname.toUpperCase()!=='LOGIN'?'/userprofile':'/loginsignup'}>
                        <a id='userName' onClick={props.handleNavOpen}>{user&&user.firstname&&user.firstname!==undefined&&user.firstname.substr(0,1).toUpperCase()+user.firstname.substr(1).toLowerCase()}</a>
                    </Link> */}
                    {/* {user.currentHarpname
                        ?<Link href='/userharpprofile' as='/userharpprofile'>
                            <a id='userName' onClick={props.handleNavOpen}>Harp Profile</a>
                        </Link>
                        :<Link href='/harploginsignup' as='/harploginsignup'>
                            <a id='userName' onClick={props.handleNavOpen}>Harp Login</a>
                        </Link>
                    }
                    <Link href='#' onClick={()=>setStringformStatus('profile')}>
                        <button onClick={()=>setStringformStatus('profile')}>
                            Harp Profile
                        </button>
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
                </div>:''
            }
        </div>
        <NavBarCss />
        </>
        :<><div className='navBarOuter'>
            {/* show mobile menu icon */}
            {props.mobile&&(!props.open||props.open===undefined)?
                <div className='hamburgerMenu' onClick={() => props.handleNavOpen()}>
                    <img src='/img/hamburger.png' alt="open mobile menu icon"/>
                </div>:''
            }
            {/* show menu */}
            {!props.mobile || props.mobile&&props.open?
                <div className='navLinks' id='navLinks'>
                    {props.mobile&&props.open?
                        <div className='closeIcon' onClick={props.handleNavOpen}>
                            <img src='/img/clear_search.png' alt="close mobile menu icon"/>
                        </div>:''
                    }
                    <Link href='/'>
                        <a onClick={(e)=>{props.handleNavOpen(e);}}>Find a Used Harp</a>
                    </Link>
                    <Link href='/buildersshowcase'>
                        <a onClick={(e)=>props.handleNavOpen(e)}>Harp Builder Showcase</a>
                        {/* <a onClick={props.handleNavOpen}>Harp Builder Showcase</a> */}
                    </Link>
                    {!Router.route.includes('builder')
                        ?<Link href='/storepartners' as='/storepartners'>
                            <a onClick={(e)=>props.handleNavOpen(e)}>Our Store Partners</a>
                        </Link>
                        :<Link href='/builderpartners'>
                            <a onClick={(e)=>props.handleNavOpen(e)}>Our Builder Partners</a>
                        </Link>
                    }
                    <Link href='/onlinestore' as='/onlinestore'>
                        {/* <a onClick={()=>{if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>Music, Strings & Things</a> */}
                        <a onClick={(e)=>props.handleNavOpen(e)}>Music, Strings & Things</a>
                    </Link>        
                    <Link href='/contact' as='contact'>
                        <a onClick={(e)=>props.handleNavOpen(e)}>Contact/About</a>
                    </Link>
                    {/* <Link href={user&&user.firstname&&user.firstname.toUpperCase()!=='LOGIN'?'/userprofile':'/loginsignup'}>
                        <a id='userName' onClick={(e)=>props.handleNavOpen(e)}>{user&&user.firstname&&user.firstname!==undefined&&user.firstname.substr(0,1).toUpperCase()+user.firstname.substr(1).toLowerCase()}</a>
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
                </div>:''
            }
        </div>
        <NavBarCss />
        </>
        }
       </>    
    )
}
