import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen.jsx';
import AllEventsScreen from './Screens/AllEventsScreen.jsx';
import InfoScreen from './Screens/InfoScreen.jsx';
import CombinedScreen from './Screens/CombinedScreen.jsx';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="AllEvents" component={AllEventsScreen} options={{headerShown:false}}/>
      <Stack.Screen name="InfoScreen" component={InfoScreen} options={{headerShown:false}}/>
      <Stack.Screen name="CombinedScreen" component={CombinedScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
