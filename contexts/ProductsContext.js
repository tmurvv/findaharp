import React, { createContext, useState } from 'react';
import { findModelHelper } from '../utils/helpers';

export const ProductsContext = createContext();

export function ProductsProvider(props) {
    const [ products, setProducts ] = useState();
    const [ makesModels, setMakesModels ] = useState();
    const findModel = (model) => findModelHelper(model);
    
    return(
        <ProductsContext.Provider value={{products, setProducts, setMakesModels, findModel, makesModels }}>
            {props.children}
        </ProductsContext.Provider>
    );
}
