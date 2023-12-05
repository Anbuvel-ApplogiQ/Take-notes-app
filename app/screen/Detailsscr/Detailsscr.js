import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import color from '../../common/color/color';
import Labelcom from '../../common/label/label';
import Inputcom from '../../common/inputcom/inputcom';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detailsscr = ({ navigation }) => {
  const saveNotes = async (newNotes) => {
    try {
      // Load existing notes from AsyncStorage
      const existingNotes = await AsyncStorage.getItem('notes');
      const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

      // Add the new note to the array
      notesArray.push(newNotes);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('notes', JSON.stringify(notesArray));

      console.log(newNotes, 'saved');
      navigation.navigate('Frontscr',  { screen: 'Frontscr', params: { inputvalue:{newNotes:newNotes} } });
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  return (
    <View style={{ backgroundColor: color.WHITE, flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Take notes</Text>
      </View>
      <Formik
        initialValues={{
          Title: '',
          Description: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.Title) {
            errors.Title = 'Required Title';
          }
          if (!values.Description) {
            errors.Description = 'Required Description';
          }
          return errors;
        }}
        onSubmit={(values, { errors }) => {
          setTimeout(() => {
            const errorObject = errors ?? {};
            const length = Object.keys(errorObject).length;
            if (length === 0) {
              saveNotes(values);
            }
          }, 400);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <View style={styles.container}>
            <View style={{ gap: 10, width: '80%' }}>
              <Labelcom title="Title" />
              <Inputcom
                placeholder=" Enter a Title"
                value={values.Title}
                onChangeText={handleChange('Title')}
                error={errors.Title}
              />
            </View>
            <View style={{ gap: 10, width: '80%' }}>
              <Labelcom title="Description" />
              <View
                style={[
                  styles.inputcontainer,
                  errors.Description && styles.errorsinputcontainer,
                ]}
              >
                <TextInput
                  style={styles.inputtext}
                  multiline
                  numberOfLines={5}
                  placeholder="Enter your Description"
                  placeholderTextColor={color.TEXT}
                  onChangeText={handleChange('Description')}
                />
              </View>
              {errors ? (
                <Text style={{ marginTop: 0, marginLeft: 20, color: 'red', fontSize: 15 }}>
                  {errors.Description}
                </Text>
              ) : null}
            </View>

            <Pressable style={styles.btncontainer} onPress={handleSubmit}>
              <Text style={styles.btntext}>SAVE</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Detailsscr;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: color.PRIMARY,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 20,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    color: color.WHITE,
    fontSize: 30,
  },
  inputcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.LIGHT,
  },
  inputtext: {
    paddingHorizontal: 5,
  },
  btncontainer: {
    width: '80%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.PRIMARY,
    borderRadius: 5,
  },
  btntext: {
    fontSize: 20,
    fontWeight: '400',
    color: color.WHITE,
  },
  errorsinputcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.ERROR,
  },
});
