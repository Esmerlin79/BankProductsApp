import { 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,
} from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome5';

import theme from "../themes/theme"

interface Props {
    goToDetails: () => void;
    name: string;
    id: string
}

export const ProductCard = ({ name, id, goToDetails }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => goToDetails()}
            style={ styles.container }
            testID="product-card"
        >
            <View style={{ flex: 1 }}>
                <Text style={ styles.textTitle }>{ name }</Text>
                <Text style={ styles.textDescription }>ID: { id } </Text>
            </View>

            <Icon 
                name={'angle-right'} 
                size={24} 
                color={ theme.gray } 
                style={{ marginTop: 10 }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 75,
        padding: 15,
        display: 'flex',
        flexDirection: 'row' 
    },
    textTitle: {
        color: theme.black,
        fontSize: 16,
    },
    textDescription: {
        color: theme.gray,
        fontSize: 16,
    },
})