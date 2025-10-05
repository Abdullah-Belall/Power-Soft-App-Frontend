"use client";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import SupporterOrdersTable from "../components/tables/supporter-orders-table/table";
import { SupporterOrderInterface } from "../utils/types/supporter.interface";
import { CLIENT_COLLECTOR_REQ } from "../utils/requests/main-requests";
import { GET_SUPPORTER_ORDERS_REQ } from "../utils/requests/supporters";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import SelectList from "../components/common/select-list";
import { statusOptions } from "../utils/base";

export default function SupporterOrdersPage() {
  const router = useRouter();
  const [data, setData] = useState({
    searchwith: "",
    status: "",
    orders: [] as SupporterOrderInterface[],
    total: 0,
  });
  const [dropDown, setDropDown] = useState(false);
  const handleData = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  console.log(data);
  const fetchOrders = async () => {
    let searchParam = "?";
    if (data.searchwith !== "") {
      searchParam += `searchwith=${data.searchwith}&`;
    }
    if (data.status !== "") {
      searchParam += `status=${data.status}&`;
    }
    const response = await CLIENT_COLLECTOR_REQ(GET_SUPPORTER_ORDERS_REQ, {
      searchParam,
    });
    if (response.done) {
      handleData("orders", response.data.orders);
      handleData("total", response.data.total);
    } else {
      router.push("/sign-in");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [data.searchwith, data.status]);
  return (
    <section className="shadow-lg w-fit flex flex-col items-center rounded-xl overflow-hidden bg-[#eee] mx-[5px]">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <LayoutDashboard />
        <h1>Supporter Dashboard</h1>
      </div>
      <div className="w-full p-[15px] mt-1">
        <div className="w-full flex gap-2 items-stretch">
          <TextField
            label={"Search"}
            variant="outlined"
            className="w-full"
            value={data.searchwith}
            onChange={(e) => handleData("searchwith", e.target.value)}
          />
          <SelectList
            placeHolder="Status"
            select={data.status !== "" ? data.status : "Status"}
            onClick={() => setDropDown(true)}
            onBlur={() => setDropDown(false)}
            dropDown={dropDown}
          >
            {dropDown && (
              <ul
                className={`list w-full text-[#eee] shadow-md max-h-[120px] overflow-y-scroll z-[20] rounded-md absolute left-0 top-[calc(100%+6px)] bg-main shadow-lg px-mainxs`}
              >
                {statusOptions.map((e, i, arr) => (
                  <li
                    key={i}
                    onMouseDown={() => handleData("status", e === "all" ? "" : e)}
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
        <div className="mt-[10px] flex flex-col gap-1">
          <h1 className="ml-[5px] font-semibold text-[20px]">Customers Complaints</h1>
          <SupporterOrdersTable data={data.orders} />
        </div>
        {data.total === 0 ? (
          <p className="px-5 italic py-2 bg-light w-fit mx-auto mt-2 rounded-md">No Data</p>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
