import { isFunction } from 'formik';
import Router from 'next/router';

function FastNEasyStringForm({ setstringformstatus }) {
    return (
        <>
            <button 
                onClick={()=>isFunction(setstringformstatus)?setstringformstatus('stringform'):Router.push('/stringform')} 
                style={{
                    color: '#6A75AA', 
                    fontSize: '11px', 
                    fontFamily: 'Metropolis Extra Bold', 
                    fontStyle: 'italic', 
                    fontWeight: '600', 
                    textDecoration: 'underline',
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    padding: '0',
                    cursor: 'pointer',
                    outline: 'none',
                    overflow: 'hidden'
                }}
            >
                {/* <img 
                    src='./img/store/speedy_harp_blue.png' 
                    alt='speedy harpist pushing harp on dolly' 
                    style={{height: '30px', marginRight: '2px'}}
                />  */}
                <div style={{whiteSpace: 'nowrap'}}>Fast N Easy String Form</div>
            </button>
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
