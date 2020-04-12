// Packages
import uuid from 'react-uuid';
// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// internal
import { getModelListForMaker, itemsSortByDisabled } from '../utils/helpers';

const ITEM_HEIGHT = 48;

export default function MakerMenu(props) {
    const [anchorEl_1, setAnchorEl_1] = React.useState(null);
    const [anchorEl_2, setAnchorEl_2] = React.useState(null);
    const open_2 = Boolean(anchorEl_2);

    const [makerSelected, setMakerSelected] = React.useState('');
    const [models, setModels] = React.useState([]);
    const currentMakers = props.products.map(product => product.productMaker);
    const currentModels = props.products.map(product => product.productModel).sort();
    let makers = []
    props.makesmodels.map(maker => makers.push(maker.sellerName));
    makers = itemsSortByDisabled(makers, currentMakers);
    
    function createModelMenu(maker) {
        if (!maker||!props.makesmodels) throw 'from createModelMenu, no maker or props.makesmodels found';
        let myArray = getModelListForMaker(props.makesmodels, maker);
        myArray = itemsSortByDisabled(myArray, currentModels);
        return myArray
    }
    const handleClick_1 = (evt) => {
        setAnchorEl_1(evt.currentTarget);
    };
    const handleClick_2 = (evt) => {
        setAnchorEl_2(evt.currentTarget);
        setMakerSelected(evt.currentTarget.name);
        setModels(createModelMenu(evt.currentTarget.name));
    };

    const handleClose_1 = (evt) => {
        setAnchorEl_1(null);
    };
    const handleClose_2 = (evt) => {
        props.handleModelChange(evt.target.getAttribute('name'), makerSelected);
        setModels([evt.target.name])
        setAnchorEl_2(null);
    };
    
    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_1}>
                {props.currentselected}
            </Button>                
            <Menu
                key={uuid()}
                id='simple-menu'
                anchorEl={anchorEl_1}
                keepMounted
                open={Boolean(anchorEl_1)}
                name='Maker Menu'
                onClose={handleClose_1}
            >
                <MenuItem onClick={handleClose_1}>
                    <Button
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClose_1}
                        name="All Makers"
                    >All Makers</Button>
                </MenuItem>
                {makers.map(maker =>
                    <MenuItem key={uuid()} onClick={handleClose_1}>
                        <Button
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick_2}
                            name={maker}
                            disabled={!currentMakers.find(currentMaker => currentMaker === maker)}
                        >{maker}</Button>         
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl_2}
                            keepMounted
                            open={open_2}
                            onClose={handleClose_2}
                            name = 'Model Menu'
                            PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 'fit-content',
                            },
                            }}
                        >
                            <MenuItem 
                                name={`All ${makerSelected} Models:`} 
                                onClick={handleClose_2}
                            >
                                All {makerSelected} Models
                            </MenuItem>
                            {models.map(model => (
                                <MenuItem 
                                    name={model} 
                                    onClick={handleClose_2}
                                    disabled={!currentModels
                                        .find(currentModel => currentModel === model)
                                    }
                                >
                                    {model}
                                </MenuItem>
                            ))}
                        </Menu>
                    </MenuItem>
                )}
            </Menu>   
        </div>
    );
}
