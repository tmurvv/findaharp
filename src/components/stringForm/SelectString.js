import React from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
function SelectString() {
    return (
        <>
            <div class="dropdown">
                <button class="dropbtn">String Type<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                <div class="dropdown-content">
                    <div class="dropdown">
                        <button class="dropbtn">Gut<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div class="dropdown-content">
                            <a href="#">Bow Brand Pedal Natural Gut</a>
                            <a href="#">Bow Brand Lever Natural Gut</a>
                            <a href="#">Concedo Gut</a>
                            <a href="#">Burgundy Gut</a>
                            <a href="#">Silkgut</a>
                            <a href="#">Saverez KF Composite (synthetic)</a>
                        </div>
                    </div>
                    <div class="dropdown"> 
                        <button class="dropbtn">Nylon<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div class="dropdown-content">
                            <a href="#">Bow Brand Pedal Nylon</a>
                            <a href="#">Bow Brand Lever Nylon</a>
                            <a href="#">Artist Nylon</a>
                            <a href="#">Nylon Monofilament</a>
                        </div>
                    </div>
                    <div class="dropdown"> 
                        <button class="dropbtn">Wires<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div class="dropdown-content">
                            <a href="#">Silver-Plated Pedal Bass Wire</a>
                            <a href="#">Pedal Bass Wire (Tarnish-Resistant)</a>
                            <a href="#">Bow Brand Lever Bass Wire</a>
                            <a href="#">Professional Lever Bass Wire</a>
                        </div>
                    </div>
                    <div class="dropdown"> 
                        <button class="dropbtn">Not Sure<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div class="dropdown-content">
                            <a href="#">String suggestions by harp make and model</a>
                            <a href="#">Send us an email for advice on string types and brands</a>
                        </div>
                    </div>
                </div>
            </div>
            <SelectStringCss />
        </>
    )
}

export default SelectString;
