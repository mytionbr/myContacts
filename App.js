import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

import HomeScreen from './src/screens/HomeScreen'
import CreateContactScreen from './src/screens/CreateContactScreen'



function MyContacts(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
              name="Home" 
              options={
                {
                  title:'Lista de contatos',
                  headerStyle:{backgroundColor:'#01060D'},
                  headerTintColor:'#f9f9f9',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center'
                  },
                }}
              component={HomeScreen} 
            />
        <Stack.Screen 
              name="CreateContact" 
              options={
                {
                  title:'Novo Contato',
                  headerStyle:{backgroundColor:'#01060D'},
                  headerTintColor:'#f9f9f9',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                   
                  },
                }}
              component={CreateContactScreen} 
            />

        
    </Stack.Navigator>
   
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <MyContacts />
        <StatusBar translucent='bool'></StatusBar>
      </NavigationContainer>
      
  );
}


