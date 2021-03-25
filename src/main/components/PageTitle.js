import React from 'react';
import IndexCss from '../styles/index.css.js';
import Router from 'next/router';
import FastNEasyStringForm from './onlineStore/FastNEasyStringForm.js';

function PageTitle({ maintitle, subtitle, setstringformstatus }) {
    return (
        <>
        {maintitle.toUpperCase()!=='YOUR CART'&&maintitle.toUpperCase()!=='HARP PROFILES'&&!maintitle.toUpperCase().startsWith('EZ')
        ?<div>
            {/* <div onClick={()=>setstringformstatus?setstringformstatus('stringform'):Router.push('/stringform')} style={{ position: 'absolute', top: '15px', left: '15px'}}>
                <FastNEasyStringForm />
            </div> */}
            {maintitle.toUpperCase()!=='ONLINE STORE'&&
            maintitle.toUpperCase()!=='OUR STORE AND BUSINESS PARTNERS'&&
            maintitle.toUpperCase()!=='CONTACT US'&&
            maintitle.toUpperCase()!=='LOGIN/SIGNUP'&&
                <a 
                    onClick={()=>Router.push('/onlinestore')} 
                    style={{
                        color: '#6A75AA',
                        cursor: 'pointer', 
                        fontSize: '11px', 
                        fontFamily: 'Metropolis Extra Bold', 
                        fontStyle: 'italic', 
                        fontWeight: '600', 
                        textDecoration: 'underline',
                        position: 'absolute',
                        top: '50px',
                        left: '15px'
                    }}
                >Music, Accessories, Gifts Here</a>
            }
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
