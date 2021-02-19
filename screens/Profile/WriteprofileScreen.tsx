import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../../store/types';
import useractions from '../../store/user/useractions';


const Container = styled.ScrollView`
background-color:#eee;
`;
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

  const handlePW = ()=>{
    if(password1 !== password2){   
      setFlash("비밀번호가 일치하지않습니다.")
    }else{
      setPassword(password1);
        setFlash("비밀번호가 일치합니다.");
        console.log(password, "비밀번호")
    }
  };

  const submit = ()=>{
    dispatch(useractions.fetchUpdate.request(payload));
    navigation.navigate("ProfileScreen")
    console.log("submitted")
  }

  const payload = {
    email:user.email,
    name: name,
    password:password,
    cell:cell
  }


  return (

    
    <SafeAreaView style={{flex:1}}>
    <Container>
    <TextInput
    style={styles.input}
    underlineColorAndroid="transparent"
    placeholder={user.name}
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>setName(val)}         
  />
  <TextInput
    style={styles.input}
    underlineColorAndroid="transparent"
    placeholder="비밀번호"
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>{ setPassword1(val); handlePW();}}         
  />
  <TextInput
    style={styles.input}
    underlineColorAndroid="transparent"
    placeholder="비밀번호 확인"
    placeholderTextColor="black"
    selectionColor={'skyblue'}
    onChangeText={(val)=>{ setPassword2(val); handlePW();}}         
  /> 
  {(
      flash ? <Text style={{marginLeft:20, color:'red'}} >{flash}</Text> : null
  )}
 
  <TextInput
  style={styles.input}
  underlineColorAndroid="transparent"
  placeholder={(user.cell ? user.cell : "핸드폰 번호를 넣어주세요")}
  placeholderTextColor="black"
  selectionColor={'skyblue'}
  onChangeText={(val)=>setCell(val)}         
/>
          <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>submit()}
        >
          <Text style={styles.submitButtonText}>업데이트</Text>
        </TouchableOpacity>



</Container>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "black"
  }
});