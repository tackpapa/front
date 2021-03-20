import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../../store/types';
import useractions from '../../store/user/useractions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../icons/3508.svg';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get("screen")

const userSelector = ({ user }:RootState)=> user;

export default function WriteProfileScreen() {

  const user = useSelector(userSelector)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState(user.name);
  const [cell, setCell] = useState(user.cell);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [flash, setFlash] = useState("")

  const handlePW = React.useCallback(()=>{
    if(password1.length === 0){
      setFlash("")
      return null
    }
    if(password1 !== password2){   
      setFlash("비밀번호가 일치하지않습니다.")
    }else{
      setPassword(password1);
        setFlash("비밀번호가 일치합니다.");
    }
  }, [password1, password2]);

  useEffect(() => {
    handlePW();
  }, [handlePW])

  useEffect(() => {
    if(user._id===""){
      navigation.navigate("HomeScreen")
    }
  }, [user])

  const submit = ()=>{
    dispatch(useractions.fetchUpdate.request(payload));
    navigation.navigate("ProfileScreen")
  }
  const logout = ()=>{
    dispatch(useractions.logout());
    navigation.navigate("HomeScreen")
  }

  const payload = {
    email:user.email,
    name: name,
    password:password,
    cell:cell
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('카메라 권한이 필요합니다!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 60, height:60 } }],
        { compress: 0.7, format:ImageManipulator.SaveFormat.JPEG },
       );
       
      dispatch(useractions.fetchUploadProfile
        .request({ pic:{ name: "pic", uri: resizedPhoto.uri, type: result.type || '' }}))
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <Container>
    

    <View style={{flexDirection:'row', alignItems:'center', height:50, backgroundColor:'white'}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() =>{ navigation.goBack()}}>        
    <Ionicons size={30} name="chevron-back-outline"/>
    <Text style={{fontSize:20}}>뒤로</Text>
       </TouchableOpacity>
       </View>
       <View style={{alignItems:'center'}}>
       <TouchableOpacity style={{flexDirection:'column', alignItems:'center'}}  onPress={pickImage}>
         {(user.profilepic ?<ProfilePic source={{uri: user.profilepic}}/> :<Logo></Logo> )}        
         <View style={{backgroundColor:'#4e76e0', borderRadius:10, margin:10}}>
         <Text style={{fontSize:15, margin:7, fontWeight:"600", color:'white'}}>프로필 업로드</Text>
         </View>
       </TouchableOpacity>

    <Box
    underlineColorAndroid="transparent"
    placeholder={user.name}
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>setName(val)}         
  />
  <Box
    underlineColorAndroid="transparent"
    placeholder="비밀번호"
    secureTextEntry={true}
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>{ setPassword1(val);}}         
  />
  <Box
    underlineColorAndroid="transparent"
    placeholder="비밀번호 확인"
    secureTextEntry={true}
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>{ setPassword2(val);}}         
  /> 
  {(
      flash ? <Text style={{marginTop:10, color:'red'}} >{flash}</Text> : null
  )}
 
  <Box
  underlineColorAndroid="transparent"
  keyboardType = "numeric"
  placeholder={(user.cell ? user.cell : "핸드폰 번호를 넣어주세요")}
  placeholderTextColor="black"
  selectionColor={'skyblue'}
  onChangeText={(val)=>setCell(val)}         
/>

  <Update
  style={{backgroundColor:'#4e76e0'}}
  onPress={()=>submit()}>
  <Btntext>업데이트</Btntext>
  </Update>
  <Update
  style={{backgroundColor:'#ff6666'}}
  onPress={()=>logout()}>
  <Btntext>로그아웃</Btntext>
  </Update>



        </View>
</Container>
</SafeAreaView>
  );
}


const Container = styled.ScrollView`
background-color:#fff;
flex:1;
`;
const ProfilePic = styled.Image `
border-radius:50px;
width:100px;
height:100px;
`;
const Box = styled.TextInput`
    border-radius: 10px;
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
    border-color: #dddddd;
    height:40px;
    width:${width*0.8}px;
    margin-top:20px;
    
`
const Update = styled.TouchableOpacity`
width:${width*0.8}px;
margin-top:20px;
height:40px;
border-radius: 10px;
align-items:center;
justify-content:center;
`
const Btntext = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    justify-content:center;
    color: #ffffff;
`