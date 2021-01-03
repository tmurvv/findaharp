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
              display: flex;
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
            display: flex;
            width: 100%;
          }
          .searchTextImg form{
            display: flex;
            width: 100%;
          }
          .searchTextImg input{
              width: 100%;
              border: 1px solid #ffe499;
              flex: 8;
              padding: 13px 7px;
              font-size: 16px;
          }
          #searchMagnify {
            height: 46px;
            width: 46px;
            padding: 0;
            border: none;
            cursor: pointer;
            outline: none;
          }
          #searchMagnify>img {
            padding: 5px;
            background-color: rgb(249, 191, 30);
            height: 46px;
            width: 46px;
          }
          .searchHelperText {
            display: none;
            width: 60%;
            margin: 15px auto 5px;
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
        @media only screen and (max-width: 750px) {
          .storesearchTitle {
              width: 100%;
          }
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
