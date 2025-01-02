"use client";
import CustomLayout from "./customLayout";
import { LuDollarSign } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import { LuStore } from "react-icons/lu";
// import StoresTableComponent from "./stores-management/StoresTableComponent";
import UsersTable from "./users-management/UsersTable";
import StoresTable from "./stores-management/StoresTable";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import LoadingLayout from "@/components/LoadingLayout";
const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER;

type Store = {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  produtos: number;
  pedidos: number;
  receita: number;
  url: string;
};

const fetchStores = async () => {
  return await ky.get(`${API_URL}/stores`).json<Store[]>();
};
export default function Home() {
  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-white">
        <LoadingLayout />
      </div>
    );
  }
  return (
    <CustomLayout>
      <main
        className="scrollBarStyles p-4 h-full overflow-auto"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <section>
          <p className="text-2xl font-semibold text-[#003f62]">Dashboard</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="p-4 bg-[#f7fbff] border-4 border-white shadow-custom rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-lg">Receita total</span>
                <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-lg justify-center">
                  <LuDollarSign size={18} />
                </div>
              </div>
              <span className="text-[#003f62] font-semibold text-base">
                R$ 1.000
              </span>
            </div>
            <div className="p-4 bg-[#f7fbff] border-4 border-white shadow-custom rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-lg">Total de pedidos</span>
                <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-lg justify-center">
                  <RiShoppingBag3Line size={18} />
                </div>
              </div>
              <span className="text-[#003f62] font-semibold text-base">
                156
              </span>
            </div>
            <div className="p-4 bg-[#f7fbff] border-4 border-white shadow-custom rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-lg">Lojas ativas</span>
                <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-lg justify-center">
                  <LuStore size={18} />
                </div>
              </div>
              <span className="text-[#003f62] font-semibold text-base">
                {stores?.filter((s) => s.status === "active")?.length}
              </span>
            </div>
          </div>
        </section>
        <section className="mt-10 flex flex-col gap-4">
          {/* <StoresTableComponent /> */}
          <StoresTable />
          <UsersTable />
        </section>
      </main>
    </CustomLayout>
  );
}
