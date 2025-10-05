"use client";
import { useRef } from "react";

export default function MainTable({
  children,
  headers,
}: {
  headers: string[];
  children: React.ReactNode;
  isPopup?: boolean;
}) {
  const header = headers.map((e, i) => (
    <th
      key={i}
      className="text-nowrap px-4 py-3 text-center sticky top-0 bg-main text-[#ffff] z-[9]"
    >
      {e}
    </th>
  ));
  const containerRef: any = useRef(null);
  let isDragging = false;
  let startX: any;
  let scrollLeft: any;
  const handleMouseDown = (e: any) => {
    containerRef.current.classList.remove("cursor-normal");
    containerRef.current.classList.add("cursor-grabbing");
    isDragging = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => {
    containerRef.current.classList.add("cursor-normal");
    containerRef.current.classList.remove("cursor-grabbing");
    isDragging = false;
  };
  return (
    <div className="overflow-x-auto">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`custom-scrollbar max-h-[350px] overflow-y-auto list rounded-xl border border-[#ccc]`}
      >
        <table className="w-full text-right border-collapse bg-[#eee] text-secDark">
          <thead className="select-none">
            <tr className="text-sm text-myDark">{header}</tr>
          </thead>
          <tbody className="text-sm divide-y divide-mdLight text-myDark">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
