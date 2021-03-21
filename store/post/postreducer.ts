import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {
  CreatePostSuccessPayload,
  GetCategoryPostSuccessPayload,
  initialState,
  PostState,
  UpdatePostSuccessPayload,
} from "./posttypes";
import postActions from "./postactions";
import commentActions from "../comment/commentactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "post",
  storage: AsyncStorage,
};
const post = createReducer<PostState>(initialState, {
  [getType(postActions.getPost.success)]: (state, { payload }) => {
    return {
      ...state,
      onepost: payload,
    };
  },
  [getType(postActions.likePost.success)]: (state, { payload }) => {
    return {
      ...state,
      // [state.onepost?.category]:[state.onepost?.category].map((item) => {
      //   if (item?._id === payload) {
      //     return {
      //       ...item,
      //       likes: item.likes + 1,
      //     };
      //   }
      //   return item;
      // }),
      onepost: state.onepost
        ? {
            ...state.onepost,
            likes: state.onepost.likes + 1,
          }
        : undefined,
      latest: state.latest.map((item) => {
        if (item._id === payload) {
          return {
            ...item,
            likes: item.likes + 1,
          };
        }
        return item;
      }),
    };
  },
  [getType(postActions.dislikePost.success)]: (state, { payload }) => {
    return {
      ...state,
      onepost: state.onepost
        ? {
            ...state.onepost,
            likes: state.onepost.likes - 1,
          }
        : undefined,
      latest: state.latest.map((item) => {
        if (item._id === payload) {
          return {
            ...item,
            likes: item.likes - 1,
          };
        }
        return item;
      }),
    };
  },
  [getType(postActions.getCategoryPost.success)]: (
    state,
    { payload }: { payload: GetCategoryPostSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.type]: state[payload.type].concat(payload.data),
      // [payload.type]: [],
    };
  },
  [getType(postActions.searchPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(postActions.getLatestPost.success)]: (state, { payload }) => {
    return {
      ...state,
      latest: state.latest.concat(payload),
    };
  },
  [getType(postActions.getHotPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.posts,
    };
  },
  [getType(postActions.createPost.success)]: (
    state,
    { payload }: { payload: CreatePostSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
    };
  },
  [getType(commentActions.createComment.success)]: (state, { payload }) => {
    if (payload.PostModel === "Post") {
      return {
        ...state,
        onepost: state.onepost
          ? {
              ...state.onepost,
              comments: [payload, ...state.onepost.comments],
            }
          : undefined,
        latest: state.latest.map((item) => {
          if (item._id === payload.post) {
            return {
              ...item,
              comments: [payload, ...item.comments],
            };
          }
          return item;
        }),
      };
    }
    return {
      ...state,
    };
  },
  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },

  [getType(postActions.updatePost.success)]: (
    state,
    { payload }: { payload: UpdatePostSuccessPayload }
  ) => {
    const index = state[payload.category].findIndex(
      (item) => item._id === payload._id
    );
    if (index === -1) {
      return state;
    }
    return {
      ...state,
      [payload.category]: state[payload.category].splice(index, 1, payload),
    };
  },
  [getType(postActions.deletePost.success)]: (state, { payload }) => {
    const index = state.latest.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index2 = state.usercall.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index3 = (state as any)[payload.category].filter((item: any) =>
      item._id === payload.id ? false : true
    );

    return {
      ...state,
      onepost: undefined,
      latest: index,
      usercall: index2,
      [payload.category]: index3,
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.post,
    };
  },

  [getType(postActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
});

export default persistReducer(persistConfig, post);
