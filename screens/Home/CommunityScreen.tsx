import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';


const postSelector = ({ post:{home} }:RootState)=> home;
const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`

background-color:grey;
`;

export default function CommunityScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const home = useSelector(postSelector)
  
  useEffect(() => {
    const category = route.params.value
    navigation.setOptions({headerTitle:category});   
      dispatch(postactions.getCategoryPost.request(category))
},[route])

  // useEffect(() => {
  //     dispatch(postactions.getCategoryPost.request(category)
  // )},[dispatch])

  useEffect(() => {
    
},[route])
  
  

  return (
  
  <Container><View>
    {home.map((item)=>{
      return (
        <View  key={`${item._id}`} >         
      <Text> {item.context} </Text>
       <Text >{item.tags}</Text>
       <Text >{item.author.name}</Text>
       <Text >{item.author.exp}</Text>
       <Text >{item.author.memo}</Text>
       <Text >{item.author.profilepic}</Text>
       <Div>
       <Image 
       style ={{ width:100, height:100}} 
              source={{uri: item.pics[0]}}/>
              </Div>
      </View>

    )
    })}
    </View>
    </Container>
  );
}


