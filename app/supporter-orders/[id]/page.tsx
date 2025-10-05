"use client";
import MyButton from "@/app/components/common/my-button";
import MyInput from "@/app/components/common/my-input";
import MyTextArea from "@/app/components/common/my-text-area";
import SelectList from "@/app/components/common/select-list";
import { formatDate, privStatusOptions, statusOptions } from "@/app/utils/base";
import { useSnackBar } from "@/app/utils/contexts/snackebar-context";
import { CLIENT_COLLECTOR_REQ } from "@/app/utils/requests/main-requests";
import {
  CHANGE_ORDER_PRIV_STATUS_REQ,
  CHANGE_ORDER_STATUS_REQ,
  GET_SUPPORTER_ORDER_REQ,
} from "@/app/utils/requests/supporters";
import { OrderStatusEnum, PrivateStatusEnum } from "@/app/utils/types/enums";
import { SupporterOrderInterface } from "@/app/utils/types/supporter.interface";
import { BookCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SupporterOrderPage() {
  const router = useRouter();
  const id = useParams().id;
  const [data, setData] = useState<SupporterOrderInterface>();
  const [dropDown, setDropDown] = useState({
    status: false,
    privStatus: false,
  });
  const [status, setStatus] = useState<OrderStatusEnum | "">("");
  const [note, setNote] = useState("");
  const [privStatus, setPrivStatus] = useState<PrivateStatusEnum | "">("");
  const { openSnackBar } = useSnackBar();
  const [loading, setLoading] = useState({
    status: false,
    privStatus: false,
  });
  const handleLoading = (key: keyof typeof loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };
  const handleDropDown = (key: keyof typeof dropDown, value: boolean) => {
    setDropDown((prev) => ({ ...prev, [key]: value }));
  };
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_SUPPORTER_ORDER_REQ, { id });
    if (response.done) {
      setData(response.order);
      setStatus(response.order.curr_status);
      setPrivStatus(response.order.private_status);
    } else {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (loading.status) return;
    handleLoading("status", true);
    const response = await CLIENT_COLLECTOR_REQ(CHANGE_ORDER_STATUS_REQ, {
      id,
      data: {
        status,
        note: note !== "" ? note : undefined,
      },
    });
    handleLoading("status", false);
    if (response.done) {
      openSnackBar("Complaint status Updated Successfully", "success");
      setNote("");
      fetchData();
    } else {
      openSnackBar(response.message, "error");
    }
  };

  const handleChandePrivStatus = async (value: PrivateStatusEnum) => {
    if (loading.privStatus) return;
    setPrivStatus(value);
    handleLoading("privStatus", true);
    const response = await CLIENT_COLLECTOR_REQ(CHANGE_ORDER_PRIV_STATUS_REQ, {
      id,
      private_status: value,
    });
    handleLoading("privStatus", false);
    if (response.done) {
      openSnackBar("Private Status Updated Successfully", "success");
    } else {
      openSnackBar(response.message, "error");
    }
  };

  return (
    <section className="mx-[5px] shadow-lg pb-[10px] w-fit flex flex-col items-center rounded-xl overflow-hidden bg-[#eee]">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <BookCheck />
        <h1>Customer Complaint</h1>
      </div>
      <div className="list w-full p-[15px] mt-1 flex flex-col gap-1 max-h-[calc(100dvh-100px)] overflow-y-scroll">
        <div className="flex gap-1 items-center">
          <MyInput placeHolder="Company Name" value={data?.company_name || ""} disabled />
          <MyInput placeHolder="Company Phone" value={data?.company_phone || ""} disabled />
        </div>
        <div className="flex gap-1 items-center">
          <MyInput placeHolder="Complainant" value={data?.customer?.user_name || ""} disabled />
          <MyInput placeHolder="Complainant Phone" value={data?.customer?.phone || ""} disabled />
        </div>
        <MyTextArea label="Details" value={data?.details || ""} disabled />
        <MyInput placeHolder="Created Date" value={formatDate(data?.created_at || "")} disabled />
        <div className="w-full flex flex-col gap-1 items-center">
          <div className="w-full flex gap-1">
            <SelectList
              placeHolder="Private Status"
              select={privStatus || "Private Status"}
              onClick={() => handleDropDown("privStatus", true)}
              onBlur={() => handleDropDown("privStatus", false)}
              dropDown={dropDown.privStatus}
            >
              {dropDown.privStatus && (
                <ul
                  className={`list w-full text-[#eee] shadow-md max-h-[120px] overflow-y-scroll !z-[50] rounded-md absolute left-0 top-[calc(100%+6px)] bg-main shadow-lg px-mainxs`}
                >
                  {privStatusOptions.map((e, i, arr) => (
                    <li
                      key={i}
                      onMouseDown={() => handleChandePrivStatus(e as PrivateStatusEnum)}
                      className={`${
                        i !== arr.length - 1 && "border-b"
                      } py-[8px] text-center border-myLight cursor-pointer`}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </SelectList>
            <SelectList
              placeHolder="Status"
              select={status || "Status"}
              onClick={() => handleDropDown("status", true)}
              onBlur={() => handleDropDown("status", false)}
              dropDown={dropDown.status}
            >
              {dropDown.status && (
                <ul
                  className={`list w-full text-[#eee] shadow-md max-h-[120px] overflow-y-scroll z-[20] rounded-md absolute left-0 top-[calc(100%+6px)] bg-main shadow-lg px-mainxs`}
                >
                  {statusOptions.map((e, i, arr) => (
                    <li
                      key={i}
                      onMouseDown={() => setStatus(e as OrderStatusEnum)}
                      className={`${
                        i !== arr.length - 1 && "border-b"
                      } py-[8px] text-center border-myLight cursor-pointer`}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </SelectList>
          </div>
          {status && status !== data?.curr_status ? (
            <div className="w-full flex flex-col gap-2 items-center">
              <MyTextArea
                label="Note To Complainant"
                value={note}
                onChangeFunc={(value) => setNote(value)}
              />
              <MyButton name="Update" onClick={handleUpdate} />
            </div>
          ) : (
            ""
          )}
        </div>
        <h1 className="mt-2 font-semibold">Complainant Notes</h1>
        {data?.customer_order_notes?.length || 0 > 0 ? (
          <div className="flex flex-col w-full gap-1">
            {data?.customer_order_notes?.map((note, index) => (
              <div key={index} className="bg-light p-2 rounded-md">
                <p className="text-sm">{note.note}</p>
                <p className="text-xs mt-1 ml-auto w-fit">{formatDate(note.created_at)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-myDark/70 mx-auto">No notes available.</p>
        )}
      </div>
    </section>
  );
}
