// packages
import React, { useEffect, useState } from 'react';

import { CATEGORIES } from '../../constants/Categories';
function SubCatMenu(props) {
    // const [searchResults, setSearchResults] = useState();
    const [ menuOpen, setMenuOpen] = useState(false);
    const [ subMenuOpen, setSubMenuOpen] = useState(true);
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));
    const CategoryCopy = {...JSON.parse(JSON.stringify(CATEGORIES))}

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
        // e.stopPropagation();
        // const filtered = [];
        // const catId = e.target.id.toString();
        // setMenuOpen(['categories']);
        // console.log('handle', catId);
        // // document.querySelector('#categories').nextElementSibling.innerText = `${e.target.id} Selected`;
        // console.log('filtered', filtered);
    }
    return (
        <> 
            <ul className='SubCatMenuList'>{CategoryCopy.length}
                {props.subMenuName
                ?CategoryCopy[props.menuName][props.subMenuName].map(item=>
                    <li onClick={(e)=>{props.handleCatChange(props.menuName,props.subMenuName,item);}} key={item} id={item} className='SubSubCat'>
                        {item}
                    </li>)               
                :props.menuName==='Featured Items'
                    ?
                    <>
                    <li onClick={(e)=>{props.setDetailProduct2({
                        id: "MSST-MWOV",
                        store: 'findaharp',
                        category: 'accessories',
                        subcategories: ['Featured', 'Music stand'],
                        title: "EMS Georgian Wooden Music Stand", 
                        price: 135.00, 
                        image: "https://findaharp.com/img/store/findaharp/accessories/woodenStand.jpg", 
                        descriptiontext: "Costs $240USD new. Solid ash, stained rosewood/mahogany. Excellent condition.",
                        newused: 'used'
                    });}} key='item1' id='item1' className='SubSubCat'>
                        EMS Georgian Wooden Music Stand
                    </li>
                    <li onClick={(e)=>{props.setDetailProduct2({
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
                    });}} key='item1' id='item1' className='SubSubCat'>
                        34 string lever harp case
                    </li>
                    <li onClick={(e)=>{props.setDetailProduct2({
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
                    });}} key='item1' id='item1' className='SubSubCat'>
                        Overscore Tape
                    </li>
                    </>
                    :CategoryCopy[props.menuName].map(item=>
                    <li onClick={(e)=>{props.handleCatChange(props.menuName,props.subMenuName,item);}} key={item} id={item} className='SubSubCat'>
                        {item}
                    </li>)
                }
            </ul>          
            <style>{`
                .SubCatMenuList {
                    height: fit-content;
                    max-height: 375px;
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
