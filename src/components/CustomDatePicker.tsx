import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, TextStyle } from 'react-native';

import DatePicker from '@react-native-community/datetimepicker';

import theme from '../themes/theme';
import { format } from 'date-fns';

interface Props {
  placeholder?: string;
  value: string;
  errorInput?: boolean;
  messageError?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  onChange: (value: string) => void;
}

export const CustomDatePicker = ({
  value,
  errorInput,
  messageError,
  style,
  disabled,
  onChange,
}: Props) => {
  
  const [date, setDate] = useState( value ? new Date(value) : new Date() ); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, newDate?: Date) => {
    setShowDatePicker(false);

    if (newDate !== undefined) {
      setDate(newDate);
      onChange(newDate.toISOString());
    }
  };

  useEffect(() => {
    if(value) setDate(new Date(value))
  }, [value])

  return (
    <View>
      <View  
        testID="datePicker"
        style={[
          style,
          { ...styles.inputField, borderColor: errorInput ? theme.red : theme.lightGrey },
          disabled && styles.disabledField,
        ]}
        onTouchEnd={() => setShowDatePicker(!disabled && true)}
      >
        {showDatePicker && (
            <DatePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
        )}
        {!showDatePicker && (
          <Text style={{ ...styles.textDate, color: disabled ? theme.gray : theme.black }}>
            { format(date, 'dd/MM/yyyy') }
          </Text>
        )}
      </View>
        {errorInput && <Text style={styles.text}>{messageError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
  },
  textDate: {
    fontSize: 16,
  },
  text: {
    color: theme.red,
    fontSize: 16,
    marginTop: 5,
  },
  disabledField: {
    backgroundColor: theme.darkGrey,
  },
});
