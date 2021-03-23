import React,{useState,useEffect} from 'react'
import { ScrollView, View, StyleSheet, TextInput,ActivityIndicator,Button,Alert,TouchableOpacity} from 'react-native'
import firebase from '../../database/firebase'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import * as ImagePicker from 'expo-image-picker';

const DetailsContactScreen = (props) => {
    
    const initialState = {
        id: '',
        name: '',
        email:'',
        phone: '',
        photo:''
    }

    const [loading,setLoading] = useState(true)

    const [contact, setContact] = useState(initialState)
    
    const getContactById = async(id)=>{
        const dbRef = firebase.db.collection('contacts').doc(id)
        const doc = await dbRef.get()
        const constact = doc.data()
        console.log(constact)
        setContact({
            ...constact,
            id: doc.id
        })
        setLoading(false)
    }

    useEffect(()=>{
        getContactById(props.route.params.contactId)
    },[])

    if(loading){
        return (
            <View style={styles.loadingContainer}>
                 <ActivityIndicator size={70} color="#00ff00"/>
            </View>
        )
    }

    const handleChangeText = (prop,value)=>{
        setContact({...contact,[prop]:value})
    }

    const updadeContact = async ()=>{
        if(contact.name === ''){
            Alert.alert('O nome é obrigatório')
        }else{
            const dbRef = firebase.db.collection('contacts').doc(contact.id)
            await dbRef.set({
                name:contact.name,
                email:contact.email,
                phone:contact.phone,
                photo:contact.photo
            })
            setContact(initialState)
            props.navigation.navigate('Home')
        }
        }
        
       

    const deleteContact = async ()=>{
        const dbRef = firebase.db.collection('contacts')
                        .doc(props.route.params.contactId)
        await dbRef.delete()
        props.navigation.navigate('Home')
    }

    const messageConfirmAlert = ()=>{
        Alert.alert('Remover contato','Você está certo disso?',
        [
            {text:'Sim', onPress: ()=>deleteContact()},
            {text:'Não', onPress: ()=>console.log(false)}
        ])
    }

    const renderPhote = ()=>{
        if(contact.photo !== ''){
          console.log(contact.photo)
            return(
                  <Avatar 
              style={styles.photo} 
              source={{
                  uri: contact.photo,
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
          setContact({
            ...contact,['photo']:result.uri
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
                value={contact.name}
                onChangeText={(value)=>handleChangeText('name',value)}
             />
            <TextInput 
                style={styles.input}
                value={contact.email}
                placeholder="E-mail"
                placeholderTextColor="#AAB7B8" 
                onChangeText={(value)=>handleChangeText('email',value)}
             />
            <TextInput 
                style={styles.input}
                value={contact.phone}
                placeholder="Telefone"
                placeholderTextColor="#AAB7B8"  
                onChangeText={(value)=>handleChangeText('phone',value)}
                />

        <View  style={styles.btnsGroup}>
            <View style={styles.btnContainer}>
              <Button color={styles.btnUpdate.color} title="Atualizar" onPress={() => updadeContact()} />
            </View>
            <View style={styles.btnContainer}>
              <Button color={styles.btnDelete.color} title="Deletar" onPress={() => messageConfirmAlert()} />
            </View>
        </View>
        
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
        color: '#186EDE',
        fontSize: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: '#091C36'
      },
    btnsGroup:{
        marginTop:20,
        flexDirection:"row",
        alignSelf: 'stretch',
        justifyContent:'space-around'
    },
    btnContainer:{
        width:120 
    },
    btnDelete:{
        color:'#E74C3C'
    },
    btnUpdate:{
        color:'#1ABC9C'
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

export default DetailsContactScreen
