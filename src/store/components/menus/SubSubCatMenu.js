// packages
import React, { useEffect, useState } from 'react';

import { CATEGORIES } from '../../constants/Categories';
function SubCatMenu({menuName, subMenuName, handleChange}) {
    const [searchResults, setSearchResults] = useState();
    const [ menuOpen, setMenuOpen] = useState(false);
    const [ subMenuOpen, setSubMenuOpen] = useState(true);
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));
    const CategoryCopy = {...JSON.parse(JSON.stringify(CATEGORIES))}

    function handleCatChange(e) {
        
        // console.log(props.filteredProducts[0]);
        // const storedItems = props.filteredProducts.filter(prod=>prod.subcategory===catId);
        // console.log(storedItems.length)
        // console.log(storedItems)
        // setSearchResults(storedItems);
    }
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
    function handleClick(e) {
        e.stopPropagation();
        const filtered = [];
        const catId = e.target.id.toString();
        setMenuOpen(['categories']);
        console.log('handle', catId);
        // document.querySelector('#categories').nextElementSibling.innerText = `${e.target.id} Selected`;
        console.log('filtered', filtered);
    }
    return (
        <> 
            <ul className='SubCatMenuList'>{CategoryCopy.length}
                {subMenuName
                ?CategoryCopy[menuName][subMenuName].map(item=>
                    <li onClick={(e)=>handleClick(e)} key={item} id={item} className='SubSubCat'>
                        {item}
                    </li>)               
                :CategoryCopy[menuName].map(item=>
                    <li onClick={(e)=>handleClick(e)} key={item} id={item} className='SubSubCat'>
                        {item}
                    </li>)
                }
            </ul>          
            <style>{`
            .SubCatMenuList {
                height: fit-content;
                max-height: 350px;
                min-width: 250px;
                overflow: auto;
                width: fit-content;
                padding-inline-end: .5em;
            }
                .SubSubCat {
                    background-color: #fff;
                    color: #333;
                    font-weight: 300;
                    margin-left: 20px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default SubCatMenu;
