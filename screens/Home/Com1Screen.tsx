import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';

const postSelector = ({ post }:RootState)=> post;
const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`
height:50%;
background-color:grey;
`;

export default function Com1Screen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params?._id) {
      dispatch(postactions.getPost.request({_id:route.params._id}));
    }
  },[dispatch, route])
  const post = useSelector(postSelector)
  

  return (
  
  <Container><View>
    {post.data.map((item)=>{
      return (
        <View>
      <Text >{item.context} </Text>
       <Text >{item.tags}</Text>
       <Text >{item.author.name}</Text>
       <Text >{item.author.exp}</Text>
       <Text >{item.author.memo}</Text>
       <Text >{item.author.profilepic}</Text>
       <Div>
       <Image 
       style ={{ width:200, height:200}} 
              source={{uri: item.pics[1]}}/>
              </Div>
      </View>

    )
    })}
    </View>
    </Container>
  );
}


