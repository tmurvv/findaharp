import React from 'react';
import BannerCss from '../styles/Banner.css';

function Banner() {
    return (
        <>
        <div className="mainContainer">
            <img className="textLogo" src="./img/logo_findaharp.png" alt="textPlaceholder"/>
            <img className="productGraphic" src="./img/golden_harp_cropped.png" alt="cool loopy logo"/>
        </div>
        <BannerCss />
        </>
    )
}

export default Banner;