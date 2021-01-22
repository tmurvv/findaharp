function RememberHarpModalCSS() {
    return (
        <style jsx="true">{`
            ul {
            padding: 25px;
               max-width: 350px;
            }
            li {
                width: fit-content;
            }
            .rememberdetailContainer {
                width: 80vw;
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                position: fixed;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                z-index: 7000;
                max-height: calc(100vh - 100px);
                max-width: 850px;
                overflow-y: auto;
                text-align: center;
                padding: 30px;
                color: #000000
                opacity: 1;
                height: 485px;
            }
            @media only screen and (max-width: 550px) {
                .rememberdetailContainer {
                    box-shadow: 3px 5px 3px lightgrey;
                    width: 95%;
                    height: 100%;
                    padding: 10px;
                }
            }
            .rememberInput {
                width: fit-content;
                margin: auto;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-end;
            }
            .rememberInput input{
                font-size: 14px;
                padding: 7px 10px;
                border: 1px solid #ffe58a;
                margin-bottom: 10px;
            }
            .rememberInput label{
                padding: 7px 10px;
                margin-bottom: 0px;
                text-align: right;
                font-family: Metropolis Extra Bold;
                font-size: 12px;
            }
            @media only screen and (max-width: 550px) {
                .rememberInput {
                    align-items: flex-end;
                }
            }
            .rememberdetailInfo {
                display: flex;
                align-items: flex-start;
                padding: 15px 20px 20px;
            }
            @media only screen and (max-width: 550px) {
                .rememberdetailContainer {
                    flex-direction: column;
                    padding: 15px 0;
                }
                .rememberdetailInfo {
                    flex-direction: column
                }
            }
            .rememberdetailButton {
                background-image: linear-gradient(340deg, #f9bf1e 50%, #ffe178 58%, #ffe58a 74%, #f9bf1e 87%);
                padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                box-shadow: 1.5px 1.5px 1.5px 0px #555555;
                /*-webkit-box-shadow: 2px 2px 2px 0px #555555;
                box-shadow: 2px 2px 2px 0px #555555;*/
            }
            .rememberdetailButton:active {
                box-shadow: none;
            }
            .rememberdetailButton-cancel {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            .rememberdetailImg {
                flex: 4;
                height: 100%;
            }
            @media only screen and (max-width: 550px) {
                .rememberdetailImg {
                    width: 100%;
                }
            }
            .rememberdetailImg img {
                height: 95%;
                width: 80%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            @media only screen and (max-width: 550px) {
                .rememberdetailImg img {
                    max-height: 150px;
                    width: auto;
                    margin: auto;
                }
            }
            .rememberdetailText {
                flex: 6;
                text-align: left;
                display: flex;
                flex-direction: column;
                height: 290px;
                justify-content: space-between;
                width: 100%;
            }
            @media only screen and (max-width: 550px) {
                .rememberdetailText {
                    padding: 25px 0;
                }
            }         
            .rememberdetailText span {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
            }
            .rememberdetailText p {
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .remembermarginTop {
                margin-top: 10px;
            }
            .rememberclearModal {
                float: right;
                position: sticky;
                top: 5px;
                right: 1px;
                color: black;
                height: 28px;
            }
            .rememberclearModal img {
                width: 25px;
                opacity: .4;
            }
            .remembermoreButton {
                color: #f9bf1e;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
            .rememberlongDesc {
                text-align: left;
                overflow-y: auto;
                margin-bottom:15px;
                margin-left: 50px;
            }
            .rememberblueFontButton {
                background-color: 'white';
                outline: 'none';
                color:'#6A75AA';
                text-decoration: 'none'; 
                border: 'none'; 
                font-size: '14px';
            }
        `}
        </style>
    )
}

export default RememberHarpModalCSS;
