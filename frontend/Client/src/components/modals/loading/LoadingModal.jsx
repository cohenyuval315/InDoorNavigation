import React from 'react';
import { Modal, ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingModal = ({ visible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContainer: {
        backgroundColor: '#ffffff', // White background for the modal
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default LoadingModal