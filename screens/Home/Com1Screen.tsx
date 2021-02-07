import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postactions from '../../store/post/postactions'
import { RootState } from '~/../store/types';

const postSelector = ({ post }:RootState)=> post;

export default function Com1Screen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params?._id) {
      dispatch(postactions.getPost.request({_id:route.params._id}));
    }
  },[dispatch, route])
  const post = useSelector(postSelector)
  

  return (<View>
    {post.data.map((item)=>{
      return (
        <View key={`Home-PostTitle-${item._id}`}>
      <Text >
        {item.context}
        
    </Text>

      </View>
    )
    })}
    </View>
  );
}


