import React,{useState,useEffect} from 'react'
import { ScrollView, View, StyleSheet, TextInput,ActivityIndicator,Button} from 'react-native'
import firebase from '../../database/firebase'

const DetailsContactScreen = (props) => {
    
    const initialState = {
        id: '',
        name: '',
        email:'',
        phone: ''
    }

    const [loading,setLoading] = useState(true)

    const [contact, setContact] = useState(initialState)
    
    const getContactById = async(id)=>{
        const dbRef = firebase.db.collection('contacts').doc(id)
        const doc = await dbRef.get()
        const constact = doc.data()
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
        const dbRef = firebase.db.collection('contacts').doc(contact.id)
        await dbRef.set({
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        })
        setContact(initialState)
        props.navigation.navigate('Home')
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput 
                style={styles.input}
                value={contact.name}
                onChangeText={(value)=>handleChangeText('name',value)}
             />
            <TextInput 
                style={styles.input}
                value={contact.email}
                onChangeText={(value)=>handleChangeText('email',value)}
             />
            <TextInput 
                style={styles.input}
                value={contact.phone} 
                onChangeText={(value)=>handleChangeText('phone',value)}
                />

        <View  style={styles.btnsGroup}>
            <View style={styles.btnContainer}>
              <Button color={styles.btnUpdate.color} title="Atualizar" onPress={() => updadeContact()} />
            </View>
            <View style={styles.btnContainer}>
              <Button color={styles.btnDelete.color} title="Deletar" onPress={() => updateUser()} />
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
    }
})

export default DetailsContactScreen
