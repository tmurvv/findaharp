import React, { useReducer } from 'react';
import ResultsWindow from '../../../main/components/main/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../../../main/constants/constants';
import { resultsWindowReducer } from '../../../main/reducers/ResultsWindowReducer';

export default function FinishMenu(props) {
    const [ resultInfo, dispatchResultInfo ] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    const handleClose = (evt) => {
        if (evt.target.value === 'All Finishes') return;
        props.handleFinishChange(evt.target.getAttribute('name')); 
    };

    function handleChoice(e) {
        console.log(e.target)
        if (e.target.getAttribute('name') === "Vavra Harp") dispatchResultInfo({type: 'OK', payload: `From Vavra Harp: "We have found that crafting a harp requires the precise melding of calculation, skill, and experience. The overall 'voice' of the instrument results from the consideration of wood, strings, finish, and decoration. ​​​We can do whatever it takes to deliver what you want."`}); 
        if (e.target.getAttribute('name') === "Blevins Harps") dispatchResultInfo({type: 'OK', payload: `There are many finishes to choose from for most harp models. Please contact ${e.target.getAttribute('name')?e.target.getAttribute('name'):'builder'} to discuss available finishes.`}); 
    }
    
    function resetResultsWindow() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResultsWindow();
    }
    return (
        <div className='relative'>
            <ResultsWindow 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResultsWindow={resetResultsWindow} 
            />
            <button 
                className="menuButton" 
                name='finish' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >FINISH</button>
            <ul
                id="finish-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Finish Menu'
                className='plainTextSelectLine2 builderplainTextSelectLine2'
            >               
                <li 
                    // onClick={handleClose} 
                    onClick={e=>handleChoice(e)} 
                    // key={uuid()} 
                    name='Vavra Harp'
                >Vavra Harp Finishes</li>              
                <li 
                    // onClick={handleClose} 
                    onClick={e=>handleChoice(e)} 
                    // key={uuid()} 
                    name='Blevins Harps'
                >Blevins Harps Finishes</li>              
            </ul>
        </div>
    );
}
