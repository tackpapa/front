import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { myApi } from '../../api';
import {RootState} from '../../store/types'
import actions from '../../store/user/useractions'
import Swiper from 'react-native-web-swiper'
import { Dimensions } from "react-native";


const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Header = styled.View`
  width: 100%
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

export default function HomeScreen(){

  useEffect(()=>{ 

  },[])

  
  return (
        <Container>
          <Div>

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
          





        </Container>
  );
}
