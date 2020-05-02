import React from 'react';

function ContactCSS() {
    return (
        <style jsx="true">{`
            .contactContainer {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                padding: 30px;
                height: fit-content;
                margin-top: 0;

            }
            .contact {
                width: 100%;
                
            }
            .contactItem {
                margin: 50px;
                background-color: #ffffff;
                border: 2px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
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
            .contactContainer p {
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
                margin: 100px auto;
                height: 2px;
                width: 80%;
            }
            .contactDivider img {
                width: 100%;
            }
            .contactContainer a {
                color: #f9bf1e;
                text-decoration: underline;
            }
            .about {
                padding: 10px 50px 30px ;
            }
        `}
    </style>
    )
}

export default ContactCSS;
