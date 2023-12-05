
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Detailsscr from '../../screen/Detailsscr/Detailsscr';

import Frontscr from '../../screen/Frontscr/Frontscr';
import Welcome from '../../screen/welcomescr/welcome';


const Stacknavigation = () => {
  const Stack = createNativeStackNavigator();
 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcomescr" component={Welcome} options={{headerShown:false}}/>
      <Stack.Screen name="frontscr" component={Frontscr}  options={{headerShown:false}}/>
      <Stack.Screen name="Detailsscr" component={Detailsscr}  options={{headerShown:false}}/>
      
    </Stack.Navigator>
  );
};

export default Stacknavigation;
