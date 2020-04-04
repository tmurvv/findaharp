import React from 'react';
import { findSizeWords } from '../utils/helpers';

function HarpsContainer(props) {
    if (props.filteredproducts&&props.filteredproducts.length>0) {
        return(       
            <div data-test='component-harpscontainer' className='harpsContainer'>       
                <ul style={{listStyle: "none"}}>               
                    {props.filteredproducts.map(product => (
                        <li key={product.id}>
                            <br/>
                            <ul style={{listStyle: "none"}}>
                                <li>{product.sellerName}</li>
                                <li>{product.productTitle}</li>
                                <li>{product.productShortDesc}</li>
                                <li>{product.productPrice}</li>
                                <li>{product.productSize} Strings: {findSizeWords(product.productSize, product.productType)}</li>
                                <li>{product.productLongDesc}</li>
                                <li>{product.sellerRegion}, {product.sellerCountry}</li>
                                <br />   
                                <li>{product.productImageUrl.includes('STOCK')?`STOCK PHOTO of ${product.productModel}. Not actual harp for sale.`:""}<br></br><img src= {product.productImageUrl} alt={product.productTitle}/></li>
                                {/* <li>{product.productImageUrl.includes('STOCK')?"STOCK PHOTO":""}<br></br>STOCK PHOTO of {product.productModel}, not actual harp for sale.</li> */}
                                {/* <li><img src= {`https://onestop-api-staging.herokuapp.com/assets/img/${product.shortProductImageUrl}`} alt={product.productTitle}/></li> */}
                                <br/>
                                <hr />
                            </ul>
                            <br/>
                        </li>                                     
                    ))}
                </ul>      
            </div>
        );
    } else {
        return(       
            <div data-test='component-harpscontainer' className='harpsContainer' style={{padding: '150px'}}>
                <h3>Make/Model/Size not found in our listings. Please try another search.</h3>
            </div>
        );
    }    
}
export default HarpsContainer;