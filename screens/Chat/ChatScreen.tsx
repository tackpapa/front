import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Dimensions, TouchableOpacity } from 'react-native';
import chatactions from '../../store/chat/chatactions';
import { Fragment } from 'react';
import { trimText, formatDate } from "../../utils/util"



const postSelector = ({ chat }:RootState)=> chat;
const userSelector = ({ user }:RootState)=> user;
const {width, height} = Dimensions.get("screen")



export default function ChatScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const move = (name:string, id:string) => {
    navigation.navigate("SeeChatScreen", {name: name, id:id});
}

  const user = useSelector(userSelector)
  const post = useSelector(postSelector)
  const aaaa = Object.entries(post)
  const bb = aaaa.filter(item=>{
    if(item[0]==="data" || item[0] === '_persist'){
      return false
    }else{
      return true
    }
  })
  useEffect(() => {
    if(user._id ===""){
      navigation.navigate('KakaoScreen')
    }else{
      dispatch(chatactions.getLatestChat.request({}));
    }
  },[user])

  return (
  
  <Container>
    
    <Cut></Cut>
     {(user._id === "" ?
      <TouchableOpacity onPress={()=>navigation.navigate("KakaoScreen")}
      style={{alignItems:"center", justifyContent:'center' ,width:width*0.9, height:50, backgroundColor:'#4e76e0', borderRadius:15, marginLeft:width*0.05, marginTop:height*0.35}}>
      <Text style={{textAlign:'center', fontSize:17, fontWeight:'bold', color:'white'}}>로그인 하러가기</Text>
      </TouchableOpacity>   
     :
     bb.map(([id, items])=>{   
      const item = items[items.length-1];     
      const user2 = item.from._id === user._id ? item.to : item.from;
    
      return (
       ( item.to._id !== item.from._id ?
      <Fragment key={id}>
        <Div>
        <Card  onPress={()=>move(user2.name, id)} style={{flexDirection:'row'}}> 
          
          <View style={{alignItems:'center'}}>
              <Userpic source={{ uri: user2.profilepic  }}/>                                                       
           </View>
          
            <View style={{ flex:1}}>
            <View style={{ alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{}}>
                <Username>{user2.name}</Username>
            </View>

              <View style={{}}>
                <Chattext style={{fontSize:13, marginRight:10}}>{formatDate(item.createdAt as unknown as string)}</Chattext>
              </View>

              </View>

              <Chattext>{trimText(item.msg, 30)}</Chattext>
            </View>
      </Card>
      </Div>
      </Fragment>: null)
      )
    })

     )}
 
    </Container>
  );
}


const Cut = styled.View`
border-top-width:1px;
border-color:#e5e5e5;
`

const Card = styled.TouchableOpacity `
    align-items:center;
    marginLeft:${width * 0.03}px;
    width:${width * 0.9}px;
    marginTop:7px; 
`;
const Container = styled.ScrollView`
background-color:white;
`;

const Div = styled.View`
height:${height*0.1}px;
border-bottom-width:0.5px;
border-color:#e5e5e5;
color: #4e76e0;
align-items:center;

`;
const Username = styled.Text`
font-weight:700;
font-size: 20px;
color: #3b3b3b;
`;
const Chattext = styled.Text`

font-size: 15px;
color: #3b3b3b;
opacity:0.5;
`;

const Userpic = styled.Image`
width: 46px;
height: 46px;
margin:15px;
border-radius:25px;
`
