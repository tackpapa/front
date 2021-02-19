import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions';
import jobsactions from '../../store/jobs/jobsactions';
import marketactions from '../../store/market/marketactions';
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { PostType } from '~/../store/post/posttypes';
import { JobType } from '~/../store/jobs/jobstypes';
import { MarketType } from '~/../store/market/markettypes';


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

  const category:string = route.params.value;
  const postSelector = ({post}:RootState)=> post[category as PostType];
  const jobSelector = ({jobs}:RootState)=> jobs[category as JobType];
  const marketSelector = ({market}:RootState)=> market[category as MarketType];

  const posts = useSelector(postSelector)
  const jobs = useSelector(jobSelector)
  const markets = useSelector(marketSelector)  

  useEffect(() => {
    const category = route.params.value;
    navigation.setOptions({headerTitle:category});   
      if (route.params.posting === "posting"){
        dispatch(postactions.getCategoryPost.request(category))
      }
      if (route.params.posting === "jobing"){
        dispatch(jobsactions.getCategoryJob.request(category))
      }
      if (route.params.posting === "marketing"){
        dispatch(marketactions.getCategoryMarket.request(category))
      }
      
},[route])
 

  return (
  
  <Container>
    <ScrollView style={{flexGrow: 1}}>
      <View>
    {posts.map((item)=>{
      return (
        <View  key={`${item._id}`} >         
      <Text> {item.title} </Text>
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
    </ScrollView>
    </Container>
  );
}


