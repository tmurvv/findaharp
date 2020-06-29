function LoginSignupCSS() {
    return (
        <style jsx="true">{`
            a {
                cursor: pointer;
            }        
            input,
                button {
                outline: 0;
            }
            .login-signup-container {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                overflow: hidden;
                position: relative;
                padding: 50px;
                padding-top: 70px;
                min-height: 400px;
            }
            .login-signup {
                width: 300px;
                margin: 0 auto;
                background: #e2e2e2;
                border-radius: 3px;
                background-color: #FFF;
                border: 1px solid #E2E2E2;
                position: relative;
            }
            .login-form {
                padding: 25px;
            }
            .login-signup-title {
                padding: 15px;
                width: calc(100% - 30px);
                text-align: center;
                font-size: 16px;
                color: #000;
                background-color: #ffe58a;
                border: 1px solid #ffe58a;
                border-top-right-radius: 3px;
                border-top-left-radius: 3px;
                transform: translate(-1px, -1px);
            }
            
            .input-name {
                font-size: 14px;
            }
            .input-margin {
                margin-top: 10px;
            }
            .input-name h3 {
                padding-bottom: 5px;
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
                font-size: 14px;
                top: 3px;
                position: relative;
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
                margin-top: 30px;
                margin-bottom: 30px;
                display: flex;
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
            .forgot-pass {
                width: 100%;
                border-top: 1px solid #E0E0E0;
                padding: 5px 0;
                text-align: center;
            }
            .forgot-pass a {
                text-align: center;
                font-size: 12px;
                color: #757575;
                text-decoration: underline;
            }
            #signup .login-signup-content {
                padding-bottom: 46px;
            }
            .s-atbottom {
                // transform: translate3d(100px, -506.5px, 0);
                z-index: 0;
                -webkit-filter: blur(1px);
                filter: blur(1px);
                opacity: 0.6;
            }
            .s-attop {
                z-index: 1;
                -webkit-filter: blur(0);
                filter: blur(0);
                box-shadow: -5px 6px 48px -13px rgba(0, 0, 0, 0.75);
                opacity: 1;
            }
            .l-attop {
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
                opacity: 0.4;
            }
            #signup,
            #login {
                transition: 0.5s cubic-bezier(0.64, 0.35, 0.58, 1);
            }
            #login {
                transform: translate(28%, -184%);
            }
            #signup {
                transform: translateX(-28%);
            }
            @media only screen and (max-width: 550px) {
                #login {
                    transform: translate(0%, -184%);
                }
                #signup {
                    transform: translateX(-10%);
                }
            }
            #loadingLogin {
                display: none;
                color: #6A75AA;
                border: 2px solid #6A75AA;
                background-color: #fff;
                padding: 30px;
                border-radius: 3px;
                width: 294px;
                margin:auto;
                position: absolute;
                top: 25%;
                right: 50%;
                transform: translate(50%, 50%);
                z-index: 5000;
            }
            #loadingLoginImg {
                display: block;
                height: 50px;
                margin: auto;
            }
            #loadingLoginOk,
            #loadingLoginTryAgain {
                display: none;
                padding: 7px;
            }
            #loadingLoginText {
                text-align: center;
            }
            .profileDivider {
                margin: 20px auto 50px;
                height: 2px;
                width: 80%;
            }
            .profileDivider img {
                width: 100%;
            }
        `}
        </style>
    )
}

export default LoginSignupCSS;
