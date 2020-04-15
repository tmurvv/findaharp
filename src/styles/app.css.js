import React from 'react';

function AppCss() {
    return (
        <style jsx>{`
            @font-face {
                font-family: avenir;
                src: url('/fonts/avenir_ff/AvenirLTStd-Roman.otf');
            }
            
            body {
                margin: 0;
                margin-block-end: 0;
                margin-block-start: 0;
           
                font-family: avenir;
                color: #5c5b5b;
            }            
        `}
        </style>
    )
}

export default AppCss;
