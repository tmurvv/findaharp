import React from "react";

function ResultsCss() {
    return (
        <style jsx="true">{`
        #loadingLogin,
        #loadingVerifyLogin {
            display: none;
            color: #6A75AA;
            border: 2px solid #6A75AA;
            background-color: #fff;
            padding: 30px;
            border-radius: 3px;
            width: 294px;
            margin:auto;
            position: fixed;
            top: 25%;
            right: 50%;
            transform: translate(50%, 50%);
            z-index: 5000;
        }
        #loadingLoginImg,
        #loadingVerifyLoginImg {
            display: block;
            height: 50px;
            margin: auto;
        }
        #loadingLoginOk,
        #loadingVerifyLoginOk,
        #loadingLoginTryAgain,
        #loadingVerifyTryAgain {
            display: none;
            padding: 7px;
        }
        #loadingLoginText,
        #loadingVerifyLoginText {
            text-align: center;
        }
        .submit-btn {
            width: 100%;
            border-radius: 3px;
            background-color: #ffe58a;
            color: #000;
            border: none;
        }
        .submit-btn-tryAgain {
            background-color: #333333;
            margin-left: 30px;
            color: white;
        } 
        `}
        </style>
    )
}

export default ResultsCss;
