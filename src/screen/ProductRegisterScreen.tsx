import { 
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from "react-native"

import { StackScreenProps } from "@react-navigation/stack"

import theme from "../themes/theme"
import { CustomButton, CustomDatePicker, CustomLoading, CustomTextInput, Header } from "../components"
import { ProductsStackParams } from "../navigator/StackNavigator"
import { validateInputs } from "../utils"
import useProductRegister from "../hooks/useProductRegister";

interface Props extends StackScreenProps<ProductsStackParams, 'ProductRegisterScreen'> {}

export const ProductRegisterScreen = ({ navigation, route }: Props) => {

    const product = route.params?.product;
    const {
        form,
        isLoading,
        onChange,
        isProductIdValid,
        isReleaseDateValid,
        handleReleaseChange,
        clearForm,
        handleCreateOrUpdateProduct,
      } = useProductRegister(product, navigation);

      const { id, name, description, logo, releaseDate, reviewDate } = form;

    return (
        <SafeAreaView style={{ flex: 1 }}>
             <KeyboardAvoidingView
                style={styles.container}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={ false }
                >
                    <Header 
                        title='BANCO PICHINCHA'
                        showArrowLeft={ true }
                        onBack={ () => navigation.pop()}
                    />

                    <View style={ styles.contentProductRegister }>
                        <Text style={ styles.title }>
                            Formulario de { product ? 'Edicción' : 'Registro'}
                        </Text>

                        <View style={{ ...styles.inputGroup, marginTop: 20, }}>
                            <Text style={ styles.text }>ID</Text>
                            <CustomTextInput 
                                onChange={ (value) => onChange(value, 'id')}
                                value={ id }
                                errorInput={ isProductIdValid }
                                messageError="ID no valido"
                                disabled={ product ? true : false }
                            />
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.text }>Nombre</Text>
                            <CustomTextInput 
                                onChange={ (value) => onChange(value, 'name')}
                                value={ name }
                                errorInput={ validateInputs('name', name) }
                                messageError="Este campo es requerido!"
                            />
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.text }>Descripcion</Text>
                            <CustomTextInput 
                                onChange={ (value) => onChange(value, 'description')}
                                value={ description }
                                errorInput={ validateInputs('description', description) }
                                messageError="Este campo es requerido!"
                            />
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.text }>Logo</Text>
                            <CustomTextInput 
                                onChange={ (value) => onChange(value, 'logo')}
                                value={ logo }
                                errorInput={ validateInputs('logo', logo) }
                                messageError="Este campo es requerido!"
                            />
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.text }>Fecha Liberación</Text>
                            <CustomDatePicker 
                                onChange={ (value) => handleReleaseChange(value)}
                                value={ releaseDate }
                                errorInput={ isReleaseDateValid }
                                messageError="La fecha no debe ser menor a la actual"
                            />
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.text }>Fecha Revisión</Text>
                            <CustomDatePicker 
                                onChange={ (value) => onChange(value, 'reviewDate')}
                                value={ reviewDate }
                                disabled
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1 }}/>

                    <View style={ styles.containerButtons }>
                        <CustomButton 
                            onPress={() => handleCreateOrUpdateProduct()}
                            title="Enviar"
                            backgroundColor={ theme.yellow }
                            color={ theme.darkBlue }
                        />

                        <CustomButton 
                            onPress={() => clearForm()}
                            title="Reiniciar"
                            backgroundColor={ theme.purple }
                            color={ theme.darkBlue }
                        />
                    </View>

                    {isLoading && ( <CustomLoading />)}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.lightWhite,
    },
    contentProductRegister: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: theme.black,
        fontWeight: 'bold'
    },
    inputGroup: {
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: theme.black,
        fontWeight: '400',
        marginBottom: 10,
    },
    containerButtons: {
        width: '100%',
        padding: 20,
        alignSelf: 'center'
    }
})