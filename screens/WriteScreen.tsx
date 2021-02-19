import * as React from 'react';
import { StyleSheet, Image, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import postactions from '../store/post/postactions';
import jobsactions from '../store/jobs/jobsactions';
import marketactions from '../store/market/marketactions';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker';
import { CreatePostRequestPayload, PostType } from '../store/post/posttypes';
import { JobType } from '../store/jobs/jobstypes';
import { MarketType } from '../store/market/markettypes';


const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`
height:50%;
background-color:grey;
`;

const userSelector = ({user} : RootState) => user;

const pageName = {
  "posting": "게시물 작성하기",
  "marketing":"거래글 작성하기",
  "jobing": "공고 작성하기"
}



const dropposting = [
  {label: '자유게시판', value: 'free'},
  {label: '스쿠터', value: 'scooter',},
  {label: '사건사고', value: 'accident',},
  {label: '번개미팅', value: 'meeting',},
  {label: '레플리카', value: 'replica',},
  {label: '배달대행', value: 'bedalk',},
  {label: '국산바이크', value: 'domestic',},
  {label: '수입바이크', value: 'imported',},
]
const dropjobing = [
  {label: '자유', value: 'free'},
  {label: '배달대행', value: 'ride',},
  {label: '수리', value: 'fix',},
  {label: '기타', value: 'etc',},
]

const dropmarketing = [
  {label: '아무거나', value: 'free'},
  {label: '부품', value: 'part',},
  {label: '안전용품', value: 'safety',},
  {label: '액세서리', value: 'acc',},
]

const drop ={
"posting" : dropposting,
"marketing": dropmarketing,
"jobing" : dropjobing,
}

export default function WriteScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const pageKind: keyof typeof drop = route.params.value;
  const [context, setContext] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState(["dd","zz"]);
  const [category, setCategory] = useState("free")
  const [pic, setPic] = useState<any>([]);
  const regex = new RegExp(/(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/gmi);


  const handleTags = (val:string)=>{
    var result = val.match(regex);
    if(result ===null){return null};
    setTags(result)
  };
  
  const delpic = (i:number)=>{
    const delsoon = pic.filter((v:any, idx:any)=> i !==idx);
    setPic(delsoon);
  }
  

useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('카메라 권한이 필요합니다!');
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
        [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio 
        { compress: 0.7, format:ImageManipulator.SaveFormat.JPEG },
       );
        setPic(pic.concat([{ name: "pic", uri: resizedPhoto.uri, type: result.type || '' }]))
    }
  };

  const newPost = {
    context:context,
    title:title,
    category:(category as PostType),
    pic:pic,
    author:user._id,
    tags:tags,
  };
  const newJob = {
    context:context,
    title:title,
    category:(category as JobType),
    pic:pic,
    author:user._id,
    tags:tags,
    location:location
  };
  const newMarket = {
    context:context,
    title:title,
    category:(category as MarketType),
    pic:pic,
    author:user._id,
    tags:tags,
    price:price,
    location:location
  };



const submitPost = ()=>{
  if(pageKind === "posting"){
  dispatch(postactions.createPost.request(newPost));
  navigation.navigate("CommunityScreen", {value: newPost.category, posting:"posting"})}

  if(pageKind === "jobing"){
    dispatch(jobsactions.createJob.request(newJob));
    navigation.navigate("CommunityScreen", {value: newJob.category, posting:"jobing"})}

  if(pageKind === "marketing"){
    dispatch(marketactions.createMarket.request(newMarket));
    navigation.navigate("CommunityScreen", {value: newMarket.category, posting:"marketing"})}

}



  return (
  <SafeAreaView>
  <ScrollView >
  <Container style={{flex:1}} >
  <View style={{height:50}}>
    <TouchableOpacity onPress={() =>{ navigation.goBack(); }}>        
    <Ionicons size={30} name="ios-arrow-back"/>
        <Text style={{fontSize:20, color:"black",                  
                      textAlign:'left',
                      backgroundColor:'white',
                      marginTop:5,                   
                     }}>
                  
                      뒤로</Text>
     
       </TouchableOpacity></View>
   
                     <View style={{ height:50, backgroundColor:'white'}}>
                  <Text style={{fontSize:20, textAlign:'center'}}>{pageName[pageKind]}</Text>
                  </View>
  <TextInput
          style={styles.title}
          underlineColorAndroid="transparent"
          placeholder="제목"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setTitle(val)}         
        />

        <View style={{height:'auto', width:width*1, backgroundColor:'white', zIndex:100}}>

  <DropDownPicker
      items={drop[pageKind]}
      defaultValue="free"
      containerStyle={{height: 40, width:width*1,justifyContent:'center'}}
      style={{backgroundColor: 'white', height:100, width:width*1, alignContent:'center'}}
      labelStyle={{
        fontSize: 14,
        textAlign: 'center',
        color: '#000'
    }}
      itemStyle={{
          justifyContent: 'center'
      }}
      dropDownStyle={{backgroundColor: '#fafafa', position:'absolute'}}
      onChangeItem={(item) => setCategory(item.value)}
      />
    
    
        </View>
        
        {
          (
            pageKind === "jobing" ?  <View style={{height:'auto'}}>
            
            <TextInput
          style={styles.title}
          underlineColorAndroid="transparent"
          placeholder="주소"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setLocation(val)}         
        />
            </View>:null        
          )
        }
        {
          (
            pageKind === "marketing" ?  <View style={{height:200, backgroundColor:'white'}}>
             <View style ={{height: 100}}>
          <TextInput
          style={styles.title}
          underlineColorAndroid="transparent"
          placeholder="가격"
          keyboardType = "numeric"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setPrice(val)}         
        /></View>
        <View style ={{height: 100}}>
        <TextInput
          style={styles.title}
          underlineColorAndroid="transparent"
          placeholder="위치"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setLocation(val)}         
        /></View>  
            </View>:null      
          )
        }
    
    

    
          <TextInput
          style={styles.title}
          underlineColorAndroid="transparent"
          placeholder="태그"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>handleTags(val)}               
          />
        
        <TextInput
          style={styles.input}
          multiline = {true}
          numberOfLines = {4}
          underlineColorAndroid="transparent"
          placeholder="본문"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setContext(val)}         
        />

  {    (  pic.length > 0 ?        
  
            pic.map((item:any, index:any)=>{ 
              return (
              <View key={index} style={{height:100, backgroundColor:'gray'}}>         
              <Text> {item.name} 사진{index+1}</Text>
              <TouchableOpacity
              style={styles.submitButton}
              onPress={()=>{delpic(index)}}
              >
              <Text style={styles.submitButtonText}>사진삭제하기</Text>
             </TouchableOpacity>    

              </View>  
              )

            })     
           :null
          
          )
    }
         <TouchableOpacity
           style={styles.submitButton}
           onPress={pickImage}
         >
           <Text style={styles.submitButtonText}>업로드</Text>
             </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={ ()=>submitPost()}
        >
          <Text style={styles.submitButtonText}>작성완료</Text>
        </TouchableOpacity>       

        <View>
   
    </View>
    </Container>
    </ScrollView>
    
  
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  title: {
    margin: 5,
    height: 50,
    padding:5,
    textAlign:'left',
    justifyContent:'center',
    backgroundColor:"#eee", 
    overflow:'hidden',
    borderColor:'blue',
    borderWidth:1,
    
  },
  input: {   
    height: 200,
    padding:5,
    textAlign:'left',
    justifyContent:'center',
    backgroundColor:"#eee",
    overflow:'hidden',
    borderColor:'blue',
    borderWidth:1,
    
  },
  placeholder:{
    marginLeft:10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 20,
    height: 40,
    borderRadius:45,
  },
  submitButtonText: {
    color: "white",
    textAlign:'center',
    fontSize:20,
  }
});
