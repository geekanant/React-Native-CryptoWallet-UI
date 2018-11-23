import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase'
import { TextInput } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
const config={
  apiKey: "AIzaSyCxHcv5QdpDz6OoHQjqDwD6p40v3BhEij0",
     authDomain: "youp-b75c4.firebaseapp.com",
     databaseURL: "https://youp-b75c4.firebaseio.com",
     projectId: "youp-b75c4",
     storageBucket: "youp-b75c4.appspot.com",
     messagingSenderId: "47463672184"

};

firebase.initializeApp(config);
const database = firebase.database();

 export default class App extends React.Component {
constructor(props){
  super(props)

  this.state=({
    email:'',
    password:''
  })
  console.ignoredYellowBox = [
'Setting a timer'
];
}

signUpUser=(email,password)=> {
 firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>
    {
      const userId = firebase.auth().currentUser.uid

   firebase.database().ref(`UsersList/${userId}`).set({
       email,
     password
   })
    })
}

loginUser=(email,password)=>{
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((userData) =>
      {

          

      }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
}
  render() {

    return (
      <View style={styles.container}>
            <Text>Sign Up</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
               value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <Button title="Sign Up" onPress={()=>this.signUpUser(this.state.email,this.state.password)} />
            <Button
              title="Already have an account? Login"
            onPress={()=>this.loginUser(this.state.email,this.state.password)}
            />
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
});
