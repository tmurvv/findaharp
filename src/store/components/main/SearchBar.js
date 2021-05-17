
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'

import lunr from "lunr";
import CategoryMenu from './../menus/CategoryMenu';

var documents = [{
        "name": "Lunr",
        "text": "Like Solr, but much smaller, and not as bright."
    }, {
        "name": "React",
        "text": "A JavaScript library for building user interfaces."
    }, {
        "name": "Lodash",
        "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}];
var idx = lunr(function () {
    this.ref('name')
    this.field('text')

    documents.forEach(function (doc) {
    this.add(doc)
    }, this)
})

const SearchBar = (props) => {
    const [query, setQuery] = useState(null);
    const [results, setResults] = useState([{ref: 'here'}, {ref: 'here again'}])

    const handleChange = (e) => {
        const searchText=document.querySelector('#searchTerm')&&document.querySelector('#searchTerm').value;
        console.log('st', searchText)
        // alert('Not yet implemented');
        // left over from when search bar was for text input
        setQuery(searchText);
        searchIt('library');
    }
    function searchIt(searchText) {
        console.log('res', idx.search(searchText).length)
        setResults(idx.search(searchText));
    }
    return (
        <>  
        <div className='searchBarCont'>
            <CategoryMenu 
                subMenuOpen={props.subMenuOpen} 
                setSubMenuOpen={props.setSubMenuOpen} 
                menuOpen={props.menuOpen} 
                setMenuOpen={props.setMenuOpen}
                handleCatChange={props.handleCatChange}
                setDetailProduct2={props.setDetailProduct2}
                catBreadCrumb={props.catBreadCrumb}
            />   
        <div className="searchTextImg">
            <form style={{display: 'flex'}}>
                <input type="text" style={{marginBottom: '0'}} id="searchTerm" placeholder="           Search" /> 
                <button id="searchMagnify" onClick={(e)=>{e.preventDefault();handleChange(e)}}>
                    <img src='/img/searchicon.png' alt='search icon' />
                </button>
            </form> 
        </div>
        <div className='selectContainer'>
            <select onChange={()=>handleChange('','newused')} id='newused' style={{width: '25%', minWidth: '95px', fontSize: '14px', padding: '13.4px 7px'}}>
                <option value='New/Used' name='All newused'>New/Used</option>
                <option value='New' name='New'>New Only</option>
                <option value='Used' name='Used'>Used Only</option>
            </select>
            <span>
                <img 
                    className='newUsedChevron' 
                    src='img/store/down-chevron.png' 
                    // onMouseEnter={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(2)'; props.setSubMenuOpen(cat);}} 
                    // onMouseLeave={e=>{if(e.target.lastChild) e.target.lastChild.style.transform='scale(1)';}} 
                    alt='down arrow'
                />
            </span>
        </div>
        </div>
        <style jsx>{`
            .searchBarCont {
                display: flex;
                justify-content: center;
                width: 80vw;
                margin: auto;
                height: 50px;
            }
            * {
                box-sizing: border-box;
            }
            .storeSearchLine {
                width: 100%;
                max-width: 800px; 
                margin: auto; 
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                // border: 1px solid #ffe58a;
                background-color: transparent;
            }
            @media only screen and (max-width: 750px) {
                .storeSearchLine {
                    flex-direction: column;
                }
            }
            .newUsedChevron {
                height: 12px;
                margin-right: 5px;
                margin-left: 5px;
            }
            .selectContainer {
                position: relative;
                display: inline-block;
                -webkit-appearance: none;
                height: 50px;
            }
            
            .selectContainer>span {
                right: 0;
                top: 7px;
                position: absolute;
                font-size: 28px;
                pointer-events: none;
            }
            @media only screen and (max-width: 750px) {
                .selectContainer {
                    width: 100%;
                    display: flex;
                }
                select {
                    width: 100%;
                    height: 50px;
                }
                .selectContainer>span {
                    display: none;
                }
            }
            #searchInput {
                background-image: url('/css/searchicon.png');
                background-position: 10px 12px;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
                font-size: 16px;
                padding: 12px 20px;
                border: 1px solid #ffe58a;
                margin-bottom: 0px;
                max-width: 650px;
            }
            @media only screen and (max-width: 750px) {
                #searchInput {
                    flex: unset;
                }
                
            }
            select {
                font-size: 16px;
                padding: 12px 20px;
                border: 1px solid #ffe58a;
                width: 100%;
                background-color: #fff;
                -webkit-appearance: none;
                height: 50px;
            }

            select:active,
            select:hover {
                outline-color: #ffe499;
            }
            input:active,
            input:hover {
                outline-color: #ffe499;
            }
            select:focus, input:focus{
                outline-color: #ffe499;
            }
            .searchTextImg {
                display: flex;
                width: 100%;
            }
            .searchTextImg form{
                display: flex;
                width: 100%;
            }
            .searchTextImg input{
                width: 100%;
                border: 1px solid #ffe499;
                flex: 8;
                padding: 13px 7px;
                font-size: 16px;
            }
            #searchMagnify {
                height: 46px;
                width: 46px;
                padding: 0;
                border: none;
                cursor: pointer;
                outline: none;
            }
            #searchMagnify>img {
                padding: 5px;
                background-color: rgb(249, 191, 30);
                height: 50px;
                width: 50px;
                border: 1px solid rgb(249, 191, 30)
            }
            .searchHelperText {
                display: none;
                width: 60%;
                margin: 15px auto 5px;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686;
                font-weight: 500;
                font-size:14px;
            }
            @media only screen and (max-width: 750px) {
                .searchHelperText {
                    display: block;
                }
            }
            .globalstoresearchTitle {
                width: 60%;
                margin: 25px auto 5px;
                text-align: center;
                font-size: 12px;
                font-style: italic;
                color: #868686;
                font-weight: 500;
                font-size:14px;
            }
            @media only screen and (max-width: 750px) {
                .storesearchTitle {
                    width: 100%;
                }
            }
            .searchInfoWrapper {
                display: flex;
            }
            @media only screen and (max-width: 750px) {
                .searchInfoWrapper {
                    display: block;
                }
                .searchInfoWrapper h3 {
                    font-size: 14px;
                }
            }
            
            #myUL {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            
            #myUL li a {
                border: 1px solid #ddd;
                margin-top: -1px; /* Prevent double borders */
                background-color: #f6f6f6;
                padding: 12px;
                text-decoration: none;
                font-size: 18px;
                color: black;
                display: block
            }
        
            #myUL li a:hover:not(.header) {
                background-color: #eee;
            }
        `}
        </style>
        </>
    )
}

export default SearchBar;
