"use client";
import { useEffect, useState } from "react";
import { GET_CUSTOMER_ORDERS_REQ } from "../utils/requests/customers";
import { CLIENT_COLLECTOR_REQ } from "../utils/requests/main-requests";
import { CustomerOrderInterface } from "../utils/types/customers.interface";
import { useRouter } from "next/navigation";
import MyButton from "../components/common/my-button";
import CustomerOrdersTable from "../components/tables/customer-orders-table/table";

export default function CustomerOrders() {
  const router = useRouter();
  const [data, setData] = useState<{
    total: number;
    orders: CustomerOrderInterface[];
  }>({
    total: 0,
    orders: [],
  });
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CUSTOMER_ORDERS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data);
    } else {
      router.push("/sign-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="mx-[5px] shadow-lg pt-[10px] w-fit flex flex-col items-center rounded-xl overflow-hidden bg-[#eee]">
      <h1 className="ml-[20px] mr-auto pb-[5px] font-semibold text-[20px]">Your Complaints</h1>
      <div className="w-full px-[15px]">
        <CustomerOrdersTable data={data.orders} />
      </div>
      {data.total === 0 ? (
        <p className="px-5 italic py-2 bg-light w-fit mx-auto mt-2 rounded-md">No Data</p>
      ) : (
        ""
      )}
      <div className="my-2 mr-2 w-fit ml-auto">
        <MyButton name="Make New Complaint" onClick={() => router.push("/make-order")} />
      </div>
    </section>
  );
}
