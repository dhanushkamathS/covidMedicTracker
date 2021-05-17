import React ,{useState ,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,

} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

const collectionName = 'Users'


const AddUserThirdScreen = ({ navigation, route }) => {
  
    const [medication ,setMedication] = useState('')
    const [remark ,setRemark] = useState('')

    const submit = () =>{
   
        if(!medication.trim().length || !remark.trim().length){
            return Snackbar.show({
                text: 'input value',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#8DBDFF',
                textColor:'black'
              });
        }
        var userData = route.params.userData
        userData["medication"] = medication
        userData["remark"]  = remark
        console.log(userData)
        addToDB(userData)
        navigation.dispatch(StackActions.popToTop())
    }

    const addToDB = (userData)=>{
        firestore()
        .collection(collectionName)
        .add(userData)
        .then(()=>{
            Snackbar.show({
                text: 'PATIENT ADDED',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#8DBDFF',
                textColor:'black'
              })
        })
        .catch((error)=>{console.log(error)})
    }
    return (
        <View style={{display:'flex',flex:1,backgroundColor:'white'}}>
                 <View style={{backgroundColor:'#8DBDFF',height:50,width:"50%",marginTop:'8%'}}>
                    <Text style={{fontSize:30,marginTop:5,marginLeft:'3%'}}>MEDICATION</Text>
                </View>

                <TextInput multiline={true} numberOfLines={10} placeholder="ENTER MEDICATION" value={medication} onChangeText={(value)=>{!value.trim().length?setMedication(''):setMedication(value)}}
                    style={{ height:200, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:20,marginLeft:10,marginRight:10}}/>
    
                <View style={{backgroundColor:'#8DBDFF',height:50,width:"50%",marginTop:'8%'}}>
                    <Text style={{fontSize:30,marginTop:5,marginLeft:'3%'}}>REMARKS</Text>
                </View>
                <TextInput multiline={true} numberOfLines={10} placeholder="ENTER REMARKS" value={remark} onChangeText={(value)=>{!value.trim().length?setRemark(''):setRemark(value)}}
                    style={{ height:200, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:20,marginBottom:"20%",marginLeft:10,marginRight:10}}/>
         
    
            <TouchableOpacity onPress ={submit} >
                <Text style={{backgroundColor:'#c7c2f2',height:60,color:'black',textAlign:'center',fontSize:40,paddingTop:5}}>SUBMIT</Text>
            </TouchableOpacity>
       </View>
      )
      
};


export default AddUserThirdScreen;

const styles = StyleSheet.create({
    InputBox:{
        backgroundColor:'white',
        fontSize:20,
        height:'7%',
        borderRadius:10,
        margin:'4%',
        marginTop:'7%'
    },
    header:{
        color:'#CAD5E2',
        fontSize:30,
        textAlign:'center',
        marginTop:'3%'
    },
    nextButton:{
        backgroundColor:'#5DA3FA',
        color:'white',
        textAlign:'center',
        fontSize:30,
        height:'25%',
        width:'40%',
        borderRadius:10,
        margin:'4%',
        marginTop:'7%',
        marginLeft:'30%',
        paddingTop:10
    }
})