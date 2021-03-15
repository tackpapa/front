import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {HomeParamList, JobsParamList, ChatParamList, MarketParamList, ProfileParamList } from '../types';
import HomeScreen from '../screens/Home/HomeScreen';
import JobsScreen from '../screens/Jobs/JobsScreen';

import ChatScreen from '../screens/Chat/ChatScreen';
import MarketScreen from '../screens/Market/MarketScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingScreen from '../screens/Profile/ProfileScreen';


import NotiScreen from '../screens/Home/NotiScreen';


import SeeChatScreen from '../screens/Chat/SeeChatScreen';

import WriteprofileScreen from '../screens/Profile/WriteprofileScreen';




import {Text} from 'react-native';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import  Noti from '../icons/group2368.svg';

const {width, height} = Dimensions.get("screen")


const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator> 
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({  
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation: 0
          },
          headerLeft: () => (
            <>
              <Notibox onPress={() => navigation.navigate('NotiScreen')}>
              <Noti style={{bottom:-5, left:-1}}></Noti>
                </Notibox>
                </>
          ),
          headerRight: () => (           
            <><Search style={{marginRight:20}} onPress={() => navigation.navigate('SearchScreen', "게시판")} >  
            <Text style={{textAlign:'center', color:'#5f5f5f',justifyContent:'center', alignItems:'center', fontSize:17}}><Ionicons size={17} name="ios-search"/>검색</Text>
           </Search></>
          ),
        })}
      />
     
       
       <HomeStack.Screen
        name="NotiScreen"
        component={NotiScreen}
        options={{headerShown:false}}
      />
    </HomeStack.Navigator>
  );
}

const JobsStack = createStackNavigator<JobsParamList>();

export function JobsNavigator() {
  return (
    <JobsStack.Navigator>
      <JobsStack.Screen
        name="JobsScreen"
        component={JobsScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation:0
          },
          headerRight: () => (           
            <><Search style={{marginRight:20}} onPress={() => navigation.navigate('SearchScreen', "공고")} >  
            <Text style={{textAlign:'center', color:'#5f5f5f',justifyContent:'center', alignItems:'center', fontSize:17}}><Ionicons size={17} name="ios-search"/>검색</Text>
           </Search></>),
           headerLeft: () => (           
            <Layer>구인구직</Layer>),
        })}
      
      />
       


    </JobsStack.Navigator>
  );
}




const ChatStack = createStackNavigator<ChatParamList>();

export function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            height:80,
            shadowColor:'#eee',
            elevation:0
          },
         
           headerLeft: () => (           
            <Layer style={{marginRight:20}}>채팅</Layer>),
        })}
      />
      <ChatStack.Screen
        name="SeeChatScreen"
        component={SeeChatScreen}
        options={{headerShown:false}}
      />
     
    </ChatStack.Navigator>
  );
}
const MarketStack = createStackNavigator<MarketParamList>();

export function MarketNavigator() {
  return (
    <MarketStack.Navigator>
      <MarketStack.Screen
        name="MarketScreen"
        component={MarketScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation: 0
          },
          headerRight: () => (           
            <><Search style={{marginRight:20}} onPress={() => navigation.navigate('SearchScreen', "상품")} >  
            <Text style={{textAlign:'center', color:'#5f5f5f',justifyContent:'center', alignItems:'center', fontSize:17}}><Ionicons size={17} name="ios-search"/>검색</Text>
           </Search></>),
           headerLeft: () => (           
            <Layer>중고장터</Layer>),
        })}
      />

    </MarketStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

export function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
     
       <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            height:80,
            shadowColor:'#eee',
            elevation:0
          },
         
           headerLeft: () => (           
            <Layer style={{marginRight:20}}>프로필</Layer>),
        })}
      
      />
      <ProfileStack.Screen
        name="WriteprofileScreen"
        component={WriteprofileScreen}
        options={() => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            height:0,
            shadowColor:'#eee',
            elevation:0
          },       
           headerLeft: () => (           
            <Layer style={{marginRight:20}}></Layer>),
        })}
      />
       <ProfileStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerTitle: '설정페이지' }}
      />
    </ProfileStack.Navigator>
  );
}


const Search = styled.TouchableOpacity`
    border-radius: 18px;
    background-color: #ffffff;
    width:100px;
    height:36px;
    marginRight:20px;
    shadowColor:#678a9bcb;
    justify-content:center;
    shadow-offset:0 3px;
    shadow-opacity: 0.45; 
    shadowRadius: 5.65px;
    elevation:10;
`
const Notibox = styled.TouchableOpacity`
    border-radius: 18px;
    background-color: #ffffff;
    width:36px;
    height:36px;
    margin-left:20px;
    shadowColor:#678a9bcb;
    justify-content:center;
    shadow-offset:0 3px;
    shadow-opacity: 0.45;
    shadowRadius: 5.65px;
    elevation:10;
`
const Layer = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 20px;
    text-align: left;
    color: #3b3b3b;
    margin-left:20px;
`