import { useEffect, useReducer } from "react";

import { ProductsContext } from "./ProductContext"
import { productReducer } from "./ProductReducer";
import productApi from "../api/productApi";
import { Product } from "../interfaces";


export interface ProductState {
    products: Product[];
    loading: boolean;
}

const PRODUCT_INITIAL_STATE: ProductState = {
    products: [],
    loading: false,
}

export const ProductProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer(productReducer, PRODUCT_INITIAL_STATE);

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
       try {
            dispatch({ type: 'LOADING PRODUCT', payload: true }); 
            const resp = await productApi.get<Product[]>('/bp/products');
            dispatch({ type: 'LOAD PRODUCTS', payload: resp.data }); 
            dispatch({ type: 'LOADING PRODUCT', payload: false });   
       } catch (error: any) {
            return error.response.data;
       }
    }

    const createProduct = async (product: Product) => {
        try {
            const resp = await productApi.post<Product>('/bp/products', product);
            dispatch({ type: 'CREATE PRODUCT', payload: resp.data });   
        } catch (error: any) {
             return error.response.data;
        }
     }

     const editProduct = async (product: Product) => {
        try {
            const resp = await productApi.put<Product>('/bp/products', product);
            dispatch({ type: 'UPDATE PRODUCT', payload: resp.data });   
        } catch (error: any) {
             return error.response.data;
        }
     }

     const deleteProduct = async ( productId: string ): Promise<void> => {
        try {
            await productApi.get<boolean>(`/bp/products?id=${ productId }`);
            dispatch({ type: 'DELETE PRODUCT', payload: productId }); 
        } catch (error: any) {
            return error.response.data;
        }
    }

    const verifyProductId = async ( productId: string ): Promise<boolean> => {
        try {
            const resp = await productApi.get<boolean>(`/bp/products/verification?id=${ productId }`);
            return resp.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    return (
        <ProductsContext.Provider value={{
           ...state,
           verifyProductId,
           createProduct,
           editProduct,
           deleteProduct,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}