function ContactUsFormCSS() {
    return (
        <style jsx="true">{`
            h2 {
                font-size: 36px;
                margin-bottom: 5px;
            }
            .findaharpLogo img {
                height: 36px;
            }
            .subTitle {
                font-style: italic;
                margin-bottom: 15px;
            }
            .contactFormContainer {
                background-color: tranparent;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                padding: 20px;
                text-align: center;
            }
            .contactFormContainer p {
                width: 100%;
                text-align: center;
            }
            .contactText {
                flex: 4;
                height: 100%;
                padding: 20px;
                text-align: left;
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
                padding: 20px 30px 0px 0px;
                flex: 6;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border: 1px solid #f9bf1e;
                margin-left: 10px;
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
            }
            .inputGroup input {
                background-color: transparent;
                flex: 7.5;
                height: 20px;
                border-top: none;
                border-left: none;
                border-bottom: 1px solid #bbbbbb;
                border-right: 1px solid #bbbbbb;
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
                border-bottom: 1px solid #bbbbbb;
                border-right: 1px solid #bbbbbb;
            }
            .buttons {
                margin: auto;
            }
        `}
        </style>
    )
}

export default ContactUsFormCSS;
