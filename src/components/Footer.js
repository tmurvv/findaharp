import React from 'react';
import FooterCss from '../styles/Footer.css';

function Footer() {
    return (
        <>
            <div className='footer'>
                <div className='flexSB'>
                    <div className="logo">
                        <img src='/img/logo_findaharp.png' alt='gold harp graphic'/>
                        <img src='/img/golden_harp_cropped.png' alt='gold harp graphic'/>
                    </div>    
                </div>
                <p className='copy'>&copy; Copyright 2020 take2tech.ca</p>
            </div>
            <FooterCss />
        </>
    )
}

export default Footer;
