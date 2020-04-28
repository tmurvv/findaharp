function ProductModalCSS() {
    return (
        <style jsx="true">{`
            .detailContainer {
                width: 80vw;
                background-color: #ffffff;
                position: fixed;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                top: 50vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                padding: 20px;
                z-index: 3000;
                max-height: calc(100vh - 210px);
                max-width: 600px;
                overflow-y: auto;
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
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
            }
            .detailImg {
                height: 100%;
            }
            .detailImg img {
                height: 100%;
                max-height: 300px;
                margin: 0 auto;
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
            .clearModal {
                position: absolute;
                top: 0;
                right: 0;
                color: black;
                height: 35px;
            }
            .clearModal img {
                width: 35px;
            }
            .moreButton {
                color: purple;
                cursor: pointer;
                transition: all .3s;
                outline: none;
                font-size: 18px;
                width: fit-content;
                margin: auto;
            }
            .moreButton:hover {
                transform: scale(1.1);
            }
        `}
        </style>
    )
}

export default ProductModalCSS;
