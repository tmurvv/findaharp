import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

//#region Material-ui imports
import { TextField, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';    
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import { typography } from '@material-ui/system';
//#endregion

const PrivateAds = (props) => {
    const [productListing, setProductListing] = useState({ contactPreference: 'both', productType: '' });
    const [open, setOpen] = useState(false);
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstName': 
                setProductListing({...productListing, firstName: evt.target.value});
                break
            case 'lastName': 
                setProductListing({...productListing, lastName: evt.target.value});
                break
            case 'contactPreference': 
                setProductListing({...productListing, contactPreference: evt.target.value});
                break
            case 'contactText': 
                setProductListing({...productListing, contactText: evt.target.value});
                break
            case 'contactEmail': 
                setProductListing({...productListing, contactEmail: evt.target.value});
                break
            case 'productMaker': 
                setProductListing({...productListing, productMaker: evt.target.value});
                break
            case 'productModel': 
                setProductListing({...productListing, productModel: evt.target.value});
                break
            case 'productType': 
                setProductListing({...productListing, productType: evt.target.value});
                break
            case 'productPrice': 
                setProductListing({...productListing, productPrice: evt.target.value});
                break
            case 'productNumStrings':
                setProductListing({...productListing, productNumStrings: evt.target.value});
                break
            case 'productLocation': 
                setProductListing({...productListing, productLocation: evt.target.value});
                break
            case 'willShip': 
                setProductListing({...productListing, willShip: evt.target.value});
                break
            case 'shortDesc': 
                setProductListing({...productListing, shortDesc: evt.target.value});
                break
            case 'longDesc': 
                setProductListing({...productListing, longDesc: evt.target.value});
                break            
            default :
        }
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setProductListing({ contactPreference: '', productType: ''});
        setOpen(false);
        const res = await axios.post(`https://findaharp-api-development.herokuapp.com/api/v1/privateads`, { productListing });
        if (res) alert('Payment not yet implemented, but harp submitted.');
            
        console.log(res);
    }
    
    return (
        <Box border='1px #5acedc' mt='40px' mb='60px'>
            <Typography variant='h5' align='center'>About Listing a Harp on FindAHarp.com</Typography>
            <List>               
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        Harp Listings are $25US for three months.  
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        You will be asked for your contact information. If you wish, all email communication with prospective buyers can take place through FindAHarp.com at no extra charge.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        When a buyer expresses interest in a harp, you will be notified by FindAHarp.com by email. Findaharp.com will not share your contact information with anyone or any organization. 
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        Findaharp.com does not handle any money or any merchandise.  
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        All financial and logistical arrangements regarding a harp sale must be coordinated with the buyer.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        After 6 weeks, FindAHarp.com will contact you to see if you wish to renew your listing. If there is no response within 2 weeks, the listing will be removed.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                        As with any online sales listing, please beware of scammers. <a href='https://twocents.lifehacker.com/how-to-not-get-scammed-when-selling-things-online-1825190225'>Click here</a> for guidance on avoiding scammers.
                    </ListItemText>
                </ListItem>
                <Box display="flex" flexDirection='column' justifyContent="center">
                    <Box m='auto' mt='30px' width='fit-content'>
                        <Typography>Sounds good, I am ready to list my harp on findaharp.com!</Typography>
                    </Box>
                    <Box m='auto' mt='15px'>
                    <Button variant='contained' onClick={() => setOpen(true)} color="primary">
                        I'm ready
                    </Button>
                    </Box>              
                </Box>
            </List>
            
            <Dialog open={open} autoComplete="off">
                <DialogTitle>Add a Harp for Sale to FindAHarp.com</DialogTitle>
                <DialogContent>
                {/* <Box > */}
                <Box height='250px' display='flex' flexDirection='column' justifyContent='space-between'>
                    <DialogContentText>
                        <Typography variant='subtitle2'>Your contact information will not be shared. Communication with prospective buyers can take place through findaharp.com at no extra charge.<br></br></Typography>
                    </DialogContentText>
                    <DialogContentText mt='-100px'>
                        About the Seller (or contact person)
                    </DialogContentText>                                        
                    <Box display="flex">
                        <Box mt='-40px'>
                            <TextField
                                id="outlined-helperText"
                                label="First Name"
                                value={productListing.firstName}
                                onChange={handleChange}
                                name='firstName'
                            />
                        </Box>
                        <Box ml='15px' mt='-40px'>
                            <TextField
                                id="outlined-helperText"
                                label="Last Name"
                                value={productListing.lastName}
                                onChange={handleChange}
                                name ='lastName'
                            />
                        </Box>
                    </Box>
                    <Box mt='-15px'>
                        <TextField
                            id="outlined-helperText"
                            label="Contact Email"
                            name='contactEmail'
                            value={productListing.contactEmail}
                            onChange={handleChange}
                        />
                    </Box>         
                </Box>
                <Box mt='40px' Box height='1000px' display='flex' flexDirection='column' justifyContent='space-between'>
                    <DialogContentText>About the Harp</DialogContentText>          
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Maker"
                            value={productListing.maker}
                            onChange={handleChange}
                            helperText='Dusty Strings, Camac, Salvi'
                            name='maker'
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Model"
                            value={productListing.model}
                            onChange={handleChange}
                            helperText='Sierra, Style 23, Harpsicle'
                            name='model'
                        />
                    </Box>        
                    <Box>
                        <FormControl>
                            <FormLabel>Type of Harp <span>(for partially levered, select lever)</span></FormLabel>
                            <RadioGroup 
                                row
                                name="productType" 
                                value={productListing.productType}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="lever" control={<Radio />} label="Lever" />
                                <FormControlLabel value="leverFree" control={<Radio />} label="Lever Free" />
                                <FormControlLabel value="pedal" control={<Radio />} label="Pedal" />                   
                                <FormControlLabel value="not sure" control={<Radio />} label="not sure" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <TextField                  
                            type='file' 
                            helperText='Upload Harp Image (eventually image will show after selection)' 
                            variant='outlined'
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Asking Price"
                            name='price'
                            helperText='optional'
                            value={productListing.price}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Number of Strings"
                            name='productNumStrings'
                            helperText='Please enter a number'
                            value={productListing.numStrings}
                            onChange={handleChange}
                            helperText='optional, but helpful'
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Short Description"
                            name='shortDesc'
                            value={productListing.shortDesc}
                            onChange={handleChange}
                            helperText='80 characters'
                            multiline
                        />
                    </Box>                      
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Long Description"
                            name='longDesc'
                            value={productListing.longDesc}
                            onChange={handleChange}
                            helperText="2000 characters"
                            multiline
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Location"
                            name='productLocation'
                            helperText='optional-city, country, or region, etc'
                            value={productListing.location}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-helperText"
                            label="Willing to ship the harp?"
                            name='willShip'
                            value={productListing.willShip}
                            onChange={handleChange}
                            helperText='optional'
                        />
                    </Box>                                     
                </Box>                          
                <Box mb='40px' mt='40px' display='flex' justifyContent='space-evenly'>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Add to Cart
                    </Button> 
                    <Button
                        onClick={()=>setOpen(false)}
                        variant="contained"
                        className='button'
                    >
                        Cancel
                    </Button> 
                </Box>
                </DialogContent> 
            </Dialog>
            <style jsx>{`
        h2 {
            margin-top: 25px;
        },
        .marginBottomMedium {
            margin-bottom: 15px;
        }
        .button {
            backgroundColor: var(--primary-color);
        }
        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
        </Box>
    );
}

export default PrivateAds;
