import axios from "axios";
import { BASE_URL, getCookie, unCountedMessage } from "./main-requests";
import { ChangeOrderStatusInterface } from "../types/supporter.interface";
import { PrivateStatusEnum } from "../types/enums";

export const GET_SUPPORTER_ORDERS_REQ = async ({ searchParam = "?" }: { searchParam?: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/supporter${searchParam}`, {
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

export const GET_SUPPORTER_ORDER_REQ = async ({ id }: { id: string }) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/orders/${id}/supporter`, {
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

export const CHANGE_ORDER_STATUS_REQ = async ({ id, data }: ChangeOrderStatusInterface) => {
  try {
    const response: any = await axios.post(`${BASE_URL}/orders/${id}/change-status`, data, {
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

export const CHANGE_ORDER_PRIV_STATUS_REQ = async ({
  id,
  private_status,
}: {
  id: string;
  private_status: PrivateStatusEnum;
}) => {
  try {
    const response: any = await axios.post(
      `${BASE_URL}/orders/${id}/change-private-status`,
      { private_status },
      {
        headers: { Authorization: `Bearer ${getCookie("access_token")}` },
      }
    );
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
