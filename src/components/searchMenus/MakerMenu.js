// Packages
import uuid from 'react-uuid';

// internal
import { itemsSortByDisabled } from '../../utils/helpers';

export default function MakerMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const currentMakers = props.products.map(product => product.productMaker);
    let makers = []
    props.makesmodels.map(maker => {makers.push(maker.sellerName)});
    makers = itemsSortByDisabled(makers, currentMakers);
    const handleClose = (evt) => {
        props.handleMakerChange(evt.target.getAttribute('name'));
        setAnchorEl(null);
    };
    
    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorEl(!anchorEl)}>
                HARP MAKER
            </div>               
            <ul
                id="maker-select"
                anchorElPrice={anchorEl}
                onClose={handleClose}
                hidden={!anchorEl}
                name='Maker Menu'
                className='plainTextSelectLine1'
            >
                <li onClick={handleClose}                   
                        onClick={handleClose}
                        name="All Makers"
                    >All Makers
                </li>
                {makers.map(maker =>
                    <li 
                        key={uuid()} 
                        onClick={handleClose}
                        name={maker}
                        disabled={!currentMakers.find(currentMaker => currentMaker === maker)}
                    >
                        {maker}  
                    </li>
                )}
            </ul>   
        </div>
    );


    // return (
    //     <div>
    //         <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_1}>
    //             Harp Maker
    //         </Button>                
    //         <Menu
    //             key={uuid()}
    //             id='simple-menu'
    //             anchorEl={anchorEl_1}
    //             keepMounted
    //             open={Boolean(anchorEl_1)}
    //             name='Maker Menu'
    //             onClose={handleClose_1}
    //         >
    //             <MenuItem onClick={handleClose_1}>
    //                 <Button
    //                     aria-label="more"
    //                     aria-controls="long-menu"
    //                     aria-haspopup="true"
    //                     onClick={handleClose_1}
    //                     name="All Makers"
    //                 >All Makers</Button>
    //             </MenuItem>
    //             {makers.map(maker =>
    //                 <MenuItem key={uuid()} onClick={handleClose_1}>
    //                     <Button
    //                         aria-label="more"
    //                         aria-controls="long-menu"
    //                         aria-haspopup="true"
    //                         onClick={handleClick_2}
    //                         name={maker}
    //                         disabled={!currentMakers.find(currentMaker => currentMaker === maker)}
    //                     >{maker}</Button>         
    //                     <Menu
    //                         id="long-menu"
    //                         anchorEl={anchorEl_2}
    //                         keepMounted
    //                         open={open_2}
    //                         onClose={handleClose_2}
    //                         name = 'Model Menu'
    //                         PaperProps={{
    //                         style: {
    //                             maxHeight: ITEM_HEIGHT * 4.5,
    //                             width: 'fit-content',
    //                         },
    //                         }}
    //                     >
    //                         <MenuItem 
    //                             name={`All ${makerSelected} Models:`} 
    //                             onClick={handleClose_2}
    //                         >
    //                             All {makerSelected} Models
    //                         </MenuItem>
    //                         {models.map(model => (
    //                             <MenuItem 
    //                                 name={model} 
    //                                 onClick={handleClose_2}
    //                                 disabled={!currentModels
    //                                     .find(currentModel => currentModel === model)
    //                                 }
    //                             >
    //                                 {model}
    //                             </MenuItem>
    //                         ))}
    //                     </Menu>
    //                 </MenuItem>
    //             )}
    //         </Menu>   
    //     </div>
    // );
}
