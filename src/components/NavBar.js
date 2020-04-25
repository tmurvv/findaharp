import React from 'react';
import Link from 'next/link';

//internal
import NavBarCss from '../styles/NavBar.css';

export default function NavBar(props) {
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
                        <a>Find a Harp</a>
                    </Link>
                    <Link href='/StorePartners'>
                        <a>Our Store Partners</a>
                    </Link>
                    <Link href='/BuyersGuide'>
                        <a>Buyer's Guide</a>
                    </Link>
                    <Link href='/FAQ'>
                        <a>FAQ</a>
                    </Link>
                    <Link href='/Contact'>
                        <a>Contact</a>
                    </Link>
                </div>:''
            }
        </div>
        <NavBarCss />
        </>   
    )
}
