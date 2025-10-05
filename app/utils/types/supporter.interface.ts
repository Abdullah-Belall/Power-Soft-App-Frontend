import { CustomerOrderNoteInterface, OrderStatusInterface } from "./common.interface";
import { CustomerInterface } from "./customers.interface";
import { OrderStatusEnum, PrivateStatusEnum } from "./enums";

export interface SupporterOrderInterface {
  id: string;
  customer: CustomerInterface;
  status?: OrderStatusInterface[];
  customer_order_notes?: CustomerOrderNoteInterface[];
  curr_status: OrderStatusEnum;
  company_name: string;
  company_phone: string;
  details: string;
  private_status: PrivateStatusEnum;
  created_at: Date;
  updated_at: Date;
}

export interface SupporterInterface {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface ChangeOrderStatusInterface {
  id: string;
  data: {
    status: OrderStatusEnum;
    note: string;
  };
}
