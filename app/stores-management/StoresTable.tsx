"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ky from "ky";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { LuStore } from "react-icons/lu";
import { PiDotsNineBold } from "react-icons/pi";
import { MdRadioButtonChecked } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

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

interface Props {
  displayActions?: boolean;
}

const filterTabs = [
  {
    id: 1,
    label: "Todas lojas",
    key: "all",
    icon: <PiDotsNineBold />,
  },
  {
    id: 2,
    label: "Ativas",
    key: "active",
    icon: <MdRadioButtonChecked className="text-green-400" />,
  },
  {
    id: 3,
    label: "Inativas",
    key: "inactive",
    icon: <MdRadioButtonChecked className="text-red-400" />,
  },
  {
    id: 4,
    label: "Pendentes",
    key: "pending",
    icon: <MdRadioButtonChecked className="text-yellow-400" />,
  },
];
const statusClasses = (status: string) => {
  switch (status) {
    case "active":
      return "bg-[#dcfce7] px-4 py-1 rounded-full text-green-950";
    case "pending":
      return "bg-[#fff3cd] px-4 py-1 rounded-full text-yellow-950";
    case "inactive":
      return "bg-[#fee2e2] px-4 py-1 rounded-full text-red-950";
    default:
      return "";
  }
};

const fetchStores = async () => {
  return await ky.get(`${API_URL}/stores`).json<Store[]>();
};

const StoresTable: React.FC<Props> = ({ displayActions }) => {
  const queryClient = useQueryClient();
  const [filteredStatus, setFilteredStatus] = useState("all");

  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const createStoreMutation = useMutation({
    mutationFn: async (newStore: Omit<Store, "id">) => {
      return await ky
        .post(`${API_URL}/stores`, { json: newStore })
        .json<Store>();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stores"] }),
  });

  const updateStoreMutation = useMutation({
    mutationFn: async ({ id, ...updatedStore }: Store) => {
      return await ky
        .put(`${API_URL}/stores/${id}`, { json: updatedStore })
        .json<Store>();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stores"] }),
  });

  const deleteStoreMutation = useMutation({
    mutationFn: async (id: number) => {
      await ky.delete(`${API_URL}/stores/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stores"] }),
  });

  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const { register, handleSubmit, reset } = useForm<Omit<Store, "id">>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalForCreate = () => {
    setEditingStore(null);
    reset({
      name: "",
      status: "active",
      produtos: 0,
      pedidos: 0,
      receita: 0,
      url: "",
    });
    setIsModalOpen(true);
  };

  const openModalForEdit = (store: Store) => {
    setEditingStore(store);
    reset(store);
    setIsModalOpen(true);
  };

  const onSubmit = (data: Omit<Store, "id">) => {
    if (editingStore) {
      updateStoreMutation.mutate({ id: editingStore.id, ...data });
    } else {
      createStoreMutation.mutate(data);
    }
    reset();
    setEditingStore(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    deleteStoreMutation.mutate(id);
  };

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ height: "calc(100vh - 180px)" }}
      >
        <div className="absolute bg-[#003f62] w-16 h-16 flex items-center rounded-full justify-center p-1">
          <Image
            src="/logo.png"
            alt="loading"
            width={50}
            height={50}
            className=""
          />
        </div>
        <div className="absolute animate-spin inline-block w-20 h-20 border-[3px] border-current border-t-transparent text-[#003f62] rounded-full"></div>
        <div className="animate-spin-reverse inline-block w-24 h-24 border-[3px] border-current border-t-transparent text-[#003f62] rounded-full"></div>
      </div>
    );

  const StoreFormModal = () => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white border-4 border-white rounded-lg w-[500px]">
          <div className="bg-gray-200 rounded-t-lg flex items-center justify-between px-4 py-2">
            <span></span>
            <span className="text-gray-500">
              {editingStore ? "Editando Loja" : "Criando Loja"}
            </span>
            <div
              onClick={() => {
                setIsModalOpen(false);
                setEditingStore(null);
                reset();
              }}
              className="cursor-pointer hover:bg-gray-300 rounded-full transition-all p-2"
            >
              <IoCloseSharp size={14} className="text-[#003f62]" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Nome da Loja
              </label>
              <input
                {...register("name", { required: true })}
                className="border p-2 w-full"
                placeholder="Nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                className="border p-2 w-full"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="pending">Pendente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Produtos
              </label>
              <input
                type="number"
                {...register("produtos", { required: true })}
                className="border p-2 w-full"
                placeholder="Quantidade de Produtos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Pedidos
              </label>
              <input
                type="number"
                {...register("pedidos", { required: true })}
                className="border p-2 w-full"
                placeholder="Quantidade de Pedidos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Receita
              </label>
              <input
                type="number"
                {...register("receita", { required: true })}
                className="border p-2 w-full"
                placeholder="Receita"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Url da loja
              </label>
              <input
                type="url"
                {...register("url", { required: true })}
                className="border p-2 w-full"
                placeholder="url"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-[#003f62] w-fit px-4 py-2 text-white rounded-lg hover:bg-[#002b43] transition-all text-sm flex items-center gap-2"
            >
              {editingStore ? "Atualizar Loja" : "Criar Loja"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-custom">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="border-2 border-white rounded-lg shadow-custom flex items-center gap-4 bg-white p-2">
          {filterTabs?.map((tab) => (
            <div
              key={tab.id}
              className={`text-gray-500 w-fit px-2 py-1 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                tab.key === filteredStatus && "bg-[#e1ecf8] hover:bg-[#e1ecf8]"
              } hover:bg-[#ebf2fa] rounded-lg`}
              onClick={() => setFilteredStatus(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
        {displayActions && (
          <div
            onClick={openModalForCreate}
            className="cursor-pointer bg-[#003f62] w-fit px-4 py-2 text-white rounded-lg hover:bg-[#002b43] transition-all text-sm flex items-center gap-2"
          >
            <IoMdAddCircleOutline size={17} /> <span>Cadastrar Loja</span>
          </div>
        )}
      </div>

      <StoreFormModal />

      <div className="w-full rounded-lg shadow-custom border-4 border-white">
        <div className="flex font-bold border-b text-gray-500">
          {/* <div className="w-[70px] px-4 py-2">ID</div> */}
          <div className="flex-1 px-4 py-2">Loja</div>
          <div className="flex-1 px-4 py-2">Status</div>
          <div className="flex-1 px-4 py-2">Produtos</div>
          <div className="flex-1 px-4 py-2">Pedidos</div>
          <div className="flex-1 px-4 py-2">Receita</div>
          <div className="flex-1 px-4 py-2">Site</div>
          {displayActions && <div className="w-[100px] text-center py-2"></div>}
        </div>
        {stores
          ?.filter(
            (store) =>
              store.status === filteredStatus || filteredStatus === "all"
          )
          ?.map((store: Store) => (
            <div key={store.id} className="flex border-b text-gray-600">
              {/* <div className="w-[70px] px-4 py-2">{store.id}</div> */}
              <div className="flex-1 px-4 py-2 flex items-center gap-2">
                <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-full justify-center">
                  <LuStore size={18} />
                </div>{" "}
                <span>{store.name}</span>
              </div>
              <div className={`flex-1 px-4 py-2 `}>
                <span className={`${statusClasses(store.status)}`}>
                  {store.status}
                </span>
              </div>
              <div className="flex-1 px-4 py-2">{store.produtos}</div>
              <div className="flex-1 px-4 py-2">{store.pedidos}</div>
              <div className="flex-1 px-4 py-2">{store.receita}</div>
              <div className="flex-1 px-4 py-2">
                <Link
                  href={store.url}
                  target="_blank"
                  className="text-gray-500 hover:text-[#003f62] transition-all bg-gray-200 py-1 px-2 rounded-full"
                >
                  Acessar loja
                </Link>
              </div>
              {displayActions && (
                <div className="w-[100px] px-3 py-2 flex items-center justify-between ">
                  <div
                    onClick={() => openModalForEdit(store)}
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all text-gray-500 py-1 px-2 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <CiEdit />
                  </div>

                  <div
                    onClick={() => handleDelete(store.id)}
                    className="cursor-pointer group bg-gray-200 hover:bg-gray-300 transition-all text-gray-500 py-1 px-2 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <MdDeleteOutline className="group-hover:text-red-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoresTable;
