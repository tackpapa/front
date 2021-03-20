import * as React from 'react';
import {TouchableOpacity, SafeAreaView, Platform, Image , View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useractions from '../../store/user/useractions';
import tier from '../../constants/Tier';
import Mypost from './Mypost'
import Myjob from './Myjob'
import Mymarket from './Mymarket'
import { TabView, TabBar, SceneMap, Route, SceneRendererProps, TabBarIndicatorProps, TabBarProps } from 'react-native-tab-view';
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';

const userSelector = ({ user }:RootState)=> user;

const {width, height} = Dimensions.get("screen")

export default function ProfileScreen() {
  const [y, setY] = React.useState<number>(0);
  const feed: React.RefObject<View> = React.useRef(null);
  const renderScene = SceneMap({
    first: Mypost,
    second: Myjob,
    third: Mymarket,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '게시글' },
    { key: 'second', title: '공고' },
    { key: 'third', title: '거래글' },
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

  const route = useRoute<any>();
  const dispatch = useDispatch();
  const user = useSelector(userSelector)
  const getTier =tier(user.exp)



  useEffect(() => {
    if(user._id ===""){
      navigation.navigate('KakaoScreen')
    }else{
      dispatch(useractions.fetchUserProfile.request({_id:user._id}));
    }
  },[dispatch,route])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  

  const navigation = useNavigation();

  const write = (id : string) => {
    navigation.navigate("WriteprofileScreen", {_id: id});
}
  const handleLayoutChange = () => {
    feed.current?.measure( (fx, fy, width, height, px, py) => {
      setY(py);
  })}
  return (
    <SafeAreaView style={{ flex: 1}}>
    {(user._id ==="" ? <Text style={{textAlign:'center', fontSize:17, opacity:0.5, marginTop:50}}>로그인 해 주세요</Text> :
      <Container >
      <Topbox style={{flexDirection:"row", flex:1}}>
        <View style={{flex:2}}>                     
           <ProfilePic source={{uri: user.profilepic}}/>
           
        </View>
        <View style={{flex:3, alignItems:'flex-start', justifyContent:'center', marginLeft:0}}>                               
            <View style={{flexDirection:'column', justifyContent:'center'}}>
              <Layer style={{fontSize:20}}>{user.name}  </Layer>
              <View style={{flexDirection:'row'}}>
                
                <Image style={{height:20, width:20}}source={getTier?.img} />
                <Layer style={{fontSize:13}}> {getTier?.name} :</Layer>
                <Layer style={{fontSize:13}}> {user.exp} 마력  </Layer>  
              </View>
  
            </View>             
        </View>
        <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>                     
           <TouchableOpacity style={{borderRadius:5, backgroundColor:'#DEDFDF'}} onPress={()=>write(user._id)}>
             <Text style={{fontSize:15, padding:5}}>프로필수정</Text>
           </TouchableOpacity>
        </View>
      </Topbox>
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
    )}


    </SafeAreaView>
  );
}

const Topbox = styled.View`
background-color:white;
flex:1;
`
const ProfilePic = styled.Image `
border-radius:50px;
margin-left:30px;
margin-top:30px;
margin-bottom:30px;
width:70px;
height:70px;
`;

const Layer = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: 0px;
    text-align: left;
    color: #3b3b3b;
`
const Container = styled.ScrollView`
background-color:#fff;
flex:1;
`;
