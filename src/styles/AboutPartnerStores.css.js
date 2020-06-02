function AboutPartnerStoresCSS() {
    return ( 
        <style jsx="true">{`
            h2 {
                text-align: center;
                margin-top: -20px;
            }
            .subTitle {
                width: 60%;
                margin: auto;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686;
                letter-spacing: 1px;
                font-weight: 500;
                font-size:14px       
            }
            .productContainer {
                margin: auto;
                position: relative;
                width: 90%;
            }
            @media only screen and (max-width: 1475px) {
                .productContainer {
                    max-width: unset;
                }
            }
            @media only screen and (max-width: 550px) {
                .productContainer {
                    width: 80%;
                }
            }
            .grid-container {
                margin: auto;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
            }
            @media only screen and (max-width: 550px) {
                .grid-container {
                    width: 60vw;
                }
            }
            @media only screen and (max-width: 550px) {
                .productContainer {
                    width: 80%;
                }
            }
            .grid-container {
                margin: auto;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
            }
            @media only screen and (max-width: 550px) {
                .grid-container {
                    width: 60vw;
                }
            }
            .productSmallDisplay {
                display: flex;
                flex-direction: column;
                margin-bottom: 50px;
                text-align: center;
                font-size: 16px;
                height: 335px;
                min-width: 360px;
                max-width: 100%;
                width: 19%;
                border: 2px solid #f9bf1e;
                padding: 20px 20px 3px;
                background-color: #ffffff;
            }
            
            @media only screen and (max-width: 1500px) {
                .productSmallDisplay {
                    width: 24%;
                }
            }      
            @media only screen and (max-width: 1250px) {
                .productSmallDisplay {
                  width: 42%;
                  margin: 10px auto;
                }
            }
            @media only screen and (max-width: 1010px) {
                .productSmallDisplay {
                    width: 80vw;  
                }
            }
            @media only screen and (max-width: 850px) {
                .productSmallDisplay {
                    min-width: 300px;  
                }
            }
            .productSmallDisplay span {
                cursor: pointer;
            }
            .productSmallDisplay-img {
                flex:4;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .productSmallDisplay-img img{
                height: 267px;
                width: auto;
                max-width:100%;
                max-height:90%;
                object-fit: contain;
                overflow: hidden;
            }
            .productSmallDisplay-LongDesc {
                flex: 3;
                text-align: left;
                height: 98px;
                overflow-y: scroll;
                margin-top: 29px;
            }
            .productSmallDisplay-LongDesc span {
                font-family: 'Metropolis Extra Bold';
            }
            .productSmallDisplay-text {
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-bottom: 10px;
            }
            .productSmallDisplay-text p {
                margin-block-start: 0;
                margin-block-end: 0;
                text-align: left;
            }
            .productSmallDisplay-text p a {
                text-decoration: none;
                cursor: pointer;
                color: #333333;
            }
            .buyerDivider {
                height: 9px;
            }
            .buyerDivider img {
                width: 100%;
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
            .longDesc {
                
            }
            @media only screen and (max-width: 550px) {
                .longDesc {
                    text-align: center;
                }         
            }
            .marginTop {
                margin-top: 10px;
            }
            ::-webkit-scrollbar {
                width: 6px;
            } 
            ::-webkit-scrollbar {
                    width: 6px;
            } 
            ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            } 
            ::-webkit-scrollbar-thumb {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    background-color: #ffe58a; 
            }
        `}
        </style>
    )
}

export default AboutPartnerStoresCSS;
