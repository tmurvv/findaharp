// packages
import React, { useEffect, useState } from 'react';
import SubCatMenu from './SubCatMenu';
import { CATEGORIES } from '../../constants/Categories';

function CategoryMenu(props) {
    const [searchResults, setSearchResults] = useState();
    // const [ subMenuOpen, setSubMenuOpen] = useState();
    const [ mainCategories ] = useState(Object.keys(CATEGORIES));

    function handleCatChange(e) {
        const filtered = [];
        const catId = e.target.id.toString();
        props.setMenuOpen(['categories']);
        console.log(e.target.id);
        document.querySelector('#categories').nextElementSibling.innerText = `${e.target.id} Selected`;

        // console.log('filtered', filtered);
        // console.log(props.filteredProducts[0]);
        // const storedItems = props.filteredProducts.filter(prod=>prod.subcategory===catId);
        // console.log(storedItems.length)
        // console.log(storedItems)
        // setSearchResults(storedItems);
    }
    function toggleOpen(e) {
        const arrayCopy = [...props.menuOpen]
        if (arrayCopy.includes(e.target.id)) {
            const index = arrayCopy.indexOf(e.target.id);
            if (index > -1) {
                arrayCopy.splice(index, 1);
            }
        } else {
            arrayCopy.push(e.target.id);
        }
        props.setMenuOpen(arrayCopy);
    } 
    function handleClick() {
        if (props.menuOpen) {
            props.setMenuOpen(false);
            props.setSubMenuOpen(false);
        } else {
            props.setMenuOpen(true);
            if (!props.subMenuOpen) props.setSubMenuOpen('Featured Items')
            // document.
        }
    }
    
    return (
        <>              
            <h3 className='searchHelperText'>Search by category</h3>
            <div className='CatMenuCont' style={props.menuOpen&&props.subMenuOpen?{width: '550px'}:{width: '126px'}}>
                <div className='MainCat' style={props.menuOpen?{backgroundColor: '#fffbb5',  padding: '0', minWidth: '210px', borderColor: 'transparent'}:{backgroundColor: '#fff'}}>
                    <ul>
                        <li  onClick={()=>handleClick()} id="Categories" className='CatLine'>
                            Categories
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
                                onMouseEnter={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='200px'; props.setSubMenuOpen(cat);}} 
                                onMouseLeave={e=>{if(e.target.lastChild&&e.target.lastChild.style) e.target.lastChild.style.maxHeight='0';}} 
                                onClick={()=>props.setSubMenuOpen(cat)}>
                                <div>{cat}</div>
                                <img 
                                    className='catChevron hovershow' 
                                    src='img/store/right-chevron.png' 
                                    // onMouseEnter={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(2)'; props.setSubMenuOpen(cat);}} 
                                    // onMouseLeave={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(1)';}} 
                                    alt='right arrow'
                                    style={{maxHeight: '0'}}
                                />
                            </li>
                        )
                    : ''                 
                    }
                    </ul>
                </div>
                <div className='SubCat' style={props.subMenuOpen?{display: 'block'}:{display: 'none'}}>                    
                    {props.subMenuOpen&&
                        <SubCatMenu 
                            // searchCategory={props.searchCategory}
                            // setSearchCategory={props.setSearchCategory}
                            // searchSubCategory={props.searchSubCategory}
                            // setSearchSubCategory={props.setSearchSubCategory}
                            // searchItem={props.searchItem}
                            // setSearchItem={props.setSearchItem}
                            menuName={props.subMenuOpen} 
                            handleCatChange={props.handleCatChange}
                        />
                    }
                    <div style={props.menuOpen?{position: 'absolute', right: '5px', top: '5px', height: '20px'}:{display:'none'}} onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'>
                        <img style={{height: '100%', opacity: '.6'}} src='img/clear_search.png' alt='clear filters'/>
                    </div>
                </div>
            </div>
           
            <style>{`
                .CatMenuCont {
                    display: flex;
                    justify-content: flex-start;
                    position: absolute;
                    padding-top: 10px;
                    z-index:1000;
                    top: 357px;
                    left: 56px;
                    padding-top: 10px;
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
                    // padding: 5px 0 5px 5px;
                    border: 1px solid #f9bf1e;
                    border-right: none;
                    // background-color: #fffbb5;

                }
                .CatLine {
                    color: #000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0px 10px 15px;
                    white-space: nowrap;
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
                    padding-right: 20px;
                    position: relative;
                    white-space: nowrap;
                    width: fit-content;
                }
                .MainCat1:hover + .Sub1 {
                    display: block
                }
                .catChevron {
                    height: 12px;
                    margin-right: 5px;
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

 