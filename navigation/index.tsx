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
        options={{ headerTitle: '글 상세보기' }}
      />
       <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
       
      />
       <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        options={{ headerTitle: '브라우저' }}
       
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: '회원가입' }}       
      />
    </Stack.Navigator>
  );
}
