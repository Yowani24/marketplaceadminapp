import CustomTable from "@/components/CustomTable";
import React from "react";
import { LuStore } from "react-icons/lu";

interface StoresTableComponentProps {
  displayActions?: boolean;
}
const StoresTableComponent: React.FC<StoresTableComponentProps> = ({
  displayActions,
}) => {
  const tableData = [
    {
      store: "Casa do Sabão",
      status: "active",
      products: 120,
      orders: 200,
      revenue: "R$1500",
    },
    {
      store: "Casa do Sabonete",
      status: "pending",
      products: 120,
      orders: 200,
      revenue: "R$1500",
    },
  ];

  type Column = {
    key: "store" | "status" | "products" | "orders" | "revenue";
    header: string;
    icon?: React.ReactNode;
  };

  const columns: Column[] = [
    {
      key: "store",
      header: "Loja",
      icon: (
        <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-full justify-center">
          <LuStore size={18} />
        </div>
      ),
    },
    { key: "status", header: "Status" },
    { key: "products", header: "Produtos" },
    { key: "orders", header: "Pedidos" },
    { key: "revenue", header: "Receita" },
  ];

  return (
    <CustomTable
      data={tableData}
      columns={columns}
      displayActions={displayActions}
    />
  );
};

export default StoresTableComponent;
