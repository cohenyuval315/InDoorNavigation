import React from 'react';
import {  StyleSheet, Text,TouchableOpacity,View } from 'react-native';


type ChildWrapperProps = {
  isEnabled: boolean,
  hideClose?: boolean,
  onClosePress: () => void,
  children: React.ReactNode,
}

function ChildWrapper({ isEnabled, hideClose, onClosePress, children }: ChildWrapperProps) {

  return (
    <View
      style={[{
        position: isEnabled ? 'relative' : 'absolute',
        margin: 32,
        opacity:1,
        flex:1,
        
      },
      isEnabled ? {} : {
        height:0,
        opacity:0
      }
    ]
    }
    >
      {children}
      {!hideClose && <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={onClosePress}
      >
        <Text style={styles.textStyle}>Close</Text>
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginTop: 16,
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChildWrapper