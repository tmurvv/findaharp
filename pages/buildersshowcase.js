import React from 'react';
import IndexCss from '../src/main/styles/index.css.js';
import Router from 'next/router';
import PageTitle from '../src/main/components/main/PageTitle.js';

function BuildersShowcase({ maintitle, subtitle }) {
    return (
        <>
        <div style={{padding: '50px'}}>
            <PageTitle maintitle='Builders Showcase' subtitle='Showcasing luthiers from across North America'/> 
        </div>
        <IndexCss />
        </>
    )
}

export default BuildersShowcase;
