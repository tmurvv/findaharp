import React from 'react';
import { findSizeWords } from '../utils/helpers';
import ProductContainerCss from '../styles/ProductContainer.css';

function ProductContainer(props) {
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        console.log(props.filteredproducts)
        return( 
            <>      
            <div data-test='component-ProductContainer' className='productContainer'>       
                <div class="grid-container">
                    <div class={`grid-item oddRow`}><img src= {props.filteredproducts[0].productImageUrl} alt={props.filteredproducts.productTitle}/></div>
                    <div class={`grid-item oddRow`}>2</div>
                    <div class={`grid-item oddRow`}>3</div>  
                    <div class={`grid-item oddRow`}>4</div>
                    <div class={`grid-item evenRow`}>{props.filteredproducts[0].productMaker} {props.filteredproducts[0].productModel}<br></br>{props.filteredproducts[0].productSize} Strings<br></br></div>
                    <div class={`grid-item evenRow`}>6</div>  
                    <div class={`grid-item evenRow`}>7</div>
                    <div class={`grid-item evenRow`}>8</div>
                    <div class={`grid-item oddRow`}>9</div>  
                    <div class={`grid-item oddRow`}>10</div>  
                    <div class={`grid-item oddRow`}>11</div>  
                    <div class={`grid-item oddRow`}>12</div>  
                    <div class={`grid-item evenRow`}>13</div>  
                    <div class={`grid-item evenRow`}>14</div>  
                    <div class={`grid-item evenRow`}>15</div>  
                    <div class={`grid-item evenRow`}>16</div>  
                </div>

            </div>
            <ProductContainerCss />
            </>
        );
    } else {
        return(       
            <div data-test='component-ProductContainer' className='ProductContainer' style={{padding: '150px'}}>
                <img src= 'https://findaharp-api.herokuapp.com/assets/img/genericHarp.png' alt='harp in silhouette'/>
                
                <h3>Make/Model/Size not found in our listings. Please try another search.</h3>
            </div>
        );
    }    
}
export default ProductContainer;

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