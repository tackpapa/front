import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "홈",
              NotiScreen: "noti",
              Com1Screen: "com1",
              Com2Screen: "com2",
            },
          },
          Jobs: {
            screens: {
              JobsScreen: "jobs",
              WriteScreen: "writejob",
              SeejobScreen: "seejob",
            },
          },
          Chat: {
            screens: {
              ChatScreen: "chats",
              WriteScreen: "writechat",
              SeechatScreen: "seechat",
            },
          },
          Market: {
            screens: {
              MarketScreen: "market",
              WriteScreen: "writemarket",
              SeeproductScreen: "seemarket",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
              WriteScreen: "writeprofile",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
