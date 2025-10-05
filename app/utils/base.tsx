import { OrderStatusEnum } from "./types/enums";

export const formatDate = (input: string | Date) => {
  let date: Date;

  if (typeof input === "string") {
    const fixedString = input.replace(" ", "T"); // مع الـ offset
    date = new Date(fixedString);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return "تاريخ غير صالح";
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const hours = getPart("hour");
  const minutes = getPart("minute");
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");

  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

export const GetOrderStatusUi = ({ status }: { status: OrderStatusEnum }) => {
  switch (status) {
    case OrderStatusEnum.PENDING:
      return (
        <button
          className={`bg-yellow-900 text-yellow-300 w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {status}
        </button>
      );
    case OrderStatusEnum.IN_PROGRESS:
      return (
        <button
          className={`bg-blue-900 text-blue-300 w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {status}
        </button>
      );
    case OrderStatusEnum.COMPLETED:
      return (
        <button
          className={`bg-green-900 text-green-300 w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {status}
        </button>
      );
    case OrderStatusEnum.CANCELLED:
      return (
        <button
          className={`bg-red-900 text-red-300 w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {status}
        </button>
      );
  }
};

export const statusOptions = ["all", "pending", "in_progress", "completed", "cancelled"];
export const privStatusOptions = ["normal", "private"];
