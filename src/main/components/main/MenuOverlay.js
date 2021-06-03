import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { MenuOverlayContext } from '../../../main/contexts/MenuOverlayContext';
import OverlayMenuCss from '../../styles/OverlayMenu.css';

export default function MenuOverlay(props) {
    const { setMenuOverlay } = useContext(MenuOverlayContext);
    const [ winWidth, setWinWidth ] = useState(4000);
    function clearOverlay() {
        document.querySelector('.overlayLinks')?document.querySelector('.overlayLinks').style.animation = 'myMove 1s':'';
        setTimeout(()=> {
            setMenuOverlay(false);
        }, 800);
    }

    useEffect(() => {
        setWinWidth(window.innerWidth);setWinWidth(window.innerWidth);
    });
    
    if (winWidth&&winWidth>550) {
        return(
            <>
                <div className='overlayBarOuter overlayBarOpen' id='overlayBar'>    
                    <div className='overlayLinks' id='overlayLinks'>
                        {winWidth<750?
                        <div 
                            style={{
                                position: 'absolute', 
                                top: '-0px', 
                                left: '-21px',
                                transform: 'rotate(-14deg)'
                            }}
                        >
                            <div style={{fontSize: '16px', fontWeight: 'bold'}}>To Classic Site</div>
                            <img src='img/arrow_right_curved.png' style={{height: '30px', marginLeft: '-15px'}}alt='arrow right curved pointing to Find a Used Harp graphic'/>
                        </div>
                        :
                        <div 
                            style={{
                                position: 'absolute', 
                                top: '-3px', 
                                left: '-92px',
                                transform: 'rotate(-14deg)'
                            }}
                        >
                            <div style={{fontSize: '26px', fontWeight: 'bold'}}>To Classic Site</div>
                            <img src='img/arrow_right_curved.png' style={{height: '65px', marginLeft: '17px'}}alt='arrow right curved pointing to Find a Used Harp graphic'/>
                        </div>
                        }
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
    return(
        <>
            <div className='overlayBarOuter overlayBarOpen' id='overlayBar'>
                <div className='overlayLinks' id='overlayLinks'>
                    <div 
                        style={{
                            position: 'absolute', 
                            top: '-22px', 
                            left: '7px',
                        }}
                    >
                        <div style={{fontSize: '16px', fontWeight: 'bold'}}>To Classic Site</div>
                        <img src='img/arrow_right_curved.png' style={{height: '25px', marginLeft: '5px', marginTop: '10px'}}alt='arrow right curved pointing to Find a Used Harp graphic'/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', width: 'unset', margin: 'unset'}}>
                        {/* <div style={{height: '20px'}}> */}
                            <Link style={{height: '100%'}} href='/'>
                                <a style={{transform: 'scale(.8)'}} className='overlayLink item1' onClick={clearOverlay}>
                                    {/* <img src="/img/OverlayMenu/landing_usedharps.png" alt="used harps" /> */}
                                </a>
                            </Link>
                        {/* </div> */}
                        <Link href='/buildersshowcase'>
                            <a style={{transform: 'scale(.8)'}} className='overlayLink item2' onClick={clearOverlay}>
                                {/* <img src="/img/OverlayMenu/landing_builders.png" alt="Builders Showcase" /> */}
                            </a>
                        </Link>
                        <Link style={{transform: 'scale(.8)'}} href='/stringform'>
                            <a style={{transform: 'scale(.8)'}} className='overlayLink item3' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
                                {/* <img src="/img/OverlayMenu/landing_fastneasy.png" alt="Fast and Easy String Form" /> */}
                            </a>
                        </Link>
                        <Link href='/onlinestore'>
                            <a style={{transform: 'scale(.8)'}} className='overlayLink item4' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}>
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
