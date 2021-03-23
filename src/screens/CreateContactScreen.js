import React,{useState} from 'react'
import { Alert } from 'react-native'
import { ScrollView,TextInput,StyleSheet } from 'react-native'
import {Button} from 'react-native-elements'
import firebase from '../../database/firebase'

const CreateContactScreen = (props) => {
   
    const [state,setState] = useState({
        name: '',
        email:'',
        phone:''
    })
    //alguma coisa

    const handleChangeText = (name,value)=>{
        setState({...state,[name]:value})
    }
    
    const saveContact = async ()=>{
        if(state.name == ''){
            Alert.alert('O nome é obrigatório')
        }else{
            try {
                await firebase.db.collection('contacts').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
                props.navigation.navigate('Home')
            } catch (error) {
                console.log(error)
                Alert.alert('Ops!! Parece que ocorreu um erro! \n Tente Novamente')
            }
        }
    }

    return (
        
       <ScrollView style={styles.container}>
           <TextInput 
                style={styles.input} 
                placeholder="Nome"
                placeholderTextColor="#AAB7B8" 
                onChangeText={(value)=> handleChangeText('name',value)}
                />

                
           <TextInput 
                style={styles.input} 
                placeholder="E-mail"
                placeholderTextColor="#AAB7B8" 
                onChangeText={(value)=> handleChangeText('email',value)}
                />
           <TextInput 
                style={styles.input} 
                placeholder="Telefone"
                placeholderTextColor="#AAB7B8" 
                onChangeText={(value)=> handleChangeText('phone',value)}
                />
           <Button 
                buttonStyle={styles.button} 
                title="Salvar"
                onPress={()=>saveContact()}
                />
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        backgroundColor: '#091C36'
    },
    input:{
        fontSize:24,
        marginTop:10,
        color:'#fff',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    button:{
        marginTop: 20,
        backgroundColor: '#186EDE',
        fontSize: 24,
    }
})

export default CreateContactScreen
