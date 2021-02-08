import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '../../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import chatactions from '../../store/chat/chatactions';


const postSelector = ({ chat }:RootState)=> chat;
const userSelector = ({ user }:RootState)=> user;
const {width, height} = Dimensions.get("screen")

const Container = styled.ScrollView``;
const Div = styled.View`

`;
const Alarm = styled.Text`
font-size:20;
justify-content:center;
text-align:center;
margin:10px;
padding:2px;
`;

export default function ChatScreen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(chatactions.getLatestChat.request({}));
  },[dispatch, route])
  const user = useSelector(userSelector)
  const post = useSelector(postSelector)

  let participants: { _id: string, name: string, msg:string }[] = [];

  post.data.reverse().forEach((i)=>{
    const part = i.from._id === user._id ? i.to : i.from;
    part.msg = i.msg
    if (i.from._id === i.to._id) {
      return;
    }
    if (participants.findIndex(participant => participant._id === part.id) === -1) {
      participants.push(part);
    }
  })

  return (
  
  <Container>
    {participants.map((item)=>{
      return <Div key={`${item._id}`}>
            <Text> {item.name}{item.msg}</Text>
      </Div>
    })}
    
   
    
    </Container>
  );
}
