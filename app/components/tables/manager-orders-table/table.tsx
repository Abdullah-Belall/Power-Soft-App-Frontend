"use client";
import { ManagerOrderInterface } from "@/app/utils/types/manager.interface";
import MainTable from "../main-table";
import ManagerOrdersTableRow from "./table-row";

export default function ManagerOrdersTable({ data }: { data: ManagerOrderInterface[] }) {
  return (
    <MainTable
      headers={[
        "#",
        "Company Name",
        "Company Phone",
        "Complainant",
        "Supporter",
        "Details",
        "Status",
        "Priv Status",
        "Created At",
      ]}
    >
      {data.map((order, index) => (
        <ManagerOrdersTableRow key={index} index={index} data={order} />
      ))}
    </MainTable>
  );
}
