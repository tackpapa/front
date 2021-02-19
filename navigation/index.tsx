import { NavigationContainer, DefaultTheme, DarkTheme, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import TabNavigator from './tabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SearchScreen from '../screens/SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import WriteScreen from '../screens/WriteScreen';
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode={'screen'}>
      <Stack.Screen name="Root" component={TabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="WriteScreen"
        component={WriteScreen}
        // options={{ headerTitle: '검색결과' }}
      />
      <Stack.Screen
        name="SearchScreen"     
        component={SearchScreen}
       
      />
    </Stack.Navigator>
  );
}
