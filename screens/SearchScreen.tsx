import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '~/../store/types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import postactions from '../store/post/postactions';
import marketactions from '../store/market/marketactions';
import jobsactions from '../store/jobs/jobsactions'
import { useEffect, useState } from 'react';
import  SL from '../../icons/search.svg';
import { Fragment } from 'react';
import { trimText, formatDate } from "../utils/util"
import searchactions from '../store/search/searchactions';


const {width, height} = Dimensions.get("screen")

const post = ({post:{result}} : RootState) => result;
const market = ({market:{result}} : RootState) => result;
const job = ({jobs:{result}} : RootState) => result;
const hotsearch = ({search:{data}} : RootState) => data;

const pageType = {
  "게시판":"Post",
  "공고":"Job",
  "상품":"Market"
}

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const pageName = route.params;
  const [query, setQuery] = useState("");
  const Post = useSelector(post);
  const Market = useSelector(market);
  const Job = useSelector(job);
  const keywords = useSelector(hotsearch);


const move = (id : string) => {
  navigation.navigate("SeePostScreen", {_id: id, page:pageType[route.params as keyof typeof pageType]});
}

useEffect(() => {
dispatch(searchactions.GetSearch.request())
  }
,[route])

const handleHot = (val:string)=>{
  setQuery(val);
  search();
}
const search = async () => {
  if (query === "") {
    return;
  }else if(pageName === "게시판") {
    dispatch(postactions.searchPost.request(query as any));  
  }else if(pageName === "공고") { 
    dispatch(jobsactions.searchJob.request(query as any));  
  }else if(pageName === "상품") {
    dispatch(marketactions.searchMarket.request(query as any));  
  }
}

const deleteResult = ()=>{
  dispatch(postactions.deleteResult.request());
  dispatch(marketactions.deleteResult.request());
  dispatch(jobsactions.deleteResult.request());
}

  return (
  <SafeAreaView style={{backgroundColor:'white'}}>
    <ScrollView style={{backgroundColor:'white'}}>
  <Container>
  <View style={{flexDirection:'row', alignItems:'center', height:60}}>
    <TouchableOpacity onPress={() =>{ navigation.goBack(); deleteResult()}}>        
    <Ionicons size={30} name="chevron-back-outline"/> 
       </TouchableOpacity>
       <SB>
       <SearchBox
          underlineColorAndroid="transparent"
          placeholder="검색어를 입력하세요"
          placeholderTextColor='#7c7c7c'
          selectionColor={'#7c7c7c'}
          returnKeyLabel={'search'}
          returnKeyType={'search'}
          onChangeText={(val)=>setQuery(val)}
          onSubmitEditing={() => search()}         
        /></SB>
       </View>
       <Cut></Cut>
   
       <View style={{ height:50, backgroundColor:'white'}}>   
                  <Ingi>인기 검색어</Ingi>
                  </View>
                  <TB style={{height:'auto'}} >
                    {(keywords.length > 0 ?
                      keywords.map((item, i)=>{
                        return ( 
                      <TouchableOpacity  key={`${item._id}`} onPress={()=>handleHot(item.query)}> 
                         <TagS>{item.query}</TagS>
                         </TouchableOpacity>
                         )                      
                      })                    
                      : null)}
                  </TB>
 
    

        <CardLine>
        { 
          (  (Post as any) === undefined && (Job as any) === undefined && (Market as any) === undefined ? <View style={{height:50, backgroundColor:'white'}}> 
           <GesipanMenu style={{textAlign:'center', marginRight:10}}>무엇을 검색해볼까요? </GesipanMenu>
          </View>:null     
          )
        }
        { 
          (  (Post as any)?.length > 0 ? <View style={{height:50, backgroundColor:'white'}}> 
           <GesipanMenu><Gesipan> 게시판 </Gesipan>검색결과 </GesipanMenu>
          </View>
                       
            :null     
          )
     }
    { 
          (  Post ? Post.map((item)=>{    return (                   
            <Fragment key={`${item._id}`}>
                            
            <Card >
                 <TouchableOpacity
                    style={{flex:1}}
                    onPress={() => {
                    move(item._id);
                    
                }}>
                     <View  style={{flexWrap: 'wrap', 
                    flexDirection:'row', 
                    }}>
                        { item.tags.map((tag, i) =>
                               ( <Tag key={i}>{tag}</Tag> )                       
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
                    <Author>{item.author.name}</Author>
                    <Author style={{textAlign:'right', justifyContent:'flex-end'}}>{formatDate(item.createdAt as unknown as string)}</Author>
                </View>

                </TouchableOpacity>
                
            </Card>
            <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>)                 
                    }) : null      
          )
    }
     { 
          (  (Job as any)?.length > 0 ? <GesipanMenu><Gesipan> 구인공고 </Gesipan>검색결과 </GesipanMenu>:null    
          )
     }
    {     (  Job ? Job.map((item)=>{    return (                   
                        <Fragment key={`${item._id}`}>
                            
                        <Card >
                             <TouchableOpacity
                                style={{flex:1}}
                                onPress={() => {
                                move(item._id);
                                
                            }}>
                                 <View  style={{flexWrap: 'wrap', 
                                flexDirection:'row', 
                                }}>
                                    { item.tags.map((tag, i) =>
                                           ( <Tag key={i}>{tag}</Tag> )                       
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
                                <Author>{item.author.name}</Author>
                                <Author style={{textAlign:'right', justifyContent:'flex-end'}}>{formatDate(item.createdAt as unknown as string)}</Author>
                            </View>
            
                            </TouchableOpacity>
                            
                        </Card>
                        <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>)                 
                    }) : null       
          ) 
    }
     { 
          (  (Market as any)?.length > 0 ?  <GesipanMenu><Gesipan> 중고장터 </Gesipan>검색결과 </GesipanMenu>: null     
          )
     }
    {       (  Market ? Market.map((item)=>{    return (                   
                        <Fragment key={`${item._id}`}>
                            
                        <Card >
                             <TouchableOpacity
                                style={{flex:1}}
                                onPress={() => {
                                move(item._id);
                                
                            }}>
                                 <View  style={{flexWrap: 'wrap', 
                                flexDirection:'row', 
                                }}>
                                    { item.tags.map((tag, i) =>
                                           ( <Tag key={i}>{tag}</Tag> )                       
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
                                <Author>{item.author.name}</Author>
                                <Author style={{textAlign:'right', justifyContent:'flex-end'}}>{formatDate(item.createdAt as unknown as string)}</Author>
                            </View>
            
                            </TouchableOpacity>
                            
                        </Card>
                        <Cut style={{marginTop:5, marginBottom:5}}></Cut></Fragment>)                 
                    }) : null    
          )}
    </CardLine>  
    </Container>
    </ScrollView>
    </SafeAreaView>
  );
}

const Container = styled.View`
background-color:white;
`;

const SearchBox = styled.TextInput`
text-align:center;
shadowColor:#678a9bcb;
shadow-offset:0 3px;
shadow-opacity: 0.45;
shadowRadius: 4.65px;
`

const SB = styled.TouchableOpacity`
  height: 40px;
  width:250px;
  backgroundColor:#fff;
  overflow:hidden;
  justify-content:center;
  border-color:#fff;
  border-width:1px;
  border-radius: 18px;
  background-color: #eee;
  margin-left:${width * 0.15}px;
  shadowColor:#678a9bcb;
  shadow-offset:0 3px;
  shadow-opacity: 0.45;
  shadowRadius: 4.65px;
  elevation: 6;
`
const Ingi = styled.Text`
font-family: NotoSansCJKkr-Bold;
    font-size: 20px;
    line-height: 23px;
    padding:10px;
    margin-top:10px;
    text-align: left;
    color: #3b3b3b;
    
`
const Tag = styled.Text `
font-size: 13px;
text-align: left;
border-radius: 10px;
color:#9f9f9f;
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
flex-direction:row;
flex-wrap:wrap;
`;

const TB = styled.View`
height: 100px;
align-items:center;
background-color:white;
flex-direction:row;
flex-wrap:wrap;
width:${width*0.9}px;
margin-left:${width*0.05}px;
`
const Card = styled.View `
padding-top:5px;
flex:1;
padding:5px;
margin-left:${width * 0.05}px;
`
const CardTitle = styled.Text`
    margin-top:7px;
    font-size: 15px;
    font-weight: 700;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #242424;

`
const CardContext = styled.Text`
    margin-top:5px;
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
border-radius: 15px;
background-color:#ffffff;
shadowColor:#678a9bcb;
shadow-offset:0 3px;
shadow-opacity: 0.45;
shadowRadius: 4.65px;
marginTop:20px;
`

const AuthorPic = styled.Image `
border-radius:15px;
margin-top:5px;
`;
const Author = styled.Text `
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #9f9f9f;
    margin-left:5px;
    margin-top:10px;
`;
const GesipanMenu = styled.Text `
font-size: 16px;
font-weight: bold;
font-style: normal;
margin-left:10px;
margin-bottom:10px;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: #4e76e0;
margin-top:20px;
`;
const Gesipan = styled.Text `
font-size: 16px;
font-weight: bold;
font-style: normal;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: black;
margin-top:20px;
`;
const TagS = styled.Text `
font-size: 17px;
text-align: left;
border-radius: 10px;
color:#9f9f9f;
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
`;


const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 1px;
    border-color: #e3e3e3;
    justify-content:center;
`

