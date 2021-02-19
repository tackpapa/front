import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {HomeParamList, JobsParamList, ChatParamList, MarketParamList, ProfileParamList, OnboardingParamList } from '../types';
import HomeScreen from '../screens/Home/HomeScreen';
import JobsScreen from '../screens/Jobs/JobsScreen';
import CommunityScreen from '../screens/Home/CommunityScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MarketScreen from '../screens/Market/MarketScreen';
import CateScreen from '../screens/Market/CateScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingScreen from '../screens/Profile/ProfileScreen';
import SeePostScreen from '../screens/Home/SeePostScreen';
import NotiScreen from '../screens/Home/NotiScreen';
import SearchScreen from '../screens/SearchScreen';
import HireScreen from '../screens/Jobs/HireScreen';
import SeechatScreen from '../screens/Chat/SeechatScreen';
import WritechatScreen from '../screens/Chat/WritechatScreen';
import WriteprofileScreen from '../screens/Profile/WriteprofileScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import { useRoute } from '@react-navigation/native';
import WriteJobScreen from '../screens/Jobs/WriteJobScreen';
import { TouchableOpacity, Text } from 'react-native';

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  const route = useRoute<any>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({  
          title: '',
          headerRight: () => (
            <><TabBarIcon name="ios-notifications-outline" style={{ paddingRight: 20 }} onPress={() => navigation.navigate('NotiScreen')} />
              <TouchableOpacity><Text>dd</Text></TouchableOpacity></>
          ),
          headerLeft: () => (           
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen', "게시판")} >  
            <Text>sdf</Text>
            </TouchableOpacity> 
          ),
        })}
      />
      <HomeStack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        // options={{ headerTitle: '**게시판' }}
       
      />
       <HomeStack.Screen
        name="SeePostScreen"
        component={SeePostScreen}
        options={{ headerTitle: '글 상세보기' }}
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
        options={({ navigation }) => ({
          title: '구인구직',
          headerLeft: () => (
            <TabBarIcon name="ios-search" style={{paddingLeft:20}} onPress={() => navigation.navigate('SearchScreen', "공고")} />
          ),
        })}
      
      />
        <JobsStack.Screen
        name="HireScreen"
        component={HireScreen}
        options={({ navigation }) => ({
          title: '구인 종류스크린',
          
        })}
      
      />


    </JobsStack.Navigator>
  );
}

const OnboardingStack = createStackNavigator<OnboardingParamList>();

export function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: '회원가입' }}
      />
        <OnboardingStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: '로그인' }}
      />
      <OnboardingStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerTitle: '온보딩' }}
      />
    </OnboardingStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

export function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: '채팅리스트' }}
      />
      <ChatStack.Screen
        name="SeechatScreen"
        component={SeechatScreen}
        options={{ headerTitle: '채팅방' }}
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
        options={({ navigation }) => ({
          title: '사고팔고',
          headerLeft: () => (
            <TabBarIcon name="ios-search" style={{paddingLeft:20}} onPress={() => navigation.navigate('SearchScreen',"상품")} />
          ),
        })}
      />

       <MarketStack.Screen
        name="CateScreen"
        component={CateScreen}
        options={{ headerTitle: '상품종류' }}
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
       <ProfileStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerTitle: '설정페이지' }}
      />
    </ProfileStack.Navigator>
  );
}


