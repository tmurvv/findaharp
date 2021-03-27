// packages
import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';
import MakesModelsMenuCSS from '../../../styles/onlineStore/MakesModelsMenu.css';
import MakesModelsAbbr, { MENU_ABBR } from '../../../constants/constants';

export default function MakesmodelsMenu(props) {
    const [ dusty, setDusty ] = useState();
    const [ rees, setRees ] = useState();
    const [ stoney, setStoney ] = useState();
    const [ triplett, setTriplett ] = useState();
    const useOctaveMenu = ' label their strings by octaves. Please use the "Octaves" menu or our Fast N Easy string form. Continue to Fast N Easy String Form?';
    const handleClose = (evt) => {
        setDusty(false);
        setRees(false);
        setStoney(false);
        setTriplett(false);
        if (evt.target.value === 'Makes/Models') return;
        console.log('makesmodelsmenu', evt.target.getAttribute('name'))
        props.handleMakesmodelsChange(evt.target.getAttribute('name')); 
    };
    // get currency conversions
    async function getCurrency() {
        const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
        setCurrencyMultiplier(multiplier.data.USD_CAD);  
    }   
    return (
        <div className='relative'>
            <button 
                className="menuButton makesmodels" 
                name='makesmodels' 
                onClick={(e)=>{
                    setDusty(false);
                    setRees(false);
                    setStoney(false);
                    setTriplett(false);
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                By Make/Model
            </button>               
            <ul
                id="makesmodels-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Makes/Models'
                className='storePlainTextSelectLine2 makesmodels'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Makes/Models'
                >All Makes/Models</li>
                {/* <li 
                    onClick={()=>{if (confirm(`Pedal harps${useOctaveMenu}`)) Router.push('/stringform')}} 
                    key={uuid()} 
                    name='Pedal Harps'
                >Pedal Harps</li> */}

                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Delta'
                >Delta</li> 
                <li 
                    onClick={()=>{setRees(false);setDusty(true);setTriplett(false);setStoney(false)}} 
                    key={uuid()} 
                    name='Dusty Strings'
                >Dusty Strings
                    <ul
                        id="makesmodels-select"
                        onClose={(e)=>{setDusty(false);handleClose(e)}}
                        hidden={!dusty}
                        name='Makes/Models'
                        className='storePlainTextSelectLine2'
                        style={{backgroundColor: '#6A75AA', color: '#ffffff', marginLeft: '30px'}}
                    >
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='All Dusty Strings'
                        >All Dusty Strings</li>   
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='FH'
                        >FH Models</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Crescendo'
                        >Crescendo</li>    
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Ravenna'
                        >Ravenna</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Allegro'
                        >Allegro</li> 
                    </ul>
                </li>
                <li 
                    id='trans'
                    onClick={()=>{document.querySelector('#trans').style.maxHeight='1000px'; setRees(true);setDusty(false);setTriplett(false);setStoney(false)}} 
                    key={uuid()} 
                    className='trans'
                    name='Rees'
                >Rees
                    <ul
                        id="makesmodels-select"
                        onClick={()=>document.querySelector('#makesmodels-select').backgroundColor='blue'}
                        onClose={(e)=>{setRees(false);handleClose(e)}}
                        hidden={!rees}
                        name='Makes/Models'
                        className='storePlainTextSelectLine2'
                        style={{backgroundColor: '#6A75AA', color: '#ffffff', marginLeft: '30px'}}
                    >
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='All Rees'
                        >All Rees</li>   
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Aberdeen Meadows A to A'
                        >Aberdeen Meadows A to A</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Aberdeen Meadows C to C'
                        >Aberdeen Meadows C to C</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Glen Aulin'
                        >Glen Aulin</li>    
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Grand Harpsicle'
                        >Grand Harpsicle</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Logan Meadow'
                        >Logan Meadow</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Mirror Meadows'
                        >Mirror Meadows</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Tuolumne Meadow'
                        >Tuolumne Meadow</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Tasty 29'
                        >Tasty 29</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Mariposa A to C'
                        >Mariposa A to C</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Mariposa F to A'
                        >Mariposa F to A</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Shaylee Meadows'
                        >Shaylee Meadows</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setRees(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Special Edition Fullsicle'
                        >Special Edition Fullsicle</li> 
                    </ul>
                
                </li>
                <li 
                    onClick={()=>{setRees(false);setDusty(false);setTriplett(false);setStoney(true)}} 
                    key={uuid()} 
                    name='Stoney End'
                >Stoney End
                    <ul
                        id="makesmodels-select"
                        onClose={(e)=>{setStoney(false);handleClose(e)}}
                        hidden={!stoney}
                        name='Makes/Models'
                        className='storePlainTextSelectLine2'
                        style={{backgroundColor: '#6A75AA', color: '#ffffff', marginLeft: '30px'}}
                    >
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setStoney(false); handleClose(e);}} 
                            key={uuid()} 
                            name='All Stoney End'
                        >All Stoney End</li>   
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setStoney(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Anne'
                        >Anne</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setStoney(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Braunwen'
                        >Braunwen</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setStoney(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Briar Rose'
                        >Briar Rose</li>    
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setStoney(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Even Song'
                        >Even Song</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Lorraine'
                        >Lorraine</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Marion'
                        >Marion</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Sara'
                        >Sara</li> 
                         
                    </ul>
                
                </li>    
                <li 
                    onClick={()=>{setRees(false);setDusty(false);setTriplett(true);setStoney(false)}} 
                    key={uuid()} 
                    name='Triplett'
                >Triplett
                    <ul
                        id="makesmodels-select"
                        onClose={(e)=>{setTriplett(false);handleClose(e)}}
                        hidden={!triplett}
                        name='Makes/Models'
                        className='storePlainTextSelectLine2'
                        style={{backgroundColor: '#6A75AA', color: '#ffffff', marginLeft: '30px'}}
                    >
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='All Triplett'
                        >All Triplett</li>   
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='30 Wire'
                        >30 Wire</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='33 Wire Excelle II'
                        >33 Wire Excelle II</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='35 Wire Luna'
                        >35 Wire Luna</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Avalon'
                        >Avalon</li>    
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setTriplett(false); handleClose(e);}} 
                            key={uuid()} 
                            name='McCall 25'
                        >McCall 25</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Axline'
                        >Axline</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Nino 30'
                        >Nino 30</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Celtic'
                        >Celtic</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Nova'
                        >Nova</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Briggs 34'
                        >Briggs 34</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Catalina'
                        >Catalina</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Eclipse'
                        >Eclipse</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Premiere 38'
                        >Premiere 38</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Nylon 30'
                        >Nylon 30</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Shanti 28'
                        >Shanti 28</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Sierra 30'
                        >Sierra 30</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Sierra 34'
                        >Sierra 34</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Sierra 36'
                        >Sierra 36</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Signature'
                        >Signature</li> 
                        <li 
                            onClick={(e)=>{e.stopPropagation(); setDusty(false); handleClose(e);}} 
                            key={uuid()} 
                            name='Christina Therapy Harp'
                        >Christina Therapy Harp</li> 
                         
                    </ul>
                </li>       
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bronze Wire Monofilament'
                >Bronze Wire Monofilament</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Nylon Wire Monofilament'
                >Nylon Wire Monofilament</li>
            </ul>
            <MakesModelsMenuCSS />     
        </div>
    );
}
