import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import TabNavigator from './tabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SearchScreen from '../screens/SearchScreen';
import WriteScreen from '../screens/WriteScreen';
import SeePostScreen from '../screens/SeePostScreen';
import CommunityScreen from '../screens/CommunityScreen';
import WebScreen from '../screens/WebScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
import KakaoScreen from '../screens/KakaoScreen';
import BestScreen from '../screens/BestScreen';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  // useEffect. background change 되었을 때 서버로 socket message 보내서 서버의 socket.ts에서 세션 삭제
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode={'screen'}>
      <Stack.Screen name="Root" component={TabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="WriteScreen"
        component={WriteScreen}
      />
      <Stack.Screen
        name="SearchScreen"     
        component={SearchScreen}
       
      />
      <Stack.Screen
        name="SeePostScreen"
        component={SeePostScreen}
        
      />
       <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
       
      />
       <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        
       
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="KakaoScreen"
        component={KakaoScreen}
      />
      <Stack.Screen
        name="BestScreen"
        component={BestScreen}
      />
    </Stack.Navigator>
  );
}
