import { createContext } from "react";

import { Product } from "../interfaces";

interface ProductContextProps {
    products: Product[];
    loading: boolean;
    verifyProductId: (productId: string) => Promise<boolean>;
    createProduct: (product: Product) => Promise<any>;
    editProduct: (product: Product) => Promise<any>;
    deleteProduct: (productId: string) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductContextProps);