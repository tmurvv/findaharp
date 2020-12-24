import React, { useContext } from 'react';
import IndexCss from '../styles/index.css.js';
import { UserContext } from '../contexts/UserContext';

function PageTitle({ maintitle, subtitle }) {
    const { user } = useContext(UserContext);
    return (
        <>
        {maintitle.toUpperCase()!=='ONLINE STORE'?<div style={{position:'absolute', top: '12px', left: '5px'}}><a href='/onlinestore' style={{cursor: 'pointer', fontSize: '11px', fontFamily: 'Metropolis Extra Bold', fontStyle: 'italic', fontWeight: '600', textDecoration: 'underline'}}>FIND STRINGS AND MUSIC HERE</a></div>:''}
        {/* {maintitle.toUpperCase()!=='ONLINE STORE'?<div style={{position:'absolute', top: '5px', right: '10px'}}><a href='/onlinestore' style={{color: '#6A75AA', cursor: 'pointer', fontStyle: 'italic'}}>Strings and Music</a></div>:''} */}
        <div className='mainTitle'>
            <h2>{maintitle}</h2>
            <h3 className="subTitle">{subtitle}</h3>
        </div>
        <IndexCss />
        </>
    )
}

export default PageTitle;
