"use client";
import { ManagerOrderInterface } from "@/app/utils/types/manager.interface";
import MainTable from "../main-table";
import ManagerOrdersTableRow from "./table-row";

export default function ManagerOrdersTable({
  data,
  nowFor,
}: {
  data: ManagerOrderInterface[];
  nowFor: "customer" | "all";
}) {
  const headers = [
    "#",
    "Company Name",
    "Company Phone",
    "Complainant",
    "Supporter",
    "Details",
    "Status",
    "Priv Status",
    "Created At",
  ];
  if (nowFor === "customer") {
    headers.splice(3, 1);
  }
  return (
    <MainTable headers={headers}>
      {data.map((order, index) => (
        <ManagerOrdersTableRow key={index} index={index} data={order} nowFor={nowFor} />
      ))}
    </MainTable>
  );
}
