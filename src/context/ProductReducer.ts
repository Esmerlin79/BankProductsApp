import { Product } from "../interfaces";
import { ProductState } from "./ProductProvider";


type ProductActionType = 
| { type: 'LOADING PRODUCT', payload: boolean }
| { type: 'LOAD PRODUCTS', payload: Product[] }
| { type: 'CREATE PRODUCT', payload: Product }
| { type: 'UPDATE PRODUCT', payload: Product }
| { type: 'DELETE PRODUCT', payload: string }

export const productReducer = ( state: ProductState, action: ProductActionType) => {
    switch (action.type) {
        case 'LOADING PRODUCT':
            return {
                ...state,
                loading: action.payload
            }

        case 'LOAD PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'CREATE PRODUCT':
            return {
                ...state,
                products: [ ...state.products, action.payload ]
            }

        case 'UPDATE PRODUCT':
            return {
                ...state,
                products: state.products.map( product => {
                    if(product.id === action.payload.id) return action.payload
                    return product;
                })
            }

        case 'DELETE PRODUCT':
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload )
            }
    
        default:
            return state
    }
}