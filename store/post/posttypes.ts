export type CategoryPostState = {
  [key in keyof typeof PostType]: Post[];
};

export interface PostState extends CategoryPostState {
  onepost?: Post;
  result?: Post[];
  usercall: Post[];
}

export enum PostType {
  free = "free",
  accident = "accident",
  meeting = "meeting",
  replica = "replica",
  scooter = "scooter",
  bedal = "bedal",
  domestic = "domestic",
  imported = "imported",
  bike = "bike",
}

export enum Actions {
  GET_POST_REQUEST = "GETPOST#REQUEST",
  GET_POST_SUCCESS = "GETPOST#SUCCESS",
  GET_POST_FAILURE = "GETPOST#FAILURE",
  GET_POST_CANCEL = "GETPOST#CANCEL",

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
}

export const initialState: PostState = {
  free: [],
  accident: [],
  meeting: [],
  replica: [],
  scooter: [],
  bedal: [],
  bike: [],
  domestic: [],
  imported: [],
  usercall: [],
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
  category: PostType;
}

export type GetPostRequestPayload = Pick<Post, "_id">;
export type DeleteResultRequestPayload = void;
export type DeleteResultSuccessPayload = void;

export interface GetCategoryPostRequestPayload {
  _id: string;
}
export interface SearchPostRequestPayload {
  query: string;
}
export type DeletePostRequestPayload = Pick<Post, "_id">;
export type GetLatestPostRequestPayload = void;

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
export type CreatePostSuccessPayload = Post;
export type UpdatePostSuccessPayload = Post;
