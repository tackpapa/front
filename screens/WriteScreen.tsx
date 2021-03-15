import * as React from 'react';
import {  Platform, ScrollView } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import postactions from '../store/post/postactions';
import jobsactions from '../store/jobs/jobsactions';
import marketactions from '../store/market/marketactions';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker';
import { PostType } from '../store/post/posttypes';
import { JobType } from '../store/jobs/jobstypes';
import { MarketType } from '../store/market/markettypes';
import ICC from '../icons/imageicon.svg'
import { Fragment } from 'react';


const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:white;
flex:1;
`;

const userSelector = ({user} : RootState) => user;


const dropposting = [
  {label: '자유게시판', value: 'free'},
  {label: '도와주세요', value: 'help',},
  {label: '사건사고', value: 'accident',},
  {label: '투어번개', value: 'tour',},
  {label: '사기꾼신고', value: 'fraud',},
  {label: '배달대행', value: 'bedal',},
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
  const [tags, setTags] = useState([""]);
  const [category, setCategory] = useState("free")
  const [pic, setPic] = useState<any>([]);
  const regex = new RegExp(/(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/gmi);

  useEffect(() => {
   if(user._id===""){
     navigation.navigate("RegisterScreen")
   }
  }
,[user])



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
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
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
if(user._id === ""){
  navigation.navigate("RegisterScreen")
}else{
  if(pageKind === "posting" && context.length > 0){
  dispatch(postactions.createPost.request(newPost));
  navigation.navigate("HomeScreen", {value: newPost.category, posting:"posting"})}else{null}

  if(pageKind === "jobing" && context.length > 0 ){
    dispatch(jobsactions.createJob.request(newJob));
    navigation.navigate("JobsScreen", {value: newJob.category, posting:"jobing"})}else{null}

  if(pageKind === "marketing" && context.length > 0){
    dispatch(marketactions.createMarket.request(newMarket));
    navigation.navigate("MarketScreen", {value: newMarket.category, posting:"marketing"})}else{null}
  }
}



  return (
  <SafeAreaView >
  <ScrollView style={{backgroundColor:'white'}}>
  <Container style={{flex:1}} >
  <View style={{flexDirection:'row', alignItems:'center', height:60}}>
    <TouchableOpacity onPress={() =>{ navigation.goBack()}}>        
    <Ionicons size={30} name="chevron-back-outline"/>
       </TouchableOpacity><Text style={{fontSize:20}}>목록으로</Text>
       </View>

       <Cut></Cut>
   
       <View style={{height:'auto', width:width*1, backgroundColor:'white', zIndex:100}}>
        <DropDownPicker
              items={drop[pageKind]}
              defaultValue="free"
              containerStyle={{height: 53, width:width*1,justifyContent:'center'}}
              style={{backgroundColor: 'white', height:'auto', width:width*1, alignContent:'center'}}
              labelStyle={{
                fontSize: 18,
                marginLeft:10,
                textAlign: 'left',
                color: '#4e76e0',
            }}
              itemStyle={{
                  justifyContent: 'center',
                  
              }}
              dropDownStyle={{backgroundColor: '#fafafa', position:'absolute', height:'auto'}}
              onChangeItem={(item) => {setCategory(item.value); setTags(item.value)}}
              />
        </View>
<View style={{height:53}}>
          <TagInput         
          underlineColorAndroid="transparent"
          placeholder="제목"
          placeholderTextColor="#3b3b3b"
          selectionColor={'black'}
          onChangeText={(val)=>setTitle(val)}         
        />
        </View>
        <Cut></Cut>


        
        {
          (
            pageKind === "jobing" ?  <View style={{height:'auto'}}>
            
            <TagInput
          
          underlineColorAndroid="transparent"
          placeholder="대략적위치 e.g 서울시 00동"
          placeholderTextColor="#7c7c7c"
          selectionColor={'black'}
          onChangeText={(val)=>setLocation(val)}         
        />
        <Cut></Cut>
            </View>:null        
          )
        }
        {
          (
            pageKind === "marketing" ?  
           <>
        <TagInput
          underlineColorAndroid="transparent"
          placeholder="위치"
          placeholderTextColor="#7c7c7c"
          selectionColor={'black'}
          onChangeText={(val)=>setLocation(val)}         
        />
        <Cut></Cut>
         
             
          <TagInput
          underlineColorAndroid="transparent"
          placeholder="가격 0000원, 숫자만"
          keyboardType = "numeric"
          placeholderTextColor="#7c7c7c"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setPrice(val)}         
        />
        <Cut></Cut>
        
        </>
         :null      
          )
        }
 <ConteContainer>
    <Conte multiline = {true}
          numberOfLines = {4}
          underlineColorAndroid="transparent"
          placeholder="욕설과 비방은 자제해주세요 :) "
          placeholderTextColor="#7c7c7c"
          selectionColor={'black'}
          style={{color:'black'}}
          onChangeText={(val)=>setContext(val)}         
        />
        </ConteContainer>   
        <Cut></Cut>

    
          <TagInput
          
          underlineColorAndroid="transparent"
          placeholder="태그를 추가하실땐 꼭 단어앞에 #을 붙여주세요! "
          placeholderTextColor="#7c7c7c"
          selectionColor={'black'}
          onChangeText={(val)=>handleTags(val)}               
          />
          <Cut></Cut>
        
        
<ScrollView horizontal={true} style={{marginLeft:20, backgroundColor:'white'}}>
  {    (  pic.length > 0 ?        
             
            pic.map((item:any, index:any)=>{ 
              return (
                <Fragment key={index}>
              <View >         
              
             
              
               <View style={{justifyContent:'space-between', flexWrap: 'wrap', flexDirection:'row', alignItems:'center', marginTop:10}}>
                  <View style={{flexDirection:'row', backgroundColor:'white'}}>
                      <ICC style={{ marginBottom:5}}></ICC>
                      <Text style={{fontSize:17, marginLeft:5, marginBottom:5, color:'black'}}>사진{index+1}</Text>
                    </View>
                    <View>
                    <TouchableOpacity
                      style={{flexDirection:'row', backgroundColor:'white'}}
                      onPress={()=>{delpic(index)}}>
                      <Text style={{fontSize:17, marginLeft:3, marginBottom:5,marginRight:20, color:'red'}}>삭제</Text>
                    
                    </TouchableOpacity>    
                    </View>
               </View>
            
             <Banner style={{height:200, width:200, marginTop:5}} source={{uri: item.uri}}/>
             </View>
              
              </Fragment>
              )

            })     
          :null
          
          )
    }
    </ScrollView>
               
         <TouchableOpacity
            style={{flexDirection:'row', height:22, alignItems:'center', marginTop:20}}
           onPress={pickImage}
         >
           <ICC style={{marginLeft:20}}></ICC><Text style={{fontSize:17, marginLeft:3, color:'#4e76e0'}}>사진추가하기  </Text>
             </TouchableOpacity>

        <Sbtn onPress={ ()=>submitPost()}>
          <Stext>게시글 올리기</Stext>
        </Sbtn>       

      
    </Container>
    </ScrollView>
    
  
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
const Sbtn = styled.TouchableOpacity`
justify-content:center;
padding:10px;
margin:20px;
height:47px
border-radius:15px;
background-color:#4e76e0;
`
const Stext = styled.Text`
   color:white;
   font-size:17px;
   text-align:center;
   font-family: NotoSansCJKkr-Bold;
`

const Conte = styled.TextInput`
  align-items:center;
  font-size:17px;
   height:200px;
  text-align:left;
  margin-left:20px;
  margin-top:5px;
   background-color:white;
   color:black;
`
const ConteContainer = styled.View`
  height:200px;
  font-size:17px;
  background-color:white;
   
`
const TagInput = styled.TextInput`
  align-items:center;
  font-size:17px;
   height:53px;
  text-align:left;
  margin-left:20px;
   background-color:white;
   color:black;
`
const Banner = styled.Image`
border-radius:15px;
width: ${width * 0.9}px;
height: 144px;
margin-bottom:2px;
margin-right:${width * 0.05}px;
`









