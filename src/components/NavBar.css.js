import React from "react";

function NavBarCss() {
    return (
        <style jsx>{`
        .outerContainer {
            background-image: linear-gradient(to left, #eee8aa, #ffffff 50%, #eee8aa 75%);
            background-color: #eee8aa;
            height: 135px;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
    `}
    </style>
    )
}

export default NavBarCss;