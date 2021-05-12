// packages
import React, { useEffect, useState } from 'react';

import SubSubCatMenu from './SubSubCatMenu';
import { CATEGORIES } from '../../constants/Categories';
function SubCatMenu(props) {
    const [ searchResults, setSearchResults ] = useState();
    const [ menuOpen, setMenuOpen] = useState(false);
    const [ subMenuName, setSubMenuName] = useState('Gut');
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));
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
    function toggleOpen(e) {
        const arrayCopy = [...menuOpen]
        if (arrayCopy.includes(e.target.id)) {
            const index = arrayCopy.indexOf(e.target.id);
            if (index > -1) {
                arrayCopy.splice(index, 1);
            }
        } else {
            arrayCopy.push(e.target.id);
        }
        setMenuOpen(arrayCopy);
    } 
    return (
        <>           
            <div className='HeadingChoice'>
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
                <ul style={{columns: '2', breakAfter: 'avoid-column', breakInside: 'avoid-column'}}>
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
                            /> 
                        </li>)
                    }
                </ul> 
            </div> 
            {props.menuName==="Featured Items"
                ?<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <img className='featuredimg' src='img/store/findaharp/accessories/woodenStand.jpg' alt='Wooden Music Stand' />
                    <img className='featuredimg' src='img/store/strummedStrings/quiltedharpcase.jpg' alt='Quilted Harp Case' />
                    <img className='featuredimg' src='img/store/michiganharpcenter/overscoretape.jpg' alt='Over Score Tape' />
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
                }
                .SubCont {
                    display: flex;
                    justify-content: space-between;

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
}

export default SubCatMenu;
