import React, { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { StyleSheet, Image} from 'react-native';
import { Text, View } from '../../components/Themed';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {RootState} from '../../store/types'
import useractions from '../../store/user/useractions'
import postactions from '../../store/post/postactions'
import Swiper from 'react-native-web-swiper'
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Post} from '../../store/post/posttypes'


const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Header = styled.View`
  width: 80%
  height: ${height/3.5}px;
`;
const Section = styled.View`
border: 3px;
border-color:blue;
height:100%
border-radius:50px;
justify-content:center;
align-items:center;
`;
const Div = styled.View`
height:20px;
background-color:white;
`;
const userSelector = ({ user }:RootState)=> user;
const postSelector = ({ post }:RootState)=> post;

export default function HomeScreen(){
  const user= useSelector(userSelector);
  const post= useSelector(postSelector);
  const dispatch = useDispatch();
  const isUser = !!user?.token;
  const navigation = useNavigation();
  const move = (id: Post['_id'])=>{
    navigation.navigate("Com1Screen", { _id: id });
  }
  useEffect(()=>{
    dispatch(postactions.getLatestPost.request());
  },[dispatch])
  useEffect(()=>{
   console.log(post);
  },[post])
  

  return (
        <Container>
          <Div>
              <Text>
            
              {isUser ? `안녕하세요 ${user.name}님` : '로그인 해주세요'}
              </Text>
          </Div>
          <Header>         
            <Swiper controlsEnabled={false} loop timeout={1}>
              <Section>
                <Text> banner </Text>
              </Section>
              <Section>
                <Text> hello2 </Text>
              </Section>
              <Section>
                <Text> hello3 </Text>
              </Section>
            </Swiper>
          </Header>
          <Div>          
          {post.data.map((item)=>{
                return (
                  <View key={`Home-PostTitle-${item._id}`}>
                <Text >
                  {item.title}
                  
              </Text>
              <TouchableOpacity onPress={() => { move(item._id); }}>
               <Image
               style ={{ width:100, height:100 }}
               source={{uri: item.pics[0]}}
                />
                </TouchableOpacity>
                </View>
              )
              })}        
          </Div>
          





        </Container>
  );
}
