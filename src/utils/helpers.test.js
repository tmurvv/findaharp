// packages
import React from 'react';
import Enzyme, {shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// internal
import { testParams } from './testHelpers';
import { 
    findProductType, 
    getModelList, 
    getModelListForMaker 
} from './helpers';


const productsMakesModels = [{"sellerAliases":[],"sellerName":"Aoyama","sellerProducts":[{"productAliases":["Delphy"],"_id":"5e8b7deea03397444c70624e","productTitle":"Delphi","productMaker":"Aoyama","productType":"pedal","productSize":46},{"productAliases":[],"_id":"5e8b7deea03397444c70624f","productTitle":"Irish 34","productMaker":"Aoyama","productType":"lever","productSize":34}]},{"sellerAliases":[],"sellerName":"Blevins","sellerProducts":[{"productAliases":[],"_id":"5e8b7deea03397444c706269","productTitle":"Encore 34","productMaker":"Blevins","productType":"lever","productSize":34}]},{"sellerAliases":[],"sellerName":"Camac","sellerProducts":[{"productAliases":[],"_id":"5e8b7deea03397444c70623f","productTitle":"Vendome","productMaker":"Camac","productType":"pedal","productSize":47},{"productAliases":["Corrigan"],"_id":"5e8b7deea03397444c706240","productTitle":"Korrigan","productMaker":"Camac","productType":"lever","productSize":38},{"productAliases":["Hermine"],"_id":"5e8b7deea03397444c706241","productTitle":"Hermine","productMaker":"Camac","productType":"lever","productSize":34},{"productAliases":["Musaleen"],"_id":"5e8b7deea03397444c706242","productTitle":"Musaline","productMaker":"Camac","productType":"lever","productSize":38},{"productAliases":["Ulyses","Ulisses","Ulises"],"_id":"5e8b7deea03397444c706243","productTitle":"Ulysses","productMaker":"Camac","productType":"lever","productSize":34},{"productAliases":[],"_id":"5e8b7deea03397444c706244","productTitle":"Isolde","productMaker":"Camac","productType":"lever","productSize":38},{"productAliases":[],"_id":"5e8b7deea03397444c706245","productTitle":"Clio","productMaker":"Camac","productType":"lever","productSize":44},{"productAliases":[],"_id":"5e8b7deea03397444c706246","productTitle":"DHC 32","productMaker":"Camac","productType":"lever","productSize":32},{"productAliases":[],"_id":"5e8b7deea03397444c706247","productTitle":"DHC 36","productMaker":"Camac","productType":"lever","productSize":36}]},{"sellerAliases":[],"sellerName":"Clarke","sellerProducts":[]},{"sellerAliases":[],"sellerName":"Rees","sellerProducts":[{"productAliases":[],"_id":"5e8b7deea03397444c706279","productTitle":"Harpsicle","productMaker":"Rees","productType":"lever-free","productSize":26},{"productAliases":[],"_id":"5e8b7deea03397444c70627a","productTitle":"Aberdeen Meadows","productMaker":"Rees","productType":"lever","productSize":36},{"productAliases":[],"_id":"5e8b7deea03397444c70627b","productTitle":"Mariposa","productMaker":"Rees","productType":"lever","productSize":34}]}]

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('findProductType function', () => {
    testParams(
        'should throw the following message when no product list', 
        'from findProductType: productMakesModels parameter empty',
        findProductType,
        [null, "Encore 34", 'Blevins']
    );
    testParams(
        'should throw the following message when no model',
        'from findProductType: model parameter empty',
        findProductType,
        [productsMakesModels, "Blevins", null]
    );
    testParams(
        'should throw the following message when no maker',
        'from findProductType: maker parameter empty',
        findProductType,
        [productsMakesModels, null, "Encore 34"]
        
    );        
    test('should return correct model type', ()=> {
        expect(findProductType(productsMakesModels, 'Blevins', 'Encore 34')).toBe('lever');
        expect(findProductType(productsMakesModels, 'Camac', 'Vendome')).toBe('pedal');
        expect(findProductType(productsMakesModels, 'Rees', 'Harpsicle')).toBe('lever-free');
        expect(findProductType(productsMakesModels, 'Blevens', 'Encore 34')).toBe('not found');
        expect(findProductType(productsMakesModels, 'Blevens', 'Encomistakere 34')).toBe('not found');
    });   
});
describe('getModelList function', () => {
    testParams(
        'should throw the following message when no product list', 
        'from getModelList: productMakesModels parameter empty',
        getModelList,
        [null, "lever", 'Camac']
    ); 
          
    test('should return correct model list', ()=> {
        //lever-free also comes up on lever search, this is intentional
        expect(getModelList(productsMakesModels, 'lever', 'Camac')).toEqual(new Set([
            'Irish 34',
            'Encore 34',
            'Korrigan',
            'Hermine',
            'Musaline',
            'Ulysses',
            'Isolde',
            'Clio',
            'DHC 32',
            'DHC 36',
            'Aberdeen Meadows',
            'Mariposa' ])
        );
        expect(getModelList(productsMakesModels, 'pedal')).toEqual(new Set([
                'Delphi', 'Vendome' 
            ])
        );
        expect(getModelList(productsMakesModels, 'lever-free')).toEqual(new Set([
            'Harpsicle' 
            ])
        );
        expect(getModelList(productsMakesModels, 'all', null)).toEqual(new Set(['Delphi',
            'Irish 34',
            'Encore 34',
            'Vendome',
            'Korrigan',
            'Hermine',
            'Musaline',
            'Ulysses',
            'Isolde',
            'Clio',
            'DHC 32',
            'DHC 36',
            'Harpsicle',
            'Aberdeen Meadows',
            'Mariposa' 
        ]));
    });   
});
describe('getModelListForMaker function', () => {
    testParams(
        'should throw the following message when no product list', 
        'from getModelListForMaker: productMakesModels parameter empty',
        getModelListForMaker,
        [null, "Camac"]
    );
    testParams(
        'should throw the following message when no maker',
        'from getModelListForMaker: maker parameter empty',
        getModelListForMaker,
        [productsMakesModels, null]
    ); 
          
    test('should return correct model list', ()=> {
        expect(getModelListForMaker(productsMakesModels, 'Camac')).toEqual([
            'Vendome',
            'Korrigan',
            'Hermine',
            'Musaline',
            'Ulysses',
            'Isolde',
            'Clio',
            'DHC 32',
            'DHC 36'
        ]);
    });
});
