import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigator/StackNavigator';
import { ProductProvider } from './src/context/ProductProvider';


const App = (): JSX.Element => {

  const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
      <ProductProvider>
        { children }
      </ProductProvider>
    )
  }

  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App
