import { useContext, useState } from "react";
import { 
    Alert,
    Image,
    SafeAreaView,
    StyleSheet, 
    Text, 
    View
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { format } from "date-fns";

import theme from "../themes/theme"
import { CustomButton, CustomLoading, Header, ModalComponent } from "../components";
import { ProductsStackParams } from "../navigator/StackNavigator";
import { ProductsContext } from "../context/ProductContext";

interface Props extends StackScreenProps<ProductsStackParams, 'ProductDetailsScreen'> {}

export const ProductDetailsScreen = ({ navigation, route }: Props) => {

    const product = route.params.product;
    const { deleteProduct } = useContext(ProductsContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteProduct = async () => {
        try {
            setModalVisible( false );
            setIsLoading( true );
            await deleteProduct( product.id );
            setIsLoading( false );
            navigation.pop();
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al eliminar el producto', [
                {
                    text: 'Ok',
                    onPress: () => {},
                },
            ]);
            setIsLoading( false );
        }
    }

    return (
        <SafeAreaView style={ styles.container }>
             <Header 
                title='BANCO PICHINCHA'
                showArrowLeft={ true }
                onBack={ () => navigation.goBack() }
                
            />

            <View style={ styles.contentProductsDetails }>
                <Text style={ styles.textTitle }>ID: { product.id }</Text>
                <Text style={ styles.textLabel }>Informacion extra</Text>

                <View style={ styles.infoProduct }>
                    <Text style={ styles.textLabel }>Nombre</Text>
                    <Text style={ styles.textValue }>{ product.name }</Text>
                </View>

                <View style={{ ...styles.infoProduct , marginTop: 20, }}>
                    <Text style={ styles.textLabel }>Descripcion</Text>
                    <Text style={ styles.textValue }>{ product.description }</Text>
                </View>

                <View style={{ ...styles.infoProduct , marginTop: 20, justifyContent: 'flex-start', gap: 50 }}>
                    <Text style={ styles.textLabel }>Foto</Text>
                    <Image 
                        source={{ uri: product.logo }}
                        style={ styles.imageProduct }
                    />
                </View>

                <View style={{ ...styles.infoProduct , marginTop: 20, }}>
                    <Text style={ styles.textLabel }>Fecha liberacion</Text>
                    <Text style={ styles.textValue }>{format(new Date(product.date_release), 'dd/MM/yyyy')}</Text>
                </View>

                <View style={{ ...styles.infoProduct , marginTop: 20, }}>
                    <Text style={ styles.textLabel }>Fecha revision</Text>
                    <Text style={ styles.textValue }>{format(new Date(product.date_revision), 'dd/MM/yyyy')}</Text>
                </View>

            </View>

            <View style={ styles.containerButtons }>
                <CustomButton 
                    onPress={() => navigation.navigate('ProductRegisterScreen', { product })}
                    title="Editar"
                    backgroundColor={ theme.purple }
                    color={ theme.darkBlue }
                />

                <CustomButton 
                    onPress={() => setModalVisible(true)}
                    title="Eliminar"
                    backgroundColor={ theme.red }
                    color={ theme.lightWhite }
                />

            </View>

            <ModalComponent 
                isVisible={modalVisible} 
                title={`¿Estas seguro de eliminar el producto ${ product.name }?`} 
                onConfirm={() => handleDeleteProduct()}
                onClose={() => setModalVisible(false)} 
            />
            {isLoading && ( <CustomLoading />)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.lightWhite,
    },
    contentProductsDetails: {
        marginTop: 20,
        padding: 20,
        flex: 1,
    },
    textTitle: {
        fontSize: 20,
        color: theme.black,
        fontWeight: 'bold'
    },
    textLabel: {
        fontSize: 16,
        color: theme.gray
    },
    textValue: {
        fontSize: 16,
        color: theme.black
    },
    infoProduct: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
    },
    imageProduct: {
        width: 200,
        height: 100,
        marginTop: 20,
        borderRadius: 5,
    },
    containerButtons: {
        width: '100%',
        padding: 20,
        alignSelf: 'center'
    }
})