import React from 'react';

function ContactCSS() {
    return (
        <style jsx="true">{`
            .contactContainer {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                padding: 30px;
                padding-top: 70px;
                height: fit-content;
                margin-top: 0;
            }
            .contact {
                width: 100%;
            }
            .contactItem {
                background-color: transparent;
                /*background-color: #ffffff;
                border: 2px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;*/
                padding: 20px;
                text-align: center;
                margin: auto;
                flex: 5;
                overflow-y: scroll;
            }
            .contactContainer h1 {
                font-size: 48px;
                margin-bottom: 50px;
                width: 100%;
                text-align: center;
            }
            .contactContainer p,
            .contactContainer blockquote {
                text-align: justify;
            }
            .contactContainer blockquote {
                font-size: 14px;
            }
            .contact h2 {
                margin-block-end:0;
                margin-block-start:0;
            }
            .mainTitle {
                text-align: center;
                margin: auto;
                letter-spacing: 1.5px;
                font-size: 24px
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
            .contactDivider {
                margin: 50px auto;
                height: 2px;
                width: 80%;
            }
            .contactDivider img {
                width: 100%;
            }
            .contactContainer a {
                color: #6A75AA;
                font-size: 16px;
                font-weight: 400;
            }
            .personContainer {
               flex: 5;
            }
            .personContainer h3 {
                font-family: 'Metropolis Extra Bold';
            }
            .imgContainer {
                height: 130px;
                width: 130px;
                border: 3px solid #f9bf1e;
                border-radius: 50%;
                overflow: hidden;
                margin: 20px auto;
                position: relative;
            }
            .imgContainer img {
                width: 130px;
            }
            .about {
                padding: 10px 50px 30px ;
            }
            .about h2 {
                margin-bottom: 40px;
            }
        `}
    </style>
    )
}

export default ContactCSS;
