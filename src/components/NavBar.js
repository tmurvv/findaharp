import React, {useState, useEffect} from 'react';
import Link from 'next/link';

export default function NavBar(props) {
    
    console.log('NavBar', props.mobile, props.open);
    
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
        <style jsx="true">{`
            .navBarOuter {
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                height: 30px;
                border-bottom: 1px solid grey;
            }
            @media only screen and (max-width: 500px) {
                .navBarOuter {
                    padding-right: 10px;
                    height: 40px;
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .navLinks {
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: relative;
            }
            @media only screen and (max-width: 500px) {
                .navLinks {
                    flex-direction: column;
                    height: 140px;
                    padding: 10px;
                    border-radius: 3px;
                    background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                    z-index: 6000;
                }
                .navLinks a {
                    font-size: 16px;
                }
            }
            a {
                font-family: 'avenir';
                font-size: 12px;
                text-decoration: none;
                color: #000000;
                opacity: .8;
            }
            a:hover {
                opacity: 1;
            }
            .hamburgerMenu {
                height: 35px;
            }
            .closeIcon {
                height: 25px;
                position: absolute;
                top: 0;
                left: 0;
            }
      `}</style>
      </>   
    )
}
