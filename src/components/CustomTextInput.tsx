import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from "react-native"
import theme from "../themes/theme";

interface Props {
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
    errorInput?: boolean;
    messageError?: string;
    disabled?: boolean;
    style?: StyleProp<TextStyle>;
}

export const CustomTextInput = ({ 
    placeholder, 
    value, 
    onChange, 
    errorInput, 
    messageError, 
    disabled,
    style 
}: Props) => {
    
    return (
      <View>
          <TextInput 
                testID="input"
                placeholder={ placeholder }
                placeholderTextColor={ theme.black }
                editable={ !disabled }
                style={[ 
                    style, 
                    { 
                        ...styles.inputField, 
                        borderColor: errorInput ? theme.red : theme.lightGrey,
                        color: disabled ? theme.gray : theme.black
                    },
                    disabled && styles.disabledField, 
                ]}
                autoCapitalize="words"
                autoCorrect={ false }
                onChangeText={ (value) => onChange(value)}
                value={ value }
            />
            { errorInput && (
                <Text style={ styles.text }>{ messageError }</Text>
            )}
      </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        height: 50,
        borderColor: theme.lightGrey,
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: theme.red,
        fontSize: 16,
        marginTop: 5,
    },
    disabledField: {
        backgroundColor: theme.darkGrey,
    },
})