"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export default function SelectList({
  children,
  onClick,
  onBlur,
  dropDown,
  select,
  placeHolder,
}: Readonly<{
  children: React.ReactNode;
  onClick: any;
  onBlur: any;
  dropDown: boolean;
  select: string | null;
  placeHolder: string;
}>) {
  return (
    <button onBlur={onBlur} className="w-full relative mb-0 z-10">
      <div
        tabIndex={0}
        onBlur={onBlur}
        onClick={dropDown ? onBlur : onClick}
        className={`bg-[#eee] w-full rounded-sm focus-within:border-main border border-[#b7b7b7] cursor-pointer flex flex-row-reverse justify-between items-center px-[16px] py-3 h-full`}
      >
        {dropDown ? <ChevronUp /> : <ChevronDown />}
        <p>{select ?? placeHolder}</p>
      </div>
      {children}
    </button>
  );
}
