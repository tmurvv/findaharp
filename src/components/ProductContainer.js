import React, {useState} from 'react';

// internal
import ProductModal from './ProductModal';
import ProductContainerCss from '../styles/ProductContainer.css';

function ProductContainer(props) {
    const [open, setOpen] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [detailItem, setDetailItem] = useState("");

    function handleClick(evt) {
        if (open) {
            setOpacity(1);
            setOpen(false);
            document.querySelector('body').style.overflowY='auto';
            
            return;
        }
        setDetailItem(props.filteredproducts.find(product => evt.target.closest('.productSmallDisplay').id === product.id));
        setOpen(true);
        setOpacity(.10);
        document.querySelector('body').style.overflowY='hidden';
    }
    function handleClose() {
        setOpen(false);
        setOpacity(1);
        document.body.style.overflowY='auto';
    }
    
    function handleImageLoad(evt) {
        evt.target.hidden=false; evt.target.nextElementSibling.hidden=true;
        evt.target.parentElement.style.backgroundColor="#FFFFFF";
        evt.target.style.height="100%";
    }
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        const gridProducts = props.filteredproducts.map(product => (
            <div key={product.id} id={product.id} className={`grid-item productSmallDisplay`} onClick={handleClick}>
                <div className={`productSmallDisplay-img image`}>
                    <img hidden={true} onLoad={(evt) => handleImageLoad(evt)} src= {product.productImageUrl} alt={product.productTitle}/>
                    <img id={product.id} src= 'https://findaharp-api.herokuapp.com/assets/img/golden_harp_full.png' height='60%' alt={product.productTitle}/>
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
        return( 
            <>      
            <div data-test='component-ProductContainer' className='productContainer'>       
                <div className="grid-container" style={{'opacity': `${opacity}`}}>
                    {gridProducts}
                </div>
                <div hidden={!open}>
                    <ProductModal product={detailItem} handleClose={handleClose}/>
                </div>
                
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
