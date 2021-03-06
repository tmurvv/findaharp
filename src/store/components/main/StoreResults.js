import React from 'react';
import ResultsCss from '../../../main/styles/Results.css';

function StoreResults({ resultInfo, resetResults, loginGuest, idprefix= 'SP' }) {
    return (
        <>
            <div id={`${idprefix}-loadingLogin`} style={{display: resultInfo.resultContainer, zIndex: 9000}}>
                <img id='loadingLoginImg' style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button 
                        id='loadingLoginOk'
                        type='button' 
                        className='submit-btn' 
                        onClick={()=>loginGuest()}
                        style={{display: resultInfo.resultOkButton}} 
                    >
                        OK
                    </button>
                    <button 
                        id='loadingLoginTryAgain' 
                        type='button' 
                        className='submit-btn submit-btn-tryAgain' 
                        onClick={resetResults}
                        style={{display: resultInfo.resultTryAgainButton, marginLeft: resultInfo.tryAgainMarginLeft}} 
                    >
                        Try Again
                    </button>
                </div>
            </div>
            <ResultsCss />
        </>
    )
}

export default StoreResults;
