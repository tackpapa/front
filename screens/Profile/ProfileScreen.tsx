import * as React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '../../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { requestUploadProfile } from '../../store/user/userapi';
import useractions from '../../store/user/useractions';
import * as ImageManipulator from 'expo-image-manipulator'


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
       console.log(resizedPhoto)
       
      dispatch(useractions.fetchUploadProfile
        .request({ pic:{ name: "pic", uri: resizedPhoto.uri, type: result.type || '' }}))
    }
  };


  return (
  
  <Container><View>


        <TouchableOpacity
          style={styles.submitButton}
          onPress={pickImage}
        >
          <Text style={styles.submitButtonText}>업로드</Text>
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


