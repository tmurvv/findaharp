function StorePartnerInfoCSS() {
    return (
        <style jsx="true">{`
            .detailContainer {
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
                max-width: 800px;
                overflow-y: auto;
                text-align: center;
                padding: 30px;
                color: #000000
                opacity: 1;
            }
            h3 {
                
                margin: auto;
                margin-bottom: -10px;
                
            }
            
            .detailInfo {
                display: flex;
                align-items: flex-start;
                padding: 30px 20px 20px;
            }
            @media only screen and (max-width: 550px) {
                .detailContainer {
                    flex-direction: column;
                }
                .detailInfo {
                    flex-direction: column
                }
            }
            .detailButton {
                margin: 40px 0;
                background-image: linear-gradient(340deg, #f9bf1e 50%, #ffe178 58%, #ffe58a 74%, #f9bf1e 87%);
                // padding: 5px 10px;
                font-size: 16px;
                border-radius: 3px;
                outline: none;
                border-style: none;
                border-color: none;
                box-shadow: 1.5px 1.5px 1.5px 0px #555555;
                /*-webkit-box-shadow: 2px 2px 2px 0px #555555;
                box-shadow: 2px 2px 2px 0px #555555;*/
            }
            @media only screen and (max-width: 550px) {
                .detailButton {
                    display: flex;
                }
            }
            .detailButton a {
                vertical-align: 2px;
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
            .detailImg {
                flex: 4;
                height: 100%;
                margin-top: 43px;
                
            }
            @media only screen and (max-width: 550px) {
                .detailImg {
                    margin-top: 0px;
                }
            }
            .detailImg img {
                width: 95%;
                max-width:100%;
                max-height:100%;
                object-fit: cover;
                overflow: hidden;
            }
            .detailText {
                flex: 6;
                padding: 0 0 0 60px;
                text-align: left;
            } 
            @media only screen and (max-width: 550px) {
                .detailText {
                    padding: 0px;
                }
            }      
            .detailText span {
                font-family: 'Metropolis Extra Bold';
                font-weight: 800;
            }
            .detailText p {
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .marginTop {
                margin-top: 10px;
            }
            .clearModal {
                position: absolute;
                top: 20px;
                right: 10px;
                color: black;
                height: 28px;
            }
            .clearModal img {
                width: 28px;
                opacity: .4;
            }
            .moreButton {
                color: #f9bf1e;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
            .longDesc {
                max-height: 212px;
                text-align: left;
                overflow-y: auto;
            }
            .blueFontButton {
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

export default StorePartnerInfoCSS;
