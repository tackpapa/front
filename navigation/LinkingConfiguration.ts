import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
              NotiScreen: "noti",
            },
          },
          Jobs: {
            screens: {
              JobsScreen: "jobs",
            },
          },
          Chat: {
            screens: {
              ChatScreen: "chats",

              SeeChatScreen: "seechat",
            },
          },
          Market: {
            screens: {
              MarketScreen: "market",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
              WriteprofileScreen: "writeprofile",
            },
          },
        },
      },
      NotFound: "*",
      SearchResult: "searchresult",
      SearchScreen: "search",
      CommunityScreen: "Community",
      SeePostScreen: "seepost",
      WebScreen: "webscreen",
      RegisterScreen: "register",
      KakaoScreen: "kakao",
      BestScreen: "best",
    },
  },
};
