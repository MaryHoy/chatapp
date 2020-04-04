import KeyboardSpacer from "react-native-keyboard-spacer";
import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import "firebase/firestore";

export default class Chat extends React.Component {
  constructor() {
    super();


    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDpsUGNeTK2kiTFEOxRe71XX9hiYRg0CtE",
        authDomain: "chatapp-4f61a.firebaseapp.com",
        databaseURL: "https://chatapp-4f61a.firebaseio.com",
        projectId: "chatapp-4f61a",
        storageBucket: "chatapp-4f61a.appspot.com",
        messagingSenderId: "485262823540",
        appId: "1:485262823540:web:8ea1f4770a85cc2759c121",
        measurementId: "G-FBXSVB6E2Z"
      })
    }

    this.referenceMessageUser = null;
    this.referenceMessages = firebase.firestore().collection('messages')

    this.state = {
      messages: [],
      uid: 0
    };
  }

  //places user name in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: this.state.uid,
      id: this.state.uid,
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach(doc => {
      // get the QueryDocumentSnapshot data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages
    });
  };

  addMessage() {
    console.log(this.state.messages[0].user)
      this.referenceMessages.add({
        _id: this.state.messages[0]._id,
        text: this.state.messages[0].text || '',
        createdAt: this.state.messages[0].createdAt,
        user: this.state.messages[0].user,
        uid: this.state.uid,
    });
  }

  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  componentDidMount() {
    // listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: "Hello"
      });

      // create a reference (messages)
      this.referenceMessageUser = firebase.firestore().collection("messages");
      // listen for collection change
      this.unsubscribeMessageUser = this.referenceMessageUser.onSnapshot(this.onCollectionUpdate);
    });
    this.setState({
    messages: [
      {
      _id: 2,
      text: this.props.navigation.state.params.name + " has entered the chat",
      createdAt: new Date(),
      system: true,
    }
    ]
  })
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeMessageUser();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.navigation.state.params.color
        }}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});