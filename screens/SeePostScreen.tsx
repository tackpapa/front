import * as React from 'react';
import {  KeyboardAvoidingView, Image, Alert, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../store/post/postactions';
import jobsactions from '../store/jobs/jobsactions';
import marketactions from '../store/market/marketactions';
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import commentactions from '../store/comment/commentactions';
import { trimText, formatDate } from "../utils/util"
import tier from '../constants/Tier';
import { Fragment } from 'react';
import { useState } from 'react';
import { CreateCommentRequestPayload } from '../store/comment/commenttypes';


const postSelector = ({ comment:{data}, post:{
  onepost,
  isLoading: isPostLoading,
}, market:{onemarket, isLoading: isMarketLoading,}, jobs:{onejob,isLoading: isJobLoading, } }:RootState)=> ({
  Post: onepost,
  Job: onejob,
  Market:onemarket,
  comment:data,
  isLoading: isPostLoading || isMarketLoading || isJobLoading,
});
const userSelector = ({user} : RootState) => user;

const {width, height} = Dimensions.get("screen")

const dropposting = {
  'free':'자유',
  'help':'도와주세요',
  'accident':'사건사고',
  'tour':'투어번개',
  'fraud':'사기꾼신고',
  'bedal':'배달대행',
  'domestic':'국산바이크',
  'imported':'수입바이크',
  'ride':'배달대행',
  'fix':'수리',
  'etc':'기타',
  'part':'부품',
  'safety':'안전용품',
  'acc':'액세서리',
}


export default function SeePostScreen() {
  const user = useSelector(userSelector);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { comment, isLoading, ...posts } = useSelector(postSelector);
  const post = posts[route.params.page as keyof typeof posts];
  const [text, setText] = useState("");
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch(); 
  const [init, setInit] = useState<boolean>(false); 
  useEffect(() => {
    if (route.params?._id) {
      const apicall = {
        "Post" : postactions.getPost.request,
        "Job":   jobsactions.getJob.request,
        "Market": marketactions.getMarket.request,
      }

      dispatch(apicall[route.params.page as keyof typeof apicall]({_id:route?.params._id}));
      dispatch(commentactions.getComment.request({post:route.params._id, postmodel:route.params.page}));
    }
    }
  ,[dispatch, route])

  useEffect(()=>{
    if(user.liked.includes(`${route.params._id}`)){
      setHeart(true)
    }

  },[user, post])
  
  useEffect(() => {
    if (isLoading) {
      setInit(true);
    }
  }, [isLoading]);
  useEffect(() => {
  if(post === undefined && init && !isLoading){
    alert("삭제된 게시물 입니다.")
    navigation.goBack()
  }
  },[navigation, post, init, isLoading]);


  const handlelike = (id:string)=>{
    if(user._id === ""){Alert.alert("로그인해주세요")}else{
    if(user.liked.includes(`${route.params._id}`)){
      setHeart(false)
      dispatch(postactions.dislikePost.request({_id:id}))
    }else{
      dispatch(postactions.likePost.request({_id:id}))
      setHeart(true)
    }}
  }



  const newComment:CreateCommentRequestPayload = {
    text,
    post:route.params._id,
    postmodel:route.params.page,
  };


  const submit = ()=>{
    if(text.length > 0 ){
      dispatch(commentactions.createComment.request(newComment));
    setText('');
    }else {null}   
  }
  const del = (id:string)=>{
    const apicall = {
      "Post" : postactions.deletePost.request,
      "Job":   jobsactions.deleteJob.request,
      "Market": marketactions.deleteMarket.request,
    }  
    dispatch(apicall[route.params.page as keyof typeof apicall]({_id: id}));
    navigation.goBack()
  }

  
  const gochat = ()=>{
    if(user._id===""){
      navigation.navigate("KakaoScreen");
    }else{     
      const target = post;
      navigation.navigate('Chat', {
        screen: 'SeeChatScreen',
        params: { name: target?.author.name, msg:target?.title+"  글보고 연락드립니다.", id:target?.author._id},
      });
    }
  }

  
  const KeyboardComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  if (!post) {
    return null;
  }
  return (
  <SafeAreaView style={{flex:1}}>
  <Container>
    
  <View style={{flexDirection:'row', alignItems:'center', height:50, justifyContent:'space-between'}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() =>{ navigation.goBack()}}>    
      <Ionicons size={18} name="chevron-back-outline"/>
      <Text style={{fontSize:18}}>목록으로</Text>   
    </TouchableOpacity>

    {(post.author?._id === user._id ?
         <TouchableOpacity onPress={()=>{del(post._id)}}> 
         <Text style={{color:'red',fontSize:15, marginRight:20}}><Ionicons size={15} name="trash-outline"/>글 삭제</Text>
      </TouchableOpacity>
      : null)}

  </View>
       
    <View style={{}}>
              <View key={`post-${post._id}`} style={{minHeight:400}}>       
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>

                          <View style={{flexWrap: 'wrap', flexDirection:'row', marginLeft:10 }}>
                                            { post.tags.map((tag, i) =>
                                                  ( <Tag key={`posttag-${i}`}>{tag}</Tag> )                       
                                                )}
                      </View>

                      <View style={{flexDirection:'row'}}>
                        
                        <Author style={{marginRight:25}}>조회수 {post.views}</Author>
                      </View>

                </View>    

    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>                                   
       <Title >{post.title} </Title>
       <Author style={{marginRight:20, color:'#4e76e0'}}>{dropposting[post.category as keyof typeof dropposting]}</Author>
    </View>

  <View style={{flexDirection:'row', marginLeft:20, alignItems:'center', justifyContent:'space-between'}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <AuthorPic style={{ width: 20,height: 20}} source={{uri: post.author.profilepic }}/>
    <Image style={{height:25, width:25}} source={tier(post.author?.exp).img} />
    <Author>{post.author.name}  </Author>
   
    </View>
    <View>
    <Author style={{marginRight:25}}>{formatDate(post.createdAt as unknown as string)}</Author>
  </View>
  </View>

                    {( post.pics.length > 0 ? 
                      <View style={{flexWrap: 'wrap', marginLeft:20, marginTop:20}}>
                                            { post.pics.map((item, i) => {return (
                                                    (<AuthorPic key={`post-author-pic-${i}`} style={{ width: width*0.9,height:width*0.9, marginBottom:20}}
                                                    source={{
                                                    uri: item}}/> ))} )}    
                      </View>: null )}  

            <View style={{}}>
               <Context style={{}}>{post.context}</Context>
            </View>   
                                            
              </View>     
 
                

{ post.author._id !== user._id && (route.params.page === 'Market' || route.params.page === 'Job') ?(
  <Update onPress={()=>gochat()} style={{backgroundColor:'#4e76e0'}}>
   <Btntext>{route.params.page === 'Market' ? '문의하기' : '지원하기'}</Btntext>
  </Update>     
): null}
               
    

        
      <View style={{flex:1}}>


        {post && post !== undefined && route.params.page === 'Post' ?

        <View style={{height:30, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>handlelike(post._id)}>
          <Text style={{fontSize:18,  justifyContent:'center', alignItems:'center'}}> 
          {(heart === true ? <Ionicons size={20} name="heart"/>  : <Ionicons size={20} name="heart-outline"/>)} 추천 {(post as any).likes} 개                  
          </Text>
          </TouchableOpacity>
        </View> 
        
        :null}


      <Cut></Cut>
     {(comment.length > 0 ? <Text style={{fontSize:15, marginLeft:20, marginTop:10, marginBottom:15}}>댓글 {comment.length}개</Text> :null)} 
        {    ( comment ? 
                
               comment.map((item,i) => { 
                 
                return (<Fragment key={`${item._id}`}>
                
                  <View style={{flexDirection:'row', width:width*0.9}}>
                        <View style={{flex:2}}>
                          <AuthorPic style={{ width: 36,height: 36, marginLeft:20}} source={{uri: item.author.profilepic }}/>
                        </View>

                        <View style={{flexDirection:'row', marginLeft:20, alignItems:'center', flex:11}}>
                           
                        <View>
                          <View style={{flexDirection:'column'}}>
                          <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Image style={{height:25, width:25}} source={tier(item.author?.exp).img} />
                          <Layer>{item.author.name}  </Layer>
                          </View>
                              <Text style={{fontSize: 15, color:"#3b3b3b", marginTop:5, marginBottom:5}}>{item.text}</Text>
                              <Text style={{marginBottom:20, color:'#9f9f9f'}}>{formatDate(item.createdAt as unknown as string)}</Text>
                          </View>
                        </View>
                          <View style={{flexDirection:'column'}}>
                              
                          </View>
                        </View>
                    </View>
                    
                    </Fragment>
                ) }) 
                
                           
           :null     
              
          )
        }
        </View>

     
     </View>
     
    </Container>
    <Cut></Cut>
    <KeyboardComponent behavior="padding" enabled>
        <Rec>
          {(user._id === "" ? <Text>댓글을 입력하시려면 로그인해주세요</Text> : 
            <><Com
              underlineColorAndroid="transparent"
              placeholder="  댓글을 입력해주세요"
              placeholderTextColor="black"
              selectionColor={'black'}
              value={text}
              onChangeText={(val) => setText(val)}
              onSubmitEditing={submit} />
              <Sub>
                <TouchableOpacity style={{alignItems:'center'}} onPress={submit}>
                  <Subtext>입력</Subtext>
                </TouchableOpacity>
              </Sub></>
          )}
        
        </Rec>
        </KeyboardComponent>
    </SafeAreaView>
  )
}
const Subtext = styled.Text`
color:white;
font-size:18px;
font-weight:bold;
text-align:center;
align-items:center;
`
const Sub = styled.TouchableOpacity`
justify-content:center;
align-items:center;
width:${width*0.2}px;
background-color:#4e76e0;
height:40px;
border-radius:10px;
margin:5px;
`
const Com = styled.TextInput`
width:${width*0.75}px;
background-color:gray;
height:40px;
border-radius: 10px;
background-color: #ffffff;
border-style: solid;
border-width: 1px;
border-color: #dddddd;
`

const Rec = styled.View`
position:relative;
display:flex;
flex-direction:row;
bottom:2px;
background-color:#fff;
width: ${width}px;
height: 80px;
justify-content:center;
align-items:center;
borderRadius: 15px;
marginBottom:20px;
background-color:white;

`
const Cut = styled.View`
    opacity: 0.5;
    background-color:white;
    border-style: solid;
    border: 0.5px;
    border-width:0.5px;
    border-color: #e3e3e3;
    justify-content:center;
    margin-bottom:10px;
`
const Tag = styled.Text `
font-size: 13px;
text-align: left;
border-radius: 10px;
color:#4e76e0;
background-color: #ffffff;
border-style: solid;
border-width: 0.5px;
border-color: #9f9f9f;
padding-left:5px;
padding-right:5px;
padding-bottom:2px;
padding-top:2px;
margin-right:5px;
margin-bottom:2px;
margin-left:5px;
`;
const Title = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    line-height: 26px;
    letter-spacing: 0px;
    text-align: left;
    color: #3b3b3b;
    padding:10px;
    margin-left:10px;
    margin-top:10px;
`
const AuthorPic = styled.Image `
border-radius:15px;

`;
const Author = styled.Text `
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #9f9f9f;
    margin-left:5px;    
`;

const Context = styled.Text `
font-family: NotoSansCJKkr-Regular;
    font-size: 18px;    
    font-style: normal;  
    letter-spacing: 0px;
    color: #242424;
    margin-left:20px;
    margin-bottom:20px;
    margin-top:20px;
`;

const Layer = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #3b3b3b;
`
const Update = styled.TouchableOpacity`
width:${width*0.8}px;
margin-left:${width*0.1}px;
margin-top:20px;
margin-bottom:10px;
height:40px;
border-radius: 10px;
align-items:center;
justify-content:center;
`
const Btntext = styled.Text`
    font-family: NotoSansCJKkr-Bold;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    justify-content:center;
    color: #ffffff;
`
const Price = styled.Text`
    margin-top:7px;
    font-size: 15px;
    font-weight: 700;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #4e76e0;
`
const Container = styled.ScrollView`
flex:1;
`;