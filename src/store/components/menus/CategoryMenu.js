// packages
import React, { useEffect, useState } from 'react';
import SubCatMenu from './SubCatMenu';
import { CATEGORIES } from '../../constants/Categories';
import { getMenuAbbr } from '../../utils/storeHelpers';

function CategoryMenu(props) {
    const [searchResults, setSearchResults] = useState();
    // const [ subMenuOpen, setSubMenuOpen] = useState();
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));
    const [ builders ] = useState(['Dusty Strings', 'Rees', 'Stoney End', 'Triplett', 'Salvi Delta']);
    const [ winWidth, setWinWidth ] = useState(4000);
    
    function handleCatChange(e) {
        const filtered = [];
        const catId = e.target.id.toString();
        props.setMenuOpen(['categories']);
        console.log(e.target.id);
        document.querySelector('#categories').nextElementSibling.innerText = `${e.target.id} Selected`;
    }
    
    function handleClick() {
        if(props.ribboncatBreadCrumb==='ribbon') {
            if (props.ribbonmenuOpen) {
                props.ribbonsetMenuOpen(false);
                props.ribbonsetSubMenuOpen(false);
            } else {
                props.ribbonsetMenuOpen(true);
                if (!props.ribbonsubMenuOpen) props.ribbonsetSubMenuOpen('');
            }
        } else {
            if (props.menuOpen) {
                props.setMenuOpen(false);
                props.setSubMenuOpen(false);
            } else {
                props.setMenuOpen(true);
                props.setCatBreadCrumb('All Categories');
                props.setSearchResultsText('entry')
                if ((!props.subMenuOpen)&&winWidth>900) props.setSubMenuOpen('Featured Items')
            }
        }
    }
    useEffect(()=>{
        // console.log('props cat menu', props)
        setWinWidth(window.innerWidth);
        // window&&window.innerWidth<=750?props.setSubMenuOpen(false):'';
    },[]);
    if ((!props.ribboncatBreadCrumb)&&winWidth>900) return (
        <>              
            <div className='CatMenuCont' style={props.menuOpen&&props.subMenuOpen?{width: '450px', minHeight: '528px', backgroundColor: '#ffd663'}:{width: `${winWidth<750?"100%":"126px"}`, minHeight: '50px', backgroundColor: '#fff'}}>
                <div className='MainCat' style={props.menuOpen?{backgroundColor: '#ffd663',  padding: '0', borderColor: 'transparent'}:{backgroundColor: '#fff'}}>
                    <ul id='category' style={{width: `${props.menuOpen?'210px':'160px'}`}}>
                        <li value="categories" style={props.menuOpen?{backgroundColor: '#ffd663'}:{backgroundColor: '#fff'}} onClick={(e)=>{e.stopPropagation();handleClick();}} id="Categories" className='CatLine'>
                            {getMenuAbbr(props.catBreadCrumb, props.catBreadCrumb)}
                            {props.menuOpen
                            ?<img className='catChevron' src='img/store/down-chevron.png' alt='down arrow' />                           
                            :<img className='catChevron' src='img/store/right-chevron.png' alt='right arrow' />
                            }
                        </li>
                                          
                    {props.menuOpen
                    ?
                    mainCategories.map(cat=>            
                            <li 
                                key={cat}
                                className='CatLine hovershow'
                                id={cat}
                                value={cat}
                                onMouseEnter={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='200px'; props.setSubMenuOpen(cat);}} 
                                onMouseLeave={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='0';}} 
                                onClick={(e)=>{e.stopPropagation();e.preventDefault();props.setSubMenuOpen(cat);}}>  
                                <div>{cat}</div>
                                <img 
                                    className='catChevron hovershow' 
                                    src='img/store/right-chevron.png' 
                                    // onMouseEnter={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(2)'; props.setSubMenuOpen(cat);}} 
                                    // onMouseLeave={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(1)';}} 
                                    alt='right arrow'
                                />
                            </li>
                        )
                        
                    : ''                 
                    }
                    </ul>
                </div>
                <div className='SubCat' style={props.menuOpen&&props.subMenuOpen?{display: 'block'}:{display: 'none'}}>                    
                    {props.subMenuOpen&&
                        <SubCatMenu 
                            menuName={props.subMenuOpen} 
                            handleCatChange={props.handleCatChange}
                            setDetailProduct2={props.setDetailProduct2}
                            menuOpen={props.menuOpen}
                            winWidth={winWidth}
                        />
                    }
                    {/* <div style={props.menuOpen?{position: 'absolute', right: '5px', top: '5px', height: '20px'}:{display:'none'}} onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'> */}
                    <div style={props.menuOpen?{position: 'absolute', right: '5px', top: '5px', height: '20px'}:{display:'none'}} onClick={(e) => {e.stopPropagation();handleClick(e, props.product, false);}} className='storeclearModal'>
                        <img style={{height: '100%', opacity: '.6'}} src='img/clear_search.png' alt='clear filters'/>
                    </div>
                </div>
            </div>
           
            <style>{`
                * {
                    box-sizing: border-box;
                }
                .CatMenuCont {
                    display: flex;
                    justify-content: flex-start;
                    z-index: 9995;
                    position: relative;
                    -webkit-appearance: none;
                }
                .CatMenuCont ul {
                    list-style: none;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    padding-inline-start: 0;
                    text-align: left;
                    line-height: 1.5;
                    margin-left: 0 !important;
                }
                .MainCat {
                    flex: 4;
                    background-color: #fff;
                    border: 1px solid #ffe58a;
                    border-right: none;
                    
                }
                .CatLine {
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0px 10px 15px;
                    white-space: nowrap;
                    background-color: #ffd663;
                    height: 48px;
                    border-right: 1px solid gold;
                }
                @media only screen and (max-width: 750px) {
                    .catLine {
                        width: unset;
                    }
                }
                .MainCat1:hover {
                    background-color: #f9bf1e;
                }
                .SubCat {
                    flex: 6;
                    background-color: #fff;
                    color: #f9bf1e;
                    font-weight: 600;
                    padding-top: 20px;
                    padding-right: 0px;
                    position: relative;
                    white-space: nowrap;
                    width: fit-content;
                    max-width: 610px;
                }
                .MainCat1:hover + .Sub1 {
                    display: block
                }
                .catChevron {
                    height: 12px;
                    margin-right: 5px;
                    margin-left: 5px;
                }
                .CatLine>.hovershow {
                    max-height: 0;
                }
                .CatLine:hover {
                    background-color: #f9bf1e;
                }
            `}</style>
        </>
    )
    if ((!props.ribboncatBreadCrumb)&&winWidth<=900) return (
        <> 
            <div className='CatMenuCont' style={props.menuOpen?{width: '100%', backgroundColor: '#ffd663'}:{width: "100%", minHeight: '50px', backgroundColor: '#fff'}}>
             
                <div className='MainCat' style={!props.subMenuOpen?{backgroundColor: '#ffd663',  width: '100%', padding: '0', borderColor: 'transparent'}:{display: 'none'}}>
                    <ul id='category'>
                        <li value="categories" style={props.menuOpen?{backgroundColor: '#ffd663'}:{backgroundColor: '#fff'}} onClick={(e)=>{e.stopPropagation();handleClick();}} id="Categories" className='CatLine'>
                            {props.catBreadCrumb}
                            {props.menuOpen
                            ?<img className='catChevron' src='img/store/down-chevron.png' alt='down arrow' />                           
                            :<img className='catChevron' src='img/store/right-chevron.png' alt='right arrow' />
                            }
                        </li>                   
                    {props.menuOpen
                    ?mainCategories.map(cat=>            
                            <li 
                                key={cat}
                                className='CatLine hovershow'
                                id={cat}
                                value={cat}
                                onClick={e=>{
                                    e.stopPropagation();
                                    props.setSubMenuOpen(cat);
                                }}
                            >  
                                {cat}
                                <img 
                                    className='catChevron hovershow thisClass' 
                                    src='img/store/right-chevron.png' 
                                    alt='right arrow'
                                />
                            </li>
                        )
                    : ''                 
                    }
                    </ul>
                </div>
                <div className='SubCat' style={props.subMenuOpen?{position: 'relative', display: 'block'}:{display: 'none'}}>                    
                    {props.subMenuOpen&&
                        <SubCatMenu 
                            menuName={props.subMenuOpen} 
                            handleCatChange={props.handleCatChange}
                            setDetailProduct2={props.setDetailProduct2}
                            menuOpen={props.menuOpen}
                            winWidth={winWidth}
                        />
                    }
                    {/* <div style={props.menuOpen?{position: 'absolute', right: '5px', top: '5px', height: '20px'}:{display:'none'}} onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'> */}
                    <div style={props.menuOpen?{position: 'absolute', top: '15px', left: '5px', height: '20px'}:{display:'none'}} onClick={(e) => {e.stopPropagation();handleClick(e, props.product, false)}} className='storeclearModal'>
                        <img style={{height: '100%', opacity: '.6'}} src='img/store/left-chevron.png' alt='left arrow back to main categories'/>
                    </div>
                </div>
            </div>
           
            <style>{`
                * {
                    box-sizing: border-box;
                }
                .CatMenuCont {
                    display: flex;
                    justify-content: flex-start;
                    z-index: 9995;
                    position: relative;
                    -webkit-appearance: none;
                    border: 1px solid #ffe58a;
                }
                .CatMenuCont ul {
                    list-style: none;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    padding-inline-start: 0;
                    text-align: left;
                    line-height: 1.5;
                    margin-left: 0 !important;
                }
                .MainCat {
                    flex: 4;
                    background-color: #fff;
                    border-right: none;
                }
                .CatLine {
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0px 10px 15px;
                    white-space: nowrap;
                    background-color: #ffd663;
                    height: 48px;
                    border-right: 1px solid gold;
                }
                .MainCat1:hover {
                    background-color: #f9bf1e;
                }
                .SubCat {
                    flex: 6;
                    background-color: #fff;
                    color: #f9bf1e;
                    font-weight: 600;
                    padding-top: 20px;
                    padding-right: 0px;
                    position: relative;
                    max-width: 610px;
                }
                .MainCat1:hover + .Sub1 {
                    display: block
                }
                .catChevron {
                    height: 12px;
                    margin-right: 5px;
                    margin-left: 5px;
                }
                .CatLine>.hovershow {
                    // max-height: 0;
                }
                .CatLine:hover {
                    background-color: #f9bf1e;
                }
            `}</style>
        </>
    )
    if (props.ribboncatBreadCrumb&&props.ribboncatBreadCrumb==='ribbon') return (
        <>              
            {/* <div className='' style={{position: 'absolute', width: '75px', zIndex: '950', right: '22%'}}> */}
            <div className='' style={{position: 'relative', width: '75px', zIndex: '950'}}>
                <div className='' style={props.ribbonmenuOpen?{backgroundColor: 'transparent',  padding: '0', minWidth: '165px', borderColor: 'transparent',cursor: 'pointer'}:{cursor: 'pointer', backgroundColor: 'transparent'}}>
                    <ul style={{marginBlock: '0', padding: '0'}}>
                        <li style={{backgroundColor: 'transparent', padding: '0', height: '30px', fontSize: '14px', transform: 'translateY(4px)'}} onClick={(e)=>{e.stopPropagation();handleClick();}} id="Categories" className='CatLine'>
                            <div>Makes/Models {props.ribbonmenuOpen}</div>
                            {props.ribbonmenuOpen
                            ?<img style={{position: 'unset', height: '10px', width: '10px', backgroundColor: 'transparent'}} className='catChevron' src='img/store/down-chevron.png' alt='down arrow' />                           
                            :<img style={{position: 'unset', height: '10px', width: '10px', backgroundColor: 'transparent'}} className='catChevron' src='img/store/right-chevron.png' alt='right arrow' />
                            }
                        </li>                   
                        
                        {props.ribbonmenuOpen?builders.map(builder=>
                            <>
                            <li 
                                key={builder}
                                className='CatLine hovershow'
                                id={builder}
                                onMouseEnter={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='200px'; props.ribbonsetSubMenuOpen(builder);}} 
                                onMouseLeave={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='0';}} 
                                // onClick={()=>alert()}>  
                                onClick={(e)=>{e.stopPropagation();props.ribbonsetSubMenuOpen(builder);}}
                            >  
                                <div>{builder}</div>
                                <img 
                                    className='catChevron hovershow' 
                                    src='img/store/right-chevron.png' 
                                    // onMouseEnter={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(2)'; props.setSubMenuOpen(cat);}} 
                                    // onMouseLeave={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(1)';}} 
                                    alt='right arrow'
                                    style={{position: 'unset', height: '10px', width: '10px', backgroundColor: 'transparent'}}
                                />
                            </li>
                            </>
                        ):''
                        }
                    </ul>
                </div>
                {/* <div className='SubCat' style={props.ribbonmenuOpen&&props.ribbonsubMenuOpen?{display: 'block'}:{display: 'none'}}>                     */}
                {props.ribbonsubMenuOpen&&<div className='SubCat' style={{boxShadow: '3px 3px 7px', padding: '0', position: 'absolute', left: '50px', top: '70px', border: '1px solid #f9bf1e'}}>                    
                    <ul style={{ listStyle: 'none', padding: '15px', marginBlock: '0'}}><img onClick={()=>{props.ribbonsetMenuOpen(false); props.ribbonsetSubMenuOpen(false);}} style={{transform: 'translate(50px, -5px)', height: '10px', width: '10px', opacity: '.6'}} src='img/clear_search.png' alt='clear filters'/>
                        {CATEGORIES["Strings by Harp Builder"][props.ribbonsubMenuOpen].map(model=>
                            <li style={{cursor: 'pointer'}} onClick={()=>{props.ribbonsetMenuOpen(false); props.ribbonsetSubMenuOpen(false);props.handleCatChange('Strings by Harp Builder', props.ribbonsubMenuOpen, model);}}>
                                {model}
                            </li>)
                        }
                    </ul>
                    <div style={props.ribbonsubMenuOpen?{position: 'absolute', right: '5px', top: '5px', height: '20px'}:{display:'none'}} onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'>
                        <img style={{height: '100%', opacity: '.6'}} src='img/clear_search.png' alt='clear filters'/>
                    </div>
                </div>
                }
            </div>
           
            <style>{`
                * {
                    box-sizing: border-box;
                }
                .CatMenuCont {
                    display: flex;
                    justify-content: flex-start;
                    z-index: 9995;
                    position: relative;
                    -webkit-appearance: none;
                    background-color: transparent;
                    border: 1px solid #ffe58a;
                }
                .CatMenuCont ul {
                    list-style: none;
                    margin-block-start: 0;
                    margin-block-end: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                    padding-inline-start: 0;
                    text-align: left;
                    line-height: 1.5;
                    margin-left: 0 !important;
                }
                .MainCat {
                    flex: 4;
                    background-color: #fff;
                    border-right: none;
                }
                .CatLine {
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0px 10px 15px;
                    white-space: nowrap;
                    background-color: #ffd663;
                    height: 48px;
                    border-right: 1px solid gold;
                }
                .MainCat1:hover {
                    background-color: #f9bf1e;
                }
                .SubCat {
                    flex: 6;
                    background-color: #fff;
                    color: #f9bf1e;
                    font-weight: 600;
                    padding-top: 20px;
                    padding-right: 0px;
                    position: relative;
                    white-space: nowrap;
                    width: fit-content;
                    max-width: 610px;
                }
                .MainCat1:hover + .Sub1 {
                    display: block
                }
                .catChevron {
                    height: 12px;
                    margin-right: 5px;
                    margin-left: 5px;
                }
                .CatLine>.hovershow {
                    maxHeight: 0;
                }
                .CatLine:hover {
                    background-color: #f9bf1e;
                }
            `}</style>
        </>
    )
}

export default CategoryMenu;

 