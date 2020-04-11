import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import react Navigation
import Start from './components/Start';
import Chat from './components/Chat';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import the screens
const firebase = require("firebase"); 
require("firebase/firestore");

// Create the navigator
const navigator = createStackNavigator({
    Start: { screen: Start},
    Chat: { screen: Chat}
});

const navigatorContainer = createAppContainer(navigator);
// Export as the root component
export default navigatorContainer;