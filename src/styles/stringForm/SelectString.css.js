import React from "react";

function Css() {
    return (
        <style jsx="true">{`
            .dropbtn {
                // background-color: #fcd961;
                background-color: #fffbb5;
                color: #000;
                padding: 8px 16px;
                font-size: 16px;
                border: none;
                cursor: pointer;
                width: fit-content;
            }
            .dropbtn:hover {
                background-color: #fffbb5;
            }
            .dropdown {
                position: relative;
                // display: flex;
                // justify-content: flex-start;
                width: fit-content;
                min-width: 115px;
            }
            
            .dropdown-content {
                display: none;
                position: absolute;
                left: 100%;
                top: 0;
                background-color: #fffbb5;
                // background-color: #f9f9f9;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                z-index: 1;
            }
            
            .dropdown-content a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                background-color: #fffeee;
                min-width: 200px;
                font-size: 14px;
            }
            
            .dropdown-content a:hover {
                background-color: #fffbb5;
            }
            
            .dropdown:hover>.dropdown-content {
                display: block;
            }
            
            .dropdown-content .dropbtn {
                background-color: #fffbb5 !important;
            }
        `}
        </style>
    )
}

export default Css;