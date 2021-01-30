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
        name="홈"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }} />
      <BottomTab.Screen
        name="구인구직"
        component={JobsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-earth-outline" color={color} />,
        }} />
         <BottomTab.Screen
        name="채팅"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-chatbubbles-outline" color={color} />,
        }} />
        <BottomTab.Screen
        name="사고팔고"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-basket-outline" color={color} />,
        }} />
         <BottomTab.Screen
        name="내 프로필"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person-outline" color={color} />,
        }} />
 
      </BottomTab.Navigator>
      
  );
}

