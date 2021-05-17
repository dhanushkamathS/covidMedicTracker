import React ,{useState ,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';


const AddUserScreen = ({ navigation, route }) => {
    const [name,setName] = useState('')
    const [covidReport ,setCovidReport] = useState('')
    const [icmr , setIcmr] = useState('')
    const [age,setAge] = useState('')
    const [district ,setDistrict] = useState('') 
    const [state ,setState] = useState('')
    const [symptom ,setSymptom] = useState('')

    //const [medication ,setMedication] = useState('')
    //const [remark ,setRemark] = useState('')

    const goToAddSecondScreen = () =>{
        
        console.log(name.trim().length)
        if(!name.trim().length || !covidReport.trim().length||
           !icmr.trim().length || !age.trim().length ||
           !age.trim().length  || !district.trim().length||
           !state.trim().length){
            return Snackbar.show({
                text: 'input value',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#8DBDFF',
                textColor:'black'
              });
        }
        const userData ={
            name,
            covidReport,
            icmr,
            age,
            district,
            state
        }
        navigation.navigate('adduserSecondScreen',{userData})
        // console.log(name)

    }
    
   
    return (
        <View style={{display:'flex',flex:1}}>
        <Text style={styles.header}>NEW PATIENT</Text>
        <View style={{backgroundColor:'#8DBDFF',height:50,width:"50%",marginTop:'3%'}}>
            <Text style={{fontSize:25,marginTop:5,marginLeft:'3%'}}>Personal Info</Text>
        </View>
        <TextInput placeholder="NAME" style={styles.InputBox} value={name} onChangeText={(value)=>{!value.trim().length?setName(''):setName(value)}}/>
        <TextInput placeholder="COVID REPORT NO" style={styles.InputBox} value={covidReport} onChangeText={(value)=>{!value.trim().length?setCovidReport(''):setCovidReport(value)}}/>
        <TextInput placeholder="ICRM NO" style={styles.InputBox} value={icmr} onChangeText={(value)=>{!value.trim().length?setIcmr(''):setIcmr(value)}}/>
        <TextInput placeholder="AGE" style={styles.InputBox} value={age} onChangeText={(value)=>{!value.trim().length?setAge(''):setAge(value)}}/>
        <TextInput placeholder="DISTRICT" style={styles.InputBox} value={district} onChangeText={(value)=>{!value.trim().length?setDistrict(''):setDistrict(value)}}/>
        <TextInput placeholder="STATE" style={styles.InputBox} value={state} onChangeText={(value)=>{!value.trim().length?setState(''):setState(value)}}/>
        
        <TouchableOpacity onPress={goToAddSecondScreen} onChangeText={(value)=>{setSymptom(value)}}>
            <Text style={styles.nextButton}>NEXT</Text>
        </TouchableOpacity>
    </View>
    )
      
};


export default AddUserScreen;

const styles = StyleSheet.create({
    InputBox:{
        backgroundColor:'#BAFBFC',
        fontSize:20,
        height:'7%',
        borderRadius:10,
        margin:'2%',
        marginTop:'7%',
        marginLeft:30,
        marginRight:30
    },
    header:{
        color:'black',
        fontSize:35,
        textAlign:'center',
        marginTop:'3%'
    },
    nextButton:{
        backgroundColor:'#C7C2F2',
        color:'black',
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