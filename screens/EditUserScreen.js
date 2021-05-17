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
  Image
} from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import editPng  from '../assets/edit.png'


const EditUserScreen = ({ navigation, route }) => {
    const [name,setName] = useState(route.params.userData["name"])
    const [covidReport ,setCovidReport] = useState(route.params.userData["covidReport"])
    const [icmr , setIcmr] = useState(route.params.userData["icmr"])
    const [age,setAge] = useState(route.params.userData["age"])
    const [district ,setDistrict] = useState(route.params.userData["district"]) 
    const [state ,setState] = useState(route.params.userData["state"])
    const [symptom ,setSymptom] = useState(route.params.userData["symptom"])
    const [medication ,setMedication] = useState(route.params.userData["medication"])
    const [remark ,setRemark] = useState(route.params.userData["remark"])

    const updateUserData = () =>{
        
        console.log(name.trim().length)
        if(!name.trim().length || !covidReport.trim().length||
           !icmr.trim().length || !age.trim().length ||
           !age.trim().length  || !district.trim().length||
           !state.trim().length || !symptom.trim().length||
           !medication.trim().length||!remark.trim().length){
            return Snackbar.show({ 
                text: 'input value',
                duration: Snackbar.LENGTH_SHORT,
              });
        }
        const userData ={
            name,
            covidReport,
            icmr,
            age,
            district,
            state,
            symptom,
            medication,
            remark
        }
       updateInDb(userData,route.params.userData["userid"])
        navigation.dispatch(StackActions.popToTop())
        console.log(userData)

    }
    
    const updateInDb=(userData,userId)=>{
        firestore()
        .collection('Users')
        .doc(userId)
        .update(userData)
        .then(() => {
            Snackbar.show({
                text: 'user updated',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#8DBDFF',
                textColor:'black'
              });
        })
        .catch((error)=>{
            console.log(error)
            Snackbar.show({
                text: 'something went wrong',
                duration: Snackbar.LENGTH_SHORT,
             });
        });
    }
   
    return (
        <View style={{display:'flex',flex:1,backgroundColor:'white'}}>
        <ScrollView >
           
                <View style={{backgroundColor:'#8DBDFF',margin:10,marginLeft:0,height:50,marginRight:'50%',display:'flex',flexDirection:'row'}}>
                    <Text style={{color:'black',fontSize:30,marginTop:5,marginLeft:'2%'}}>PATIENT</Text>
                    <Image style={{height:50,width:50,marginHorizontal:'110%'}} source={editPng}/>
                </View>
               
    
            <TextInput placeholder="name" style={styles.textBox} value={name} onChangeText={(value)=>{!value.trim().length?setName(''):setName(value)}}/>
            <TextInput placeholder="COVID REPORT NO" style={styles.textBox} value={covidReport} onChangeText={(value)=>{!value.trim().length?setCovidReport(''):setCovidReport(value)}}/>
            <TextInput placeholder="ICRM NO" style={styles.textBox} value={icmr} onChangeText={(value)=>{!value.trim().length?setIcmr(''):setIcmr(value)}}/>
            <TextInput placeholder="AGE" style={styles.textBox} value={age} onChangeText={(value)=>{!value.trim().length?setAge(''):setAge(value)}}/>
            <TextInput placeholder="DISTRICE" style={styles.textBox} value={district} onChangeText={(value)=>{!value.trim().length?setDistrict(''):setDistrict(value)}}/>
            <TextInput placeholder="STATE" style={styles.textBox} value={state} onChangeText={(value)=>{!value.trim().length?setState(''):setState(value)}}/>
        
            <View style={{backgroundColor:'#8DBDFF',margin:10,marginLeft:0,height:50,marginRight:'50%'}}>
                <Text style={{color:'black',fontSize:30,marginTop:5,marginLeft:'2%'}}>SYMPTOMS</Text>
            </View>

            <TextInput multiline={true} numberOfLines={30} placeholder="ENTER SYMPTOMS" value={symptom} onChangeText={(value)=>{!value.trim().length?setSymptom(''):setSymptom(value)}}
                    style={{ height:500, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:25,margin:'5%'}}/>
        
            <View style={{backgroundColor:'#8DBDFF',margin:10,marginLeft:0,height:50,marginRight:'50%'}}>
                <Text style={{color:'black',fontSize:30,marginTop:5,marginLeft:'2%'}}>MEDICATION</Text>
            </View>

            <TextInput multiline={true} numberOfLines={10} placeholder="ENTER MEDICATION" value={medication} onChangeText={(value)=>{!value.trim().length?setMedication(''):setMedication(value)}}
                    style={{ height:400, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:25,margin:'5%'}}/>
    
            <View style={{backgroundColor:'#8DBDFF',margin:10,marginLeft:0,height:50,marginRight:'50%'}}>
                <Text style={{color:'black',fontSize:30,marginTop:5,marginLeft:'2%'}}>REMARKS</Text>
            </View>
            <TextInput multiline={true} numberOfLines={10} placeholder="ENTER REMARKS" value={remark} onChangeText={(value)=>{!value.trim().length?setRemark(''):setRemark(value)}}
                    style={{ height:400, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:25,marginBottom:"30%",margin:'5%'}}/>
         
        </ScrollView>

        <TouchableOpacity onPress={updateUserData} >
                <Text style={{backgroundColor:'#C7C2F2',height:60,color:'black',textAlign:'center',fontSize:40,paddingTop:5}}>SUBMIT</Text>
            </TouchableOpacity>

        </View>
        )
      
};


export default EditUserScreen;

const styles = StyleSheet.create({
    textBox:{
        backgroundColor:'#BAFBFC',
        fontSize:25,
        height:50,
        borderRadius:10,
        margin:'4%',
        marginTop:'7%',
       
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
    }
})