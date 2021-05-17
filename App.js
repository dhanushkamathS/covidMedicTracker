import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen'
import AddUserScreen from './screens/AddUserScreen'
import adduserSecondScreen from './screens/AddUserSecondScreen'
import AddUserThirdScreen from './screens/AddUserThirdScreen'
import DisplayUserScreen from './screens/DisplayUserScreen'
import EditUserScreen from './screens/EditUserScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen
          name="mainScreen"
          component={MainScreen}
        />
        <Stack.Screen name="adduserScreen" component={AddUserScreen} />
        <Stack.Screen name="adduserSecondScreen" component={adduserSecondScreen} />
        <Stack.Screen name="adduserThirdScreen" component={AddUserThirdScreen} />
        <Stack.Screen name="displayUserScreen" component={DisplayUserScreen} />
        <Stack.Screen name="editUserScreen" component={EditUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;