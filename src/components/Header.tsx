import { 
    StyleSheet,
    View,
    Text 
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5';

import theme from "../themes/theme";

interface Props {
    title: string;
    onBack?: () => void;
    showArrowLeft: boolean;
}
export const Header = ({ title, showArrowLeft, onBack }: Props) => {
    return (
        <View style={{ ...styles.container, justifyContent: showArrowLeft ? 'flex-start' : 'center' }}>

            {showArrowLeft && (
                <Icon 
                    name={'angle-left'} 
                    size={24} 
                    color={theme.gray} 
                    style={{ marginRight: '20%'}} 
                    onPress={  onBack }
                    testID="back-arrow"
                />
            )}

            <View style={ styles.labelHeaderContainer }>
                <View style={ styles.logoBox } />
                <Text style={ styles.text }>{ title }</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.lightGrey,
        padding: 10,
    },
    labelHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    logoBox: {
        width: 20,
        height: 20,
        backgroundColor: theme.yellow,
        marginTop: 5,
    },
    text: {
        color: theme.darkBlue,
        fontSize: 20,
        fontWeight: 'bold'
    }
})