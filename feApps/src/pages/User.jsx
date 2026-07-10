import { useState } from "react";

import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";

import useCrud from "../hooks/useCrud";

import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function User() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/user");

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        password: "",
        role: "kasir"
    });

    const columns = [
        {
            key: "nama",
            label: "Nama"
        },
        {
            key: "username",
            label: "Username"
        },
        {
            key: "role",
            label: "Role"
        }
    ];

    const fields = [
        {
            name: "nama",
            label: "Nama",
            type: "text"
        },
        {
            name: "username",
            label: "Username",
            type: "text"
        },
        {
            name: "password",
            label: "Password",
            type: "password"
        },
        {
            name: "role",
            label: "Role",
            type: "select",
            options: [
                {
                    value: "admin",
                    label: "Admin"
                },
                {
                    value: "apoteker",
                    label: "Apoteker"
                },
                {
                    value: "kasir",
                    label: "Kasir"
                }
            ]
        }
    ];

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleAdd = () => {

        setIsEdit(false);

        setFormData({
            nama: "",
            username: "",
            password: "",
            role: "kasir"
        });

        new bootstrap.Modal(
            document.getElementById("modalUser")
        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData({
            ...item,
            password: ""
        });

        new bootstrap.Modal(
            document.getElementById("modalUser")
        ).show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(
                    formData.idUser,
                    formData
                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            bootstrap.Modal
                .getInstance(
                    document.getElementById("modalUser")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus User",

            text: `Hapus ${item.nama}?`,

            onConfirm: async () => {

                await deleteData(item.idUser);

            }

        });

    };

    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <CrudTable
                title="Data User"
                columns={columns}
                data={filteredData}
                primaryKey="idUser"
                loading={loading}
                search={search}
                onSearch={(e)=>setSearch(e.target.value)}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CrudModal
                id="modalUser"
                title={isEdit ? "Edit User" : "Tambah User"}
                onSave={handleSave}
            >
                <CrudForm
                    fields={fields}
                    formData={formData}
                    onChange={handleChange}
                />
            </CrudModal>
        </>
    );

}

export default User;