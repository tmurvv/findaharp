import Link from 'next/link';
import Router from 'next/router';

//internal
import OverlayMenuCss from '../../styles/OverlayMenu.css.js';

export default function OverlayMenu(props) {
    function clearOverlay(e) {
        document.querySelector('#overlayBar').style.opacity='0';
        document.querySelector('#overlayBar').style.background = 'rgb(244,244,244,0)';
        setTimeout(()=> {
            document.querySelector('#overlayBar').style.display='none';
        },500);
    }
    // if (process.browser&&Router.route==='/stringform'||Router.route==='/rememberdetails'||Router.route==='/harploginsignup'||Router.route==='/userharpprofile') {
    return(
        <>
        <div className='overlayBarOuter overlayBarOpen' id='overlayBar'>
            <div className='overlayLinks' id='overlayLinks'>
                {/* {props.open?
                    <div className='closeIcon' onClick={props.handleNavOpen}>
                        <img src='/img/clear_search.png' alt="close mobile menu icon"/>
                    </div>:''
                } */}
                <Link href='/'>
                    <a className='overlayLink thinLink' onClick={(e)=>{
                        e.preventDefault();
                        clearOverlay();
                    }}><img src="/img/OverlayMenu/landing_used_nosub.png" alt="used harps" /></a>
                </Link>
                <Link href='/buildersshowcase'>
                    <a className='overlayLink fatLink' onClick={(e)=>{clearOverlay(e)}}><img src="/img/OverlayMenu/landing_builders.png" alt="Builders Showcase" /></a>
                </Link>
                <Link href='/stringform'>
                    <a className='overlayLink fatLink' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}><img src="/img/OverlayMenu/landing_fastneasy.png" alt="Fast and Easy String Form" /></a>
                </Link>
                <Link href='/onlinestore'>
                    <a className='overlayLink thinLink' onClick={()=>{clearOverlay(); if (Router&&Router.route!=='/onlinestore'&&document.querySelector('#spinner')) document.querySelector('#spinner').style.display='block'; props.handleNavOpen;}}><img src="/img/OverlayMenu/landing_onlinestore.png" alt="Online Store" /></a>
                </Link>        
                
            </div>
        </div>
        <OverlayMenuCss />
       </>    
    )
}
