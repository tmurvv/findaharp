import React from 'react';
import IndexCss from '../../styles/index.css.js';
import Router from 'next/router';

function PageTitle({ maintitle, subtitle }) {
    return (
        <>
        
        <img id='spinner' style={{
                    display: 'none', 
                    position: 'fixed', 
                    top: '35%', 
                    left: '50%', 
                    transform: 'translate(-50%,-50%)',
                    zIndex: '9999',
                    height: '250px'
                }} 
                src='/img/spinner.gif' 
                alt='spinner' 
            />
        </>
    )
}

export default PageTitle;
