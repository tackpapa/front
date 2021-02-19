import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
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
import { SafeAreaView } from 'react-native-safe-area-context';


const postSelector = ({ post:{onepost} }:RootState)=> onepost;
const jobSelector = ({ jobs:{onejob} }:RootState)=> onejob;
const marketSelector = ({ market:{onemarket} }:RootState)=> onemarket;

const {width, height} = Dimensions.get("screen")

const Container = styled.ScrollView`
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
  const post = useSelector(postSelector);
  const job = useSelector(jobSelector);
  const market = useSelector(marketSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?._id) {
      dispatch(postactions.getPost.request({_id:route.params._id}));
      dispatch(jobsactions.getJob.request({_id:route.params._id}));
      dispatch(marketactions.getMarket.request({_id:route.params._id}));
    }
    }
  ,[dispatch, route])

  useEffect(() => {

  },[market])


  return (
  <SafeAreaView style={{flex:1}}>
  <Container>
    <View>

      {    ( post ? 
              <View key={`${post._id}`} >
              <Text > title:{post.title} </Text>
              <Text > context:{post.context} </Text>
              <Text >{post.tags}</Text>
              <Text >{post.category}</Text>
              <Text >{post.author.name}</Text>
              <Text >{post.author.exp}</Text>
              <Text >{post.author.memo}</Text>
              <Text >{post.author.profilepic}</Text>
              <Image style ={{ width:50, height:50}} source={{uri: post.author.profilepic}}/>
              <Div>
                <Image style={{ width:200, height:200}} source={{uri: post.pics[0]}}/>
                </Div> 
                </View>               
            :     
              <View></View>         
          )
        }
        {    ( job ? 
              <View key={`${job._id}`} >
              <Text > title:{job.title} </Text>
              <Text > context:{job.context} </Text>
              <Text >{job.views}</Text>
              <Text >{job.tags}</Text>
              <Text >{job.category}</Text>
              <Text >{job.location}</Text>
              <Text >{job.author.name}</Text>
              <Text >{job.author.exp}</Text>
              <Text >{job.author.memo}</Text>
              <Text >{job.author.profilepic}</Text>
              <Image style ={{ width:50, height:50}} source={{uri: job.author.profilepic}}/>
              <Div>
                <Image style={{ width:200, height:200}} source={{uri: job.pics[0]}}/>
                </Div> 
                </View>               
            :     
              <View></View>         
          )
        }
        {    ( market ? 
              <View key={`${market._id}`} >
              <Text > title:{market.title} </Text>
              <Text > context:{market.context} </Text>
              <Text >{market.views}</Text>
              <Text >{market.tags}</Text>
              <Text >{market.category}</Text>
              <Text >{market.location}</Text>
              <Text >{market.author.name}</Text>
              <Text >{market.author.exp}</Text>
              <Text >{market.author.memo}</Text>
              <Text >{market.author.profilepic}</Text>
              <Image style ={{ width:50, height:50}} source={{uri: market.author.profilepic}}/>
              <Div>
                <Image style={{ width:200, height:200}} source={{uri: market.pics[0]}}/>
                </Div> 
                </View>               
            :     
              <View></View>         
          )
        }

     
     
     
     </View>
    </Container>
    </SafeAreaView>

  )
}