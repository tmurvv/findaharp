function AboutPartnerStoresCSS() {
    return ( 
        <style jsx="true">{`
            h2 {
                text-align: center;
                margin-top: -20px;
            }
            .detailContainer {
                overflow-y: scroll;
                height: fit-content;
                width: 80vw;
                max-width: 800px;
                background-color: #ffffff;
                border-radius: 3px;
                display: flex;
                align-items: center;
                padding: 20px;
                margin: auto;
                margin-bottom: 50px;
                border: 4px solid #f9bf1e;
                box-shadow: 0 1rem 1rem rgba(249,191,30, .05);
                border-radius: 3px;
                overflow-y: auto;
            }
            @media only screen and (max-width: 550px) {
                .detailContainer {
                    flex-direction: column;
                }
            }
            .storeName {
                padding-bottom: 10px;
                font-size: 20px;
                font-weight: 600;
            }
            .detailButton {
                margin: 15px auto;
                background-color: #f9bf1e;
                padding: 5px 10px;
                font-size: 20px;
                border-radius: 3px;
            }
            .detailImg {}
            .detailImg img {
                height: 100%;
                max-height: 130px;
                margin: 0 auto;
                padding-top: 10px;
            }
            @media only screen and (max-width: 750px) {
                .detailImg img {
                    max-height: 120px;
                }
            }
            .detailText {
                padding: 5px 20px 20px;
                text-align: left;
            }
            @media only screen and (max-width: 750px) {
                .detailText {
                    padding: 20px 0;
                }
            }
            @media only screen and (max-width: 550px) {
                .detailText {
                    text-align: center;
                }
            }
            .detailText {
                text-align: center;
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
                transition: all .7s;
            }
            .longDesc {
                text-align: left;
            }
            @media only screen and (max-width: 550px) {
                .longDesc {
                    text-align: center;
                }         
            }
            .marginTop {
                margin-top: 10px;
            }
            .moreButton {
                color: purple;
                cursor: pointer;
                transition: all .3s;
                outline: none;
                width: fit-content;
                margin: auto;
                margin-bottom: 15px
            }
            .moreButton:hover {
                transform: scale(1.1);
            }
        `}
        </style>
    )
}

export default AboutPartnerStoresCSS;
