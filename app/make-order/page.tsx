"use client";
import { ShieldCheck } from "lucide-react";
import MyInput from "../components/common/my-input";
import { useState } from "react";
import MyTextArea from "../components/common/my-text-area";
import { useSnackBar } from "../utils/contexts/snackebar-context";
import { CLIENT_COLLECTOR_REQ } from "../utils/requests/main-requests";
import { MAKE_ORDER_REQ } from "../utils/requests/customers";
import { useRouter } from "next/navigation";
import MyButton from "../components/common/my-button";

export default function MakeOrder() {
  const router = useRouter();
  const [data, setData] = useState({
    company_name: "",
    company_phone: "+20",
    details: "",
  });
  const { openSnackBar } = useSnackBar();
  const [loadindg, setLoading] = useState(false);
  const handleData = (key: string, value: string) => {
    if (key === "company_phone" && (value.slice(0, 3) !== "+20" || isNaN(+value))) {
      return;
    }
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const vaildation = () => {
    const { company_name, company_phone, details } = data;
    if (company_name.trim().length < 2) {
      openSnackBar("Company name is too short", "error");
      return false;
    }
    if (company_phone.trim().length !== 13) {
      openSnackBar("Company Phone Not Vaild", "error");
      return false;
    }
    if (details.trim().length < 20) {
      openSnackBar("Details must be between 20 and 120 characters", "error");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!vaildation()) return;
    if (loadindg) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(MAKE_ORDER_REQ, { data });
    console.log(response);
    if (response.done === true) {
      openSnackBar("Your order has been submitted successfully", "success");
      //! ROUTER
      router.push("/customer-orders");
    } else {
      openSnackBar(response.message, "error");
    }
    setLoading(false);
  };
  return (
    <section className="mx-[5px] w-md pb-[15px] flex flex-col items-center rounded-md overflow-hidden bg-[#eee] shadow-lg">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <ShieldCheck />
        <h1>Customer Support</h1>
      </div>
      <h2 className="text-black font-semibold text-[14px] mt-[30px]">Submit a New Complaint</h2>
      <div className="w-full px-[24px] mt-[20px] flex flex-col gap-[15px]">
        <MyInput
          placeHolder="Company Name"
          onChange={{
            keyName: "company_name",
            func: handleData,
          }}
          value={data.company_name}
        />
        <MyInput
          placeHolder="Company Phone"
          onChange={{
            keyName: "company_phone",
            func: handleData,
          }}
          value={data.company_phone}
        />
        <MyTextArea
          label="Complaint Details"
          value={data.details}
          onChange={{
            keyName: "details",
            func: handleData,
          }}
        />
      </div>
      <div className="mt-[15px]"></div>
      <MyButton name="Submit Complaint" onClick={handleDone} />
    </section>
  );
}
