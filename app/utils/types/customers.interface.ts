import { CustomerOrderNoteInterface, OrderStatusInterface } from "./common.interface";
import { OrderStatusEnum, PrivateStatusEnum } from "./enums";

export interface MakeOrderInterface {
  company_name: string;
  company_phone: string;
  details: string;
}

export interface CustomerOrderInterface {
  id: string;
  status: OrderStatusInterface[];
  customer_order_notes?: CustomerOrderNoteInterface[];
  curr_status: OrderStatusEnum;
  company_name: string;
  company_phone: string;
  details: string;
  private_status: PrivateStatusEnum;
  created_at: Date;
  updated_at: Date;
}

export interface AddOrderNoteInterface {
  id: string;
  data: { note: string };
}

export interface CustomerInterface {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}
