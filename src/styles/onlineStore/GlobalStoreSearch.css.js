import React from 'react';

function GlobalStoreSearchCss() {
    return (
        <style jsx="true">{`
        * {
            box-sizing: border-box;
          }
          .storeSearchLine {
            width: 100%;
            max-width: 800px; 
            margin: auto; 
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            // border: 1px solid #ffe58a;
            background-color: transparent;
          }
          @media only screen and (max-width: 750px) {
            .storeSearchLine {
              flex-direction: column;
            }
          }

          .selectContainer {
            position: relative;
            display: inline-block;
            -webkit-appearance: none;
          }
          
          .selectContainer>span {
            right: 4px;
            top: 12px;
            position: absolute;
            font-size: 18px;
            pointer-events: none;
          }
          @media only screen and (max-width: 750px) {
            .selectContainer {
              width: 100%;
            }
            select {
              width: 100%;
            }
            .selectContainer>span {
              display: none;
              // right: 4px;
              // top: 12px;
              // position: absolute;
              // font-size: 18px;
              // pointer-events: none;
            }
          }
          #searchInput
          {
            background-image: url('/css/searchicon.png');
            background-position: 10px 12px;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
            font-size: 16px;
            padding: 12px 20px;
            border: 1px solid #ffe58a;
            // border-bottom: none;
            // border-left: 1px solid #ffe58a;
            // border-right: 1px solid #ffe58a;
            margin-bottom: 0px;
            max-width: 650px;
          }
          @media only screen and (max-width: 750px) {
            #searchInput {
              flex: unset;
            }
            
          }
          select {
            font-size: 16px;
            padding: 12px 20px;
            margin-bottom: 15px;
            border: 1px solid #ffe58a;
            width: 100%;
            background-color: #fff;
          }

          select:active,
          select:hover {
            outline-color: #ffe499;
          }
          input:active,
          input:hover {
            outline-color: #ffe499;
          }
          select:focus, input:focus{
            outline-color: #ffe499;
          }
          .searchTextImg {
            flex: 8;
            display: flex;
          }
          @media only screen and (max-width: 750px) {
            .searchTextImg {
              width: 100%;
            }
          }
          .searchHelperText {
            display: none;
            width: 60%;
            margin: 0px auto 5px;
            text-align: center;
            font-size: 12px;
            font-style: italic;
            color: #868686;
            font-weight: 500;
            font-size:14px;
          }
          @media only screen and (max-width: 750px) {
              .searchHelperText {
                  display: block;
              }
          }
          .globalstoresearchTitle {
            width: 60%;
            margin: 25px auto 5px;
            text-align: center;
            font-size: 12px;
            font-style: italic;
            color: #868686;
            font-weight: 500;
            font-size:14px;
        }
        .searchInfoWrapper {
            display: flex;
        }
        @media only screen and (max-width: 750px) {
            .searchInfoWrapper {
                display: block;
            }
            .searchInfoWrapper h3 {
                font-size: 14px;
                margin-block-end: 0;
            }
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
