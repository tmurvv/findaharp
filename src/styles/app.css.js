import React from 'react';

function AppCss() {
    return (
        <style jsx>{`
            @font-face {
                font-family: avenir;
                src: url('../../public/fonts/avenir_ff/AvenirLTStd-Roman.otf');
            }
            body {
                margin: 0;
                margin-block-end: 0;
                margin-block-start: 0;
            }
            html {
                font-family: avenir, Helvetica, sans-serif;
                color: #5c5b5b;
            }            
        `}
        </style>
    )
}

export default AppCss;
