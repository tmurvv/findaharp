import React, {useState} from 'react';
import uuid from 'react-uuid';

function ContactForm(props) {
    const {product} = props;
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        contactEmail: '',
        contactMaker: '',
        contactModel: ''
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstName': 
                setUser({...user, firstName: evt.target.value});
                break
            case 'lastName': 
                setUser({...user, lastName: evt.target.value});
                break
            case 'contactEmail': 
                setUser({...user, contactEmail: evt.target.value});
                break
            case 'contactMaker': 
                setUser({...user, contactMaker: evt.target.value});
                break
            case 'contactModel': 
                setUser({...user, contactModel: evt.target.value});
                break
                        
            default :
        }
    }
   return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}>
                <img src= {product.productImageUrl} alt={product.productTitle}/>
                <p><span style={{fontWeight: 600}}>
                    {product.productTitle}
                </span><br></br><span>{product.sellerName}</span></p>
            </div>
            <div onClick={() => props.handleClose()} className='clearModal'>
                <img onClick={() => props.handleClose()} src='/img/clear_search.png' alt='clear filters'/>
            </div>
            <form className='detailText'>             
                <div height='250px' display='flex' flexDirection='column' justifyContent='space-between'>
                    <div className='heading'>
                        <p>Your contact information will not be shared. Communication with prospective buyers can take place through findaharp.com at no extra charge.<br></br></p>
                    </div>
                                                            
                    <div className={`flex marginTopLarge`}>
                        <div className='inputGroup'>
                            <label name='firstName'>First Name: </label>
                            <input
                                id={uuid()}
                                value={user.firstName}
                                onChange={handleChange}
                                name='firstName'
                            />
                        </div>
                        <div className='inputGroup'>
                            <label name='lastName'>Last Name: </label>
                            <input
                                id={uuid()}id="outlined-helperText"
                                label="Last Name"
                                value={user.lastName}
                                onChange={handleChange}
                                name ='lastName'
                            />
                        </div>
                    </div>
                    <div className='inputGroup'>
                        <label name='email'>Email: </label>
                        <input
                            id={uuid()}
                            name='contactEmail'
                            value={user.contactEmail}
                            onChange={handleChange}
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label name='contactMaker'>Maker: </label>
                        <input
                            id={uuid()}
                            name='contactMaker'
                            value={product.productMaker}
                            onChange={handleChange}
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label name='contactModel'>Model: </label>
                        <input
                            id={uuid()}
                            name='contactModel'
                            value={product.productModel}
                            onChange={handleChange}
                        />
                    </div>         
                    <div className='inputGroup'>
                        <label name='contactComments'>Comments: </label>
                        <textarea
                            id={uuid()}
                            name='contactComments'
                            value={user.comments}
                            onChange={handleChange}
                            rows='6'
                            cols = '50'
                        />
                    </div>         
                    <div>
                        <button
                            className='detailButton'
                            type='submit'  
                        >Submit
                        </button>
                    </div>         
                </div>
            </form>
        </div>
        <style jsx={true}>{`
            .detailContainer {
                width: 100%;
                height: fit-content;
                background-color: #ffffff;
                border: 4px solid #f9bf1e;
                box-shadow: 0 2rem 4rem rgba(249,191,30, .15);
                border-radius: 3px;
                display: flex;
                align-items: center;
                padding: 20px;
                z-index: 3000;
                max-height: calc(100vh - 210px);
                max-width: 85vw;
                overflow-y: auto;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            @media only screen and (max-width: 500px) {
                .detailContainer {
                    flex-direction: column;
                }
            } 
            .detailImg {
                padding-right: 20px;
            }
            .detailImg img {
                height: 100%;
                max-height: 300px;
                margin: 0 auto;
            }
            span {
                text-align:center;
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
            .marginTopLarge {
                margin-top: 40px;
            }
            .clearModal {
                position: absolute;
                top: 0;
                right: 0;
                color: black;
                height: 35px;
            }
            .inputGroup {
                margin-top: 15px;
                width: 80%;
                display: flex;
            }
            .inputGroup label {
                flex:2;
                text-align: right;
                margin-right: 7px;
            }
            .inputGroup input {
                flex:8;
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
        `}
        </style>
        </>
    )
}

export default ContactForm;
