import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";

interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    icon?: React.ReactNode;
  }[];
  displayActions?: boolean;
}

const statusClasses = (status: string) => {
  switch (status) {
    case "active":
      return "bg-[#dcfce7] px-2 py-[1px] rounded-full text-green-950";
    case "pending":
      return "bg-[#fff3cd] px-2 py-[1px] rounded-full text-yellow-950";
    case "inactive":
      return "bg-[#fee2e2] px-2 py-[1px] rounded-full text-red-950";
    default:
      return "";
  }
};

const renderStatus = (status: string) => {
  switch (status) {
    case "active":
      return "Ativo";
    case "pending":
      return "Pendente";
    case "inactive":
      return "Inativo";
    default:
      return "";
  }
};

const CustomTable = <T extends object>({
  data,
  columns,
  displayActions,
}: TableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white border-4 border-white px-4 shadow-custom">
      <div
        className={` ${
          displayActions ? "block" : "hidden"
        } bg-white w-full h-14 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <MdOutlineStorefront size={30} className="text-[#003f62]" />
          <span className="text-[#003f62] font-semibold text-xl">Lojas</span>
        </div>
        <div className="text-[#003f62] bg-[#e1ecf8] hover:bg-[#d5e6f8] transition-all w-fit flex items-center gap-1 rounded-lg justify-center py-1 px-2 cursor-pointer">
          <IoIosAddCircleOutline />
          <span>Cadastar loja</span>
        </div>
      </div>
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-5 bg-white text-left text-gray-500 font-semibold">
        {columns.map((col) => (
          <div key={String(col.key)} className="py-2 flex items-center gap-2">
            {col.header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map((row, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 md:grid-cols-5 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50 border-none"
          }`}
        >
          {columns.map((col) => (
            <div
              key={String(col.key)}
              className={`border-t border-gray-300 text-gray-600 p-2 flex items-center gap-2`}
            >
              {col.icon && <span className="icon">{col.icon}</span>}
              <span className={`${statusClasses(row[col.key] as string)}`}>
                {renderStatus(row[col.key] as string) ||
                  (row[col.key] as React.ReactNode)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
