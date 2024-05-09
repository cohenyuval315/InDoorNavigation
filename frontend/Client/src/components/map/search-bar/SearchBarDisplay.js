import { Text, View,Linking,Platform, Dimensions,TouchableOpacity, TextInput ,StyleSheet } from "react-native";
import { BackHandler,Animated  } from 'react-native';
import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView, BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width: SCREEN_WIDTH } = Dimensions.get('screen');



const SearchBarDisplay = (props) => {
    const {
      items,
      isSearchFullyOpened,
      onCollapse,
      onIsSearchFullyOpenedChange,
      onSearchItemPress,
      SearchScreen
    } = props;

  const [textInput,setTextInput] = useState("");
  const opacity = useState(new Animated.Value(0))[0];
    useEffect(() => {
        const backAction = () => {
          // Return true to prevent default behavior (closing the app)
          // Return false to allow default behavior (close the app)
          // Replace the below logic with your custom behavior
          onCollapse();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
    
      }, []);    


      

      const filterItems = () => {
          if (!textInput.trim()) {
            return Object.values(items);
          }
          return Object.values(items).filter(item =>
            item.details.title.toLowerCase().includes(textInput.toLowerCase())
          );
        };    

      const onTextChange = (text) => {
        setTextInput(text);
      }
      const onInputPress = () => {
        onIsSearchFullyOpenedChange(true);
      }



      useEffect(() => {
        Animated.timing(opacity, {
          toValue: isSearchFullyOpened ? 1 : 0,
          duration: 300, 
          useNativeDriver: true, 
        }).start();
      }, [isSearchFullyOpened]);
    

    return (
        <View style={{
            flex:1,
            width:"100%",
        }}>
            <View style={{
              marginHorizontal:"12%",
              flexDirection:"row",
              justifyContent:"center",
              alignItems:"center",

            }}>
              <Ionicons name={"search-outline"} size={30} color={"black"} />
              <BottomSheetTextInput
                  
                  style={searchStyles.input}
                  value={textInput}
                  
                  onPressIn={onInputPress}
                  textContentType="location"
                  
                  placeholderTextColor={"gray"}
                  placeholder="Search for a Item..."
                  onChangeText={onTextChange}
              />
            </View>

            <Animated.View style={{ flex:1,height:"100%",opacity }}>
              {isSearchFullyOpened && 
                <SearchScreen 
                  filteredItems={filterItems()} 
                  {...props}
                />
              }
            </Animated.View>

        </View>
    )
}

const searchStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 5,
    },
    indicator: {
      alignSelf: 'center',
      width: (8 * SCREEN_WIDTH) / 100,
      height: 5,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
      // textAlign:"center",
      marginLeft:20,
      backgroundColor:"#F0F0F0",
      width:"100%",
      color:"black",
      marginTop: 8,
      marginBottom: 10,
      borderRadius: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 8,
      // backgroundColor: 'rgba(151, 151, 151, 0.25)',
      borderColor:"black",
      borderWidth:1,
    },
  });

export default SearchBarDisplay