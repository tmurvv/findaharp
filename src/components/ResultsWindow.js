import React from 'react';
import ResultsWindowCss from '../styles/ResultsWindow.css';

function ResultsWindow({ resultInfo, resetResultsWindow, loginGuest, zipMsg }) {
    return (
        <>
            <div id="loadingLogin" style={{display: resultInfo.resultContainer, zIndex: 9000}}>
                <img id='loadingLoginImg' style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p  id="loadingLoginText">{resultInfo.text}</p>
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
                        onClick={resetResultsWindow}
                        style={{display: resultInfo.resultTryAgainButton, marginLeft: resultInfo.tryAgainMarginLeft}} 
                    >
                        Try Again
                    </button>
                </div>
            </div>
            <ResultsWindowCss />
        </>
    )
}

export default ResultsWindow;
