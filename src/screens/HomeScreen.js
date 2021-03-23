import React,{useState,useEffect} from 'react'
import { Alert,ScrollView,Text, View,StyleSheet } from 'react-native'
import {Button,Avatar,ListItem} from 'react-native-elements'

import firebase from '../../database/firebase'

const HomeScreen = (props) => {
    
    const [contacts,setState] = useState([])

    useEffect( ()=>{
        firebase.db.collection("contacts").onSnapshot((querySnapshot)=>{
            const constacts = []
            querySnapshot.docs.forEach(doc=>{
                const {name,email,phone} = doc.data()
                constacts.push({
                    id: doc.id,
                    name: name,
                    email: email,
                    phone: phone
                })
            })
        setState(constacts)
        })
    },[]);

    let message = props.route.params?.message ? <Text style={{color: '#fff'}}>{props.route.params.message}</Text> : <View></View>
    

    return (
        <ScrollView style={styles.container}>
       
            <Button 
                title="Adicionar novo Contato" 
                buttonStyle={styles.btn}  
                onPress={ () => props.navigation.navigate('CreateContact')}   />    
             {message}
       {
           contacts.map(contact=>{
               return(
                <ListItem
                        key={contact.id}
                        bottomDivider
                        onPress={()=>props.navigation.navigate('DetailsContactScreen',{
                            contactId: contact.id
                        })}
                         >
                   
                    <Avatar
                       title={`${(contact.name[0]).toUpperCase()}`}
                       titleStyle={styles.avatar}
                       rounded                        
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>{contact.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitle}>{contact.phone}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron size={25}/>
               </ListItem>
               )
           })
       }
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#051121'
    },
    btn: {
        backgroundColor: '#186EDE',
    },
    avatar:{
        color:'#fff',
        backgroundColor:"#051121",
        fontWeight:'600',
        padding:15,
        fontSize:15,
        width:100,
        
    },
    title:{
        fontSize:20,
        fontWeight:'400'
    },
    subtitle:{
        fontSize:15
    }
})

export default HomeScreen
