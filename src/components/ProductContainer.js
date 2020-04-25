import React, {useReducer} from 'react';

// internal
import ProductModal from './ProductModal';
import ContactForm from './ContactForm';
import ProductContainerCss from '../styles/ProductContainer.css';

const initialState = {
    openDetail: false,
    openContact: false,
    productSelect: null,
    opacity: 1,
    overflowY: 'auto'
}
function reducer(state, action) {
    console.log('reducer', action.product)
    switch (action.type) {
        case 'detail':
            return {
                openDetail: true,
                openContact: false,
                productSelect: action.product,
                opacity: .1,
                overflowY: 'hidden'
            }
        case 'contact':
            return {
                openDetail: false,
                openContact: true,
                productSelect: action.product,
                opacity: .1,
                overflowY: 'hidden'
            }
        case 'initial':
            return {
                openDetail: false,
                openContact: false,
                productSelect: null,
                opacity: 1,
                overflowY: 'auto'
            }
    }
}
function ProductContainer(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [open, setOpen] = useState(false);
    // const [openContact, setOpenContact] = useState(false);
    // const [contactProduct, setContactProduct] = useState();
    // const [opacity, setOpacity] = useState(1);
    // const [detailItem, setDetailItem] = useState("");

    function handleClick(product) {
        dispatch({type:'detail', product})
        document.body.style.overflowY='hidden';
        // if (open) {
        //     setOpacity(1);
        //     setOpen(false);
        //     document.querySelector('body').style.overflowY='auto';
            
        //     return;
        // }
        // setDetailItem(props.filteredproducts.find(product => evt.target.closest('.productSmallDisplay').id === product.id));
        // setOpen(true);
        // setOpacity(.10);
        // document.querySelector('body').style.overflowY='hidden';
    }
    function handleClose() {
        dispatch({type: 'initial'})
        document.body.style.overflowY='auto';
    }
    function handleOpenContact(product) {
        dispatch({type:'contact', product})
        document.body.style.overflowY='hidden';
        // setOpen(false);
        // setContactProduct(product);
        // setOpenContact(true);
        
        // setOpacity(0.1);
        // document.querySelector('body').style.overflowY='hidden';
    }
    function handleCloseContact(product) {
        dispatch({type:'initial'})
        document.body.style.overflowY='auto';
        // setOpacity(1);
        // setOpenContact(false);
        // document.body.style.overflowY='auto';
    }
    function handleImageLoad(evt) {
        evt.target.hidden=false; evt.target.nextElementSibling.hidden=true;
        evt.target.parentElement.style.backgroundColor="#FFFFFF";
        evt.target.style.height="100%";
    }
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        const gridProducts = props.filteredproducts.map(product => (
            <div key={product.id} id={product.id} className={`grid-item productSmallDisplay`} onClick={() => handleClick(product)}>
                <div className={`productSmallDisplay-img image`}>
                    <img 
                        hidden={true}
                        src= {product.productImageUrl} 
                        onLoad={(evt) => handleImageLoad(evt)} 
                        onError={(evt) => {evt.target.src='./img/golden_harp_full_not_found.png';evt.target.style.backgroundColor='#000000'}} 
                        alt={product.productTitle}
                    />
                    <img 
                        id={product.id} 
                        src= 'https://findaharp-api.herokuapp.com/assets/img/golden_harp_full.png' 
                        height='60%' 
                        alt={product.productTitle}
                    />
                </div>
                <div className={`grid-item productSmallDisplay-text`}>
                    <p>{product.productMaker} {product.productModel}<br></br>
                    {product.productSize} Strings / {product.productType}<br></br>
                    <span><a href='mailto: tmurv@shaw.ca'>{product.sellerName.includes("-o")||product.sellerName.includes("-e")?
                        product.sellerName.substr(0,product.sellerName.length-2)
                        :product.sellerName}
                    </a></span>
                    </p>
                </div>           
            </div>
        ));
        // console.log(open, openContact)
        return( 
            <>      
            <div data-test='component-ProductContainer' className='productContainer'>       
                <div className="grid-container" style={{'opacity': `${state.opacity}`}}>
                    {gridProducts}
                </div>
                
                {state.openDetail&&<ProductModal product={state.productSelect} handleOpenContact={handleOpenContact} handleClose={handleClose}/>}
                {state.openContact&&<ContactForm handleClose={handleCloseContact} product={state.productSelect}/>}
                
            </div>       
            <ProductContainerCss />           
            </>
        );
    } else {
        return(
            <>
            <h3 style={{textAlign: 'center'}}>Not found in our listings</h3>
            <h3 style={{textAlign: 'center'}}>Please try again using fewer filters.</h3>    
            <div data-test='component-ProductContainer' className='notFoundContainer'>
                <img src= 'https://findaharp-api.herokuapp.com/assets/img/genericHarp.png' alt='harp in silhouette'/>
            </div>
            <ProductContainerCss />
            </>
        );
    }    
}

export default ProductContainer;
