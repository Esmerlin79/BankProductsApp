import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface Props {
    title: string,
    onPress: () => void;
    color: string;
    backgroundColor: string;
}
export const CustomButton = ({ title, onPress, backgroundColor, color }: Props) => {
    return (
        <TouchableOpacity
            testID="custom-button-container"
            onPress={ onPress }
            style={{ ...styles.container, backgroundColor }}
        >
            <Text style={{ ...styles.text, color }}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})