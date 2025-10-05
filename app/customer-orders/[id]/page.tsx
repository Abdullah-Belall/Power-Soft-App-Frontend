"use client";
import MyButton from "@/app/components/common/my-button";
import MyInput from "@/app/components/common/my-input";
import { formatDate } from "@/app/utils/base";
import { useSnackBar } from "@/app/utils/contexts/snackebar-context";
import { ADD_ORDER_NOTE_REQ, GET_CUSTOMER_ORDER_REQ } from "@/app/utils/requests/customers";
import { CLIENT_COLLECTOR_REQ } from "@/app/utils/requests/main-requests";
import { CustomerOrderInterface } from "@/app/utils/types/customers.interface";
import { OrderStatusEnum } from "@/app/utils/types/enums";
import { Button } from "@mui/material";
import { ChartNoAxesGantt } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerOrderPage() {
  const router = useRouter();
  const id = useParams().id;
  const [data, setData] = useState({
    note: "",
  });
  const [loadindg, setLoading] = useState(false);
  const [order, setOrder] = useState<CustomerOrderInterface>();
  const { openSnackBar } = useSnackBar();
  const handleData = (key: string, value: string) => {
    setData({ [key]: value } as any);
  };
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CUSTOMER_ORDER_REQ, { id });
    if (response.done) {
      setOrder(response.order);
    } else {
      router.push("/sign-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSend = async () => {
    if (loadindg) return;
    if (data.note.trim().length < 5) {
      openSnackBar("Note is too short", "error");
      return;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(ADD_ORDER_NOTE_REQ, { id: order?.id, data });
    setLoading(false);
    if (response.done) {
      setData({
        note: "",
      });
      openSnackBar("Your Note Added Successfully", "success");
    } else {
      openSnackBar(response.message, "error");
    }
  };
  const status = order?.curr_status;
  return (
    <section className="shadow-lg w-md flex flex-col items-center rounded-xl overflow-hidden bg-[#eee]">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <ChartNoAxesGantt />
        <h1>Track Your Support Case</h1>
      </div>
      <div className="w-full p-[15px]">
        <div className="flex flex-col text-[12px] mr-auto mt-[20px]">
          Company Name: {order?.company_name}
        </div>

        <div className="w-fit mx-auto flex items-center justify-center relative mt-[20px]">
          <p className="w-[25px] h-[25px] rounded-full bg-main"></p>
          <p
            className={`w-[100px] h-[4px] bg-main ${
              status === OrderStatusEnum.PENDING && "opacity-[.3]"
            }`}
          ></p>
          <p
            className={`w-[25px] h-[25px] rounded-full bg-main ${
              status === OrderStatusEnum.PENDING && "opacity-[.3]"
            }`}
          ></p>
          <p
            className={`w-[100px] h-[4px] bg-main ${
              (status === OrderStatusEnum.PENDING || status === OrderStatusEnum.IN_PROGRESS) &&
              "opacity-[.3]"
            }`}
          ></p>
          <p
            className={`w-[25px] h-[25px] rounded-full bg-main ${
              (status === OrderStatusEnum.PENDING || status === OrderStatusEnum.IN_PROGRESS) &&
              "opacity-[.3]"
            }`}
          ></p>
          <div className="absolute left-0 bottom-[-42px] w-full flex justify-between text-sm">
            <div className="translate-x-[-25%] flex flex-col items-center">
              <h1>Pending</h1>
              <span className="text-[10px]">
                {formatDate(
                  order?.status.find((e) => e.status === OrderStatusEnum.PENDING)
                    ?.created_at as Date
                )}
              </span>
            </div>
            <div className=" flex flex-col gap-2 items-center">
              <h1>In Progress</h1>
            </div>
            <div>
              <h1 className="translate-x-[25%] flex flex-col gap-2 items-center">
                {status === OrderStatusEnum.CANCELLED ? "Cancelled" : "Completed"}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-[70px] w-full">
          <h1 className="font-semibold">Latest Updates</h1>
          <div className="w-full rounded-md bg-white py-[5px] px-[10px] flex flex-col gap-1">
            <p className="text-xs">
              {formatDate(order?.status[order.status.length - 1].created_at as Date)}
            </p>
            <p className="text-xs">
              {order?.status[order.status.length - 1].note ?? "Nothing New"}
            </p>
          </div>
        </div>

        <div className="w-full flex gap-2 items-stretch justify-stretch mt-[20px] bg-white p-[10px] rounded-md">
          <MyInput
            placeHolder="Add a Note or Ask a Question"
            value={data.note}
            onChange={{
              keyName: "note",
              func: handleData,
            }}
          />
          <Button
            onClick={handleSend}
            sx={{ fontFamily: "roboto" }}
            className="!bg-main !px-[30px]"
            variant="contained"
          >
            Send
          </Button>
        </div>
      </div>
    </section>
  );
}
