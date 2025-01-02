import React from "react";
import CustomLayout from "../customLayout";
import UsersTable from "./UsersTable";

const Page = () => {
  return (
    <CustomLayout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[#003f62]">
          Gestão de Usuários
        </h1>
        <section className="mt-5">
          <UsersTable displayActions />
        </section>
      </div>
    </CustomLayout>
  );
};

export default Page;
