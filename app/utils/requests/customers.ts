import axios from "axios";
import { BASE_URL, getCookie, unCountedMessage } from "./main-requests";
import { AddOrderNoteInterface, MakeOrderInterface } from "../types/customers.interface";

export const MAKE_ORDER_REQ = async ({ data }: { data: MakeOrderInterface }) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders/create`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return { done: true };
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

export const GET_CUSTOMER_ORDERS_REQ = async () => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/customer`, {
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

export const GET_CUSTOMER_ORDER_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/${id}/customer`, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return response.data;
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

export const ADD_ORDER_NOTE_REQ = async ({ id, data }: AddOrderNoteInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders/${id}/note`, data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
    if (response?.data?.done) {
      return response.data;
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
