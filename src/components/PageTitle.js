import React from 'react';
import IndexCss from '../styles/index.css.js';
import Router from 'next/router';

function PageTitle({ maintitle, subtitle }) {
    return (
        <>
        {maintitle.toUpperCase()!=='ONLINE STORE'&&maintitle.toUpperCase()!=='YOUR CART'&&maintitle.toUpperCase()!=='HARP PROFILES'&&!maintitle.toUpperCase().startsWith('EZ')
        ?<div style={{position:'absolute', top: '12px', left: '5px'}}>
            <a 
                onClick={()=>Router.push('/onlinestore')} 
                style={{
                    color: '#6A75AA',
                    cursor: 'pointer', 
                    fontSize: '11px', 
                    fontFamily: 'Metropolis Extra Bold', 
                    fontStyle: 'italic', 
                    fontWeight: '600', 
                    textDecoration: 'underline'}}
            >STRINGS AND MUSIC HERE</a>
        </div>
        :''}
        <div className='mainTitle'>
            <h2>{maintitle}</h2>
            <h3 className="subTitle">{subtitle}</h3>
        </div>
        <IndexCss />
        </>
    )
}

export default PageTitle;
