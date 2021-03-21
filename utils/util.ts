import { NavigationHelpersContext } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";

export const trimText = (text = "", limit: number | undefined) =>
  text.length > (limit as any) ? `${text.slice(0, limit)}...` : text;

export const formatDate1 = (date: string | number | Date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatDate = function (time: any) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "초", 1], // 60
    [120, "1분전", "1분후"], // 60*2
    [3600, "분", 60], // 60*60, 60
    [7200, "1시간전", "1시간후"], // 60*60*2
    [86400, "시간", 3600], // 60*60*24, 60*60
    [172800, "어제", "내일"], // 60*60*24*2
    [604800, "일", 86400], // 60*60*24*7, 60*60*24
    [1209600, "저번주", "다음주"], // 60*60*24*7*4*2
    [2419200, "주", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "저번달", "다음달"], // 60*60*24*7*4*2
    [29030400, "달", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "작년", "내년"], // 60*60*24*7*4*12*2
    [2903040000, "년", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "이번세기", "다음세기"], // 60*60*24*7*4*12*100*2
    [58060800000, "세기", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "전",
    list_choice = 1;

  if (seconds == 0) {
    return "지금";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "지금";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else return Math.floor(seconds / format[2]) + "" + format[1] + "" + token;
    }
  return time;
};
