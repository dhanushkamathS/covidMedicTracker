import React ,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  TouchableHighlight,
  Image
} from 'react-native';
import FAB from 'react-native-fab'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import medicalPng from '../assets/medical.png'



const MainScreen = ({ navigation }) => {
    const [user ,setUser] = useState([])
    
   
    
    useEffect(() =>{
       const unsubscribe = firestore()
       .collection('Users')
       .onSnapshot(snapshot=>{
           if(snapshot.size){
               let Array =[]
               snapshot.forEach((doc,index) =>{
                   Array.push(doc.data())
                   Array[index]['userid'] = doc.id
               })
            setUser(Array)
           }
       })

       return () =>{unsubscribe()}
        
    },[])

    const goToAddUser = () =>{
        navigation.navigate('adduserScreen')
    }

    const DisplayUserScreen =(userData)=>{
         navigation.navigate('displayUserScreen',{userData})
        // console.log(data)
      
    }

    return (
        <View style={{display:'flex',flex:1,backgroundColor:'white'}}>
         <StatusBar hidden />
         <View style={{backgroundColor:'#8DBDFF',display:'flex',height:200,borderBottomLeftRadius:200,borderBottomRightRadius:200,marginTop:-20}}>
             <Text style={styles.header}>USER LIST</Text>
        </View>
         
         <ScrollView style={styles.body}>
    
         {user.length==0?
         <Text style={{fontSize:30,textAlign:'center',marginTop:'50%'}}>NO PATIENTS</Text>:

         user.map((data,key)=>(
    
            <TouchableOpacity  key={key} onPress={()=>{DisplayUserScreen(data)}}>
                <Text style={styles.listItem}>{data["name"]}</Text>
            </TouchableOpacity>
             )
        )
         }
    
         </ScrollView>
         <View style={{backgroundColor:'white',height:"12%"}}>
        <Image  style={{height:95,width:95}} source={medicalPng}/>
         </View>
         <FAB buttonColor="#FFFFFF" iconTextColor='#12B0E8' onClickAction={goToAddUser}  iconTextComponent={<Icon name="plus"/>} />
        </View>
      
     );

  };

const styles = StyleSheet.create({
    main:{
        display:'flex'
    },
    header:{
        fontSize:60,
        paddingTop:"3%",
        textAlign:'center',
        color:'black',
        padding:20,
        marginTop:38,
    },
    body:{
        display:'flex',
        flex:1,
        marginTop:-20,
        height:400,
        paddingTop:-15
            },
    listItem:{
        fontSize:25,
        textAlign:'center',
        backgroundColor:'#BDEAEE',
        color:'black',
        padding:'3%',
        borderRadius:8,
        margin:25
    },
    container: {
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 16,
      },
      deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 70
      }
})

export default MainScreen;