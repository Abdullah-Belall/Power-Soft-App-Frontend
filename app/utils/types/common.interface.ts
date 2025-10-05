import { OrderStatusEnum } from "./enums";

export interface OrderStatusInterface {
  id: string;
  status: OrderStatusEnum;
  note: string;
  created_at: Date;
}

export interface CustomerOrderNoteInterface {
  id: string;
  note: string;
  created_at: Date;
}
