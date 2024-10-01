import { Text, TouchableOpacity, View } from "react-native";

const CategorySelection = ({ label,categories, selectedCategory, onSelect }) => {
    return (
        <View style={{ 
            flexDirection: 'row',
            alignItems:'center',
            flexWrap:"wrap"
            }}>
            <Text style={{ color: 'black' }}>{label}: </Text>
            {categories.map((category, index) =>
                <TouchableOpacity
                key={index}
                onPress={() => onSelect(category)}
                style={{ backgroundColor: selectedCategory === category ? 
                    'blue' : 
                    'grey', 
                    padding: 10, 
                    margin: 5, 
                    borderRadius: 5 }}
                >
                <Text style={{ color: 'white' }}>{category}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default CategorySelection;