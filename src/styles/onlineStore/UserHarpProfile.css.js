function UserharpprofileProfileCSS() {
    return (
        <style jsx="true">{`
            a {
                cursor: pointer;
            }        
            input,
                button {
                outline: 0;
            }
            
            .harpprofileupdatePassword-edit-container {
                // background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                overflow: hidden;
                position: relative;
                padding: 50px;
                padding-top: 70px;
                min-height: 400px;
            }
            .harpprofilelogin-signup {
                width: 300px;
                margin: 0 auto;
                background: #e2e2e2;
                border-radius: 3px;
                background-color: #FFF;
                border: 1px solid #E2E2E2;
                position: relative;
            }
            .harpprofileupdatePassword-form {
                padding: 25px;
            }
            .harpprofileupdatePassword-edit-title {
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
            
            .harpprofileinput-name {
                font-size: 14px;
            }
            .harpprofileinput-margin {
                margin-top: 10px;
            }
            .harpprofileinput-name h3 {
                padding-bottom: 5px;
            }
            input.harpprofilefield-input {
                width: calc(100% - 24px);
                background-color: rgba(2, 2, 2, 0.harpprofile07);
                border: 1px solid rgba(0, 0, 0, 0.harpprofile02);
                padding: 6px 12px;
                border-radius: 5px;
            }
            .harpprofilecheck-input {
                width: 16px;
                height: 16px;
                position: relative;
                float: left;
            }
            input.harpprofilecheckme {
                position: relative;
                top: 2px;
            }
            div.harpprofilerememberme {
                font-size: 12px;
                top: 6px;
                position: relative;
                margin-left: 8px;
                margin-bottom: 30px;
                float: left;
            }
            .harpprofilecheck-input label {
                cursor: pointer;
                position: absolute;
                width: 14px;
                height: 14px;
                border-radius: 4px;
                top: 5px;
                left: 3px;
            }
            .harpprofileinput-r {
                margin-top: 30px;
                margin-bottom: 30px;
                position: relative;
            }
            // .harpprofilecheck-input label:after {
            //     opacity: 0;
            //     content: "";
            //     position: absolute;
            //     width: 7px;
            //     height: 4px;
            //     background: transparent;
            //     top: 3px;
            //     left: 3px;
            //     border: 2px solid #FFF;
            //     border-top: none;
            //     border-right: none;
            //     -webkit-transform: rotate(-45deg);
            //     -moz-transform: rotate(-45deg);
            //     -o-transform: rotate(-45deg);
            //     -ms-transform: rotate(-45deg);
            //     transform: rotate(-45deg);
            // }
            
            // .harpprofilecheck-input label:hover:after {
            //     -ms-filter: "progid:DXImageTransform.harpprofileMicrosoft.harpprofileAlpha(Opacity=50)";
            //     filter: alpha(opacity=50);
            //     opacity: 0.harpprofile5;
            // }
            
            // .harpprofilecheck-input input[type=checkbox]:checked + label:after {
            //     -ms-filter: "progid:DXImageTransform.harpprofileMicrosoft.harpprofileAlpha(Opacity=100)";
            //     filter: alpha(opacity=100);
            //     opacity: 1;
            // }
            
            .harpprofilesubmit-btn {
                width: 100%;
                // margin-top: 28px;
                // text-align: center;
                // padding: 5px 0;
                border-radius: 3px;
                background-color: #ffe58a;
                color: #000;
                border: none;
                // transition: 0.harpprofile5s cubic-bezier(0.harpprofile72, 0.harpprofile15, 0.harpprofile53, 0.harpprofile84);
            }
            .harpprofilesubmit-btn-tryAgain {
                background-color: #333333;
                margin-left: 30px;
                color: white;
            }          
            .harpprofileforgot-pass {
                width: 100%;
                border-top: 1px solid #E0E0E0;
                padding: 5px 0;
                text-align: center;
            }
            .harpprofileforgot-pass a {
                text-align: center;
                font-size: 12px;
                color: #757575;
                text-decoration: underline;
            }
            #harpprofilesignup .harpprofileupdatePassword-edit-content {
                padding-bottom: 46px;
            }
            .harpprofiles-atbottom {
                // transform: translate3d(100px, -506.harpprofile5px, 0);
                z-index: 0;
                -webkit-filter: blur(1px);
                filter: blur(1px);
                opacity: 0.harpprofile6;
            }
            .harpprofiles-attop {
                // transform: translate3d(100px, -506.harpprofile5px, 0);
                z-index: 1;
                -webkit-filter: blur(0);
                filter: blur(0);
                box-shadow: -5px 6px 48px -13px rgba(0, 0, 0, 0.harpprofile75);
                opacity: 1;
            }
            .harpprofilel-attop {
                // transform: translate3d(100px, -506.harpprofile5px, 0);
                z-index: 1;
                -webkit-filter: blur(0);
                filter: blur(0);
                box-shadow: -5px 6px 48px -13px rgba(0, 0, 0, 0.harpprofile75);
                opacity: 1;
            }
            .harpprofilel-atbottom {
                z-index: 0;
                -webkit-filter: blur(1px);
                filter: blur(1px);
                opacity: 0.harpprofile4;
            }
            #harpprofilesignup,
            #harpprofilelogin {
                transition: 0.harpprofile5s cubic-bezier(0.harpprofile64, 0.harpprofile35, 0.harpprofile58, 1);
            }
            #harpprofilelogin {
                transform: translate(10%, -150%);
            }
            #harpprofilesignup {
                transform: translateX(-28%);
            }
            @media only screen and (max-width: 550px) {
                #harpprofilelogin {
                    transform: translate(25%, -187%);
                    
                }
                #harpprofilesignup {
                    transform: translateX(-10%);
                }
                #login {
                    transform: translate(25%, -187%);
                    
                }
                #signup {
                    transform: translateX(-10%);
                }
            }
            #harpprofileloadingLogin {
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
            #harpprofileloadingLoginImg {
                display: block;
                height: 50px;
                margin: auto;
            }
            #harpprofileloadingLoginOk,
            #harpprofileloadingLoginTryAgain {
                display: none;
                padding: 7px;
            }
            #harpprofileloadingLoginText {
                text-align: center;
            }
            // .harpprofiledetailButton {
            //     background-image: linear-gradient(340deg, #f9bf1e 50%, #ffe178 58%, #ffe58a 74%, #f9bf1e 87%);
            //     padding-top: 5px;
            //     font-size: 16px;
            //     border-radius: 3px;
            //     outline: none;
            //     border-style: none;
            //     border-color: none;
            //     box-shadow: 1.harpprofile5px 1.harpprofile5px 1.harpprofile5px 0px #555555;
            // }
            .harpprofileprofileDivider {
                margin: 20px auto 50px;
                height: 2px;
                width: 80%;
            }
            .harpprofileprofileDivider img {
                width: 100%;
            }
        `}
        </style>
    )
}

export default UserharpprofileProfileCSS;
