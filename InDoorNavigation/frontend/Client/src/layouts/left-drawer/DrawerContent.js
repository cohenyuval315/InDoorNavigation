import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import { useDrawer } from '../../contexts/DrawerContext';

const user = {
    name: 'User Name',
    email: 'user@example.com',
    isAdmin: true,
};

const DrawerContent = () => {
    const {close} = useDrawer()
    const navigation = useNavigation();


    const navigateToPage = (screen) => {
        navigation.navigate(screen)
        close();

    }
    const onHomePress = () => {
        navigateToPage("buildings-global-map")
    }

    const onRecentPress = () => {
        navigateToPage("recent-destinations")
    }

    const onDataPointPress = () => {
        navigateToPage("data-points-collection")
    }

    const onDataRoutePress = () => {
        navigateToPage("data-routes-collection")
    }

    const onLogOutPress = () => {
        // navigateToPage("")
    }

    const onSettingsPress = () => {
        navigateToPage("settings")
    }
    const onAboutPress = () => {
        navigateToPage("about")
    }

    const onHelpCenterPress = () => {
        navigateToPage("help-center")
    }

    const onFeedbackPress = () => {
        navigateToPage("feedback")
    }

    const onProfilePress = () => {
        navigateToPage("profile")
    }

    return (
        <View style={styles.container}>
            {/* User Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>A</Text>
                </View>
                <Text style={styles.profileText}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
                {user.isAdmin && <Text style={styles.adminLabel}>Admin</Text>}
            </View>
            <View style={styles.sectionDivider} />

            {/* Main Screens Section */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem} onPress={onHomePress}>
                    <Icon name="home" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={onRecentPress}>
                    <Icon name="place" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Recent Destinations</Text>
                </TouchableOpacity>
                {user.isAdmin && (
                    <>
                        <TouchableOpacity style={styles.menuItem} onPress={onDataPointPress}>
                            <Icon name="data-usage" size={24} color="#333" />
                            <Text style={styles.menuItemText}>
                                Data Point Collection
                                <Text style={{
                                    color:"red"
                                }}>
                                    {" *admin*"}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={onDataRoutePress}>
                            <Icon name="route" size={24} color="#333" />
                            <Text style={styles.menuItemText}>
                                Data Route Collection
                                <Text style={{
                                    color:"red"
                                }}>
                                    {" *admin*"}
                                </Text>

                            </Text>
                        </TouchableOpacity>                    
                    </>
                )}

            </View>
            <View style={styles.sectionDivider} />

            {/* About, Help, Feedback Section */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem} onPress={onAboutPress}>
                    <Icon name="info" size={24} color="#333" />
                    <Text style={styles.menuItemText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={onHelpCenterPress}>
                    <Icon name="help" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Help Center</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={onFeedbackPress}>
                    <Icon name="feedback" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Feedback</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionDivider} />

            {/* Settings and Logout Section */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.menuItem} onPress={onSettingsPress}>
                    <Icon name="settings" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={onLogOutPress}>
                    <Icon name="logout" size={24} color="#333" />
                    <Text style={styles.menuItemText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    profileSection: {
        paddingBottom: 16,
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarText: {
        fontSize: 36,
        color: '#555',
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 14,
        color: '#888',
    },
    adminLabel: {
        fontSize: 14,
        color: '#f00',
        marginTop: 4,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 8,
    },
    section: {
        marginTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 16, // Add space between icon and text
    },
});

export default DrawerContent;
