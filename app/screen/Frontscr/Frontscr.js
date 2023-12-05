import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../common/color/color';
import {Formik} from 'formik';
import Labelcom from '../../common/label/label';
import Inputcom from '../../common/inputcom/inputcom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Frontscr = ({route}) => {
  const {input} = route?.params || {};
  // const { inputvalue } = route?.params || {};
  const [notes, setnotes] = useState([]);
  // ====================model================
  const [modalVisible, setModalVisible] = useState({show: false, type: ''});
  
  const [index, setindex] = useState(0);

  useEffect(() => {
    loadNotes();
  }, []);
  //=================Savenotes=======================
  const saveNotes = async newNotes => {
    try {
      // Load existing notes from AsyncStorage
      const existingNotes = await AsyncStorage.getItem('notes');
      const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

      // Add the new note to the array
      notesArray.push(newNotes);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('notes', JSON.stringify(notesArray));

      console.log(newNotes, 'saved');
      loadNotes();
      setModalVisible({show: false, type: ''});
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };
  // =======================loadnotes===============================
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setnotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };
  // ====================update===============
  const updateData= async (index, newData) => {
    try {
      // Load existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem('notes');
      const dataArray = existingData ? JSON.parse(existingData) : [];
  
      // Check if the index is valid
      if (index >= 0 && index < dataArray.length) {
        // Update the data at the specified index
        dataArray[index] = newData;
  
        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem('notes', JSON.stringify(dataArray));
  
        console.log('Data updated successfully.');
        console.log(dataArray, 'saved');
        loadNotes();
        setModalVisible({show: false, type: ''});
      } else {
        console.error('Invalid index for updating data:', index);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  // =================================delete=======================
  const deleteData = async (index) => {
    try {
      const existingData = await AsyncStorage.getItem('notes');
      const dataArray = existingData ? JSON.parse(existingData) : [];
      if (index >= 0 && index < dataArray.length) {
        dataArray.splice(index, 1);
        await AsyncStorage.setItem('notes', JSON.stringify(dataArray));
        console.log('Data deleted successfully.');
        console.log(dataArray, 'saved');
        loadNotes();
        setModalVisible({show: false, type: ''});
      } else {
        console.error('Invalid index for deleting data:', index);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  


  // =============================================================
  const editmodel = index => {
    setModalVisible({show: true, type: 'update'});
    setindex(index);
  };

  return (
    <View style={{backgroundColor: color.WHITE, flex: 1}}>
     
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible.show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible({show: false, type: ''});
        }}>
        <View style={{backgroundColor: color.WHITE, flex: 1}}>
         
          <View style={styles.modelheader}>
            <Pressable onPress={()=> setModalVisible({show: false, type: ''})} style={{marginRight:modalVisible.type==="update"?20:60,marginLeft:modalVisible.type==="update"?0:-70}}> 
            <Image source={require('../../Assets/png/back.png')}/>
            </Pressable>
         
            <Text style={styles.modelheadertext}>Take notes</Text>

            {modalVisible.type==="update" ? <Pressable onPress={()=>deleteData(index)} style={{marginLeft:70,width:70,height:40,backgroundColor:"red",borderRadius:10,paddingLeft:2,alignItems:"center",justifyContent:"center"}}> 
             <Text style={{color:color.WHITE,fontSize:20}}>Delete</Text>
            </Pressable>:null}

          </View>
          <ScrollView>
            <Formik
              initialValues={{
                Title: modalVisible.type === 'update' ? notes[index].Title : '',
                Description:
                  modalVisible.type === 'update'
                    ? notes[index].Description
                    : '',
              }}
              validate={values => {
                const errors = {};
                if (!values.Title) {
                  errors.Title = 'Required Title';
                }
                if (!values.Description) {
                  errors.Description = 'Required Description';
                }
                return errors;
              }}
              onSubmit={(values, {errors}) => {
                setTimeout(() => {
                  const errorObject = errors ?? {};
                  const length = Object.keys(errorObject).length;
                  if (length === 0) {
                    {modalVisible.type === 'create' ?  saveNotes(values):updateData(index,values) }
                  }
                }, 400);
              }}>
              {({values, errors, handleChange, handleSubmit}) => (
                <View style={styles.modelcontainer}>
                  <View style={{gap: 10, width: '80%'}}>
                    <Labelcom title="Title" />
                    <Inputcom
                      placeholder=" Enter a Title"
                      value={values.Title}
                      onChangeText={handleChange('Title')}
                      error={errors.Title}
                    />
                  </View>
                  <View style={{gap: 10, width: '80%'}}>
                    <Labelcom title="Description" />
                    <View
                      style={[
                        styles.modelinputcontainer,
                        errors.Description && styles.errorsmodelinputcontainer,
                      ]}>
                      <TextInput
                        style={styles.modelinputtext}
                        multiline
                        numberOfLines={5}
                        placeholder="Enter your Description"
                        placeholderTextColor={color.TEXT}
                        onChangeText={handleChange('Description')}
                        value={values.Description}
                      />
                    </View>
                    {errors ? (
                      <Text
                        style={{
                          marginTop: 0,
                          marginLeft: 20,
                          color: 'red',
                          fontSize: 15,
                        }}>
                        {errors.Description}
                      </Text>
                    ) : null}
                  </View>

                  <Pressable
                    style={styles.modelbtncontainer}
                    onPress={handleSubmit}>
                    <Text style={styles.modelbtntext}>
                      {modalVisible.type === 'create' ? 'Save' : 'Update'}{' '}
                    </Text>
                  </Pressable>
                  {/* {modalVisible.type==='update' ?
                  <View style={{width:"60%",height:"50%"}}>
                  <Pressable style={{backgroundColor:"red"}}>
                    <Text>Delete</Text>
                  </Pressable>
                </View>
                  :null} */}
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headertext}>Hello {input?.Name}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {notes.length > 0 ? (
            <View style={styles.innercontainer}>
              <Pressable
                onPress={() => setModalVisible({show: true, type: 'create'})}
                style={styles.createcontainer}>
                <Image
                  source={require('../../Assets/png/plus.png')}
                  style={{width: 100, height: 100}}
                />
              </Pressable>

              {notes.map((data, index) => (
                <View style={styles.mapcontainer} key={index}>
                  <Pressable
                    style={styles.map}
                    onPress={() => editmodel(index)}>
                    <Text style={styles.maptext}>{data.Title}</Text>
                    <View style={styles.Descriptiontextcontainer}>
                      <Text style={styles.Descriptiontext}>
                        {data.Description}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.innercontainer}>
            <Pressable
                onPress={() => setModalVisible({show: true, type: 'create'})}
                style={styles.createcontainer}>
                <Image
                  source={require('../../Assets/png/plus.png')}
                  style={{width: 100, height: 100}}
                />
              </Pressable>
            <Text>No notes available</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Frontscr;

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
  headertext: {
    color: color.WHITE,
    fontSize: 30,
    textTransform: 'capitalize',
  },
  container: {
    width: '100%',
    height: '90%',
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  imagecontainer: {
    width: '25%',
    height: '12%',
    marginLeft: 270,
  },
  image: {
    paddingVertical: 10,
    width: '100%',
    height: '90%',
    objectFit: 'fill',
  },
  noteItem: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  map: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: color.LIGHT,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },

  mapcontainer: {
    width: '49%',
    height: 150, // Set the desired height or adjust as needed
    marginBottom: 10,
  },
  innercontainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  createcontainer: {
    width: '49%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.LIGHT,
    borderRadius: 10,
  },
  maptext: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '500',
    color: color.PRIMARY,
  },
  Descriptiontext: {
    color: '#000',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  Descriptiontextcontainer: {
    width: '99%',
    height: '70%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  // ================model styling

  modelheader: {
    width: '100%',
    height: '10%',
    backgroundColor: color.PRIMARY,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row"
  },
  modelcontainer: {
    marginVertical: 20,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelheadertext: {
    color: color.WHITE,
    fontSize: 30,
  },
  modelinputcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.LIGHT,
  },
  modelinputtext: {
    paddingHorizontal: 5,
  },
  modelbtncontainer: {
    width: '80%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.PRIMARY,
    borderRadius: 5,
  },
  modelbtntext: {
    fontSize: 20,
    fontWeight: '400',
    color: color.WHITE,
  },
  errorsmodelinputcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.ERROR,
  },
});
