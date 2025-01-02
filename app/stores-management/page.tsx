import React from "react";
import CustomLayout from "../customLayout";
import StoresTable from "./StoresTable";

const Page = () => {
  return (
    <CustomLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[#003f62]">
          Gestão de Lojas
        </h1>
        <section className="mt-5">
          {/* <StoresTableComponent displayActions={true} /> */}
          <StoresTable displayActions />
        </section>
      </div>
    </CustomLayout>
  );
};

export default Page;
