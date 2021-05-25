// packages
import React, { useEffect, useState } from 'react';

import SubSubCatMenu from './SubSubCatMenu';
import { CATEGORIES } from '../../constants/Categories';
function SubCatMenu(props) {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen] = useState(false);
    const [ subMenuName, setSubMenuName] = useState('Gut');
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));
    const [ winWidth, setWinWidth ] = useState(4000);
    const categoryCopy = {...JSON.parse(JSON.stringify(CATEGORIES))}

    // function handleCatChange(e) {
    //     const filtered = [];
    //     const catId = e.target.id.toString();
    //     setMenuOpen(['categories']);
    //     console.log(e.target.id);
    //     document.querySelector('#categories').nextElementSibling.innerText = `${e.target.id} Selected`;

    //     console.log('filtered', filtered);
    //     // console.log(props.filteredProducts[0]);
    //     // const storedItems = props.filteredProducts.filter(prod=>prod.subcategory===catId);
    //     // console.log(storedItems.length)
    //     // console.log(storedItems)
    //     // setSearchResults(storedItems);
    // }
    
    useEffect(()=>setWinWidth(window.innerWidth),[]);

    if (props.menuOpen&&winWidth>750) {
        return (
            <>       
                <div className='HeadingChoice'> wind: {winWidth}
                    {props.menuName}
                    {props.menuName==='Strings by Harp Builder'
                        ?<div style={{fontSize: '14px', fontStyle: 'italic', marginTop: '5px', color: '#333'}}>Builder not found? Please use "Strings by Type" menu</div>
                        :''
                    }
                    {props.menuName==='Music'
                        ?<div onClick={()=>alert('Link coming soon. Please find this feature on the store main page under the "word search" area. Search by difficulty level, ensemble type, genre, etc.')}style={{fontSize: '14px', cursor: 'pointer', fontStyle: 'italic', marginTop: '5px', color: '#333', textDecoration:'underline'}}>Advanced Music Search</div>
                        :''
                    }
                </div>
                <div className='SubCont' style={{padding: '20px'}}>
                    <ul style={winWidth>750?{columns: '2', breakAfter: 'avoid-column', breakInside: 'avoid-column'}:{}}>
                        {Array.isArray(categoryCopy[props.menuName])
                        ?<SubSubCatMenu 
                            // searchCategory={props.searchCategory}
                            // setSearchCategory={props.setSearchCategory}
                            // searchSubCategory={props.searchSubCategory}
                            // setSearchSubCategory={props.setSearchSubCategory}
                            // searchItem={props.searchItem}
                            // setSearchItem={props.setSearchItem}
                            menuName={props.menuName} 
                            subMenuName={false} 
                            handleCatChange={props.handleCatChange}
                            setDetailProduct2={props.setDetailProduct2}
                        />
                        :Object.keys(categoryCopy[props.menuName]).map(item=>
                            <li key={item} className='SubCatLevel1'>
                                <div>{item}</div>
                                <SubSubCatMenu 
                                    // searchCategory={props.searchCategory}
                                    // setSearchCategory={props.setSearchCategory}
                                    // searchSubCategory={props.searchSubCategory}
                                    // setSearchSubCategory={props.setSearchSubCategory}
                                    // searchItem={props.searchItem}
                                    // setSearchItem={props.setSearchItem}
                                    menuName={props.menuName} 
                                    subMenuName={item}
                                    handleCatChange={props.handleCatChange} 
                                    setDetailProduct2={props.setDetailProduct2}
                                /> 
                            </li>)
                        }
                    </ul> 
                </div> 
                {props.menuName==="Featured Items"
                    ?<div style={{display: 'flex', justifyContent: 'space-evenly', transform: 'translateY(-270px)'}}>
                        <img onClick={()=>props.setDetailProduct2({
                            id: "MSST-MWOV",
                            store: 'findaharp',
                            category: 'accessories',
                            subcategories: ['Featured', 'Music stand'],
                            title: "EMS Georgian Wooden Music Stand", 
                            price: 135.00, 
                            image: "https://findaharp.com/img/store/findaharp/accessories/woodenStand.jpg", 
                            descriptiontext: "Costs $240USD new. Solid ash, stained rosewood/mahogany. Excellent condition.",
                            newused: 'used'
                        })} className='featuredimg' src='img/store/findaharp/accessories/woodenStand.jpg' alt='Wooden Music Stand' />
                        <img onClick={()=>props.setDetailProduct2({
                                id: "QUCV-EHGY",
                                store: 'strummedstrings',
                                artist_first: '',
                                artist_last: '',
                                category: 'accessories',
                                subcategories: ['Cover', 'Featured'],
                                title: "34 string lever harp case", 
                                price: 250.00,
                                descriptiontext: "Quilted case with carrying strap and large Pocket (fits multiple sets of legs). Fits a Lyon and Healy folk harp but there is room for something taller. Happy to ship this harp cover.",
                                image: "https://findaharp.com/img/store/strummedstrings/quiltedharpcase.jpg", 
                                newused: 'used'
                        })} className='featuredimg' src='img/store/strummedStrings/quiltedharpcase.jpg' alt='Quilted Harp Case' />
                        <img onClick={()=>props.setDetailProduct2({
                            id: "OVSC-GNKS",
                            store: 'michiganharpcenter',
                            artist_first: '',
                            artist_last: '',
                            category: 'Accessories',
                            subcategories: ['Gifts','Featured'],
                            title: "Overscore Tape", 
                            price: 8.00,
                            descriptiontext: "This is Overscore, your unique removable manuscript tape tested by musicians for musicians, this new tape absolutely works a treat!!",
                            image: "https://findaharp.com/img/store/michiganharpcenter/overscoretape.jpg",
                            newused: 'new'
                        })} className='featuredimg' src='img/store/michiganharpcenter/overscoretape.jpg' alt='Over Score Tape' />
                    </div> 
                    :''
                } 
                      
                <style>{`
                    .featuredimg {
                        height: 125px;
                    }
                    .HeadingChoice {
                        font-size: 30px;
                        font-weight: 400;
                        color: #f9bf1e;
                        text-align: left;
                        margin-left: 20px;
                        background-color: #fff;
                    }
                    .SubCont {
                        display: flex;
                        justify-content: space-between;
                        background-color: #fff;
                        min-height: 450px;
                    }
                    .SubCatLevel1 {
                        margin-top: 10px;
                        width: 350px;
                        break-inside: avoid-column;
                        break-after: avoid-column;
                    }
                `}</style>
                
            </>
        )
    } else if (props.menuOpen&&winWidth<=750) {
        return (
            <>       
                <div className='HeadingChoice' style={{paddingLeft: '20px'}}>
                    {props.menuName}
                    {props.menuName==='Strings by Harp Builder'
                        ?<div style={{fontSize: '14px', fontStyle: 'italic', marginTop: '5px', color: '#333'}}>Builder not found? Please use "Strings by Type" menu</div>
                        :''
                    }
                    {props.menuName==='Music'
                        ?<div onClick={()=>alert('Link coming soon. Please find this feature on the store main page under the "word search" area. Search by difficulty level, ensemble type, genre, etc.')}style={{fontSize: '14px', cursor: 'pointer', fontStyle: 'italic', marginTop: '5px', color: '#333', textDecoration:'underline'}}>Advanced Music Search</div>
                        :''
                    }
                </div>
                <div className='SubCont' style={{width: '100%', padding: '20px'}}> 
                    <ul>
                        {Array.isArray(categoryCopy[props.menuName])
                        ?<SubSubCatMenu 
                            // searchCategory={props.searchCategory}
                            // setSearchCategory={props.setSearchCategory}
                            // searchSubCategory={props.searchSubCategory}
                            // setSearchSubCategory={props.setSearchSubCategory}
                            // searchItem={props.searchItem}
                            // setSearchItem={props.setSearchItem}
                            menuName={props.menuName} 
                            subMenuName={false} 
                            handleCatChange={props.handleCatChange}
                            setDetailProduct2={props.setDetailProduct2}
                        />
                        :Object.keys(categoryCopy[props.menuName]).map(item=>
                            <li key={item} className='SubCatLevel1'>
                                <div>{item}</div>
                                <SubSubCatMenu 
                                    // searchCategory={props.searchCategory}
                                    // setSearchCategory={props.setSearchCategory}
                                    // searchSubCategory={props.searchSubCategory}
                                    // setSearchSubCategory={props.setSearchSubCategory}
                                    // searchItem={props.searchItem}
                                    // setSearchItem={props.setSearchItem}
                                    menuName={props.menuName} 
                                    subMenuName={item}
                                    handleCatChange={props.handleCatChange} 
                                    setDetailProduct2={props.setDetailProduct2}
                                /> 
                            </li>)
                        }
                    </ul> 
                </div> 
                {/* {props.menuName==="Featured Items"
                    ?<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img onClick={()=>props.setDetailProduct2({
                            id: "MSST-MWOV",
                            store: 'findaharp',
                            category: 'accessories',
                            subcategories: ['Featured', 'Music stand'],
                            title: "EMS Georgian Wooden Music Stand", 
                            price: 135.00, 
                            image: "https://findaharp.com/img/store/findaharp/accessories/woodenStand.jpg", 
                            descriptiontext: "Costs $240USD new. Solid ash, stained rosewood/mahogany. Excellent condition.",
                            newused: 'used'
                        })} className='featuredimg' src='img/store/findaharp/accessories/woodenStand.jpg' alt='Wooden Music Stand' />
                        <br />
                        <img onClick={()=>props.setDetailProduct2({
                                id: "QUCV-EHGY",
                                store: 'strummedstrings',
                                artist_first: '',
                                artist_last: '',
                                category: 'accessories',
                                subcategories: ['Cover', 'Featured'],
                                title: "34 string lever harp case", 
                                price: 250.00,
                                descriptiontext: "Quilted case with carrying strap and large Pocket (fits multiple sets of legs). Fits a Lyon and Healy folk harp but there is room for something taller. Happy to ship this harp cover.",
                                image: "https://findaharp.com/img/store/strummedstrings/quiltedharpcase.jpg", 
                                newused: 'used'
                        })} className='featuredimg' src='img/store/strummedStrings/quiltedharpcase.jpg' alt='Quilted Harp Case' />
                        <br />
                        <img onClick={()=>props.setDetailProduct2({
                            id: "OVSC-GNKS",
                            store: 'michiganharpcenter',
                            artist_first: '',
                            artist_last: '',
                            category: 'Accessories',
                            subcategories: ['Gifts','Featured'],
                            title: "Overscore Tape", 
                            price: 8.00,
                            descriptiontext: "This is Overscore, your unique removable manuscript tape tested by musicians for musicians, this new tape absolutely works a treat!!",
                            image: "https://findaharp.com/img/store/michiganharpcenter/overscoretape.jpg",
                            newused: 'new'
                        })} className='featuredimg' src='img/store/michiganharpcenter/overscoretape.jpg' alt='Over Score Tape' />
                    </div> 
                    :''
                }  */}
                      
                <style>{`
                    .featuredimg {
                        height: 125px;
                    }
                    .HeadingChoice {
                        font-size: 30px;
                        font-weight: 400;
                        color: #f9bf1e;
                        text-align: left;
                        margin-left: 20px;
                        background-color: #fff;
                    }
                    .SubCont {
                        display: flex;
                        justify-content: space-between;
                        background-color: #fff;
                    }
                    .SubCatLevel1 {
                        margin-top: 10px;
                        width: 350px;
                        break-inside: avoid-column;
                        break-after: avoid-column;
                    }
                    @media only screen and (max-width: 550px) {
                        .SubCatLevel1 {
                            width: unset;
                        }
                    }
                `}</style>
                
            </>
        )   
    } else {
        return (<></>)
    }
    
}

export default SubCatMenu;
