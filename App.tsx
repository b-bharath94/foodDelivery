/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import CartScreen from './src/screens/CartScreen';



function App(): React.JSX.Element {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="OTPVerification" component={OtpScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen options={{headerShown: false}} name="ItemDetails" component={ItemDetailsScreen} />
        <Stack.Screen options={{headerShown: false}} name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
