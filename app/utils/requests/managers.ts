import axios from "axios";
import { BASE_URL, getCookie, unCountedMessage } from "./main-requests";

export const GET_MANAGER_ORDERS_REQ = async ({ searchParam }: { searchParam: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/manager${searchParam}`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    console.log(response);
    if (response?.data?.orders) {
      return { done: true, data: response.data };
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
