import * as React from 'react';
import {Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Platform} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useractions from '../../store/user/useractions';
import * as ImageManipulator from 'expo-image-manipulator';
import tier from '../../constants/Tier';


const postSelector = ({post:{usercall}} : RootState) => usercall;
const jobSelector = ({jobs:{usercall}} : RootState) => usercall;
const marketSelector = ({market:{usercall}} : RootState) => usercall;
const userSelector = ({ user }:RootState)=> user;

const {width, height} = Dimensions.get("screen")

const Container = styled.ScrollView`
background-color:#eee;
flex:1;
`;

const Div = styled.View`
height:50%;
background-color:grey;
`;

export default function ProfileScreen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const post = useSelector(postSelector)
  const job = useSelector(jobSelector)
  const market = useSelector(marketSelector)
  const user = useSelector(userSelector)
  const getTier =tier(user.exp)
  useEffect(() => {
      dispatch(useractions.fetchUserProfile.request({_id:user._id}));
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
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 60 } }], // resize to width of 300 and preserve aspect ratio 
        { compress: 0.7, format:ImageManipulator.SaveFormat.JPEG },
       );
       
      dispatch(useractions.fetchUploadProfile
        .request({ pic:{ name: "pic", uri: resizedPhoto.uri, type: result.type || '' }}))
    }
  };
  const navigation = useNavigation();

  const move = (id : string) => {
    navigation.navigate("WriteprofileScreen", {_id: id});
}

  return (
    <SafeAreaView style={{ flex: 1}}>
  <Container>

  <Text style={{fontSize:20, height:30, textAlign:'center'}}>{user.name}</Text>
  <Text style={{fontSize:20, height:30, textAlign:'center'}}>경험치:{user.exp}</Text>
  <Text style={{fontSize:20, height:30, textAlign:'center'}}>티어:{getTier?.name}</Text>
  <Text style={{fontSize:20, height:30, textAlign:'center'}}>{getTier?.img}</Text>
  <Text style={{fontSize:20, height:30, textAlign:'center'}}>{user.email}</Text>
  <Text style={{fontSize:20, height:30, textAlign:'center'}}>{user.profilepic}</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={pickImage}
        >
          <Text style={styles.submitButtonText}>업로드</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>move(user._id)}
        >
          <Text style={styles.submitButtonText}>프로필수정</Text>
        </TouchableOpacity>

        <Text style={{fontSize:20, height:30, textAlign:'center'}}>내가 작성한 게시글</Text>    
          {( post.length > 0 ?
            post.map((item)=>{
  
              return ( <Text key={item._id} style={{fontSize:20, height:30, textAlign:'center'}}>{item.title}</Text>  )
            })
                   
           : <Text style={{fontSize:20, height:30, textAlign:'center'}}> 게시물이 없습니다. </Text> 
          )}
        <Text style={{fontSize:20, height:30, textAlign:'center'}}>내가 작성한 구인공고</Text>
        {( job.length > 0 ?
            post.map((item)=>{
  
              return ( <Text key={item._id} style={{fontSize:20, height:30, textAlign:'center'}}>{item.title}</Text>  )
            })
                   
           : <Text style={{fontSize:20, height:30, textAlign:'center'}}> 게시물이 없습니다. </Text> 
          )}
        <Text style={{fontSize:20, height:30, textAlign:'center'}}>내가 작성한 거래글</Text>
        {( market.length > 0 ?
            post.map((item)=>{
  
              return ( <Text key={item._id} style={{fontSize:20, height:30, textAlign:'center'}}>{item.title}</Text>  )
            })
                   
           : <Text style={{fontSize:20, height:30, textAlign:'center'}}> 게시물이 없습니다. </Text> 
          )}
     
        
    </Container>
    </SafeAreaView>
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
    color: "black"
  }
});


