function LoginSignupCSS() {
    return (
        <style jsx="true">{`
            .detailContainer {
                width: 100%;
                height: fit-content;
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                display: flex;
                align-items: center;
                padding: 20px;
                z-index: 3000;
                max-height: calc(100vh - 50px);
                max-width: 600px;
                overflow-y: auto;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
            }
            heading {
                width: 80%;
                margin-top: 30px;
            }
            .detailImg {
                padding-right: 20px;
            }
            .detailImg img {
                height: 100%;
                max-height: 300px;
                margin: 0 auto;
            }
            .detailImg p {
                margin-block-start: 0;
                margin-block-end: 0;
                text-align: center;
            }
            span {
                text-align:center;
            }
            .detailText {
                padding: 20px;
            }
            .detailText p {
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
                position: absolute;
                top: 0;
                right: 0;
                color: black;
                height: 35px;
            }
            .clearModal img{
                width: 35px;
            }
            .inputGroup {
                margin-top: 15px;
                display: flex;
            }
            .inputGroup label {
                flex:3;
                text-align: right;
                margin-right: 7px;
            }
            .inputGroup input {
                flex:8;
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
            }
        `}
        </style>
    )
}

export default LoginSignupCSS;
