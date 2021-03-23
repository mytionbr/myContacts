import React,{useState} from 'react'
import { Alert,ScrollView,TextInput,StyleSheet, View,TouchableOpacity,Image } from 'react-native'
import {Button, Icon} from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import firebase from '../../database/firebase'
import * as ImagePicker from 'expo-image-picker';

const CreateContactScreen = (props) => {
   
    const [state,setState] = useState({
        name: '',
        email:'',
        phone:'',
        photo:''
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

    const renderPhote = ()=>{
        if(state.photo !== ''){
            console.log('osdofjdoasfjdiosajfoisdj'+state.photo)
            return(
                  <Avatar 
              style={styles.photo} 
              source={{
                  uri: state.photo,
                }}
              rounded></Avatar>
            )
            
        }
        else{
            return (
                <Avatar 
                style={styles.photo} 
                title={'Foto'}
                rounded></Avatar>
         )   
        }
    }

    

     const handlePhoto = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
           
        
            if (!result.cancelled) {
              setState({
                ...state,['photo']:result.uri
              });
            }
          };
    

    return (
        
       <ScrollView style={styles.container}>
           
           <TouchableOpacity style={styles.avatar}
                onPress={()=>handlePhoto()}
            >
                {renderPhote()}
                
           </TouchableOpacity>
          
           
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
                title='Salvar'
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
    },
    avatar:{
        marginBottom:10,
        marginTop:10,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        
    },
    photo: {
        color: "#fff",
        backgroundColor: "#051121",
        fontWeight: "600",
        padding: 0,
        fontSize: 15,
        width: 120,
        height:120,
        borderRadius:20
    }
})

export default CreateContactScreen
