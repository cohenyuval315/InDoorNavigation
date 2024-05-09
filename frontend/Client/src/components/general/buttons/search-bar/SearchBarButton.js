import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchBarButton = ({onPress,placeholder='Building'}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#666" style={styles.icon} />
          <TextInput
            placeholder={`Search ${placeholder}...`}
            placeholderTextColor="#666"
            style={styles.input}
            editable={false}
            pointerEvents="none"
          />
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginHorizontal:10,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      elevation: 2, // For Android elevation
      shadowColor: '#000', // For iOS shadow
      shadowOpacity: 0.3,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
  });

export default SearchBarButton;