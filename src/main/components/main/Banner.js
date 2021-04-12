import React, { useContext } from 'react';
import BannerCss from '../../styles/Banner.css';
import MenuOverlay from '../../components/main/MenuOverlay';
import { MenuOverlayContext } from '../../../main/contexts/MenuOverlayContext';
 
function Banner() {
    const { menuOverlay } = useContext(MenuOverlayContext);
    return (
        <>
            <div className="mainContainer">
                {menuOverlay&&<MenuOverlay />}
                <img className="textLogo" src="./img/logo_findaharp.png" alt="Find a Harp text logo"/>
                <img className="productGraphic" src="./img/golden_harp_cropped.png" alt="Find a Harp graphic logo"/>
            </div>
            <BannerCss />
        </>
    )
}

export default Banner;