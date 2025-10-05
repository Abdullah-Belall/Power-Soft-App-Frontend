"use client";
import MainTable from "../main-table";
import CustomerOrdersTableRow from "./table-row";
import { SupporterOrderInterface } from "@/app/utils/types/supporter.interface";

export default function SupporterOrdersTable({ data }: { data: SupporterOrderInterface[] }) {
  return (
    <MainTable
      headers={[
        "#",
        "Company Name",
        "Company Phone",
        "Complainant",
        "Details",
        "Status",
        "Priv Status",
        "Created At",
      ]}
      isPopup={true}
    >
      {data.map((order, index) => (
        <CustomerOrdersTableRow key={index} index={index} data={order} />
      ))}
    </MainTable>
  );
}
