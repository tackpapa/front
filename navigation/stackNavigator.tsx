import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import JobsScreen from '../screens/Jobs/JobsScreen';
import Com1Screen from '../screens/Home/Com1Screen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MarketScreen from '../screens/Market/MarketScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {HomeParamList, JobsParamList, ChatParamList, MarketParamList, ProfileParamList } from '../types';


const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: '홈' }}
      />
      <HomeStack.Screen
        name="Com1Screen"
        component={Com1Screen}
        options={{ headerTitle: '커뮤니티' }}
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
        options={{ headerTitle: 'job Title' }}
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
        options={{ headerTitle: 'chat page' }}
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
    </ProfileStack.Navigator>
  );
}
