import Axios, { AxiosStatic } from "axios";
import Cookies from "js-cookie";
const client = Axios.create();

const getToken = async () => {
  const token = await Cookies.get("token");
  if (token) {
    client.defaults.headers["token"] = token;
  }
};
getToken();

client.defaults.baseURL = "http://localhost:4000/v1";

client["setHeaders"] = function ({ token }) {
  this.defaults.headers["token"] = token;
};

const request = client as AxiosStatic & {
  setHeaders: ({ token }) => void;
};

export default request;
