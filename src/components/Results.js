import React from 'react';
import ResultsCss from '../styles/Results.css';

function Results({ resultInfo, resetResults, loginGuest  }) {
    return (
        <>
            <div id="loadingLogin" style={{display: resultInfo.resultContainer}}>
                <img id='loadingLoginImg' style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button 
                        id='loadingLoginOk'
                        type='button' 
                        className='submit-btn' 
                        onClick={loginGuest}
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

export default Results;