import * as React from 'react';
import {TouchableOpacity, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, } from '../components/Themed';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Bestpost1 from './Bestpost1';
import Bestpost2 from './Bestpost2';
import Bestpost3 from './Bestpost3';
import { TabView, TabBar, SceneMap, Route, SceneRendererProps, TabBarIndicatorProps, TabBarProps } from 'react-native-tab-view';
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import postactions from '../store/post/postactions';


const {width, height} = Dimensions.get("screen")

export default function BestScreen() {
  const dispatch = useDispatch();
  const [y, setY] = React.useState<number>(0);
  const feed: React.RefObject<View> = React.useRef(null);
  const renderScene = SceneMap({
    first: Bestpost1,
    second: Bestpost2,
    third: Bestpost3,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '실시간' },
    { key: 'second', title: '주간 베스트' },
    { key: 'third', title: '월간 베스트' },
  ]);
  const renderTabBar = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<TabBar<Route>> & Pick<Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode; }>, keyof SceneRendererProps | "navigationState" | "scrollEnabled" | "bounces" | "activeColor" | "inactiveColor" | "pressColor" | "pressOpacity" | "renderLabel" | "renderIcon" | "renderBadge" | "renderTabBarItem" | "onTabPress" | "onTabLongPress" | "tabStyle" | "indicatorStyle" | "indicatorContainerStyle" | "labelStyle" | "contentContainerStyle" | "style" | "children"> & Partial<Pick<Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode; }>, "getLabelText" | "getAccessible" | "getAccessibilityLabel" | "getTestID" | "renderIndicator">> & Partial<Pick<{ getLabelText: ({ route }: Scene<Route>) => string | undefined; getAccessible: ({ route }: Scene<Route>) => boolean; getAccessibilityLabel: ({ route }: Scene<Route>) => string | undefined; getTestID: ({ route }: Scene<Route>) => string | undefined; renderIndicator: (props: TabBarIndicatorProps<Route>) => JSX.Element; }, never>>) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#4e76e0' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        focused ?
        <Text style={{ color:'#4e76e0' }}>
          {route.title}
        </Text>
        : <Text style={{ color:'#191919' }}>
        {route.title}
      </Text>
      )}
    />
  );

  useEffect(() => {
    if(index === 0){
      dispatch(postactions.getHotPost.request("today"));
    } if(index === 1){
      dispatch(postactions.getHotPost.request("week"));
    }else{
      dispatch(postactions.getHotPost.request("month"));
    }
}, [index])

  const navigation = useNavigation();


  const handleLayoutChange = () => {
    feed.current?.measure( (fx, fy, width, height, px, py) => {
      if(fy) setY(fy);
  })}
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop:40, backgroundColor:'white'}}>
         <View style={{height:40}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', margin:10}} onPress={() =>{ navigation.goBack();}}>        
    <Ionicons size={20} name="ios-arrow-back"/>
        <Text style={{fontSize:17, color:"black",                  
                      textAlign:'left',
                      backgroundColor:'white',            
                     }}>뒤로</Text>
     
       </TouchableOpacity></View>
    
      <Container >
   
      <View onLayout={handleLayoutChange}
          ref={feed}
        >
    
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ flex:1, height: height - y }}
          renderTabBar={renderTabBar}
        />
           
      </View>
      </Container>
    


    </SafeAreaView>
  );
}

const Container = styled.ScrollView`
background-color:#fff;
flex:1;
`;
