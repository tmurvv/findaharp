function ContactUsFormCSS() {
    return (
        <style jsx="true">{`
            h2 {
                font-size: 36px;
                margin-bottom: 50px;
                margin-block-start: 0;
                margin-block-end: 0;
            }
            h3 {
                margin-block-end: 0;
                margin-block-start: 0;
                font-family: 'Metropolis Extra Bold';
            }
            .findaharpLogo img {
                height: 36px;
            }
            .contactFormContainer {
                border-radius: 3px;
                padding: 20px;
                padding-top: 0;
                text-align: center;
                max-width: 1300px;
                margin: auto;
            }
            @media only screen and (max-width: 650px) {
                .contactFormContainer {
                    padding: 0;
                }
            }
            .contactFormContainer p {
                width: fit-content;
            }
            .contactArea {
                display: flex;
                justify-content: space-between;
            }
            @media only screen and (max-width: 950px) {
                .contactArea {
                    flex-direction: column;
                }
            }
            .contactText {
                flex: 4;
                height: 100%;
                padding: 0px 20px 20px 0;
                text-align: left;
            }
            @media only screen and (max-width: 700px) {
                .contactText {
                    padding-left: 0;
                    padding-right: 0;
                    margin-bottom: 30px;
                }
            }
            .contactText p {
                margin-block-start: 0;
                margin-block-end: 0;
                text-align: justify;
            }
            span {
                text-align:center;
            }
            label {
                font-family: 'Metropolis Extra Bold';
                transform: translateY(3.5px);
            }
            .contactForm {
                padding: 40px 20px 25px 10px;
                flex: 6;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border: 2px solid #f9bf1e;
                margin-left: 10px;
                background-color: #ffffff;
                postion: relative;
            }
            @media only screen and (max-width: 700px) {
                .contactForm {
                    padding-left: 20px;
                    margin-left: 0;
                }
            }
            
            .contactForm p {
                text-align: center;
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .marginTop {
                margin-top: 15px;
            }
            .marginTopLarge {
                margin-top: 40px;
            }
            .clearModal {
                position: fixed;
                bottom: 15px;
                right: 15px;
                color: black;
            }
            .clearModal img{
                width: 35px;
            }
            .inputGroup {
                margin-top: 15px;
                display: flex;
            }
            .inputGroup label {
                flex:2;
                text-align: right;
                margin-right: 20px;
                vertical-align: -7px;
                font-size: 14px;
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
                color: #000000;
                max-width: 85px;
            }
            .inputGroup input {
                background-color: transparent;
                flex: 7.5;
                height: 20px;
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: 1px solid #bbbbbb;
            }
            .detailButton {
                margin: 25px auto;
                background-image: linear-gradient(340deg, #f9bf1e 50%, #ffe178 58%, #ffe58a 74%, #f9bf1e 87%);
                padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                -webkit-box-shadow: 1.5px 1.5px 1.5px 0px #929191;
                box-shadow: 1.5px 1.5px 1.5px 0px #929191;
            }
            .detailButton:active {
                box-shadow: none;
            }
            .detailButton-cancel {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            textarea {
                background-color: transparent;
                flex: 7.5;
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: 1px solid #bbbbbb;
            }
            .buttons {
                margin-top: 20px;
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
                transform: translate(50%, 75%);
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
            .submit-btn {
                width: 100%;
                margin-top: 10px;
                // text-align: center;
                // padding: 5px 0;
                border-radius: 3px;
                background-color: #ffe58a;
                color: #000;
                border: none;
                // transition: 0.5s cubic-bezier(0.72, 0.15, 0.53, 0.84);
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

export default ContactUsFormCSS;
