import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Text, View, StyleSheet } from "react-native";
import { Button, Avatar, ListItem } from "react-native-elements";

import firebase from "../../database/firebase";

const HomeScreen = (props) => {
  const [contacts, setState] = useState([]);

  useEffect(() => {
    firebase.db.collection("contacts").onSnapshot((querySnapshot) => {
      const constacts = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone,photo } = doc.data();
        constacts.push({
          id: doc.id,
          name: name,
          email: email,
          phone: phone,
          photo: photo
        });
      });
      setState(constacts);
    });
  }, []);
  
  const handleAvartar = (element) =>{
    if(element.photo !== ''){
      
      return(
            <Avatar 
        source={{
            uri: element.photo,
          }}
        rounded></Avatar>
      )
      
  }
  else{
      return (
        <Avatar
        title={`${element.name[0].toUpperCase()}`}
        titleStyle={styles.avatar}
        rounded
      />
   )   
  }
}


  const renderList = () => {
    if (contacts.length !== 0) {

        return contacts.map((contact) => {
        return (
          <ListItem
            key={contact.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("DetailsContactScreen", {
                contactId: contact.id,
              })
            }
          >
            {handleAvartar(contact)}
          
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {contact.name}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {contact.phone}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={25} />
          </ListItem>
        );
      });
    } else {
       
      return (
        <View style={styles.messageContainer} >
          <Text style={styles.message}>Sem Contatos</Text>
        </View>
      );
    }
  };

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
    
      {renderList()}
     
    </ScrollView>
    <View style={styles.buttonContainer}>
    <Button
        icon={{
          name: "add",
          size: 30,
          color: "white"
        }}
        buttonStyle={styles.btn}
        onPress={() => props.navigation.navigate("CreateContact")}
        containerStyle={{borderRadius:100}}
        
      />
     </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#051121",
    
  },
  buttonContainer:{
    position: 'absolute',
    bottom: 0,
    right:30,
    marginBottom:30,
  },
  btn: {
    backgroundColor: "#186EDE",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 100,
    
  },
  avatar: {
    color: "#fff",
    backgroundColor: "#051121",
    fontWeight: "600",
    padding: 15,
    fontSize: 15,
    width: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 15,
  },
  message: {
      fontSize:20,
      justifyContent: 'center',
      color:'#fff'
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  avatarContainer:{
    width:200
  }
});

export default HomeScreen;
