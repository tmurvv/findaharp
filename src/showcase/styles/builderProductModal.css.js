function ProductModalCSS() {
    return (
        <style jsx="true">{`
            .builderdetailContainer {
                width: 80vw;
                background-color: #ffffff;
                border: 4px solid #6d81bf;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                position: fixed;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                z-index: 3000;
                max-height: calc(100vh - 100px);
                max-width: 800px;
                overflow-y: auto;
                text-align: center;
                padding: 30px;
                color: #000000
                opacity: 1;
            }
            .builderdetailInfo {
                display: flex;
                align-items: flex-start;
                padding: 15px 20px 20px;
            }
            @media only screen and (max-width: 550px) {
                .builderdetailContainer {
                    flex-direction: column;
                    padding: 15px 0;
                }
                .builderdetailInfo {
                    flex-direction: column
                }
            }
            .builderdetailButton {
                margin: 40px 0;
                // background-image: linear-gradient(340deg, #223156 50%, #6d81bf 58%, #6d81bf 74%, #223156 87%);
                background-image: linear-gradient(340deg, #9cacdd 50%, #b9c3e4 58%, #e2e7f9 74%, #9cacdd 87%);
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
            .builderdetailButton:active {
                box-shadow: none;
            }
            .builderdetailButton-cancel {
                background-color: #333333;
                margin-left: 30px;
                color: white;
                background-image: none;
            }
            .builderdetailImg {
                flex: 4;
                height: 100%;
            }
            .builderdetailImg img {
                height: 95%;
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .builderdetailText {
                flex: 6;
                padding: 0 0 0 60px;
                text-align: left;
            }
            @media only screen and (max-width: 550px) {
                .builderdetailText {
                    padding: 25px 0;
                }
            }         
            .builderdetailText span {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
            }
            .builderdetailText p {
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .marginTop {
                margin-top: 10px;
            }
            .clearModal {
                float: right;
                position: sticky;
                top: 5px;
                right: 1px;
                color: black;
                height: 28px;
            }
            .clearModal img {
                width: 25px;
                opacity: .4;
            }
            .moreButton {
                color: #6d81bf;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
            .longDesc {
                max-height: 212px;
                text-align: left;
                overflow-y: auto;
            }
            .longDesc a {
                color:#6d81bf;
            }
            .blueFontButton {
                background-color: 'white';
                outline: 'none';
                text-decoration: 'none'; 
                border: 'none'; 
                font-size: '14px';
            }
        `}
        </style>
    )
}

export default ProductModalCSS;
