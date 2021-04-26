export type CategoryPostState = {
  [key in keyof typeof PostType]: Post[];
};

export interface PostState extends CategoryPostState {
  onepost?: Post;
  isLoading: Boolean;
  result?: Post[];
  usercall: Post[];
}

export enum PostType {
  free = "free",
  accident = "accident",
  tour = "tour",
  fraud = "fraud",
  bedal = "bedal",
  domestic = "domestic",
  imported = "imported",
  help = "help",
  latest = "latest",
  hot1 = "hot1",
  hot7 = "hot7",
  hot30 = "hot30",
}

export enum Actions {
  GET_POST_REQUEST = "GETPOST#REQUEST",
  GET_POST_SUCCESS = "GETPOST#SUCCESS",
  GET_POST_FAILURE = "GETPOST#FAILURE",
  GET_POST_CANCEL = "GETPOST#CANCEL",

  GET_NEW_POST_REQUEST = "GET_NEW_POST#REQUEST",
  GET_NEW_POST_SUCCESS = "GET_NEW_POST#SUCCESS",
  GET_NEW_POST_FAILURE = "GET_NEW_POST#FAILURE",
  GET_NEW_POST_CANCEL = "GET_NEW_POST#CANCEL",

  LIKE_POST_REQUEST = "LIKEPOST#REQUEST",
  LIKE_POST_SUCCESS = "LIKEPOST#SUCCESS",
  LIKE_POST_FAILURE = "LIKEPOST#FAILURE",
  LIKE_POST_CANCEL = "LIKEPOST#CANCEL",

  DISLIKE_POST_REQUEST = "DISLIKEPOST#REQUEST",
  DISLIKE_POST_SUCCESS = "DISLIKEPOST#SUCCESS",
  DISLIKE_POST_FAILURE = "DISLIKEPOST#FAILURE",
  DISLIKE_POST_CANCEL = "DISLIKEPOST#CANCEL",

  DELETERESULT_REQUEST = "DELETERESULT#REQUEST",
  DELETERESULT_SUCCESS = "DELETERESULT#SUCCESS",
  DELETERESULT_FAILURE = "DELETERESULT#FAILURE",
  DELETERESULT_CANCEL = "DELETERESULT#CANCEL",

  SEARCH_POST_REQUEST = "SEARCHPOST#REQUEST",
  SEARCH_POST_SUCCESS = "SEARCHPOST#SUCCESS",
  SEARCH_POST_FAILURE = "SEARCHPOST#FAILURE",
  SEARCH_POST_CANCEL = "SEARCHPOST#CANCEL",

  GET_CATEGORY_POST_REQUEST = "GETCATEGORY_POST#REQUEST",
  GET_CATEGORY_POST_SUCCESS = "GETCATEGORY_POST#SUCCESS",
  GET_CATEGORY_POST_FAILURE = "GETCATEGORY_POST#FAILURE",
  GET_CATEGORY_POST_CANCEL = "GETCATEGORY_POST#CANCEL",

  DELETE_POST_REQUEST = "DELETEPOST#REQUEST",
  DELETE_POST_SUCCESS = "DELETEPOST#SUCCESS",
  DELETE_POST_FAILURE = "DELETEPOST#FAILURE",
  DELETE_POST_CANCEL = "DELETEPOST#CANCEL",

  CREATE_POST_REQUEST = "CREATE_POST#REQUEST",
  CREATE_POST_SUCCESS = "CREATE_POST#SUCCESS",
  CREATE_POST_FAILURE = "CREATE_POST#FAILURE",
  CREATE_POST_CANCEL = "CREATE_POST#CANCEL",

  UPDATE_POST_REQUEST = "UPDATE_POST#REQUEST",
  UPDATE_POST_SUCCESS = "UPDATE_POST#SUCCESS",
  UPDATE_POST_FAILURE = "UPDATE_POST#FAILURE",
  UPDATE_POST_CANCEL = "UPDATE_POST#CANCEL",

  GET_LATEST_POST_REQUEST = "GET_LATEST_POST#REQUEST",
  GET_LATEST_POST_SUCCESS = "GET_LATEST_POST#SUCCESS",
  GET_LATEST_POST_FAILURE = "GET_LATEST_POST#FAILURE",
  GET_LATEST_POST_CANCEL = "GET_LATEST_POST#CANCEL",

  GET_HOT_POST_REQUEST = "GET_HOT_POST#REQUEST",
  GET_HOT_POST_SUCCESS = "GET_HOT_POST#SUCCESS",
  GET_HOT_POST_FAILURE = "GET_HOT_POST#FAILURE",
  GET_HOT_POST_CANCEL = "GET_HOT_POST#CANCEL",
}

export const initialState: PostState = {
  free: [],
  accident: [],
  tour: [],
  fraud: [],
  bedal: [],
  help: [],
  domestic: [],
  imported: [],
  usercall: [],
  latest: [],
  hot1: [],
  hot7: [],
  hot30: [],
  isLoading: false,
};

export interface Post {
  _id: string;
  title: string;
  author: any;
  context: string;
  pics: string[];
  tags: string[];
  comments: string[];
  views: number;
  likes: number;
  category: PostType;
  createdAt: string;
}

export type GetPostRequestPayload = Pick<Post, "_id">;
export type LikePostRequestPayload = Pick<Post, "_id">;
export type DeleteResultRequestPayload = void;
export type DeleteResultSuccessPayload = void;

export interface GetCategoryPostRequestPayload {
  category: string;
  date: string;
}
export interface SearchPostRequestPayload {
  query: string;
}
export type DeletePostRequestPayload = Pick<Post, "_id">;
export type GetLatestPostRequestPayload = string; // date
export type GetHotPostRequestPayload = string;
export type NewPostRequestPayload = string;
export type NewPostSuccessPayload = Post[];

export type UpdatePostRequestPayload = Omit<Post, "views">;

export interface CreatePostRequestPayload {
  title: string;
  author: string;
  context: string;
  pic: [
    {
      name: string;
      type: string;
      uri: string;
    }
  ];
  tags: string[];
  category: PostType;
}

export type GetPostSuccessPayload = Post;
export type LikePostSuccessPayload = string;
export interface GetCategoryPostSuccessPayload {
  data: Post[];
  type: PostType;
}
export interface SearchPostSuccessPayload {
  data: Post[];
  type: PostType;
}
export type DeletePostSuccessPayload = String;
export type GetLatestPostSuccessPayload = Post[];
export type GetHotPostSuccessPayload = Post[];
export type CreatePostSuccessPayload = Post;
export type UpdatePostSuccessPayload = Post;
