import React from 'react';
import IndexCss from '../../styles/index.css.js';
import Router from 'next/router';

function PageTitle({ maintitle, subtitle }) {
    return (
        <>
            <div id='spinner'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'fit-content',display: 'none', 
                    position: 'fixed', 
                    top: '35%', 
                    left: '50%', 
                    transform: 'translate(-50%,-50%)',
                    zIndex: '9999',
                }}
            >
                <img style={{
                        
                        height: '100px'
                    }} 
                    src='/img/spinner.gif' 
                    alt='spinner' 
                />
            </div>
        </>
    )
}

export default PageTitle;
