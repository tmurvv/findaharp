import React from 'react';
import IndexCss from '../styles/index.css.js';

function PageTitle({ maintitle, subtitle }) {
    return (
        <>
        {maintitle.toUpperCase()!=='ONLINE STORE'&&maintitle.toUpperCase()!=='YOUR CART'?<div style={{position:'absolute', top: '12px', left: '5px'}}><a href='/onlinestore' style={{color: '#6A75AA',cursor: 'pointer', fontSize: '11px', fontFamily: 'Metropolis Extra Bold', fontStyle: 'italic', fontWeight: '600', textDecoration: 'underline'}}>FIND STRINGS AND MUSIC HERE</a></div>:''}
        <div className='mainTitle'>
            <h2>{maintitle}</h2>
            <h3 className="subTitle">{subtitle}</h3>
        </div>
        <IndexCss />
        </>
    )
}

export default PageTitle;
