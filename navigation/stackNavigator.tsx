import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import JobsScreen from '../screens/Jobs/JobsScreen';
import Com1Screen from '../screens/Home/Com1Screen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MarketScreen from '../screens/Market/MarketScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {HomeParamList, JobsParamList, ChatParamList, MarketParamList, ProfileParamList } from '../types';
import Com2Screen from '../screens/Home/Com2Screen';
import NotiScreen from '../screens/Home/NotiScreen';
import SeejobScreen from '../screens/Jobs/SeejobScreen';
import SeechatScreen from '../screens/Chat/SeechatScreen';
import WritechatScreen from '../screens/Chat/WritechatScreen';
import HireScreen from '../screens/Jobs/HireScreen';
import SeeproductScreen from '../screens/Market/SeeproductScreen';
import WriteproductScreen from '../screens/Market/WriteproductScreen';
import WriteprofileScreen from '../screens/Profile/WriteprofileScreen';


const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: '홈1' }}
      />
      <HomeStack.Screen
        name="Com1Screen"
        component={Com1Screen}
        options={{ headerTitle: '커뮤니티' }}
      />
       <HomeStack.Screen
        name="Com2Screen"
        component={Com2Screen}
        options={{ headerTitle: '자유게시판' }}
      />
       <HomeStack.Screen
        name="NotiScreen"
        component={NotiScreen}
        options={{ headerTitle: '알림' }}
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
        options={{ headerTitle: '구인구직' }}
      />
        <JobsStack.Screen
        name="HireScreen"
        component={HireScreen}
        options={{ headerTitle: '구인글 작성' }}
      />
      <JobsStack.Screen
        name="SeejobScreen"
        component={SeejobScreen}
        options={{ headerTitle: '구인글 상세' }}
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
        options={{ headerTitle: '채팅' }}
      />
      <ChatStack.Screen
        name="SeechatScreen"
        component={SeechatScreen}
        options={{ headerTitle: '채팅보기' }}
      />
      <ChatStack.Screen
        name="WritechatScreen"
        component={WritechatScreen}
        options={{ headerTitle: '채팅보내기' }}
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
        options={{ headerTitle: '사고팔고' }}
      />
       <MarketStack.Screen
        name="SeeproductScreen"
        component={SeeproductScreen}
        options={{ headerTitle: '사고팔고' }}
      />
       <MarketStack.Screen
        name="WriteproductScreen"
        component={WriteproductScreen}
        options={{ headerTitle: '사고팔고' }}
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
        options={{ headerTitle: '프로필' }}
      />
      <ProfileStack.Screen
        name="WriteprofileScreen"
        component={WriteprofileScreen}
        options={{ headerTitle: '프로필 작성' }}
      />
    </ProfileStack.Navigator>
  );
}
