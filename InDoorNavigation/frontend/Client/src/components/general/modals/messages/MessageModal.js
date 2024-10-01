import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const MessageModal = ({ visible, message, onClose,onOk, title,headerColor,headerBackgroundColor }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay]}>
          <TouchableWithoutFeedback>
            <View style={[styles.container,{
                backgroundColor: headerBackgroundColor ? headerBackgroundColor : "#808080",
            }]}>
                <View style={{
                    width:"100%",
                    // backgroundColor:"white",
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop:10,
                    paddingBottom:10,
                }}>
                    {title && <Text style={[styles.title,{
                        // backgroundColor:"red",
                        color:headerColor ? headerColor : "black",
                    }]}>{title}</Text>}
            </View>
            <View style={{
                backgroundColor:"white",
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                padding:30,
            }}>
                <Text style={[styles.message,{
                    backgroundColor:"white",
                    color:"#333",
                }]}>{message}</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button,{
                    backgroundColor:"#ddd",
                }]} onPress={onOk}>
                <Text style={[styles.buttonText,{
                    
                }]}>OK</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
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
  container: {
    
    // padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#1e90ff',
  },
  confirmButtonText: {
    fontWeight: 'bold',
  },
});

export default MessageModal;
