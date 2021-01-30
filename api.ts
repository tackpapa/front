import axios from "axios";

const API_KEY = "비밀번호";

const makeRequest = (path: String, params: {}) =>
  axios.get(`https://localhost.3000/${path}`, {
    params: {
      ...params,
      api_key: API_KEY,
    },
  });

const getAnything = async (path: String, params = {}) => {
  try {
    const {
      data: { results },
      data,
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export const myApi = {
  getHome: () => getAnything("/api/home"),
  getHotpost: () => getAnything("/api/hotpost"),
  search: (query: string) => getAnything("/search/", { query }),
  user: (id: string) => getAnything(`/user/findone/${id}`),
};
