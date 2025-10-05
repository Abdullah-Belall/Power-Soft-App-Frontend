import axios from "axios";
import { SignInInterface } from "../types/main-requests.interface";
export const unCountedMessage = "Something went wrong, please try again later.";
export const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000") + "/api";

export const SIGN_IN_REQ = async ({ data }: { data: SignInInterface }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/auth/sign-in`, data, {
      withCredentials: true,
    });
    console.log(response);
    if (response?.data?.done) {
      const role = response?.data?.role;
      setCookie("access_token", response?.data?.access_token);
      setCookie("role", role);
      return { done: true, role };
    } else {
      return { done: false, message: unCountedMessage, status: response.status };
    }
  } catch (error: any) {
    console.log(error);
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
      message = error?.response?.data?.message;
    }
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
//* REFRESH TOKEN FUNCTION
const REFRESH_TOKEN_REQ = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/refresh-token`, {
      withCredentials: true,
    });
    if (response?.data?.access_token) {
      setCookie("access_token", response?.data?.access_token);
      setCookie("role", response?.data?.role);
    }
    return response?.data?.done
      ? { done: true }
      : { done: false, message: unCountedMessage, status: response.status };
  } catch (error: any) {
    let message = unCountedMessage;
    if (error?.response?.status !== 400) {
    }
    message = error?.response?.data?.message;
    return {
      done: false,
      message: message,
      status: error.status,
    };
  }
};
//* MAIN FUNCTION (USED FOR ALL REQUESTS THAT NEED ACCESS_TOKEN)
const CLIENT_COLLECTOR_REQ = async (varFunction: any, dataBody?: any) => {
  const access_token = getCookie("access_token");
  if (!access_token) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
  }
  const response = await varFunction(dataBody);
  if (!response.done && response.status === 401) {
    const refreshResponse = await REFRESH_TOKEN_REQ();
    if (!refreshResponse.done) return { done: false, message: "Unauthorized.", status: 401 };
    const retryResponse = await varFunction(dataBody);
    return retryResponse;
  }
  return response;
};
//* COOKIES HANDLERS
const setCookie = (keyName: string, value: string) => {
  document.cookie = `${keyName}=${value}; path=/; max-age=${15 * 60}; SameSite=Strict`;
};
const getCookie = (keyName: string): string | null => {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${keyName}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export { CLIENT_COLLECTOR_REQ, getCookie };
