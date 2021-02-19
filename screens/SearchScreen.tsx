import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
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
import marketactions from '../store/market/marketactions';
import jobsactions from '../store/jobs/jobsactions'
import { useState } from 'react';

const {width, height} = Dimensions.get("screen")

const Container = styled.View`
background-color:#eee;
flex:1;
`;
const Div = styled.View`
height:50%;
background-color:grey;
`;
const post = ({post:{result}} : RootState) => result;
const market = ({market:{result}} : RootState) => result;
const job = ({jobs:{result}} : RootState) => result;



export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const pageName = route.params;
  const [query, setQuery] = useState("");

  const Post = useSelector(post);
  const Market = useSelector(market);
  const Job = useSelector(job);

  const move = (id : string) => {
    navigation.navigate("SeePostScreen", {_id: id});
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
  <SafeAreaView>
  <Container style={{flex:1}}>
  
    
  <View style={{height:50}}>
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() =>{ navigation.goBack(); deleteResult()         }}>        
    <Ionicons size={30} name="ios-arrow-back"/>
        <Text style={{fontSize:20, color:"black",                  
                      textAlign:'left',
                      backgroundColor:'white',
               
                      
                     }}>
                     
                      뒤로</Text>
     
       </TouchableOpacity></View>
   
                     <View style={{ height:50, backgroundColor:'white'}}>
                  <Text style={{fontSize:20, textAlign:'center'}}>{pageName}에서 검색합니다</Text>
                  </View>
  <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="     검색어를 입력하세요"
          placeholderTextColor="black"
          selectionColor={'skyblue'}
          onChangeText={(val)=>setQuery(val)}         
        />
     
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => search() }
        >
          <Text style={styles.submitButtonText}>검색</Text>
        </TouchableOpacity>

        <View>
        { 
          (  (Post as any).length > 0 ? <View style={{height:50, backgroundColor:'white'}}> 
          <Text style={{fontSize:20, fontWeight:'bold', textAlign:'left'}}>
                          게시판 검색결과
                    </Text></View>   
                       
            : <View style={{height:0, backgroundColor:'white'}}></View>         
          )
     }
    { 
          (  Post ? Post.map((item)=>{    return (                   
                        <View  style={{height:50}} key={`${item._id}`} >         
                        <TouchableOpacity style={{height:50, backgroundColor:'gray'}} onPress={()=>{move(item._id);deleteResult()}}>
                        <Text> {item.title} </Text>
                        <Text> {item.context} </Text>
                        </TouchableOpacity>
                        </View>     )                 
                    }) : <View style={{height:0, backgroundColor:'gray'}}></View>         
          )
    }
     { 
          (  (Job as any).length > 0 ? <Text style={{fontSize:50, fontWeight:'bold'}}>
                          구인공고 검색결과
                    </Text>
            
            
            : <View style={{height:0, backgroundColor:'white'}}></View>         
          )
     }
    {     (  Job ? Job.map((item)=>{    return (                   
                        <View  style={{height:50}} key={`${item._id}`} >         
                        <TouchableOpacity style={{height:50, backgroundColor:'gray'}} onPress={()=>{move(item._id);deleteResult()}}>
                        <Text> {item.title} </Text>
                        <Text> {item.context} </Text>
                        </TouchableOpacity>
                        </View>     )                 
                    }) : <View style={{height:100, backgroundColor:'gray'}}></View>         
          ) 
    }
     { 
          (  (Market as any).length > 0 ? <Text style={{fontSize:50, fontWeight:'bold'}}>
                          장터 검색결과
                    </Text>
                      
            : <View style={{height:0, backgroundColor:'white'}}></View>         
          )
     }
    {       (  Market ? Market.map((item)=>{    return (                   
                        <View  style={{height:50}} key={`${item._id}`} >         
                        <TouchableOpacity style={{height:50, backgroundColor:'gray'}} onPress={()=>{move(item._id);deleteResult()}}>
                        <Text> {item.title} </Text>
                        <Text> {item.context} </Text>
                        </TouchableOpacity>
                        </View>     )                 
                    }) : <View style={{height:100, backgroundColor:'gray'}}></View>         
          )

    }
    </View>
    
    </Container>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 25,
    height: 40,
    backgroundColor:"#eee",
    borderRadius:45,
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
