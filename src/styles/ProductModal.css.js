function ProductModalCSS() {
    return (
        <style jsx="true">{`
            .detailContainer {
                opacity: 1;
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
                max-height: calc(100vh - 50px);
                max-width: 800px;
                overflow-y: auto;
                text-align: center;
                padding: 30px;
                color: #000000
            }
            .detailInfo {
                display: flex;
                align-items: flex-start;
                padding: 30px 20px 20px;
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
            }
            .detailButton {
                margin: 40px 0;
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
            .detailImg {
                flex: 4;
                height: 100%;
            }
            .detailImg img {
                height: 95%;
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
                bottom: 0;
                right: 20px;
                color: black;
                height: 50px;
            }
            .clearModal img {
                width: 35px;
            }
            .moreButton {
                color: #f9bf1e;
                cursor: pointer;
                outline: none;
                font-size: 14px;
            }
            .longDesc {
                max-height: 300px;
                text-align: left;
            }
            .divider {
                width: 90%;
                height: 7px;
                margin: auto;
            }
        `}
        </style>
    )
}

export default ProductModalCSS;
