import React, {useEffect, useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import {Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Text, View} from '../../components/Themed';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/types'
import useractions from '../../store/user/useractions'
import postactions from '../../store/post/postactions'
import Swiper from 'react-native-web-swiper'
import {Dimensions} from "react-native";
import {Post} from '../../store/post/posttypes'
import banneractions from "../../store/banner/banneractions";
import {Button} from "react-native";

const {width, height} = Dimensions.get("screen")


function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
  }

const userSelector = ({user} : RootState) => user;
const homeSelector = ({post:{free}} : RootState) => free;
const bannerSelector = ({banner} : RootState) => banner;

export default function HomeScreen() {

    const user = useSelector(userSelector);
    const free = useSelector(homeSelector);
    const banner = useSelector(bannerSelector);
    const isUser = !!user?.token;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const move = (id : string) => {
        navigation.navigate("SeePostScreen", {_id: id});
    }
    const gesi = (value : string) => {
        navigation.navigate("CommunityScreen", {value: value});
    }
    const write = (value : string) => {
        navigation.navigate("WriteScreen", {value: value});
    }

    useEffect(() => {
        dispatch(postactions.getLatestPost.request());
        dispatch(banneractions.getBanner.request());
        dispatch(useractions.fetchSignIn.request({email: 't@t.com', password: '1234'}));
    }, [dispatch])

    return (
<SafeAreaView style={{flex:1}}>
<View>
    <ScrollView >
    <Container>
        {/* <Event1>BYKERS</Event1> */}
    <Header>
        <Swiper controlsEnabled={false} loop timeout={2}>
         {banner.data.map((item) => {return (
                                    <Section key={`${item._id}`}>
                                    </Section>
                                )
                        })
        }       
         </Swiper>
     </Header>                
     <TouchableOpacity
        style={{
        height: 50,         
        justifyContent: "center",
        alignContent: "center"
         }}
        onPress={() => {gesi('free')}}>

        <Text
            style={{
                fontSize:20, 
                textAlign:"center"
            }}
        ><TabBarIcon color={'black'}name="ios-home" />자유게시판</Text>

    </TouchableOpacity>
    <TouchableOpacity
        style={{
        height: 50,         
        justifyContent: "center",
        alignContent: "center"
         }}
        onPress={() => {gesi('scooter')}}>

        <Text
            style={{
                fontSize:20, 
                textAlign:"center"
            }}
        ><TabBarIcon color={'black'}name="ios-home" />스쿠터</Text>

    </TouchableOpacity>

                {free.map((item) => {
                        return (
                            <View key={`${item._id}`}>
                                <Text >
                                    {item.title}

                                </Text>
                                <Text >
                                    {item.context}

                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                    move(item._id);
                                }}>
                                    <Image style={{
                                        width: 500,
                                        height: 100
                                    }}
                                        source={{
                                        uri: item.pics[0]
                                    }}/>

                                </TouchableOpacity>
                            </View>
                        )
                    })}
            </Container>
        </ScrollView>
<TouchableOpacity onPress={() => {write('posting')}} 
style={{position: 'absolute',
bottom: 10,
right: 10,
backgroundColor: '#eee',
width: 50,
height: 50,
justifyContent:'flex-end',
alignContent:'flex-end',
borderRadius: 45,
marginRight:20,
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,
elevation: 6,
marginBottom:20,
}}>
<Text style={{textAlign:'center'}}>
<Ionicons size={40} name="ios-add"/></Text>
</TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}
const Container = styled.ScrollView `
flexGrow:1

`
const Div = styled.View `

`
const Header = styled.View `
  height: ${height / 5}px;
  border: 3px;
`;
const Section = styled.View `
border-radius:10px;

`;
