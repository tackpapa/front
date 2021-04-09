import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trimText, formatDate } from "../../utils/util"
import { RootState } from '../../store/types';
import useractions from '../../store/user/useractions';

const userSelector = ({ user }:RootState)=> user;

export default function Noti() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(userSelector)
  const not = user.Noti;
  useEffect(() => {
    if(user._id ===""){
      navigation.navigate('KakaoScreen')
    }else{
      
    }
  },[user])
  
  const gopost = (id : string, model: string) => {
    if(id === undefined && model === undefined){
      navigation.navigate("Chat")
    }else{
      navigation.navigate("SeePostScreen", {_id: id, page:model});
    }
}

const deletenoti = ()=> dispatch(useractions.deleteNoti.request(user._id));     

useEffect(() => {
  dispatch(useractions.getOne.request(user._id));
},[route])
  

  return (
  <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
  <Container>
  <View style={{flexDirection:'row', alignItems:'center', height:50, justifyContent:'space-between'}}>
    <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', height:60}} onPress={() =>{ navigation.goBack()}}>        
    <Ionicons size={30} name="chevron-back-outline"/>
    <Text style={{fontSize:20}}>뒤로</Text>
       </TouchableOpacity>
       {(user && user?._id !== "" ?
         <TouchableOpacity onPress={()=>{deletenoti()}}> 
         <Text style={{color:'red',fontSize:15, marginRight:20}}><Ionicons size={15} name="trash-outline"/>모두 삭제</Text>
      </TouchableOpacity>
      : null)}
      </View>
 
    <Div>
      <Cut></Cut>
  {( user.Noti && user.Noti.length > 0 ? not.map((item)=>{
        
        return (
          <Fragment key={`noti - ${(item as any)._id}`}>
          <Card    onPress={() => { gopost(( item as any).post, ( item as any).PostModel) } }>
          <View>
              <Alarm><Text style={{color:'#5f5f5f'}}>{trimText(`${(item as any).text}`, 30)} </Text></Alarm>
              <Date>{formatDate(`${(item as any).createdAt}`)}</Date>
          </View>
              <Ionicons size={20} style={{marginRight:10}} name="chevron-forward-outline"/> 
                   
          </Card>
          </Fragment>
        )
      })
:null )}

     

    
      



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
  opacity:0.9;
  color:#4e76e0;
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