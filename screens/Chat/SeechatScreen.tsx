import * as React from 'react';
import {KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import {  useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import chatactions from '../../store/chat/chatactions';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateChatRequestPayload } from '~/../store/chat/chattypes';

const {width, height} = Dimensions.get("screen")
const postSelector = ({ chat }:RootState)=> chat;
const userSelector = ({user} : RootState) => user;

export default function SeeChatScreen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const post = useSelector(postSelector).users[route.params?.id]?.data || [];
  

  useEffect(() => {
    if(user._id ===""){
      navigation.navigate('KakaoScreen')
    }else{
      dispatch(chatactions.setLastred({_id: route.params?.id, lastred: post.length }))
    }
  },[user, post.length])

  useEffect(() => {
    setText(route.params.msg);
  }, [route.params.msg])

  const submit = ()=>{
    if(text.length > 0 ){
      dispatch(chatactions.createChat.request(newMsg));
    setText('');
    }else {null}   
  }

  const newMsg:CreateChatRequestPayload = {
    from: user._id,
    to: route.params?.id,
    msg: text
  };

  const KeyboardComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  const scrollRef = React.useRef<any>();


  return (
  <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
    <View style={{flexDirection:'row', alignItems:'center', height:60}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() =>{ navigation.navigate("ChatScreen")}}>        
    <Ionicons size={25} name="chevron-back-outline"/>
    <Text style={{fontSize:20, marginBottom:3}}>{route.params?.name}</Text>
  </TouchableOpacity>   
  </View>
  <Container ref={scrollRef}
   onContentSizeChange={(contentHeight) =>{ 
      scrollRef.current?.scrollToEnd({animated: false})
   }}>
    
 <Cut></Cut>
    { post && post.length > 0 ?
    post.map(item=>{
      return (
          item.from._id === user._id ? 

           <Mycard key={`chat-${item._id}-${item.createdAt}`}>
                <View style={{borderRadius:15,backgroundColor:"#bcd3ff", padding:5}}>
                <Author >{item.msg}</Author>
                </View>
          </Mycard> 
           :   

          <Chatcard key={item.createdAt}>
              <View style={{}}>
                <Userpic source={{uri: item.from.profilepic  }}></Userpic>      
              </View>
              <View style={{ padding:5}}> 
                  <Author style={{fontSize:17, fontWeight:'600'}}>{item.from.name}</Author>
                  <View style={{borderRadius:15,backgroundColor:"#eeeef0", padding:5}}>
                  <Author >{item.msg}</Author>
                  </View>
            </View>
           </Chatcard> 
    ) }) 
    : null}

  
    </Container>
    <KeyboardComponent  behavior="padding" enabled>
        <Rec>          
            <><Com
              underlineColorAndroid="transparent"
              placeholder="  메세지를 입력해주세요"
              placeholderTextColor="black"
              selectionColor={'black'}
              value={text}            
              onChangeText={(val) => setText(val)}
              onSubmitEditing={submit} />
              <Sub  style={{justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={submit}>
                  <Subtext>전송</Subtext>
                </TouchableOpacity>
              </Sub></>
          
        
        </Rec>
        </KeyboardComponent>
    </SafeAreaView>
  );
}




const Chatcard = styled.View `
    flex-direction:row;   
    marginLeft:${width * 0.01}px;
    marginTop:5px;
    marginBottom:5px;
 
    border-radius:25px;
`;
const Container = styled.ScrollView`
flex:1;
background-color:white;
`;

const Author = styled.Text`
text-align:left;
padding:5px;
font-size:15px;
line-height:20px;
`;
const Userpic = styled.Image`
width: 30px;
height: 30px;
margin-left:10px;
margin-top:10px;
border-radius:25px;
background-color:gray;
`
const Mycard = styled.View`
flex-direction:row;   
marginLeft:${width * 0.35}px;
marginTop:5px;
marginBottom:5px;
marginRight:10px;
border-radius:25px;
justify-content:flex-end;
`

const Subtext = styled.Text`
color:white;
font-size:18px;
text-align:center;
align-items:center;
font-weight:bold;

`
const Sub = styled.TouchableOpacity`
width:${width*0.2}px;
background-color:#4e76e0;
height:40px;
border-radius:10px;
margin:5px;
`
const Com = styled.TextInput`
width:${width*0.75}px;
background-color:gray;
height:40px;
border-radius: 10px;
background-color: white;
border-style: solid;
border-width: 1px;
border-color: #dddddd;
`

const Rec = styled.View`
position:relative;
display:flex;
flex-direction:row;
width: ${width}px;
justify-content:center;
align-items:center;
background-color:white;
`
const Cut = styled.View`
    opacity: 0.5;
    background-color:white;
    border-style: solid;
    border: 0.5px;
    border-width:0.5px;
    border-color: #e3e3e3;
    justify-content:center;
    margin-bottom:10px;
`

