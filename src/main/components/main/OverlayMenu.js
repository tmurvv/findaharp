import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

//internal
import OverlayMenuCss from '../../styles/OverlayMenu.css.js';
import { UserContext } from '../../contexts/UserContext';
// import { OverlayMenuContext } from '../../contexts/OverlayMenuContext'; 
// import { UserContext } from '../../contexts/UserContext';

export default function OverlayMenu(props) {
    // const [ open, setOpen ] = useState(true);
    // const { user, setUser } = useContext(UserContext);
    function clearOverlay(e) {
        // document.querySelector('#overlayBar').style.background = 'rgb(244,244,244,0)';
        // document.querySelector('.overlayLinks').style.animation = 'myMove .8s';
        // setTimeout(()=> {
        //     setOpen(false);
        // },800);
    }
    function restoreOverlay(e) {
        // document.querySelector('#tiles').style.animation = 'myMoveBack .8s ease-in-out';
        // setTimeout(()=> {
        //     setOverlayMenu(true);
        //     document.querySelector('#overlayBar').style.background = 'rgb(244,244,244,.93)';
        // }, 800);
    }
    // if (process.browser&&Router.route==='/stringform'||Router.route==='/rememberdetails'||Router.route==='/harploginsignup'||Router.route==='/userharpprofile') {
    return(
        <>
        {1===1
            ?<div className='overlayBarOuter overlayBarOpen' id='overlayBar'>
                <div className='overlayLinks' id='overlayLinks'>
                    {/* {props.open?
                        <div className='closeIcon' onClick={props.handleNavOpen}>
                            <img src='/img/clear_search.png' alt="close mobile menu icon"/>
                        </div>:''
                    } */}
                    <div style={{display: 'flex'}}>
                    <Link href='/'>
                        <a className='overlayLink item1' onClick={(e)=>{
                            clearOverlay();
                        }}>
                            {/* <img src="/img/OverlayMenu/landing_usedharps.png" alt="used harps" /> */}
                        </a>
                    </Link>
                    <Link href='/buildersshowcase'>
                        <a className='overlayLink item2' onClick={(e)=>{clearOverlay(e)}}>
                            {/* <img src="/img/OverlayMenu/landing_builders.png" alt="Builders Showcase" /> */}
                        </a>
                    </Link>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Link href='/stringform'>
                            <a className='overlayLink item3' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
                                {/* <img src="/img/OverlayMenu/landing_fastneasy.png" alt="Fast and Easy String Form" /> */}
                            </a>
                        </Link>
                        <Link href='/onlinestore'>
                            <a className='overlayLink item4' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
                                {/* <img src="/img/OverlayMenu/landing_onlinestore.png" alt="Online Store" /> */}
                            </a>
                        </Link>        
                    </div>
                </div>
            </div>
            :<div className='tileContainer'><img id='tiles' onClick={()=>restoreOverlay()} src='/img/OverlayMenu/landing_menucomposite_dullwide.png' alt='opening tile menu icon' /></div>
        }
        <OverlayMenuCss />
       </>    
    )
}
