import {Image, Pressable, StyleSheet, Text, View,} from 'react-native';
import React from 'react';
import Labelcom from '../../common/label/label';
import Inputcom from '../../common/inputcom/inputcom';
import color from '../../common/color/color';
import {Formik} from 'formik';
import { ScrollView } from 'react-native';

const Welcome = ({navigation}) => {
 
  return (
   

    <View style={{backgroundColor:color.WHITE}}>
  
       
      <View style={styles.title}>
        <Image  style={styles.image}source={require('../../Assets/png/laptop-coffee-computer-the-work.jpg')}/>
        <Text style={styles.titletext}>welcome to Take Notes</Text>
      </View>
      <Formik 
      initialValues={{
        Name:""
      }}
      validate={values=>{
        const errors = {};
        if (!values.Name) {
            errors.Name = 'Required Name';
        }
          return errors;
      }}
      onSubmit={(values,{errors})=>{
        setTimeout(() => {
        const errorObject = errors ?? {};
            const length = Object.keys(errorObject).length;
            console.log(Object.keys(errorObject).length);
            if (length === 0) {
            navigation.navigate("frontscr",{input:values});

            }},400);

      }}
      
      >
      {({  values,
          errors,
          handleChange,
          handleSubmit,
          }) => (
      <View style={styles.container}>
        <Labelcom title="Enter your Name" />
        <Inputcom placeholder="Enter Your Name"
        value={values.Name}
        onChangeText={handleChange("Name")}
        error={errors.Name}
         />
        <Pressable style={styles.btncontainer} onPress={handleSubmit}>
            <Text style={styles.btntext}>let's go!</Text>
        </Pressable>
      </View>
      )}
      </Formik>
      
    </View>
    
  );
};

export default Welcome;

const styles = StyleSheet.create({
    title:{
        width:"100%",
        height:"63%",
        justifyContent:"center",
        alignItems:"center",
    },
    image:{
        marginTop:-10,
        width:"100%",
        height:"90%",
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50

    },
    titletext:{
        fontSize:30,
        fontWeight:"500",
        color:color.TEXT,
        textTransform:"capitalize"
    },
    container:{
        marginHorizontal:20,
        marginVertical:10,
        gap:20,
        // backgroundColor:color.BACKGROUND
    },
    btncontainer:{
        width:"100%",
        height:"20%",
        backgroundColor:color.PRIMARY,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5
    },btntext:{
        fontSize:24,
        fontWeight:"500",
        color:color.TEXT,
        textTransform:"capitalize"
        
    }
});
