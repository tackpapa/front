import React, {useEffect, Fragment} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image} from 'react-native';
import {Text, View} from '../../components/Themed';
import styled from 'styled-components/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootState} from '../../store/types'
import postactions from '../../store/post/postactions'
import Swiper from 'react-native-web-swiper'
import {Dimensions} from "react-native";
import banneractions from "../../store/banner/banneractions";
import { trimText, formatDate } from "../../utils/util"
import  Dom from '../../icons/3462.svg';
import  Imp from '../../icons/3461.svg';
import  Tour from '../../icons/3460.svg';
import  Fraud from '../../icons/3463.svg';
import  Bedal from '../../icons/3464.svg';
import  Acc from '../../icons/3465.svg';
import  Free from '../../icons/3466.svg';
import  Help from '../../icons/3459.svg';
import  Write from '../../icons/icon_edit.svg';
import tier from '../../constants/Tier';
import  Circle from '../../icons/ellipse_77.svg';
import  BlueCircle from '../../icons/ellipse_78.svg';
import { Ionicons } from "@expo/vector-icons";
import { getPushToken } from "../../utils/push";
import useractions from "../../store/user/useractions";


const {width, height} = Dimensions.get("screen")


const userSelector = ({user} : RootState) => user;
const homeSelector = ({post:{latest}} : RootState) => latest;
const bannerSelector = ({banner} : RootState) => banner;

const wait = (timeout:any) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

export default function HomeScreen() {
    const user = useSelector(userSelector);
    const post = useSelector(homeSelector);
    const banner = useSelector(bannerSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute<any>();
    const fBanner = React.useMemo(() => banner.data.filter(item =>item.category === "post"), [banner.data]);




    React.useEffect(() => {
        if(user._id !== ""){       
        (async () => {
            dispatch(useractions.getOne.request(user._id));
          const token = await getPushToken();

          if (token){
              dispatch(useractions.fetchToken.request(token));       
          }
        })();
    }
      }, [user._id]);

    ''
    const move = (id : string) => {
        navigation.navigate("SeePostScreen", {_id: id, page:"Post"});
    }


    const gesi = (value : string) => {
        navigation.navigate("CommunityScreen", {value: value, page:"posting"});
    }
    const write = (value : string) => {
        navigation.navigate("WriteScreen", {value: value});
    }
    
    useEffect(() => {
        if (!post.length) {
            dispatch(postactions.getLatestPost.request(new Date().toISOString()));
        }     
        dispatch(banneractions.getBanner.request());       
        
    }, [dispatch, route])

    const refresh =(e: any)=>{
        
        const contentHeight = e.nativeEvent.contentSize.height; // 전체 컨텐츠 높이
        const scrollY = e.nativeEvent.contentOffset.y; // 스크롤 가능한 영역에서 스크롤한 y값
        const scrollHeight = e.nativeEvent.layoutMeasurement.height; // 스크롤바 사이즈
        if(scrollY + 200 > contentHeight-scrollHeight){
            if(post.length === 0 ){
                dispatch(postactions.getLatestPost.request(new Date().toISOString()));
            } else{
                dispatch(postactions.getLatestPost.request(post[post.length-1].createdAt));
            }         
        }
    }

    const goweb = (i:number)=>{
        if(fBanner[i].link){
            
            navigation.navigate("WebScreen", {link: fBanner[i].link}) 
        } else {
            
            return null
        }      
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      if (post.length) {
        
        dispatch(postactions.getNewPost.request(post[0].createdAt));
    }     
    dispatch(banneractions.getBanner.request());     
    dispatch(useractions.getOne.request(user._id));
      wait(2000).then(() => {          
            setRefreshing(false)
      });
    }, [post, dispatch]);
  
    

    return (
<SafeAreaView style={{flex:1}}>
<View>
    <ScrollView onScroll={refresh} 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    scrollEventThrottle={300}>
    <Container>
    <Header>
     <Event>바이커스</Event>
     <Subtitle>국내 최고의 라이더 커뮤니티</Subtitle>
                <Swiper controlsProps={{
                dotsWrapperStyle: {marginLeft:17, marginBottom:10},
                dotsPos:"top-left",
                prevTitle: '',
                nextTitle: '',
                DotComponent: ({ index, isActive, onPress }:any) => {                        
                if (isActive) {
                return <View style={{margin:2, borderRadius:30}}><BlueCircle></BlueCircle></View>;
                }
                return <View style={{margin:2, borderRadius:30, backgroundColor:'white'}}><Circle></Circle></View>;
                }

                }} controlsEnabled={true} loop timeout={4}
                key={`Home-Swiper-${fBanner.length}`}

                >
                {fBanner.map((item, i) => {                  
                
                return ( <Section key={`${item._id}`} style={{flex:1}} onPress={() => goweb(i)}>
                <Bannerr  source={{uri: item.pic}}/>
                </Section>) }) }
                </Swiper>
            
    </Header>

     <Cut style={{marginTop:10}}></Cut>

     <View style={{backgroundColor:'white'}}>
         <GesipanMenu> BYKERS<Gesipan> 게시판 </Gesipan> </GesipanMenu>    
         
         <View  style={{padding:10, flexWrap: 'wrap', 
                justifyContent:'space-around', backgroundColor:'white',
                alignItems:'flex-start',
                flexDirection:'row', marginTop:7}}>

     <Cate
        style={{}}
        onPress={() => {gesi('free')}}>
        <Free style={{top:10}}></Free>
        <Layer>자유게시판</Layer>
    </Cate>
    <Cate
        style={{}}
        onPress={() => {gesi('accident')}}>
        <Acc style={{top:10}}></Acc>
        <Layer>사건사고</Layer>
    </Cate><Cate
        style={{}}
        onPress={() => {gesi('help')}}>
        <Tour style={{top:10}}></Tour>
        <Layer>도와주세요</Layer>
    </Cate><Cate
        style={{}}
        onPress={() => {gesi('fraud')}}>
        <Fraud style={{top:10}}></Fraud>
        <Layer>사기꾼신고</Layer>
    </Cate>

     <Cate
        style={{}}
        onPress={() => {gesi('domestic')}}>
        <Dom style={{top:10}}></Dom>
        <Layer>국산바이크</Layer>
    </Cate>
    <Cate
        style={{}}
        onPress={() => {gesi('imported')}}>
        <Imp style={{top:10}}></Imp>
        <Layer>수입바이크</Layer>
    </Cate><Cate
        style={{}}
        onPress={() => {gesi('tour')}}>
        <Help style={{top:10}}></Help>
        <Layer>투어번개</Layer>
    </Cate><Cate
        style={{ paddingTop:15}}
        onPress={() => {gesi('bedal')}}>
        <Bedal style={{top:10}}></Bedal>
        <Layer>배달대행</Layer>
    </Cate>
    </View>
    

    </View>  
    <View style={{height:40, backgroundColor:'white', justifyContent:'flex-start'}}>
                  <TouchableOpacity style={{borderColor:'#4e76e0', height:40, marginTop:5, borderWidth:1, borderRadius:0, marginLeft:width*0.05, width:width*0.9, alignItems:'center', justifyContent:'center'}}
                   onPress={()=>navigation.navigate("BestScreen")}>
                    
                        <Text style={{fontSize:16,textAlign:'center'}}> <Text style={{fontSize:16, fontWeight:'bold', color:'#4e76e0'}}>인기글 모아보기 </Text><Ionicons size={16} name="chevron-forward"/></Text>
                    
                    </TouchableOpacity>     
    </View>     
     <CardLine>
     <GesipanMenu><Gesipan> 새로운 </Gesipan>게시글 </GesipanMenu>    
     <Cut style={{marginBottom:5}}></Cut>
                {post.map((item, i) => {
                        if (!item) return null
                        return (<Fragment key={`${item._id}`}>
                            
                            <Card>
                                 <TouchableOpacity
                                    style={{flex:1, backgroundColor:'white'}}
                                    onPress={() => {
                                    move(item._id);}}>

                                <View style={{justifyContent:'space-between',backgroundColor:'white', alignItems:'center', flexDirection:'row'}}>
                                     <View  style={{flexWrap: 'wrap', 
                                    flexDirection:'row', backgroundColor:'white'
                                    }}>
                                        { item.tags?.map((tag, i) =>
                                               ( <Tag key={i}>{tag}</Tag> )                       
                                            )}    
                                    </View>    
                                    <View>
                                        <Author style={{marginRight:25, marginTop:0}}>
                                            {<Author style={{marginRight:25, color:'#4e76e0',marginTop:0}}> 추천 {item.likes} 개 </Author>}
                                            
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
                                            <AuthorPic source={{uri: item.author?.profilepic}}/>
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
            </Container>
        

</ScrollView>
<Edit onPress={() => {write('posting')}}>
<Write></Write>
</Edit>
        </View>

        </SafeAreaView>
    )
}
const Container = styled.ScrollView `
flex:1;
padding-bottom:300px;
background-color:white;
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
marginTop:10px;
elevation:30;
`

const Header = styled.View `
height:${height*0.27}px;
background-color:white;
`;

const Section = styled.TouchableOpacity `

`;

const AuthorPic = styled.Image `
border-radius:15px;
margin-top:5px;
width: 20px;
height:20px;

`;
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
margin-left:10px;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: #4e76e0;
margin-top:20px;
`;

const Event = styled.Text `
    font-size: 24px;
    font-weight:bold;
    margin-left:${width * 0.05}px;
    padding-top:10px;
    letter-spacing:-1px;
    text-align: left;
    color: #4e76e0;
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
const Subtitle = styled.Text `
font-size: 17px;
text-align: left;
color: #5f5f5f;
margin-left:${width * 0.05}px;
margin-bottom:10px;
`;

const Cut = styled.View`
    opacity: 0.5;
    background-color: #dddddd;
    border-style: solid;
    border: 1px;
    border-color: #e3e3e3;
    justify-content:center;
`
const Layer = styled.Text`
    font-family: NotoSansCJKkr-Regular;
    font-size: 15px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #5f5f5f;
    margin-top:10px;
    padding-top:5px;
`

const Cate = styled.TouchableOpacity`
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
    background-color:white;
    margin-left:${(width - 20)*0.02}px;
    margin-right:${(width - 20)*0.02}px;
    margin-top:${(width - 20)*0.02}px;
    width:${(width-20)*0.2}px;
`
const Bannerr = styled.Image`
border-radius:15px;
width: ${width * 0.9}px;
height: 144px;
margin-left:${width * 0.05}px;
margin-bottom:2px;
margin-right:${width * 0.05}px;
`

const Edit = styled.TouchableOpacity`
position:absolute;
bottom: 10px;
right: 10px;
background-color:#fff;
width: 56px;
height: 56px;
justify-content:center;
align-items:center;
borderRadius: 45px;
marginRight:20px;
shadowColor:#000;
shadow-offset:0 3px;
shadow-opacity: 0.45;
shadowRadius: 4.65px;
elevation: 6;
marginBottom:20px;
`