"use client";

import { formatDate, GetOrderStatusUi } from "@/app/utils/base";
import { PrivateStatusEnum } from "@/app/utils/types/enums";
import { ManagerOrderInterface } from "@/app/utils/types/manager.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManagerOrdersTableRow({
  index,
  data,
  nowFor,
}: {
  index: number;
  data: ManagerOrderInterface;
  nowFor: "customer" | "all";
}) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {
    customer,
    supporter,
    curr_status,
    company_name,
    company_phone,
    details,
    private_status,
    created_at,
  } = data;
  const customerName = customer.first_name + " " + customer.last_name;
  return (
    <tr key={index}>
      <td className="px-4 py-2 text-center">{index + 1}</td>
      <td className="px-4 py-2 text-center">{company_name}</td>
      <td className="px-4 py-2 text-center">{company_phone}</td>
      {nowFor === "all" ? (
        <td className="px-4 py-2 text-center">
          <button
            onClick={() =>
              router.push(`/manager-dashboard/${customer.id}?customer=${customerName}`)
            }
            className={"font-semibold underline hover:no-underline cursor-pointer"}
          >
            {customerName}
          </button>
        </td>
      ) : (
        ""
      )}
      <td className="px-4 py-2 text-center">{supporter.first_name + " " + supporter.last_name}</td>
      <td
        className="px-4 py-2 text-center max-w-[150px]"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <button className="cursor-pointer">
          {isCollapsed ? details.slice(0, 15) + "..." : details}
        </button>
      </td>
      <td className="px-4 py-2 text-center">
        <GetOrderStatusUi status={curr_status} />
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className={`${
            private_status === PrivateStatusEnum.NORMAL
              ? "bg-green-900 text-green-300"
              : "bg-red-900 text-red-300"
          } w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {private_status}
        </button>
      </td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
    </tr>
  );
}
