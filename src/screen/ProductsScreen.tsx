import { 
    FlatList,
    SafeAreaView,
    StyleSheet, 
    View,
 } from "react-native"
 
import { StackScreenProps } from "@react-navigation/stack";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { 
    Header,
    CustomTextInput,
    ProductCard,
    CustomButton,
 } from "../components"
import theme from "../themes/theme"
import { useForm } from "../hooks/useForm"
import { ProductsStackParams } from "../navigator/StackNavigator"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../context/ProductContext"
import { Product } from "../interfaces"

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {

    const { products, loading } = useContext(ProductsContext);
    const [productsFilter, setProductFilter] = useState<Product[]>(products || [])
    const { search, onChange } = useForm({
        search: ''
    })

    useEffect(() => {
        if(search) {
            setProductFilter(productsFilter.filter( product => product.name.toLowerCase().includes(search.toLowerCase())))
        } else {
            setProductFilter(products);
        }
    }, [search])

    useEffect(() => {
        setProductFilter(products || []);
    }, [products])

    return (
        <SafeAreaView style={ styles.container }>
            <Header 
                title='BANCO PICHINCHA'
                showArrowLeft={ false }
            />

            <View style={ styles.contentProducts }>
                <CustomTextInput 
                    onChange={ (value) => onChange(value, 'search')}
                    placeholder="Search..."
                    value={ search }
                />
                { loading && (
                    <>
                        <ShimmerPlaceholder
                            style={styles.listProductContainer}
                            visible={false}
                        />
                        <ShimmerPlaceholder
                            style={{ ...styles.listProductContainer, marginTop: 10, width: '80%', }}
                            visible={false}
                        />

                        <ShimmerPlaceholder
                            style={{ ...styles.listProductContainer, marginTop: 10 }}
                            visible={false}
                        />
                    </>
                )}

                { (!loading && productsFilter.length > 0) && (
                    <FlatList 
                        data={ productsFilter }
                        style={ styles.listProductContainer }
                        keyExtractor={ (p) => p.id }
                        renderItem={ ({ item }) => (
                            <ProductCard 
                                name={ item.name }
                                key={ item.id }
                                id={ item.id }                                
                                goToDetails={ () => navigation.navigate('ProductDetailsScreen', { product: item })}
                            />
                        )}
                        ItemSeparatorComponent={ () => <View style={ styles.itemSeparator } /> }
                    />
                )}    
            </View>

            <View style={{ flex: 1 }}/>

            <View style={ styles.containerButtons }>
                <CustomButton 
                    onPress={() => navigation.navigate('ProductRegisterScreen', {})}
                    title="Agregar"
                    backgroundColor={ theme.yellow }
                    color={ theme.darkBlue }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.lightWhite,
    },
    contentProducts: {
        marginTop: 40,
        padding: 20,
    },
    listProductContainer: {
        borderWidth: 1,
        borderColor: theme.lightGrey,
        borderRadius: 5,
        marginTop: 40,
    },
    itemSeparator: {
        borderWidth: 0.6,
        borderColor: theme.lightGrey,
        width: '95%',
        alignSelf: 'center'
    },
    containerButtons: {
        width: '100%',
        padding: 20,
        alignSelf: 'center'
    }
})