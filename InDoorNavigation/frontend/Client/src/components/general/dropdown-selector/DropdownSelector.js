import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use MaterialIcons or another icon library


const DropdownSelector = ({
    options,
    selectedText,
    onChange,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFloorSelect = (item) => {
        onChange(item)
        setIsDropdownOpen(false);
    };

    return (
        <View style={styles.container}>
            {/* Dropdown Button */}
            <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{`${selectedText}`}</Text>
                <Icon name={isDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#fff" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            <Modal
                transparent={true}
                visible={isDropdownOpen}
                onRequestClose={() => setIsDropdownOpen(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setIsDropdownOpen(false)}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => `f-${item.label}_${item.value}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleFloorSelect(item.value)}
                                >
                                    <Text style={styles.dropdownText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        elevation: 4, // Add shadow effect for Android
        shadowColor: '#000', // Add shadow effect for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 120,
        elevation: 4, // Add shadow effect for Android
        shadowColor: '#000', // Add shadow effect for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});

export default DropdownSelector;
