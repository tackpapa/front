import React, { useEffect, useState } from "react";
import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
// import { makeRequest, getAnything, myApi } from '../../api';
import axios from 'axios';

const Container = styled.View`
background-color:#2B89C6;
flex:1;
`;
const Texto = styled.Text``;
const Touch = styled.TouchableOpacity`
background-color:#fff;
`;


export default function HomeScreen()  {
  const c = async ()=> await axios.get(`https://localhost.3000/api.stats`)
  c();
  console.log(c())
  const navigation = useNavigation();
  const move = ()=>{
  navigation.navigate('Com1Screen');
  
  }
  return (
        <Container>
            <Texto>
              hello world
            </Texto>
          <Touch onPress={move}>
            <Texto>
              hello world
            </Texto>
          </Touch>
        </Container>
  );
}
