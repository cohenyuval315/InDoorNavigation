import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';


const ActionValidationModal = ({ action, modalVisible, closeModal }) => {
    const handleOk = () => {
      action();
      closeModal();
    };
  
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Are you sure you want to proceed?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="OK" onPress={handleOk} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  export default ActionValidationModal;