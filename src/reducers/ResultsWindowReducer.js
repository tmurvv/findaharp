export const resultsWindowReducer = (state, action) => {
    console.log('reducer', action.payload)
    switch (action.type) {
        case 'initial': 
            return {
                resultContainer: 'none',
                resultText: 'none',
                resultOkButton: 'none',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'loadingImage':
            return {
                resultContainer: 'block',
                resultText: 'none',
                resultOkButton: 'none',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'block'
            }
        case 'OK':
            return {
                resultContainer: 'block',
                resultText: 'block',
                text: action.payload,
                resultOkButton: 'block',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'tryAgain':
            return {
                resultContainer: 'block',
                resultText: 'block',
                text: action.payload,
                resultOkButton: 'none',
                resultTryAgainButton: 'block',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'okTryAgain':
            return {
                resultContainer: 'block',
                resultText: 'block',
                text: action.payload,
                resultOkButton: 'block',
                resultTryAgainButton: 'block',
                tryAgainMarginLeft: '30px',
                resultImg: 'none'
            }
        }
}