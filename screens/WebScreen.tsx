import * as React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get("screen")


export default function WebScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    return(
<SafeAreaView style={{flex:1}}>
<View style={{flexDirection:'row', alignItems:'center', height:50, backgroundColor:'white'}}>
    <TouchableOpacity onPress={() =>{ navigation.goBack()}}>        
    <Ionicons size={30} name="chevron-back-outline"/>
       </TouchableOpacity><Text style={{fontSize:20}}>뒤로</Text>
       </View>
       <Cut></Cut>

  <WebView
    source={{uri: `${(route.params as any).link}` }}
  />

</SafeAreaView>
    )
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