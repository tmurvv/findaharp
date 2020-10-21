function ContactSellerFormCSS() {
    return (
        <style jsx="true">{`
            .detailContainer {
                width: 85vw;
                height: fit-content;
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                padding: 20px;
                max-height: calc(100vh - 50px);
                max-width: 800px;
                overflow-y: auto;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                text-align: center;
                z-index: 2000;
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
            }
            .contactContainer {
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
            
            @media only screen and (max-width: 750px) {
                .contactContainer {
                    flex-direction: column-reverse;
                    align-items: unset;
                }
            }
            .heading, h1 {
                width: 80%;
                margin: 30px auto;
            }
            .detailImg {
                flex: 4;
                height: 100%;
                padding: 20px;
            }
            .detailImg img {
                height: 95%;
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .detailImg p {
                margin-block-start: 0;
                margin-block-end: 0;
                text-align: center;
            }
            span {
                text-align:center;
            }
            label {
                
                transform: translateY(3.5px);
            }
            .label {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
                color: #000000;
            }
            .detailText {
                padding: 20px 30px 20px 0;
                flex: 6;
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
                float: right;
                position: sticky;
                top: 5px;
                right: 1px;
                color: black;
                opacity: .4;
            }
            .clearModal img{
                width: 25px;
            }
            .inputGroup {
                margin-top: 15px;
                display: flex;
            }
            .inputGroup label {
                flex:2;
                text-align: right;
                margin-right: 10px;
                vertical-align: -7px;
            }
            .inputGroup input {
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
                box-shadow: 1.5px 1.5px 1.5px 0px #555555;
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
                flex: 7.5;
                border-top: none;
                border-left: none;
                border-right: none;
                border-bottom: none none 1px solid #bbbbbb;
            }
            // #loadingLoginContactSeller {
            //     display: none;
            //     color: #6A75AA;
            //     border: 2px solid #6A75AA;
            //     background-color: #fff;
            //     padding: 30px;
            //     border-radius: 3px;
            //     width: 294px;
            //     margin:auto;
            //     position: absolute;
            //     top: 25%;
            //     right: 50%;
            //     transform: translate(50%, 50%);
            //     z-index: 5000;
            // }
            // #loadingLoginImgContactSeller {
            //     display: block;
            //     height: 50px;
            //     margin: auto;
            // }
            // #loadingLoginOkContactSeller,
            // #loadingLoginTryAgainContactSeller {
            //     display: none;
            //     padding: 7px;
            // }
            // #loadingLoginTextContactSeller {
            //     text-align: center;
            // }
            .submit-btn {
                width: 100%;
                // margin-top: 28px;
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

export default ContactSellerFormCSS;
