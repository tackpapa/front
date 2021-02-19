import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {Image, TouchableOpacity, ScrollView} from 'react-native';
import {Text, View} from '../../components/Themed';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/types'
import useractions from '../../store/user/useractions'
import postactions from '../../store/post/postactions'
import jobsactions from '../../store/jobs/jobsactions'
import Swiper from 'react-native-web-swiper'
import {Dimensions} from "react-native";
import {Post} from '../../store/post/posttypes'
import banneractions from "../../store/banner/banneractions";
import {Button} from "react-native";
import { Ionicons } from '@expo/vector-icons';

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={40} style={{ marginBottom: -3 }} {...props} />;
  }

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
const freeSelector = ({jobs:{free}} : RootState) => free;
const bannerSelector = ({banner} : RootState) => banner;

export default function JobsScreen() {

    const user = useSelector(userSelector);
    const job = useSelector(freeSelector);
    const banner = useSelector(bannerSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const move = (id : string) => {
        navigation.navigate("SeePostScreen", {_id: id});
    }
    const gesi = (value : string) => {
        navigation.navigate("HireScreen", {value: value});
    }
    const write = (value : string) => {
        navigation.navigate("WriteScreen", {value: value});
    }

    useEffect(() => {
        dispatch(jobsactions.getLatestJob.request());
        dispatch(banneractions.getBanner.request());
    }, [dispatch])


    return (
        <View>
        <ScrollView style={{
            flexGrow: 1
        }}>
            <Container>
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
                    title="알바"
                    color="red"/>
                <TouchableOpacity
                    style={{
                    height: 100,
                    width: 100,
                    justifyContent: "center",
                    alignContent: "center"
                }}
                    onPress={() => {
                    gesi('ride');
                }}>
                    <Text>배달대행</Text>
                </TouchableOpacity>

                {job.map((item) => {
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
        <TouchableOpacity onPress={() => {write('jobing')}}
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
        <Text style={{marginLeft:6,marginBottom:3}}>
        <TabBarIcon color={'black'}name="ios-add" /></Text>
        </TouchableOpacity>
                </View>
    )
}
