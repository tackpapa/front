import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { AppState, ColorSchemeName } from 'react-native';
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
import configactions from '../store/config/configactions';
import { useDispatch, useSelector } from 'react-redux';
import chatactions from '../store/chat/chatactions';
import { RootState } from '../store/types';


const backSelector = ({ config }:RootState)=> config.isBackground;
const postSelector = ({ chat }:RootState)=> chat;
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch();
  const appState = React.useRef<string>(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  const post = useSelector(postSelector)
  const back = useSelector(backSelector)

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState:string) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      dispatch(configactions.fetchSession(true));
    } else {
      dispatch(configactions.fetchSession(false));
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    
  };
  React.useEffect(() => {
    if(back === false)
     {        
       dispatch(chatactions.getLatestChat.request({
        date: post.data.length ? new Date(post.data[post.data.length-1].createdAt).getTime() : undefined
      })); }
  },[back])
  
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
