import { ICreds } from "../@types";
import request from "../utils/request";

export const userAuthApi = {
  login: (creds: ICreds) => request.post("/user/login", creds),
  register: (creds: ICreds) => request.post("/user/signup", creds),
};
