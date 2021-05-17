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


const AddUserSecondScreen = ({ navigation, route }) => {
    const [symptom ,setSymptom] = useState('')

    const goToAddThirdScreen = () =>{
      
        if(!symptom.trim().length){
            return Snackbar.show({
                text: 'input value',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#8DBDFF',
                textColor:'black'
              });
        }
        var userData = route.params.userData
        userData["symptom"] = symptom
        navigation.navigate('adduserThirdScreen',{userData})
        
    }

   
    
    return (
        <View style={{display:'flex',flex:1,backgroundColor:'white'}}>
                <View style={{backgroundColor:'#8DBDFF',height:50,width:"50%",marginTop:'8%'}}>
                    <Text style={{fontSize:30,marginTop:5,marginLeft:'3%'}}>SYMPTOMS</Text>
                </View>
                <TextInput multiline={true} numberOfLines={30} placeholder="ENTER SYMPTOMS" value={symptom} onChangeText={(value)=>{!value.trim().length?setSymptom(''):setSymptom(value)}}
                    style={{ height:500, textAlignVertical: 'top',backgroundColor:'#BAFBFC',borderRadius:10,marginTop:'5%',fontSize:27,marginBottom:"20%",marginLeft:10,marginRight:10}}/>
        
    
            <TouchableOpacity onPress={goToAddThirdScreen}>
                <Text style={{backgroundColor:'#C7C2F2',height:60,color:'black',textAlign:'center',fontSize:40,paddingTop:5}}>NEXT</Text>
            </TouchableOpacity>
       </View>
      )
      
};


export default AddUserSecondScreen;

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