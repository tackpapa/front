import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {HomeNavigator, JobsNavigator, ChatNavigator, ProfileNavigator, MarketNavigator} from './stackNavigator';
import { BottomTabParamList} from '../types';
import Home from '../icons/home.svg';
import Hire from '../icons/hire.svg';
import Chat from '../icons/chat.svg';
import Market from '../icons/deal.svg';
import Profile from '../icons/profile.svg';
import Homeoff from '../icons/homeoff.svg';
import Hireoff from '../icons/hireoff.svg';
import Chatoff from '../icons/chatoff.svg';
import Marketoff from '../icons/dealoff.svg';
import Profileoff from '../icons/profileoff.svg';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  
  const colorScheme = useColorScheme();
  return (
   <BottomTab.Navigator
      initialRouteName="Home"     
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, inactiveTintColor: 'gray', adaptive:true, labelStyle:{fontSize:13, padding:0}}}>
              
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{tabBarLabel: '홈',
        tabBarIcon: ({ focused, color, size }) => {
         
             return focused
              ? <Home  preserveAspectRatio="xMinYMin slice" 
              width="20" height="20" />
              : <Homeoff preserveAspectRatio="xMinYMin slice" 
              width="20" height="20"/>
          },
        }}
         />
      <BottomTab.Screen
        name="Jobs"
        component={JobsNavigator}
        options={{tabBarLabel: '구인구직',
        tabBarIcon: ({ focused, color, size }) => {
         
          return focused
           ? <Hire preserveAspectRatio="xMinYMin slice" 
           width="20" height="20"/>
           : <Hireoff preserveAspectRatio="xMinYMin slice" 
           width="20" height="20"/>
       },
     }}/>
         <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{tabBarLabel: '채팅',
        tabBarIcon: ({ focused, color, size }) => {
         
          return focused
           ? <Chat/>
           : <Chatoff/>
       },
     }} />
        <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{tabBarLabel: '중고장터',
        tabBarIcon: ({ focused, color, size }) => {
         
          return focused
           ? <Market preserveAspectRatio="xMinYMin slice" 
           width="20" height="20"/>
           : <Marketoff preserveAspectRatio="xMinYMin slice" 
           width="20" height="20"/>
       },
     }}/>
         <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{tabBarLabel: '내 프로필',
        tabBarIcon: ({ focused, color, size }) => {
         
          return focused
           ? <Profile preserveAspectRatio="xMinYMin slice" 
           width="29" height="20"/>
           : <Profileoff preserveAspectRatio="xMinYMin slice" 
           width="29" height="20"/>
       },
     }} />
 
      </BottomTab.Navigator>
      
  );
}

