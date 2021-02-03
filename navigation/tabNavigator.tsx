import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {HomeNavigator, JobsNavigator, ChatNavigator, ProfileNavigator, MarketNavigator} from './stackNavigator';
import { BottomTabParamList} from '../types';

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
   <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{tabBarLabel: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }} />
      <BottomTab.Screen
        name="Jobs"
        component={JobsNavigator}
        options={{tabBarLabel: '구인구직',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-earth-outline" color={color} />,
        }} />
         <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{tabBarLabel: '채팅',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-chatbubbles-outline" color={color} />,
        }} />
        <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{tabBarLabel: '사고팔고',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-basket-outline" color={color} />,
        }} />
         <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{tabBarLabel: '내 프로필',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person-outline" color={color} />,
        }} />
 
      </BottomTab.Navigator>
      
  );
}

