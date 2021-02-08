import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {Image, TouchableOpacity, ScrollView} from 'react-native';
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

const Container = styled.ScrollView `
flexGrow:1

`
const Div = styled.View `

`
const Header = styled.View `
  height: ${height / 5}px;
`;
const Section = styled.View `
border: 3px;
border-radius:10px;

`;

const userSelector = ({user} : RootState) => user;
const homeSelector = ({post:{home}} : RootState) => home;
// const postSelector = (rootState: RootState) => {
//   return rootState.post.home
// }
const bannerSelector = ({banner} : RootState) => banner;

export default function HomeScreen() {

    const user = useSelector(userSelector);
    const home = useSelector(homeSelector);
    const banner = useSelector(bannerSelector);
    const isUser = !!user
        ?.token;

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const move = (id : Post['_id']) => {
        navigation.navigate("SeePostScreen", {_id: id});
    }
    const gesi = (value : string) => {
        navigation.navigate("CommunityScreen", {value: value});
    }

    useEffect(() => {
        dispatch(postactions.getLatestPost.request());
        dispatch(banneractions.getBanner.request());
        dispatch(useractions.fetchSignIn.request({email: 't@t.com', password: '1234'}));
    }, [dispatch])

    return (

        <ScrollView style={{
            flexGrow: 1
        }}>
            <Container>
                <Div >

                    <Text>

                        {isUser
                            ? `안녕하세요 ${user.name}님`
                            : '로그인 해주세요'}
                    </Text>
                </Div>

                <Header>
                    <Swiper controlsEnabled={false} loop timeout={2}>

                        {banner
                            .data
                            .map((item) => {
                                return (
                                    <Section key={`${item._id}`}>
                                        <Image
                                            style
                                            ={{ width: 300,height: 200}}
                                            source={{uri: item.pic}}/>
                                    </Section>
                                )
                            })
                        }       

                    </Swiper>
                </Header>
                <Div></Div>
                <Button
                    onPress={() => {
                    gesi('free');
                }}
                    title="자유게시판"
                    color="red"/>
                <TouchableOpacity
                    style={{
                    height: 100,
                    width: 100,
                    justifyContent: "center",
                    alignContent: "center"
                }}
                    onPress={() => {
                    gesi('humor');
                }}>
                    <Text>유머게시판</Text>
                </TouchableOpacity>

                {home.map((item) => {
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
                                    <Image
                                        style
                                        ={{
                                        width: 100,
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
    )
}
