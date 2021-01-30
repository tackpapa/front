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
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }} />
         <BottomTab.Screen
        name="채팅"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }} />
        <BottomTab.Screen
        name="사고팔고"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }} />
         <BottomTab.Screen
        name="내 프로필"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }} />
 
      </BottomTab.Navigator>
      
  );
}



// // Each tab has its own navigation stack, you can read more about this pattern here:
// // https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
// const HomeStack = createStackNavigator<HomeParamList>();

// function HomeNavigator() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{ headerTitle: '홈' }}
//       />
//       <HomeStack.Screen
//         name="Com1Screen"
//         component={Com1Screen}
//         options={{ headerTitle: '커뮤니티' }}
//       />
//     </HomeStack.Navigator>
//   );
// }

// const JobsStack = createStackNavigator<JobsParamList>();

// function JobsNavigator() {
//   return (
//     <JobsStack.Navigator>
//       <JobsStack.Screen
//         name="JobsScreen"
//         component={JobsScreen}
//         options={{ headerTitle: 'job Title' }}
//       />
//     </JobsStack.Navigator>
//   );
// }

// const ChatStack = createStackNavigator<ChatParamList>();

// function ChatNavigator() {
//   return (
//     <ChatStack.Navigator>
//       <ChatStack.Screen
//         name="ChatScreen"
//         component={ChatScreen}
//         options={{ headerTitle: 'chat page' }}
//       />
//     </ChatStack.Navigator>
//   );
// }
// const MarketStack = createStackNavigator<MarketParamList>();

// function MarketNavigator() {
//   return (
//     <MarketStack.Navigator>
//       <MarketStack.Screen
//         name="MarketScreen"
//         component={MarketScreen}
//         options={{ headerTitle: '사고팔고' }}
//       />
//     </MarketStack.Navigator>
//   );
// }

// const ProfileStack = createStackNavigator<ProfileParamList>();

// function ProfileNavigator() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen
//         name="ProfileScreen"
//         component={ProfileScreen}
//         options={{ headerTitle: '프로필' }}
//       />
//     </ProfileStack.Navigator>
//   );
// }
