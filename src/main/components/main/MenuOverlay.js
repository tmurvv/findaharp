import React, { useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { MenuOverlayContext } from '../../../main/contexts/MenuOverlayContext';
import OverlayMenuCss from '../../styles/OverlayMenu.css';

export default function MenuOverlay(props) {
    const { setMenuOverlay } = useContext(MenuOverlayContext);
    function clearOverlay() {
        document.querySelector('body').style.background = 'rgb(244,244,244,0)';
        document.querySelector('.overlayLinks').style.animation = 'myMove .8s';
        setTimeout(()=> {
            setMenuOverlay(false);
        },600);
    }
    
    return(
        <>
            <div className='overlayBarOuter overlayBarOpen' id='overlayBar'>
                <div className='overlayLinks' id='overlayLinks'>
                    <div style={{display: 'flex'}}>
                        <Link href='/'>
                            <a className='overlayLink item1' onClick={clearOverlay}>
                                {/* <img src="/img/OverlayMenu/landing_usedharps.png" alt="used harps" /> */}
                            </a>
                        </Link>
                        <Link href='/buildersshowcase'>
                            <a className='overlayLink item2' onClick={clearOverlay}>
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
            <OverlayMenuCss />
        </>
    )
}


// {1===1
//     ?
//     <div className='overlayBarOuter overlayBarOpen' id='overlayBar'>
//         <div className='overlayLinks' id='overlayLinks'>
//             {/* {props.open?
//                 <div className='closeIcon' onClick={props.handleNavOpen}>
//                     <img src='/img/clear_search.png' alt="close mobile menu icon"/>
//                 </div>:''
//             } */}
//             <div style={{display: 'flex'}}>
            // <Link href='/'>
            //     <a className='overlayLink item1' onClick={(e)=>{
            //         clearOverlay();
            //     }}>
            //         {/* <img src="/img/OverlayMenu/landing_usedharps.png" alt="used harps" /> */}
            //     </a>
            // </Link>
//             <Link href='/buildersshowcase'>
//                 <a className='overlayLink item2' onClick={(e)=>{clearOverlay(e)}}>
//                     {/* <img src="/img/OverlayMenu/landing_builders.png" alt="Builders Showcase" /> */}
//                 </a>
//             </Link>
//             </div>
        //     <div style={{display: 'flex'}}>
        //         <Link href='/stringform'>
        //             <a className='overlayLink item3' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
        //                 {/* <img src="/img/OverlayMenu/landing_fastneasy.png" alt="Fast and Easy String Form" /> */}
        //             </a>
        //         </Link>
        //         <Link href='/onlinestore'>
        //             <a className='overlayLink item4' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
        //                 {/* <img src="/img/OverlayMenu/landing_onlinestore.png" alt="Online Store" /> */}
        //             </a>
        //         </Link>        
        //     </div>
        // </div>
//     </div>
//     :
//     <div className='tileContainer'><img id='tiles' onClick={()=>restoreOverlay()} src='/img/OverlayMenu/landing_menucomposite_dullwide.png' alt='opening tile menu icon' /></div>
// }
