import React, { Component } from 'react'
import { View, Text,CheckBox } from 'react-native'
import {SafeAreaView,StyleSheet,ScrollView,StatusBar,} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
class Food extends Component{
    render() {
        return (
            <View style= {styles.container}>
    
      <SafeAreaView>
        <ScrollView
        
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            
         
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Food Preference</Text>
              </View>
              <View></View>
             </ScrollView>
             </SafeAreaView>
         </View>
         
        );
      }
    }
export default Food

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
      marginLeft:75,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  }); 
 
  //This is an example code to generate QR code//
  import React, { Component } from 'react';
  //import react in our code.
  import { StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
  import QRCode from 'react-native-qrcode-svg';
  import firebase from 'firebase';

  //import QRCode
   
  class Food extends Component {
    constructor() {
      super();
      this.state = {
        text_input: '',
        // Default Value of the TextInput
        text_output: 'default',
        // Default value for the QR Code
      };
      this.getTextInputValue=this.getTextInputValue.bind(this);
    }

     componentWillMount(){
      var firebaseConfig = {
        apiKey: "AIzaSyDS7BwxJFbxGChF_TDjcQlo1uK09flFIxk",
        authDomain: "ihp-am-poc.firebaseapp.com",
        databaseURL: "https://eventapp2307.firebaseio.com/",
        projectId: "ihp-am-poc",
        storageBucket: "",
        messagingSenderId: "40931477410",
        appId: "1:40931477410:web:4170b8b2a16ffa80"
      };
      firebase.initializeApp(firebaseConfig);
      firebase.database().ref('UserProfile').once('value',(data)=>{
        console.log(data.toJSON());
      }
      )
    } 
    getTextInputValue = () => {
      // Function to get the value from input
      // and Setting the value to the QRCode
      this.setState({ text_output: this.state.text_input });
      console.log(this.state.text_output);
    };
    render() {
      return (
        <View style={styles.Container}>
        <Text style={styles.TextTitle}>URL QR CODE</Text>
        <TextInput
            // Input to get the value to set on QRCode
            style={styles.TextInput}
            onChangeText={text => this.setState({ text_input: text })}
            underlineColorAndroid="transparent"
            placeholder="Enter text to Generate QR Code"
          />
          <TouchableOpacity
            onPress={this.getTextInputValue}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.TextStyle}> Generate QR Code </Text>
          </TouchableOpacity>
          
          <QRCode
            value={this.state.text_output}
           // value="pass"
            //Setting the value of QRCode
            size={250}
            //Size of QRCode
            bgColor="#000"
            //Backgroun Color of QRCode
            fgColor="#fff"
            //Front Color of QRCode
          />
        </View>
        
      );
     
    }
  }
  export default Food;
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      margin: 10,
      alignItems: 'center',
      paddingTop: 20,
    },
    TextInput: {
      width: '100%',
      height: 40,
      borderRadius:10,
      marginBottom: 10,
      marginTop: 20,
      borderWidth: 1,
      borderColor:'#c41f27',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      paddingTop:8,
      paddingBottom:8,
      backgroundColor:'#c41f27',
      borderRadius:7,
      marginBottom:20
      },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
    },
    TextTitle: {
      color: '#c41f27',
      textAlign: 'center',
      fontSize: 18,
    },
  }); 