import React from 'react';

function GlobalStoreSearchCss() {
    return (
        <style jsx="true">{`
        * {
            box-sizing: border-box;
          }
          
          #searchInput
          {
            background-image: url('/css/searchicon.png');
            background-position: 10px 12px;
            background-repeat: no-repeat;
            width: 100%;
            font-size: 16px;
            padding: 12px 20px;
            border: 1px solid #ffe58a;
            margin-bottom: 0px;
            max-width: 650px;
          }
          select
          {
            font-size: 16px;
            padding: 12px 20px;
            border: 1px solid #ffe58a;
            margin-bottom: 0px;
          }
          
          select:active,
          select:hover {
            outline-color: #f9bf1e;
          }
          input:active,
          input:hover {
            outline-color: #f9bf1e;
          }
          
          #myUL {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          
          #myUL li a {
            border: 1px solid #ddd;
            margin-top: -1px; /* Prevent double borders */
            background-color: #f6f6f6;
            padding: 12px;
            text-decoration: none;
            font-size: 18px;
            color: black;
            display: block
          }
          
          #myUL li a:hover:not(.header) {
            background-color: #eee;
          }
        `}
        </style>
    )
} 

export default GlobalStoreSearchCss;
