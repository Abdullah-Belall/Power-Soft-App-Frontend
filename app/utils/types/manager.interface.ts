import { CustomerOrderNoteInterface, OrderStatusInterface } from "./common.interface";
import { CustomerInterface } from "./customers.interface";
import { OrderStatusEnum, PrivateStatusEnum } from "./enums";
import { SupporterInterface } from "./supporter.interface";

export interface ManagerOrderInterface {
  id: string;
  supporter: SupporterInterface;
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
