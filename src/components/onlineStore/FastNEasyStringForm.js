import Router from 'next/router';

function FastNEasyStringForm() {
    return (
        <>
            <a 
                onClick={()=>Router.push('/stringform')} 
                style={{
                    color: '#6A75AA',
                    cursor: 'pointer', 
                    fontSize: '11px', 
                    fontFamily: 'Metropolis Extra Bold', 
                    fontStyle: 'italic', 
                    fontWeight: '600', 
                    textDecoration: 'underline',
                    position: 'absolute',
                    top: '15px',
                    left: '15px'
                }}
            ><img 
            src='./img/store/speedy_harp.png' 
            alt='speedy harpist pushing harp on dolly' 
            style={{height: '30px'}}
        /> Fast N Easy String Form</a>


            {/* <div 
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    opacity: .6
                }}  
            >
                
                <div>
                    <button 
                        className='fastNEasy-btn'
                        onClick={()=>Router.push('/stringform')}
                    >
                        <img 
                            src='./img/store/speedy_harp.png' 
                            alt='speedy harpist pushing harp on dolly' 
                            style={{height: '30px'}}
                        /> 
                        <div>
                            <div>&nbsp;&nbsp;Fast and Easy String Form</div>
                            <div>&nbsp;&nbsp;Click here</div>
                        </div>
                    </button>
                    <div style={{
                        fontSize: '12px', 
                        opacity: '.8', 
                        textAlign: 'center', 
                        marginTop: '3px', 
                        fontStyle: 'italic'
                        }}
                    ></div>
                    <div>w/optional "Remember My Harp"</div>
                </div>
                <a 
                    href='./rememberdetails' 
                    style={{
                        flex: 'none', 
                        fontStyle: 'italic', 
                        fontSize: '14px'
                    }}
                >What's this?</a>
            </div> */}
            <style jsx='true'>{`
                .fastNEasy-btn {
                    padding: 7px 7px;
                    color: #000;
                    background-color: transparent;
                    box-shadow: 2px 2px 3px lightgrey;
                    border: 1px solid lightgrey;
                    outline: none;
                    display: flex;
                    align-items: center;
                } 
                .fastNEasy-btn:focus, 
                .fastNEasy-btn:active {
                    outline: 1px solid grey;
                } 
                .fastNEasy-btn:active {
                    box-shadow: none;
                }
            `}
            </style>
        </>
    )
}

export default FastNEasyStringForm;
