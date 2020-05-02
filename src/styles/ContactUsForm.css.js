function ContactUsFormCSS() {
    return (
        <style jsx="true">{`
            h2 {
                font-size: 36px;
                margin-bottom: 5px;
            }
            .subTitle {
                font-style: italic;
            }
            .contactFormContainer {
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
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
                padding: 20px 30px 20px 0;
                flex: 6;
            }
            .contactForm p {
                text-align: center;
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .marginTop {
                margin-top: 10px;
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
            }
            .inputGroup input {
                flex: 7.5;
                height: 20px;
                border-top: none;
                border-left: none;
                border-bottom: 1px solid #bbbbbb;
                border-right: 1px solid #bbbbbb;
            }
            .detailButton {
                margin: 25px auto;
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                -webkit-box-shadow: 2px 2px 2px 0px #555555;
                box-shadow: 2px 2px 2px 0px #555555;
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
                flex: 7;
                border-top: none;
                border-left: none;
                border-bottom: 1px solid #bbbbbb;
                border-right: 1px solid #bbbbbb;
            }
        `}
        </style>
    )
}

export default ContactUsFormCSS;
