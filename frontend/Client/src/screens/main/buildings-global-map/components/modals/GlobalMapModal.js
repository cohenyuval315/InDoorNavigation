import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const GlobalMapModal = ({ children, visible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: 20
            }}>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    alignItems: "center",
                    elevation: 5 // Android elevation for shadow
                }}>
                    {children}
                    <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
                        <Ionicons
                            name={"close-circle-outline"}
                            size={30}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default GlobalMapModal;
