import React, { useContext } from 'react';
import IndexCss from '../styles/index.css.js';
import { UserContext } from '../contexts/UserContext';

function PageTitle({ maintitle, subtitle }) {
    const { user } = useContext(UserContext);
    return (
        <>
        {/* {user._id?<div style={{position:'absolute', top: '0', right: '10px'}}><p style={{color: '#868686', fontStyle: 'italic'}}>Welcome {user.firstname}</p></div>:''} //BREAKING Welcome user gone in favour of cart */} 
        <div className='mainTitle'>
            <h2>{maintitle}</h2>
            <h3 className="subTitle">{subtitle}</h3>
        </div>
        <IndexCss />
        </>
    )
}

export default PageTitle;
