import * as React from 'react';
import { View, Text, NativeModules, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import useractions from '../store/user/useractions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import chatactions from '../store/chat/chatactions';

const {width, height} = Dimensions.get("screen")
const userSelector = ({user} : RootState) => user;
const postSelector = ({ chat }:RootState)=> chat;


export default function KakaoScreen() {
    const [code,setCode] = React.useState('');
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const post = useSelector(postSelector)

                                           
        const handleCode = async (nextCode: string) => {
            if (!nextCode) return null;
            setCode(nextCode);
        } 
    React.useEffect(() => {
        if (code) {
            dispatch(useractions.fetchSignIn.request({ code }));
        }
    }, [code])   
    React.useEffect(() => {
        if (user._id !== "") {
      dispatch(chatactions.getLatestChat.request({
        date: post.data.length ? new Date(post.data[post.data.length-1].createdAt).getTime() : undefined
      }));
            navigation.navigate("HomeScreen");
        }

    }, [user])   
    
return (
        <SafeAreaView style={{flex:1}}>
        <View style={{flexDirection:'row', alignItems:'center', height:50, backgroundColor:'white'}}>
            <TouchableOpacity onPress={() =>{ navigation.goBack()}}>        
            <Ionicons size={30} name="chevron-back-outline"/>
               </TouchableOpacity><Text style={{fontSize:20}}>뒤로</Text>
               </View>
               <Cut></Cut>
      <WebView

        
        source={{uri: 'http://byker.s3-website.ap-northeast-2.amazonaws.com/admin' }}
        bounces={false}
        originWhitelist={["https://*", "http://*", 'intent://*']}
        allowFileAccess={true}
        userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
        geolocationEnabled={true}
        saveFormDataDisabled={true}
        allowFileAccessFromFileURLS={true}
        allowUniversalAccessFromFileURLs={true}

        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ width: width, height: height }}
        onNavigationStateChange={({ url }) => {
            if (url.indexOf('?code=')) {
                const code = url.split('?code=')[1];
                handleCode(code);
            }
          
        }}
      />
      </SafeAreaView>
    );


    
}

const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 0.5px;
    border-width:0.5px;
    border-color: #e3e3e3;
    justify-content:center;
`
