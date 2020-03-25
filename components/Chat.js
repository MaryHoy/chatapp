import React, { Component } from 'react';
//import components from react native
import { StyleSheet, Text, Button, View } from 'react-native';

export default class Chat extends React.Component {
  //places users name in navigation bar
  static navigationOptions = ({ navigation }) =>{
    return {
      title: navigation.state.params.name,
    }
  }

  //renders components
  render(){
  return (
    //fullscreen component
    <View style={[styles.container, {backgroundColor: this.props.navigation.state.params.color}] }>
      <Text style={{color: '#FFFFFF'}}>This is your chat screen</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});