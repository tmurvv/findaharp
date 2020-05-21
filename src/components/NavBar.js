import React, {useContext} from 'react';
import Link from 'next/link';

//internal
import NavBarCss from '../styles/NavBar.css';
import {UserContext} from '../contexts/UserContext';

export default function NavBar(props) {
    // const  {value, setValue}= useContext(UserContext);
    const { user } = useContext(UserContext);
    
    return(
        <>
        <div className='navBarOuter'>
            {props.mobile&&(!props.open||props.open===undefined)?
                <div className='hamburgerMenu' onClick={() => props.handleNavOpen()}>
                    <img src='/img/hamburger.png' alt="open mobile menu icon"/>
                </div>:''
            }
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
                    <Link href='/StorePartners'>
                        <a onClick={props.handleNavOpen}>Our Store Partners</a>
                    </Link>
                    <Link href='/BuyersGuide'>
                        <a onClick={props.handleNavOpen}>Buyer's Guide</a>
                    </Link>        
                    <Link href='/Contact'>
                        <a onClick={props.handleNavOpen}>Contact/About</a>
                    </Link>
                    <Link href='/LoginSignup'>
                        {/* <a id='userName'>{user.name==='guest'?'Login':user.name}</a> */}
                        <a id='userName' onClick={props.handleNavOpen}>{user}</a>
                    </Link>
                </div>:''
            }
        </div>
        <NavBarCss />
        </>   
    )
}
