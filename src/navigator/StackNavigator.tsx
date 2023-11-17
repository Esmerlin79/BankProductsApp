import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { 
  ProductDetailsScreen,
  ProductRegisterScreen,
  ProductsScreen 
} from "../screen";
import { Product } from "../interfaces";


export type ProductsStackParams = {
  ProductsScreen: {};
  ProductDetailsScreen: { product: Product };
  ProductRegisterScreen: { product?: Product};
}

const Stack = createStackNavigator<ProductsStackParams>();

const StackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >

        <Stack.Screen name="ProductsScreen" component={ ProductsScreen } />
        <Stack.Screen name="ProductDetailsScreen" component={ ProductDetailsScreen } />
        <Stack.Screen name="ProductRegisterScreen" component={ ProductRegisterScreen } />
    </Stack.Navigator>
  );
}

export default StackNavigator 