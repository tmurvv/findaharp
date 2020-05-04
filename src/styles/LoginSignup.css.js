function LoginSignupCSS() {
    return (
        <style jsx="true">{`
            a {
                text-decoration: none;
                cursor: pointer;
            }        
            input,
                button {
                outline: 0;
            }
            .login-signup-container {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
            }
            .login-signup {
                width: 300px;
                position: relative;
                margin: 0 auto;
                background: #e2e2e2;
                border-radius: 3px;
            }
            .login-signup-title {
                padding: 15px;
                width: calc(100% - 30px);
                text-align: center;
                font-size: 16px;
                color: #000;
                background-color: #f9bf1e;
                border: 1px solid #f9b919;
            }
            .login-signup-content {
                width: calc(100% - 50px);
                position: relative;
                padding: 25px;
                background-color: #FFF;
                border: 1px solid #E2E2E2;
            }
            .input-name {
                font-size: 14px;
            }
            .input-margin {
                margin-top: 10px;
            }
            .input-name h3 {
                padding-bottom: 5px;
                float: left;
            }
            input.field-input {
                width: calc(100% - 24px);
                background-color: rgba(2, 2, 2, 0.07);
                border: 1px solid rgba(0, 0, 0, 0.02);
                padding: 6px 12px;
                border-radius: 5px;
            }
            .check-input {
                width: 16px;
                height: 16px;
                position: relative;
                float: left;
            }
            input.checkme {
                position: relative;
                top: 2px;
            }
            div.rememberme {
                font-size: 12px;
                top: 6px;
                position: relative;
                margin-left: 8px;
                float: left;
            }
            .check-input label {
                cursor: pointer;
                position: absolute;
                width: 14px;
                height: 14px;
                border-radius: 4px;
                top: 5px;
                left: 3px;
            }
            .input-r {
                margin-top: 15px;
                position: relative;
            }
            /*.check-input label:after {
                opacity: 0;
                content: "";
                position: absolute;
                width: 7px;
                height: 4px;
                background: transparent;
                top: 3px;
                left: 3px;
                border: 2px solid #FFF;
                border-top: none;
                border-right: none;
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                -ms-transform: rotate(-45deg);
                transform: rotate(-45deg);
            } */
            
            .check-input label:hover:after {
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
                filter: alpha(opacity=50);
                opacity: 0.5;
            }
            
            .check-input input[type=checkbox]:checked + label:after {
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                filter: alpha(opacity=100);
                opacity: 1;
            }
            
            .submit-btn {
                width: 100%;
                margin-top: 28px;
                text-align: center;
                padding: 5px 0;
                border-radius: 3px;
                background-color: #f9bf1e;
                color: #000;
                border: none;
                transition: 0.5s cubic-bezier(0.72, 0.15, 0.53, 0.84);
            }
            
            .submit-btn:hover {
                background-color: #f9bf1e;
            }
            
            .forgot-pass {
                width: 100%;
                margin-top: 50px;
                border-top: 1px solid #E0E0E0;
                padding: 5px 0;
                text-align: center;
            }
            .forgot-pass a {
                text-align: center;
                font-size: 10px;
                color: #757575;
            }
            #signup .login-signup-content {
                padding-bottom: 46px;
            }
            .s-atbottom {
                transform: translate3d(100px, -506.5px, 0);
                z-index: 0;
                -webkit-filter: blur(1px);
                filter: blur(1px);
                opacity: 0.6;
            }
            .s-attop {
                transform: translate3d(100px, -506.5px, 0);
                z-index: 1;
                -webkit-filter: blur(0);
                filter: blur(0);
                box-shadow: -5px 6px 48px -13px rgba(0, 0, 0, 0.75);
                opacity: 1;
            }
            .l-attop {
                transform: translate3d(100px, -506.5px, 0);
                z-index: 1;
                -webkit-filter: blur(0);
                filter: blur(0);
                box-shadow: -5px 6px 48px -13px rgba(0, 0, 0, 0.75);
                opacity: 1;
            }
            .l-atbottom {
                z-index: 0;
                -webkit-filter: blur(1px);
                filter: blur(1px);
                opacity: 0.6;
            }
            #signup,
            #login {
                transition: 0.5s cubic-bezier(0.64, 0.35, 0.58, 1);
            }
            #login {
                transform: translate(-160px, 80px);
            }
            #signup {
                margin-top: 75px;
                line-spacing: .5;
            }
        `}
        </style>
    )
}

export default LoginSignupCSS;
// function LoginSignupCSS() {
//     return (
//         <style jsx="true">{`
//             .detailContainer {
//                 width: 100%;
//                 height: fit-content;
//                 background-color: #ffffff;
//                 border: 4px solid #f9bf1e;
//                 box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
//                 border-radius: 3px;
//                 padding: 20px;
//                 z-index: 3000;
//                 max-height: calc(100vh - 50px);
//                 max-width: 1000px;
//                 overflow-y: auto;
//                 position: fixed;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%,-50%);
//             }
//             @media only screen and (max-width: 500px) {
//                 .loginContainer {
//                     flex-direction: column;
//                 }
//             }
//             .loginContainer {
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-evenly;
//                 padding: 0 40px 20px;
//             }
//             heading {
//                 width: 80%;
//                 margin-top: 30px;
//             }
//             .detailImg {
//                 padding-right: 20px;
//             }
//             .detailImg img {
//                 height: 100%;
//                 max-height: 300px;
//                 margin: 0 auto;
//                 flex: 4;
//             }
//             .detailImg p {
//                 margin-block-start: 0;
//                 margin-block-end: 0;
//                 text-align: center;
//             }
//             span {
//                 text-align:center;
//             }
//             .detailText {
//                 padding: 0 20px;
//                 flex: 6;
//             }
//             .detailText p {
//                 text-align: center;
//                 margin-block-start: 0;
//                 margin-block-end: 0;
//                 height: auto;
//                 transition: all .7s;
//             }
//             .marginTop {
//                 margin-top: 10px;
//             }
//             .marginTopLarge {
//                 margin-top: 40px;
//             }
//             .clearModal {
//                 position: absolute;
//                 bottom: 10px;
//                 right: 10px;
//                 color: black;
//                 height: 35px;
//             }
//             .clearModal img{
//                 width: 35px;
//             }
//             .inputGroup {
//                 margin-top: 15px;
//                 display: flex;
//             }
//             .inputGroup label {
//                 flex:3;
//                 text-align: right;
//                 margin-right: 7px;
//             }
//             .inputGroup input {
//                 flex:8;
//             }
//             .detailButton {
//                 margin: 25px auto;
//                 background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
//                 padding: 5px 10px;
//                 font-size: 16px;
//                 border-radius: 3px;
//                 outline: none;
//                 border-style: none;
//                 border-color: none;
//                 -webkit-box-shadow: 2px 2px 2px 0px #555555;
//                 box-shadow: 2px 2px 2px 0px #555555;
//             }
//             .detailButton:active {
//                 box-shadow: none;
//             }
//             .detailButton-cancel {
//                 background-color: #333333;
//                 margin-left: 30px;
//                 color: white;
//                 background-image: none;
//             }
//             textarea {
//                 flex: 7;
//             }
//         `}
//         </style>
//     )
// }

// export default LoginSignupCSS;
