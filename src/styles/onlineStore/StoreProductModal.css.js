function StoreProductModalCSS() {
    return (
        <style jsx="true">{`
            .storedetailContainer {
                width: 80vw;
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                position: fixed;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                z-index: 3000;
                max-height: calc(100vh - 100px);
                max-width: 850px;
                overflow-y: auto;
                text-align: center;
                padding: 30px;
                color: #000000
                opacity: 1;
            }
            .storedetailInfo {
                display: flex;
                align-items: flex-start;
                padding: 15px 20px 20px;
            }
            @media only screen and (max-width: 550px) {
                .storedetailContainer {
                    flex-direction: column;
                    padding: 15px 0;
                }
                .storedetailInfo {
                    flex-direction: column
                }
            }
            .storedetailButton {
                margin: 40px auto;
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
            .storedetailButton:active {
                box-shadow: none;
            }
            .storedetailButton-cancel {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            .storedetailImg {
                flex: 4;
                height: 100%;
            }
            .storedetailImg img {
                height: 95%;
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
                box-shadow: 3px 5px 3px lightgrey;
            }
            .storedetailText {
                flex: 6;
                padding: 0 0 0 60px;
                text-align: left;
            }
            @media only screen and (max-width: 550px) {
                .storedetailText {
                    padding: 25px 0;
                }
            }         
            .storedetailText span {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
            }
            .storedetailText p {
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .storemarginTop {
                margin-top: 10px;
            }
            .storeclearModal {
                float: right;
                position: sticky;
                top: 5px;
                right: 1px;
                color: black;
                height: 28px;
            }
            .storeclearModal img {
                width: 25px;
                opacity: .4;
            }
            .storemoreButton {
                color: #f9bf1e;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
            .storelongDesc {
                max-height: 212px;
                text-align: left;
                overflow-y: auto;
            }
            .storeblueFontButton {
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

export default StoreProductModalCSS;
