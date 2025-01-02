"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ky from "ky";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TbUserEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER;

type User = {
  id: number;
  name: string;
  email: string;
};

interface Props {
  displayActions?: boolean;
}

const fetchUsers = async () => {
  return await ky.get(`${API_URL}/users`).json<User[]>();
};

const UsersTable: React.FC<Props> = ({ displayActions }) => {
  const queryClient = useQueryClient();

  // React-query hooks
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: async (newUser: Omit<User, "id">) => {
      return await ky.post(`${API_URL}/users`, { json: newUser }).json<User>();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, ...updatedUser }: User) => {
      return await ky
        .put(`${API_URL}/users/${id}`, { json: updatedUser })
        .json<User>();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await ky.delete(`${API_URL}/users/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { register, handleSubmit, reset } = useForm<Omit<User, "id">>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalForCreate = () => {
    setEditingUser(null);
    reset({ name: "", email: "" });
    setIsModalOpen(true);
  };

  const openModalForEdit = (user: User) => {
    setEditingUser(user);
    reset(user);
    setIsModalOpen(true);
  };

  const onSubmit = (data: Omit<User, "id">) => {
    if (editingUser) {
      updateUserMutation.mutate({ id: editingUser.id, ...data });
    } else {
      createUserMutation.mutate(data);
    }
    reset();
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  const UserFormModal = () => {
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
              {editingUser ? "Editando Usuário" : "Criando Usuário"}
            </span>
            <div
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
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
                Nome
              </label>
              <input
                {...register("name", { required: true })}
                className="border p-2 w-full"
                placeholder="Nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                className="border p-2 w-full"
                placeholder="Email"
                type="email"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-[#003f62] w-fit px-4 py-2 text-white rounded-lg hover:bg-[#002b43] transition-all text-sm flex items-center gap-2"
            >
              {editingUser ? "Atualizar Usuário" : "Criar Usuário"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-custom">
      <div className="w-full flex justify-end mb-4">
        {displayActions && (
          <div
            onClick={openModalForCreate}
            className="cursor-pointer bg-[#003f62] w-fit px-4 py-2 text-white rounded-lg hover:bg-[#002b43] transition-all text-sm flex items-center gap-2"
          >
            <IoMdAddCircleOutline size={17} /> <span>Cadastrar Usuário</span>
          </div>
        )}
      </div>

      <UserFormModal />

      <div className="w-full rounded-lg shadow-custom border-4 border-white">
        <div className="flex font-bold border-b text-gray-500">
          {/* <div className="w-[70px] px-4 py-2">ID</div> */}
          <div className="flex-1 px-4 py-2">Nome</div>
          <div className="flex-1 px-4 py-2">Email</div>
          {displayActions && <div className="w-[100px] text-center py-2"></div>}
        </div>
        {users?.map((user: User) => (
          <div key={user.id} className="flex border-b text-gray-600">
            {/* <div className="w-[70px] px-4 py-2">{user.id}</div> */}
            <div className="flex-1 px-4 py-2 flex items-center gap-2">
              <div className="text-[#003f62] bg-[#e1ecf8] w-10 h-10 flex items-center rounded-full justify-center">
                <FiUser size={18} />
              </div>{" "}
              <span>{user.name}</span>
            </div>
            {/* <div className="flex-1 px-4 py-2">{user.name}</div> */}
            <div className="flex-1 px-4 py-2">{user.email}</div>
            {displayActions && (
              <div className="w-[100px] px-3 py-2 flex items-center justify-between ">
                <div
                  onClick={() => openModalForEdit(user)}
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all text-gray-500 py-1 px-2 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <TbUserEdit />
                </div>

                <div
                  onClick={() => handleDelete(user.id)}
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

export default UsersTable;
