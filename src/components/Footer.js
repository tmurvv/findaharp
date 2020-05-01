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
                
                <p className='copy'style={{marginBlockEnd:'0'}}>design by <a href='http://diomed.ca' style={{color: '#ffe58a', fontSize: '12px'}}>diomed.ca</a>/website by <a href='https://www.take2tech.ca' style={{color: '#ffe58a', fontSize: '12px'}}>take2tech.ca</a></p>
                <p className='copy' style={{marginBlockStart:'0'}}>&copy; Copyright 2020 take2tech.ca</p>
            </div>
            <FooterCss />
        </>
    )
}

export default Footer;
