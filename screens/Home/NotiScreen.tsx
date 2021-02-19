import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';


const postSelector = ({ post }:RootState)=> post;
const {width, height} = Dimensions.get("screen")

const Container = styled.ScrollView``;
const Div = styled.View`

`;
const Alarm = styled.Text`
fontSize:20px;
justify-content:center;
text-align:center;
margin:10px;
padding:2px;
`;

export default function Noti() {
  const route = useRoute<any>();
  const dispatch = useDispatch();

  useEffect(() => {

  },[])
  
  

  return (
  
  <Container>
    <Div>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다</Alarm>
      <Alarm>알림입니다3</Alarm>
      <Alarm>알림입니다5</Alarm>
      <Alarm>알림입니다1</Alarm>
      <Alarm>알림입니다1</Alarm>
      <Alarm>알림입니다2</Alarm>
      <Alarm>알림입니다2</Alarm>
      <Alarm>알림입니다23</Alarm>
      <Alarm>알림입니다3</Alarm>
      <Alarm>알림입니다2</Alarm>
      <Alarm>알림입니다1</Alarm>

    </Div>
    
    </Container>
  );
}
