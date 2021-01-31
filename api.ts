// import axios from "axios";

// const API_KEY = "비밀번호";

// export const makeRequest = (path: String, params: {}) =>
//   axios.get(`https://localhost.3000/${path}`, {
//     params: {
//       ...params,
//     },
//   });

// export const getAnything = async (path: String, params = {}) => {
//   try {
//     const data = await makeRequest(path, params);
//     return [data];
//   } catch (e) {
//     console.log(e);
//     return [null, e];
//   }
// };

// export const myApi = {
//   getHome: () => getAnything("api/stats"),
//   getHotpost: () => getAnything("api/hotpost"),
//   search: (query: string) => getAnything("search/", { query }),
//   user: (id: string) => getAnything(`user/findone/${id}`),
// };
