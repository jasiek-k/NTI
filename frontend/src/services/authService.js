import { postRequest } from "./apiService";

const loginRoute = "/login";
const registerRoute = "/register";

export const handleLogin = async (creds) => {
  const res = await postRequest(loginRoute, creds);

  return res;
};

export const handleRegister = async (data) => {
    await postRequest(registerRoute, data);
}
