import React, {useEffect} from "react";
import {Image, ScrollView } from 'react-native';
import { useRoute} from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../store/post/postactions';
import jobsactions from '../store/jobs/jobsactions';
import marketactions from '../store/market/marketactions';
import tier from '../constants/Tier';
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { PostType } from '~/../store/post/posttypes';
import { JobType } from '~/../store/jobs/jobstypes';
import { MarketType } from '~/../store/market/markettypes';
import { trimText, formatDate } from "../utils/util"
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
const {width, height} = Dimensions.get("screen")
const dropposting = {
  'free':'자유게시판',
  'help':'도와주세요',
  'accident':'사건사고',
  'tour':'투어번개',
  'fraud':'사기꾼신고',
  'bedal':'배달대행',
  'domestic':'국산바이크',
  'imported':'수입바이크'
}
const dropjobing = {
  'free':'자유게시판',
  'ride':'배달대행',
  'fix':'수리',
  'etc':'기타',
}
const dropmarketing = {
  'free':'아무거나',
  'part':'부품',
  'safety':'안전용품',
  'acc':'액세서리',
}
const drop ={
  "posting" : dropposting,
  "marketing": dropmarketing,
  "jobing" : dropjobing,
  }




export default function CommunityScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const pageKind: keyof typeof drop = route.params.page;
  const category:string = route.params.value;
  const postSelector = ({post}:RootState)=> post[category as PostType];
  const jobSelector = ({jobs}:RootState)=> jobs[category as JobType];
  const marketSelector = ({market}:RootState)=> market[category as MarketType];
  const pagename = (drop[pageKind] as any)[category]
  const posts = useSelector(postSelector)
  const jobs = useSelector(jobSelector)
  const markets = useSelector(marketSelector)  

const pagemap = {
    "posting": posts,
    "jobing": jobs,
    "marketing": markets,
}

const target = pagemap[route.params.page as keyof typeof pagemap]

const payload = {
    category:route.params.value,
    date: (target.length === 0 ? new Date().toISOString(): target[target.length-1].createdAt)
}
const pageToAction = {
    "posting": postactions.getCategoryPost,
    "jobing": jobsactions.getCategoryJob,
    "marketing": marketactions.getCategoryMarket,
}

const pageType = {
    "posting":"Post",
    "jobing":"Job",
    "marketing":"Market"
}

const move = (id : string) => {
    navigation.navigate("SeePostScreen", {_id: id, page:pageType[route.params.page as keyof typeof pageType]});
}

  useEffect(() => {    
        dispatch(pageToAction[route.params.page as keyof typeof pageToAction].request(payload))
      },[route])

const refresh =(e: any)=>{  
    const contentHeight = e.nativeEvent.contentSize.height; // 전체 컨텐츠 높이
    const scrollY = e.nativeEvent.contentOffset.y; // 스크롤 가능한 영역에서 스크롤한 y값
    const scrollHeight = e.nativeEvent.layoutMeasurement.height; // 스크롤바 사이즈
    if(scrollY + 200 > contentHeight-scrollHeight){
        dispatch(pageToAction[route.params.page as keyof typeof pageToAction].request(payload))   
    }
}

 
  return (
  <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
      <ScrollView onScroll={refresh} scrollEventThrottle={300}>
      <View style={{height:40}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', margin:10}} onPress={() =>{ navigation.goBack();}}>        
    <Ionicons size={20} name="ios-arrow-back"/>
        <Text style={{fontSize:17, color:"black",                  
                      textAlign:'left',
                      backgroundColor:'white',            
                     }}>뒤로</Text>
     
       </TouchableOpacity></View>
  <Container>

    <ScrollView style={{flex: 1}}>
      
      <Topdiv>
      <Head>{pagename}</Head>
      </Topdiv>
      {(posts && route.params.page ==="posting" ?  
       <CardLine>
       <GesipanMenu><Gesipan>{pagename}</Gesipan> 게시글 </GesipanMenu>    
       <Cut style={{marginBottom:5}}></Cut>
                  {posts.map((item) => {
                          return (
                           <Fragment key={`${item._id}`}>                           
                           <Card>
                                <TouchableOpacity
                                   style={{flex:3}}
                                   onPress={() => {
                                   move(item._id);
                                   
                               }}>
                                <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                                     <View  style={{flexWrap: 'wrap', 
                                    flexDirection:'row', 
                                    }}>
                                        { item.tags?.map((tag, i) =>
                                               ( <Tag key={i}>{tag}</Tag> )                       
                                            )}    
                                    </View>    
                                    <View>
                                        <Author style={{marginRight:25, marginTop:0}}>
                                            <Author style={{marginRight:25, color:'#4e76e0',marginTop:0}}> 추천 {item.likes} 개 </Author>
                                            
                                            </Author>
                                    </View>
                                </View> 
                               <View style={{flexWrap: 'wrap',flexDirection:'row' }}>       
                                   <View style={{justifyContent:"flex-start", flex:5}}>     
                                     <CardTitle>{trimText(item.title, 20)}</CardTitle>
                                     <CardContext >{trimText(item.context, 90)}</CardContext>
                                   </View>

                                   <View style={{flex:2, alignItems:'center'}}>
                                       <View>
                                           
                                               {!!item.pics?.length && (
                                            <AuthorPic style={{
                                                    width: 60,
                                                    height: 60,
                                                }}
                                                    source={{
                                                    uri: item.pics[0]
                                                }}/>
                                                )}
                                       </View>
                                   </View>
                               </View>  

                            

                               <View  style={{justifyContent:"space-between",flexWrap: 'wrap', flexDirection:'row', alignItems:'center'}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <AuthorPic style={{ width: 20,height: 20}} source={{uri: item?.author.profilepic }}/>
                                            <Image style={{height:25, width:25, marginTop:5}} source={tier(item.author?.exp).img} />
                                            <Author>{item.author?.name}</Author>
                                    </View>
                                    <View>
                                             <Author style={{marginRight:25}}>{formatDate(item?.createdAt as unknown as string)}</Author>
                                    </View>
                                </View>

                               </TouchableOpacity>
                               
                           </Card>
                           <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>                             
                          )
                      })}

       </CardLine> 
    : null )}
    {(jobs && route.params.page ==="jobing"?  
        <CardLine>
        <GesipanMenu><Gesipan> {pagename}</Gesipan> 게시글 </GesipanMenu>    
        <Cut style={{marginBottom:5}}></Cut>
                   {jobs.map((item) => {
                           return (
                            <Fragment key={`${item._id}`}>
                            
                            <Card>
                                 <TouchableOpacity
                                    style={{flex:3}}
                                    onPress={() => {
                                    move(item._id);
                                    
                                }}>
                                <View  style={{flexWrap: 'wrap', 
                                    flexDirection:'row', 
                                    }}>
                                        { item.tags.map((tag, i) =>
                                               ( <Tag key={`com-tag-${i}`}>{tag}</Tag> )                       
                                            )}    
                                </View>    
                                <View style={{flexWrap: 'wrap',flexDirection:'row' }}>       
                                    <View style={{justifyContent:"flex-start", flex:5}}>     
                                      <CardTitle>{trimText(item.title, 20)}</CardTitle>
                                      <CardContext >{trimText(item.context, 90)}</CardContext>
                                    </View>

                                    <View style={{flex:2, alignItems:'center'}}>
                                        <View>
                                            <AuthorPic style={{
                                                    width: 60,
                                                    height: 60,
                                                }}
                                                    source={{
                                                    uri: item.pics[0]
                                                }}/>
                                        </View>
                                    </View>
                                </View>  
                                <View  style={{display:"flex",flexWrap: 'wrap', flexDirection:'row', alignItems:'center'}}>
                                    <AuthorPic style={{ width: 20,height: 20}}
                                        source={{
                                        uri: item.author.profilepic
                                    }}/>
                                    <Image style={{height:25, width:25, marginTop:5}} source={tier(item.author?.exp).img} />
                                    <Author>{item.author.name}</Author>
                                    <Author style={{textAlign:'right', justifyContent:'flex-end'}}>{formatDate(item.createdAt as unknown as string)}</Author>
                                </View>

                                </TouchableOpacity>
                                
                            </Card>
                            <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>
                               
                           )
                       })}
        </CardLine>  
    : null )}
    {(markets && route.params.page ==="marketing"?  
        <CardLine>
        <GesipanMenu><Gesipan> {pagename}</Gesipan> 게시글 </GesipanMenu>    
        <Cut style={{marginBottom:5}}></Cut>
                   {markets.map((item) => {
                           return (
                            <Fragment key={`${item._id}`}>
                            
                            <Card key={`com-${item._id}`}>
                                 <TouchableOpacity
                                    style={{flex:3}}
                                    onPress={() => {
                                    move(item._id);
                                    
                                }}>
                                <View  style={{flexWrap: 'wrap', 
                                    flexDirection:'row', 
                                    }}>
                                        { item.tags.map((tag, i) =>
                                               ( <Tag key={`com-tag-${i}`}>{tag}</Tag> )                       
                                            )}    
                                </View>    
                                <View style={{flexWrap: 'wrap',flexDirection:'row' }}>       
                                    <View style={{justifyContent:"flex-start", flex:5}}>     
                                      <CardTitle>{trimText(item.title, 20)}</CardTitle>
                                      <CardContext >{trimText(item.context, 90)}</CardContext>
                                    </View>

                                    <View style={{flex:2, alignItems:'center'}}>
                                        <View>
                                            <AuthorPic style={{
                                                    width: 60,
                                                    height: 60,
                                                }}
                                                    source={{
                                                    uri: item.pics[0]
                                                }}/>
                                        </View>
                                    </View>
                                </View>  
                                <View  style={{display:"flex",flexWrap: 'wrap', flexDirection:'row', alignItems:'center'}}>
                                    <AuthorPic style={{ width: 20,height: 20}}
                                        source={{
                                        uri: item.author.profilepic
                                    }}/>
                                    <Image style={{height:25, width:25, marginTop:5}} source={tier(item.author?.exp).img} />
                                    <Author>{item.author.name}</Author>
                                    <Author style={{textAlign:'right', justifyContent:'flex-end'}}>{formatDate(item.createdAt as unknown as string)}</Author>
                                </View>

                                </TouchableOpacity>
                                
                            </Card>
                            <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>
                               
                           )
                       })}
        </CardLine>  
    : null)}

      {(
      (posts === undefined||posts.length === 0)  && 
      (jobs === undefined||jobs.length === 0)  && 
      (markets === undefined||markets.length === 0) ? 
      <Text style={{fontSize:15, textAlign:'center', padding:30, opacity:0.5}}> 게시물이 없습니다. </Text> : null
        )}

    </ScrollView>
    </Container>
    </ScrollView>
    </SafeAreaView>
  );
}


const Container = styled.ScrollView `
flex:1
background-color:white;
`
const Card = styled.View `
paddingTop:5px;
flex:1;
padding:5px;
marginLeft:${width * 0.05}px;
`
const Topdiv = styled.View `
paddingTop:5px;
flex:1;
padding:5px;
height:50px;
background-color:white;
`

const CardTitle = styled.Text`
    marginTop:7px;
    font-size: 15px;
    font-weight: 700;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #242424;

`
const Head = styled.Text`
    marginTop:7px;
    font-size: 25px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0px;
    text-align: left;
    color: #242424;
    text-align:center;
`
const CardContext = styled.Text`
    marginTop:5px;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    color: #5f5f5f;
`
const CardLine = styled.View `
padding: 8px 0 0;
border-radius:15px;
background-color:#ffffff;
shadowColor:#678a9bcb;
shadow-offset:0 3px;
shadow-opacity: 0.45;
shadowRadius: 4.65px;
marginTop:20px;
`
const AuthorPic = styled.Image `
border-radius:15px;
marginTop:5px;
`;
const Author = styled.Text `
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #9f9f9f;
    marginLeft:5px;
    marginTop:10px;
`;
const GesipanMenu = styled.Text `
font-size: 16px;
font-weight: bold;
font-style: normal;
marginLeft:10px;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: #4e76e0;
marginTop:20px;
marginBottom:10px;
`;


const Gesipan = styled.Text `
font-size: 16px;
font-weight: bold;
font-style: normal;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: black;
marginTop:20px;
`;
const Tag = styled.Text `
font-size: 13px;
text-align: left;
border-radius: 10px;
color:#9f9f9f;
background-color: #ffffff;
border-style: solid;
border-width: 0.5px;
border-color: #9f9f9f;
paddingLeft:5px;
paddingRight:5px;
paddingBottom:2px;
paddingTop:2px;
marginRight:5px;
marginBottom:2px;
`;

const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 1px;
    border-color: #e3e3e3;
    justify-content:center;
`