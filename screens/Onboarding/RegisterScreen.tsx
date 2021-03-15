import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import  Cloud from '../../icons/3525.svg';
import  City from '../../icons/3524.svg';


import  Logo from '../../icons/3526.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get("screen")

export default function RegisterScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Container>


     
    <Cloud style={{marginTop:100}}></Cloud>
    <View style={{alignItems:'center', flex:1, flexDirection: 'column'}}>
        <Logo style={{marginTop:height*0.15, marginBottom:30}}></Logo> 
        <TouchableOpacity style={{}}>
        <Image style={{height:50, marginTop:5, width: width * 0.7}} source={require("../../icons/3527.png")} />
        </TouchableOpacity>     
    </View>

      <View style={{ flexWrap:'wrap'}}>
       <City 
       preserveAspectRatio="xMinYMin slice" 
       width="100%" 
       style={{ backgroundColor:'white', marginTop:height*0.15, flexGrow:1, }}
       ></City>
      </View>
   


    </Container>
    </SafeAreaView>
  )
}

const Container = styled.View`
flex:1;
background-color:white;
flex-direction:column;
`