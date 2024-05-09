
import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';


const openConfirm = (message, onCancel, onConfirm) => {
  // State to manage the visibility of the modal
  const [isVisible, setIsVisible] = useState(true);

  // Function to close the modal and execute onCancel or onConfirm
  const closeModal = (callback) => {
    setIsVisible(false);
    callback();
  };

  return { isVisible, closeModal };
};



const ConfirmationModal = ({ message, onClose, onCancel, onConfirm }) => {
  return (
    <Modal
      visible={true} // Since we are managing visibility within the component, always set it to true
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text>{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {openConfirm}
export default ConfirmationModal