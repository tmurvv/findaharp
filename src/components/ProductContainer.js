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
            return;
        }
        setDetailItem(props.filteredproducts.find(product => evt.target.closest('.productSmallDisplay').id === product.id));
        setOpen(true);
        setOpacity(.10);
    }
    function handleClose() {
        setOpen(false);
        setOpacity(1);
    }
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        const gridProducts = props.filteredproducts.map(product => (
            <div key={product.id} id={product.id} className={`grid-item productSmallDisplay`} onClick={handleClick}>
                <div className={`productSmallDisplay-img`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
                <div className={`grid-item productSmallDisplay-text`}>
                    <p>{product.productMaker} {product.productModel}</p>
                    <p>{product.productSize} Strings / {product.productType}</p>
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

              
                    // {props.filteredproducts.map(product => (
                    //     <div className={`grid-item oddRow productSmallDisplay`}>
                    //     <div className={`productSmallDisplay-img`}><img src= {props.filteredproducts[0].productImageUrl} alt={props.filteredproducts.productTitle}/></div>
                    //     <div className={`grid-item evenRow productSmallDisplay-text`}>{props.filteredproducts[0].productMaker} {props.filteredproducts[0].productModel}<br></br>{props.filteredproducts[0].productSize} Strings<br></br></div>
                    // </div>                                     
                    // ))}
//                 </ul>




// <ul style={{listStyle: "none"}}>               
//                     {props.filteredproducts.map(product => (
//                         <li key={product.id}>
//                             <br/>
//                             <ul style={{listStyle: "none"}}>
//                                 <li>{product.sellerName}</li>
//                                 <li>{product.productTitle}</li>
//                                 <li>{product.productShortDesc}</li>
//                                 <li>{product.productPrice}</li>
//                                 <li>{product.productSize} Strings: {findSizeWords(product.productSize, product.productType)}</li>
//                                 <li>{product.productLongDesc}</li>
//                                 <li>{product.sellerRegion}, {product.sellerCountry}</li>
//                                 <br />   
//                                 <li>{product.productImageUrl.includes('STOCK')?`STOCK PHOTO of ${product.productModel}. Not actual harp for sale.`:""}<br></br><img src= {product.productImageUrl} alt={product.productTitle}/></li>
//                                 {/* <li>{product.productImageUrl.includes('STOCK')?"STOCK PHOTO":""}<br></br>STOCK PHOTO of {product.productModel}, not actual harp for sale.</li> */}
//                                 {/* <li><img src= {`https://onestop-api-staging.herokuapp.com/assets/img/${product.shortProductImageUrl}`} alt={product.productTitle}/></li> */}
//                                 <br/>
//                                 <hr />
//                             </ul>
//                             <br/>
//                         </li>                                     
//                     ))}
//                 </ul>