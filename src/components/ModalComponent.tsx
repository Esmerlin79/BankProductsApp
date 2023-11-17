import React, { useRef, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Animated, 
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';
import theme from '../themes/theme';
import { CustomButton } from './CustomButton';


interface ModalComponentProps {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({ isVisible, title, onConfirm, onClose }) => {
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown" useNativeDriver style={{ margin: 0, padding: 0,}}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View style={ styles.headerModal }>
                 <Icon 
                    name={'close'} 
                    size={20} 
                    color={theme.gray} 
                    onPress={  onClose }
                    testID="close-button"
                />
            </View>

            <View style={ styles.titleContent}>
                <Text style={ styles.title }>{ title }</Text>
            </View>

            <View style={ styles.divider } />

            <View style={ styles.contentButton }>
                <CustomButton 
                    onPress={() => onConfirm()}
                    title="Confirmar"
                    backgroundColor={ theme.yellow }
                    color={ theme.darkBlue }
                />

                <CustomButton 
                    onPress={() => onClose()}
                    title="Cancelar"
                    backgroundColor={ theme.purple }
                    color={ theme.darkBlue }
                />
            </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.lightWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  headerModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 60,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.lightGrey,
  },
  titleContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 17,
    color: theme.black,
    textAlign: 'center'
  },
  divider: {
    borderWidth: 1,
    borderColor: theme.lightGrey,
  },
  contentButton: {
    padding: 20
  }
});