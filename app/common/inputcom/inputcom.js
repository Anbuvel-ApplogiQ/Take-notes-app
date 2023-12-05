import { StyleSheet, Text, TextInput, View,keyboardtype} from 'react-native'
import React from 'react'
import color from '../color/color'

const Inputcom = ({onChangeText,placeholder,error,value,}) => {
  return (
    <View>
    <View style={[styles.inputcontainer,error&&styles.errorinputcontainer]}>
      <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={color.TEXT}
      value={value}
     
      />
    </View>
    {error && (
        <Text style={{marginTop: 7,marginLeft:20, color:"red", fontSize: 15}}>
          {error}
        </Text>
      )}
      </View>
  )
}

export default Inputcom

const styles = StyleSheet.create({
    input:{
        paddingLeft:10
    },
    
    inputcontainer:{
        borderWidth:1,
        borderRadius:10,
        borderColor:color.LIGHT,
    },
    errorinputcontainer:{
        borderWidth:1,
        borderRadius:20,
        borderColor:color.ERROR

    }
})