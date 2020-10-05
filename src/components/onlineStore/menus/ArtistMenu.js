// Packages
import uuid from 'react-uuid';

// internal
import { itemsSortByDisabled } from '../../../utils/helpers';

export default function ArtistMenu(props) {
    // const currentArtists = props.products.map(product => product.productArtist);
    let artists = ['Beethoven', 'Paul Baker', 'Deborah Nyack']
    // props.makesmodels.map(artist => { if (artist.sellerName !== 'findaharpFinishes') artists.push(artist.sellerName)});
    // artists = itemsSortByDisabled(artists, currentArtists);
    const handleClose = (evt) => {
        props.handleArtistChange(evt.target.getAttribute('name'));
    };
    
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='artist' 
                onClick={(e)=>{props.handleclick(e);}}
            >
                Main Artist (Composer,Performer,Arranger)
            </button>               
            <ul
                id="artist-select"
                onClose={handleClose}
                name='Artist Menu'
                className='plainTextSelectLine1'
                style={{zIndex: 6000}}
                hidden={props.open}
            >
                <li onClick={handleClose}                   
                        onClick={handleClose}
                        name="All Artists"
                    >All Artists
                </li>
                {artists.map(artist =>
                    <li 
                        key={uuid()} 
                        onClick={handleClose}
                        name={artist}
                        // disabled={!currentArtists.find(currentArtist => currentArtist === artist)}
                        // style={!currentArtists.find(currentArtist => currentArtist === artist)?{color: "#d3d3d3"}:{color:"#fafbfc"}}
                    >
                        {artist}  
                    </li>
                )}
            </ul>   
        </div>
    );


    // return (
    //     <div>
    //         <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_1}>
    //             Harp Artist
    //         </Button>                
    //         <Menu
    //             key={uuid()}
    //             id='simple-menu'
    //             anchorEl={anchorEl_1}
    //             keepMounted
    //             open={Boolean(anchorEl_1)}
    //             name='Artist Menu'
    //             onClose={handleClose_1}
    //         >
    //             <MenuItem onClick={handleClose_1}>
    //                 <Button
    //                     aria-label="more"
    //                     aria-controls="long-menu"
    //                     aria-haspopup="true"
    //                     onClick={handleClose_1}
    //                     name="All Artists"
    //                 >All Artists</Button>
    //             </MenuItem>
    //             {artists.map(artist =>
    //                 <MenuItem key={uuid()} onClick={handleClose_1}>
    //                     <Button
    //                         aria-label="more"
    //                         aria-controls="long-menu"
    //                         aria-haspopup="true"
    //                         onClick={handleClick_2}
    //                         name={artist}
    //                         disabled={!currentArtists.find(currentArtist => currentArtist === artist)}
    //                     >{artist}</Button>         
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
    //                             name={`All ${artistSelected} Models:`} 
    //                             onClick={handleClose_2}
    //                         >
    //                             All {artistSelected} Models
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
