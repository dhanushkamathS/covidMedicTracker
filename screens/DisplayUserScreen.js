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
  Image,
  AppRegistry
} from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import menuPng from '../assets/menu.png'
import { StackActions } from '@react-navigation/native';




const DisplayUserScreen = ({ navigation, route }) => {
  const [isVisible ,setIsVisible] = useState(false)

    const goToEditScreen =() =>{
        const userData = route.params.userData
        navigation.navigate('editUserScreen',{userData})
    }

    const deleteUser =()=>{

      const userId = route.params.userData["userid"]
     
      deleteInDb(userId)
      navigation.dispatch(StackActions.popToTop())
    }

    const deleteInDb =(userId)=>{
      firestore()
      .collection('Users')
      .doc(userId)
      .delete()
      .then(() => {
        Snackbar.show({
          text: 'user deleted',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor:'#8DBDFF',
          textColor:'black'
        });
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    
    return (
   
         <View style={{backgroundColor:'white',display:'flex',flex:1}}>
     
        <ScrollView style={{display:'flex',flex:1,backgroundColor:'white'}}>

        <View style={{backgroundColor:'#8DBDFF',width:"70%",height:"5%",borderBottomRightRadius:75,display:'flex',flexDirection:'row'}}>
             <Text style={{color:'black',fontSize:35,marginTop:'2%',marginLeft:'2%'}}>USER DISPLAY :</Text>   
        </View>
            <TouchableOpacity style={{display:'flex',alignItems:'flex-end',marginTop:-70}} onPress={()=>{setIsVisible(!isVisible)}}>
              <Image source={menuPng} style={{height:50,width:50}}/>
             </TouchableOpacity>

         <View style={styles.card2}>

         <Text style={styles.cardHeader}>PERSONAL INFO</Text>
           <Text style={styles.cardText}>Name : {route.params.userData["name"]}</Text>
           <Text style={styles.cardText}>Covid Report No : {route.params.userData["covidReport"]}</Text>
           <Text style={styles.cardText}>ICMR No : {route.params.userData["icmr"]}</Text>
           <Text style={styles.cardText}>Age : {route.params.userData["age"]}</Text>
           <Text style={styles.cardText}>District : {route.params.userData["district"]}</Text>
           <Text style={styles.cardText}>State : {route.params.userData["state"]}</Text>
         </View>

         <View style={styles.card}>
         <Text style={styles.cardHeader}>SYMPTOMS</Text>
           <Text style={{height:300,fontSize:25}}>{route.params.userData["symptom"]}</Text>
         </View>

         <View style={styles.card}>
         <Text style={styles.cardHeader}>MEDICATION</Text>
           <Text style={{height:300,fontSize:25}}>{route.params.userData["medication"]}</Text>
         </View>

         <View style={{backgroundColor:'#FAD9C1',marginLeft:'2%',margin:'3%',borderRadius:20,padding:'3%',marginBottom:'20%'}}>
         <Text style={styles.cardHeader}>REMARKS</Text>
         <Text style={{height:300,fontSize:25}}>{route.params.userData["remark"]}</Text>
         </View>
         
        </ScrollView>

        <Modal isVisible={isVisible} onBackButtonPress={()=>{setIsVisible(!isVisible)}}>
        <View style={{height:200,width:250,backgroundColor:'white',marginLeft:'20%',borderRadius:20}}>
          <TouchableOpacity onPress={()=>{setIsVisible(!isVisible);goToEditScreen()}}
          style={{backgroundColor:'#94D1F0',height:50,width:170,marginLeft:'15%',marginTop:'10%',borderRadius:10}}>
            <Text style={{fontSize:20,marginTop:'5%',textAlign:'center',color:'black'}}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setIsVisible(!isVisible);deleteUser()}}
          style={{backgroundColor:'#EF5354',height:50,width:170,marginLeft:'15%',marginTop:'10%',borderRadius:10}}>
            <Text style={{fontSize:20,marginTop:'5%',textAlign:'center',color:'black'}}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    
        </View>
     
    )


  
    
      
};
AppRegistry.registerComponent('AndroidFonts', () => AndroidFonts);

export default DisplayUserScreen;

const styles = StyleSheet.create({
    textBox:{
        backgroundColor:'white',
        fontSize:30,
        height:50,
        borderRadius:10,
        margin:'4%',
        marginTop:'7%',
        textAlign:'center'
    },
    header:{
        color:'#CAD5E2',
        fontSize:30,
        textAlign:'center',
        marginTop:'3%'
    },
    topHeader:{
        color:'#CAD5E2',
        fontSize:30,
        textAlign:'center',
        marginTop:'3%',
        marginLeft:'34%'
    },
    symptom:{
        backgroundColor:'white',
        fontSize:20,
        height:400,
        borderRadius:10,
        margin:24,
        marginTop:'7%',
        textAlignVertical:'top'
    },
    symptom2:{
        backgroundColor:'white',
        fontSize:20,
        height:400,
        borderRadius:10,
        margin:24,
        marginTop:'7%',
        marginBottom:'30%',
        textAlignVertical:'top'
    },
    card:{
      backgroundColor:'#FAD9C1',
      marginLeft:'2%',
      margin:'3%',
      borderRadius:20,
      padding:'3%'
    },
    cardText:{
      fontSize:25
    },
    bigCard:{
      backgroundColor:'#FFF5EE',
      marginLeft:'2%',
      margin:'3%',
      borderRadius:20,
      padding:'3%',
      height:'20%'
    },
    cardHeader:{
      textAlign:'center',
      fontSize:25,
      padding:'1%'
    },
    card2:{
      backgroundColor:'#FAD9C1',
      marginLeft:'2%',
      margin:'3%',
      borderRadius:20,
      padding:'3%',
      marginTop:"10%"
    }
})