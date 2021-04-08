import React, { useState } from 'react';
import BannerCss from '../../styles/Banner.css';
import OverlayMenu from '../../components/main/OverlayMenu';
 
function Banner() {
    const [openOverlay, setOpenOverlay] = useState(true);
    return (
        <>
            {openOverlay&&<OverlayMenu setOpenOverlay={setOpenOverlay}/>}
            <div className="mainContainer">
                <img className="textLogo" src="./img/logo_findaharp.png" alt="Find a Harp text logo"/>
                <img className="productGraphic" src="./img/golden_harp_cropped.png" alt="Find a Harp graphic logo"/>
            </div>
            <BannerCss />
        </>
    )
}

export default Banner;