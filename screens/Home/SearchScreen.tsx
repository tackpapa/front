import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';

const postSelector = ({ post }:RootState)=> post;
const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`
height:50%;
background-color:grey;
`;

export default function CommunityScreen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params?._id) {
      dispatch(postactions.getPost.request({_id:route.params._id}));
    }
  },[dispatch, route])
  const post = useSelector(postSelector)
  

  return (
  
  <Container><View>
  <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="검색어를 입력하세요"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />
     
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>console.log("a") }
        >
          <Text style={styles.submitButtonText}>검색</Text>
        </TouchableOpacity>
    </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});


