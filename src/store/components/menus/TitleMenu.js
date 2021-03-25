// Package
import React from 'react';
import uuid from 'react-uuid';

// Internal
import { getTitleList, itemsSortByDisabled } from '../../../utils/helpers';

export default function TitleMenu(props) {
    let maker; 
    // // if (props.productMaker !== "All Makers") maker = props.makestitles.find(maker => maker.sellerName === props.productMaker);
    
    // // const currentTitles = props.products.map(product => product.productTitle).sort(); 
    let titles;
    titles = ["My Great Piece", "My Great CD", "My Great Arrangement"]
    // if (maker) maker = [maker];
    // if (maker && maker.length > 0) {
    //     titles = Array.from(getTitleList(maker))
    // } else {
    //     titles = Array.from(getTitleList(props.makestitles, props.productSize));
    // }
     // titles = itemsSortByDisabled(titles, currentTitles);
    // titles=itemsSortByDisabled(titles, currentTitles).map(title => <p 
    //         name={title}
    //     >{title.trim()}</p>);

    const handleClose = (evt) => {
        props.handleTitleChange(evt.target.getAttribute('name'));
    };
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='title' 
                onClick={(e)=>{props.handleclick(e);}}
            >
                Title
            </button>
            <ul
                id="title-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Title Menu'
                className='plainTextSelectLine1'
                style={{zIndex: 6000}}
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Titles'
                >
                    All Titles
                    {/* {props&&props.productSize&&props.productSize.toUpperCase()!=='ALL SIZES'&&props.productSize.toUpperCase!=='HARP SIZE'?props.productSize:"All Titles"} */}
                </li>  
                {titles.map(title =>
                    <li 
                        key={uuid()} 
                        name={title}
                        // onClick={currentTitles.find(currentTitle => currentTitle === title.props.name)?handleClose:()=>alert(`No listings for ${title.props.name}.`)}                                   
                        // style={!currentTitles.find(currentTitle => currentTitle === title.props.name)?{display: "none"}:{color:"#fafbfc"}}
                        >{title}
                    </li>
                )}
            </ul>  
        </div>
    );
}

TitleMenu.getInitialProps = (props) => {
    return props;
}