import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';


const postSelector = ({ post:{onepost} }:RootState)=> onepost;
const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`
height:50%;
background-color:grey;
`;

export default function SeePostScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const post = useSelector(postSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?._id) {
      dispatch(postactions.getPost.request({_id:route.params._id}));
    }
  },[dispatch, route])


if(!post){return null};
  return (
  
  <Container>
    <View>
      <View key={`${post._id}`} >
       
      <Text > {post.context} </Text>
       <Text >{post.tags}</Text>
       <Text >{post.category}</Text>
       <Text >{post.author.name}</Text>
       <Text >{post.author.exp}</Text>
       <Text >{post.author.memo}</Text>
       <Text >{post.author.profilepic}</Text>
       <Image 
       style ={{ width:50, height:50}} 
              source={{uri: post.author.profilepic}}/>
       
       <Div>
       <Image 
       style ={{ width:200, height:200}} 
              source={{uri: post.pics[0]}}/>
              </Div>
      </View>
  
    </View>
    </Container>
  );
}


