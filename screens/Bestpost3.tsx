import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import {Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { RootState } from "../store/types";
import { Text, View } from '../components/Themed';
import { trimText, formatDate } from "../utils/util";
import { useNavigation, useRoute } from "@react-navigation/native";
import postactions from "../store/post/postactions";

const {width, height} = Dimensions.get("screen")
const postSelector = ({post:{hot30}} : RootState) => hot30;

export default function Bestpost3() {
    const post = useSelector(postSelector)
    const route = useRoute<any>();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const move = (id : string) => {
        navigation.navigate("SeePostScreen", {_id: id, page:"Post"});
      }



return (
    <Container>
<CardLine>
<GesipanMenu><Gesipan> 월간 </Gesipan>인기글 </GesipanMenu>    
<Cut style={{marginBottom:5}}></Cut> 
     {( post.length > 0 ?
       post.map((item)=>{ 
         return ( 
           <React.Fragment key={`${item._id}`}>                            
                       <Card>
                            <TouchableOpacity
                               style={{flex:1}}
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
                                            {item?.views > 0 ?<Author style={{marginRight:25, color:'#4e76e0',marginTop:0}}> 추천 {item.likes} 개 </Author>:null}
                                            
                                            </Author>
                                    </View>
                                </View> 
                           <View style={{flexWrap: 'wrap',flexDirection:'row' }}>       
                               <View style={{justifyContent:"flex-start", flex:5}}>     
                               <CardTitle style={{color:'#4e76e0'}}>{trimText(item.title, 20)} {item.comments?.length > 0?<Text style={{color:'#4e76e0'}}>[{item.comments.length}]</Text>:null}</CardTitle>
                               <CardContext >{trimText(item.context, 90)}</CardContext>
                               </View>

                               <View style={{flex:2, alignItems:'center'}}>
                               <View>{!!item.pics?.length && (
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
                               <AuthorPic style={{ width: 20,height: 20}}
                                   source={{
                                   uri: item.author?.profilepic
                               }}/>
                               <Author>{item.author?.name}</Author>
                               </View>
                               <View>
                               <Author style={{marginRight:25}}>{formatDate(item.createdAt as unknown as string)}</Author>
                               </View>
                           </View>

                           </TouchableOpacity>
                           
                       </Card>
                       <Cut style={{marginTop:5, marginBottom:5}}></Cut>
                       </React.Fragment>
          )
       })
              
      : <Text style={{fontSize:15, textAlign:'center', padding:30, opacity:0.5}}> 게시물이 없습니다. </Text> 
     )}
     </CardLine>   
     </Container>
)
    }


const Container = styled.ScrollView`
background-color:#fff;
flex:1;
`;
const AuthorPic = styled.Image `
border-radius:15px;
margin-top:5px;
`;
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
marginTop:10px;
marginBottom:100px;
`
const Author = styled.Text `
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #9f9f9f;
    margin-left:5px;
    margin-top:5px;
`;
const GesipanMenu = styled.Text `
font-size: 16px;
font-weight: bold;
font-style: normal;
margin-left:20px;
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
`;


const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 1px;
    border-color: #e3e3e3;
    justify-content:center;
`
