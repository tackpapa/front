import React, { useEffect, useState } from "react";
import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { myApi } from '../../api';

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Texto = styled.Text``;
const Touch = styled.TouchableOpacity`
background-color:#fff;
`;


export default function HomeScreen(){
  const [info, setInfo] = useState<any>({
    loading:true,
    data:[]
  })
  const getAPI = async () => {
    const data = await myApi.getHome();
    setInfo({
      data,
      loading:false
    })
  };
  useEffect(()=>{
    getAPI();
    console.log('강수현바보23123', info)
  }, [])
  
  const navigation = useNavigation();
  const move = ()=>{navigation.navigate('Com1Screen')}
  
  return (
        <Container>
            <Texto>
                {/* {info.data.jobs[0].title} {info.data.jobs[0]._id} */}
              ddddd
            </Texto>
        </Container>
  );
}
