"use client";
import { useState } from "react";
import MyInput from "../components/common/my-input";
import MyButton from "../components/common/my-button";
import { LogIn } from "lucide-react";
import { useSnackBar } from "../utils/contexts/snackebar-context";
import { CLIENT_COLLECTOR_REQ, SIGN_IN_REQ } from "../utils/requests/main-requests";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [data, setData] = useState({
    user_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { openSnackBar } = useSnackBar();
  const handleData = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const vaildation = () => {
    const { user_name, password } = data;
    if (user_name.trim().length < 2) {
      openSnackBar("User Name must be at least 2 characters", "error");
      return false;
    }
    if (password.trim().length < 8) {
      openSnackBar("Incorrect Password", "error");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    const response: any = await SIGN_IN_REQ({ data });
    setLoading(false);
    if (response.done) {
      openSnackBar("Welcome Back", "success");
      const role = response.role;
      router.push(
        role === "customer"
          ? "/customer-orders"
          : role === "supporter"
          ? "/supporter-orders"
          : "/manager-dashboard"
      );
    } else {
      openSnackBar(response.message, "error");
    }
  };
  return (
    <section className="w-sm rounded-md overflow-hidden bg-[#eee] shadow-lg mx-[5px]">
      <div className="w-full bg-main px-2.5 py-2.5 flex items-center gap-3 text-[#eee] font-semibold">
        <LogIn />
        <h1>Welcome Back, Sign In</h1>
      </div>
      <div className="p-[20px] flex flex-col items-center ">
        <div className="w-full flex flex-col gap-[15px] mt-[15px]">
          <MyInput
            placeHolder="User Name"
            value={data.user_name}
            onChange={{
              keyName: "user_name",
              func: handleData,
            }}
          />
          <MyInput
            placeHolder="Password"
            value={data.password}
            onChange={{
              keyName: "password",
              func: handleData,
            }}
            type="password"
          />
        </div>
        <div className="mt-[15px]"></div>
        <MyButton name="Sign In" onClick={handleDone} />
      </div>
    </section>
  );
}
