"use client";

import ManagerOrdersTable from "@/app/components/tables/manager-orders-table/table";
import { CLIENT_COLLECTOR_REQ } from "@/app/utils/requests/main-requests";
import { GET_MANAGER_CUSTOMER_ORDERS_REQ } from "@/app/utils/requests/managers";
import { ManagerOrderInterface } from "@/app/utils/types/manager.interface";
import { LayoutDashboard } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerOrdersForManager() {
  const router = useRouter();
  const [data, setData] = useState({
    orders: [] as ManagerOrderInterface[],
    total: 0,
  });
  const customerId = useParams()?.customerId;
  const searchParams = useSearchParams();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_MANAGER_CUSTOMER_ORDERS_REQ, {
      id: customerId,
    });
    if (response.done) {
      setData(response.data);
    } else {
      router.push("sign-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="shadow-lg w-fit flex flex-col items-center rounded-xl overflow-hidden bg-[#eee] mx-[5px]">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <LayoutDashboard />
        <h1>{searchParams.get("customer")} Complaints</h1>
      </div>
      <div className="w-full p-[15px] mt-1">
        <div className="mt-[10px] flex flex-col gap-1">
          <ManagerOrdersTable data={data.orders} nowFor={"customer"} />
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
