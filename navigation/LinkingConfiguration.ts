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
              CommunityScreen: "Community",
              Com2Screen: "com2",
            },
          },
          Jobs: {
            screens: {
              JobsScreen: "jobs",
              HireScreen: "hire",
              SeejobScreen: "seejob",
            },
          },
          Chat: {
            screens: {
              ChatScreen: "chats",
              WritechatScreen: "writechat",
              SeechatScreen: "seechat",
            },
          },
          Market: {
            screens: {
              MarketScreen: "market",
              WriteproductScreen: "writemarket",
              SeeproductScreen: "seemarket",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
              WriteprofileScreen: "writeprofile",
            },
          },
          Onboarding: {
            screens: {
              RegisterScreen: "register",
              LoginScreen: "login",
              OnboardingScreen: "onboarding",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
