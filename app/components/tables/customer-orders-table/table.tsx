"use client";
import { CustomerOrderInterface } from "@/app/utils/types/customers.interface";
import MainTable from "../main-table";
import CustomerOrdersTableRow from "./table-row";

export default function CustomerOrdersTable({ data }: { data: CustomerOrderInterface[] }) {
  return (
    <MainTable
      headers={["#", "Company Name", "company Phone", "Details", "Status", "Created At"]}
      isPopup={true}
    >
      {data.map((order, index) => (
        <CustomerOrdersTableRow key={index} index={index} data={order} />
      ))}
    </MainTable>
  );
}
