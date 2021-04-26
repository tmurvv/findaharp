function ContactBuilderFormCSS() {
    return (
        <style jsx="true">{`
            .buildercontactdivider {
                height: 50px;
                width: 90%;
            }
            .builderdetailContainer {
                width: 85vw;
                height: fit-content;
                background-color: #ffffff;
                border: 4px solid #6d81bf;
                box-shadow: 0 2rem 4rem rgba(64,81,160, .15);
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
                .builderdetailContainer {
                    flex-direction: column;
                }
            }
            .builderContainer {
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
            
            @media only screen and (max-width: 750px) {
                .builderContainer {
                    flex-direction: column-reverse;
                    align-items: unset;
                }
            }
            .heading, h1 {
                width: 80%;
                margin: 30px auto;
            }
            .builderdetailImg {
                flex: 4;
                height: 100%;
                padding: 20px;
            }
            .builderdetailImg img {
                height: 95%;
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .builderdetailImg p {
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
            .builderdetailText {
                padding: 20px 30px 20px 0;
                flex: 6;
            }
            .builderdetailText p {
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
            .contactbuilderdetailButton {
                margin: 25px auto;
                background-image: linear-gradient(340deg, #9cacdd 50%, #b9c3e4 58%, #e2e7f9 74%, #9cacdd 87%);
                padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                box-shadow: 1.5px 1.5px 1.5px 0px #555555;
            }
            .builderdetailButton:active {
                box-shadow: none;
            }
            .builderdetailButton-cancel {
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
            
            .submit-btn {
                width: 100%;
                // margin-top: 28px;
                // text-align: center;
                // padding: 5px 0;
                border-radius: 3px;
                background-color: #6d81bf;
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

export default ContactBuilderFormCSS;
