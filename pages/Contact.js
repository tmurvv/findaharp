import React from 'react';

function Contact() {
    return (
        <>
            <div className="contact">
                <h2>Contact Page Under Construction</h2>
            </div>
            <style jsx="true">{`
                .contact {
                    background-image: url('/img/factoryFloor.jpg');
                    background-position: cover;
                    text-align:center;
                    padding: 15px;
                    min-height: 75vh;
                }
                h2 {
                    background-color: #bbbbbb;
                    color: white;
                    width: fit-content;
                    padding: 20px;
                    margin:auto;
                    margin-top: 30px;
                    border-raduis: 7px;
                }
            
            `}
            </style>
        </>
    )
}

export default Contact;
