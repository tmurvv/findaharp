import React from 'react';
import IndexCss from '../styles/index.css.js';
import Router from 'next/router';
import FastNEasyStringForm from './onlineStore/FastNEasyStringForm.js';

function PageTitle({ maintitle, subtitle }) {
    return (
        <>
        {maintitle.toUpperCase()!=='YOUR CART'&&maintitle.toUpperCase()!=='HARP PROFILES'&&!maintitle.toUpperCase().startsWith('EZ')
        ?<div>
            <div onClick={()=>Router.push('/stringform')} style={{ position: 'absolute', top: '15px', left: '15px'}}>
                <FastNEasyStringForm />
            </div>
            {maintitle.toUpperCase()!=='ONLINE STORE'&&
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
