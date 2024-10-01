import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ModalBase = ({ 
    children,
    visible, 
    transparent=true, 
    animationType="fade", 
    onClose=null, 
}) => {

    const handleOnClose = () => {
        onClose && onClose();
    }

    return (
        <Modal
        visible={visible}
        transparent={transparent}
        animationType={animationType}
        onRequestClose={handleOnClose}
        >
        <TouchableWithoutFeedback onPress={handleOnClose}>
            <View style={styles.overlay}>
            <TouchableWithoutFeedback>
                {children}
            </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ModalBase;
