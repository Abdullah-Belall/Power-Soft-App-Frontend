"use client";

import { formatDate, GetOrderStatusUi } from "@/app/utils/base";
import { CustomerOrderInterface } from "@/app/utils/types/customers.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerOrdersTableRow({
  index,
  data,
}: {
  index: number;
  data: CustomerOrderInterface;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { id, curr_status, company_name, company_phone, details, status, created_at } = data;
  const router = useRouter();

  return (
    <tr
      key={index}
      onClick={() => router.push(`/customer-orders/${id}`)}
      className="relative hover:bg-[#ddd] cursor-pointer transition-bg duration-100"
    >
      <td className="px-4 py-2 text-center">{index + 1}</td>
      <td className="px-4 py-2 text-center">{company_name}</td>
      <td className="px-4 py-2 text-center">{company_phone}</td>
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
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
    </tr>
  );
}
