import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trimText, formatDate } from "../../utils/util"



export default function Noti() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {

  },[])
  
  

  return (
  <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
  <Container>
    <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', height:60}} onPress={() =>{ navigation.goBack()}}>        
    <Ionicons size={30} name="chevron-back-outline"/>
    <Text style={{fontSize:20}}>뒤로</Text>
       </TouchableOpacity>
 
    <Div>
      <Cut></Cut>
      
      <Card>
      <View>
          <Alarm>당신의 글<Text style={{color:'#4e76e0'}}>trimText([ㄴㅇㄹㄴㅇㄹ])</Text>에 댓글이 달렸습니다.</Alarm>
          <Date>formatDate()2011.02.11</Date>
      </View>
          <Ionicons size={20} style={{marginRight:10}} name="chevron-forward-outline"/>      
      </Card>
      <Cut></Cut>

    
      



    </Div>
    
    </Container>
    </SafeAreaView>
  );
}

const Container = styled.ScrollView`
background-color:white;
`;
const Div = styled.View`

`;
const Alarm = styled.Text`
  fontSize:15px;
  margin-left:10px;
  margin-top:10px;
  padding:2px;
`;

const Date = styled.Text`
  fontSize:12px;
  margin-left:10px;
  padding:2px;
  margin-bottom:10px;
  opacity:0.5;
`;

const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 1px;
    border-color: #e3e3e3;
    justify-content:center;
`
const Card = styled.TouchableOpacity`
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  
`