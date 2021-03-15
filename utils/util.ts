import { NavigationHelpersContext } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";

export const trimText = (text = "", limit: number | undefined) =>
  text.length > (limit as any) ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date: string | number | Date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// const Write = () => {
//   const user = useSelector(userSelector);
//   const handlePressWriteButton = () => {
//     // 글쓰기
//   }
//   return (
//     <Touch onPress={checkLogin(user, handlePressWriteButton)} >
//     </TouchableOpacity>
//   )
// }

// export const checkLogin = (user: UserState, cb: function~~) => {
//     if (user.logined) {
//       cb();
//     } else {
//       navigation~~~
//       // 모달띄우기
//     }
// }
