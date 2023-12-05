import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../color/color'

const Labelcom = ({title}) => {
  return (
    <View style={styles.container}>
        <View style={styles.textcontainer}>
        <Text style={styles.text}>{title}</Text>
        </View>
     
    </View>
  )
}

export default Labelcom

const styles = StyleSheet.create({
   
    textcontainer:{
        justifyContent:'center',
    },
    
    text:{
        fontSize:20,
        fontWeight:"600",
        color:color.TEXT,
    }

})