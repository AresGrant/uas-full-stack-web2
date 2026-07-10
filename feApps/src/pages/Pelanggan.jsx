import { useState } from "react";
import { Modal } from "bootstrap";

import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";

import useCrud from "../hooks/useCrud";

import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function Pelanggan() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/pelanggan");

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        nama: "",
        noHP: "",
        noKTP: "",
        alamat: ""
    });

    const columns = [
        {
            key: "nama",
            label: "Nama"
        },
        {
            key: "noHP",
            label: "No HP"
        },
        {
            key: "noKTP",
            label: "No KTP"
        },
        {
            key: "alamat",
            label: "Alamat"
        }
    ];

    const fields = [
        {
            name: "nama",
            label: "Nama",
            type: "text"
        },
        {
            name: "noHP",
            label: "No HP",
            type: "text"
        },
        {
            name: "noKTP",
            label: "No KTP",
            type: "text"
        },
        {
            name: "alamat",
            label: "Alamat",
            type: "textarea"
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
            noHP: "",
            noKTP: "",
            alamat: ""
        });

        new Modal(
            document.getElementById("modalPelanggan")
        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData(item);

        new Modal(
            document.getElementById("modalPelanggan")
        ).show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(
                    formData.idPelanggan,
                    formData
                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            Modal
                .getInstance(
                    document.getElementById("modalPelanggan")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus Pelanggan",

            text: `Hapus ${item.nama}?`,

            onConfirm: async () => {

                await deleteData(item.idPelanggan);

            }

        });

    };

    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.noHP.toLowerCase().includes(search.toLowerCase()) ||
        item.noKTP.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <CrudTable
                title="Data Pelanggan"
                columns={columns}
                data={filteredData}
                primaryKey="idPelanggan"
                loading={loading}
                search={search}
                onSearch={(e)=>setSearch(e.target.value)}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CrudModal
                id="modalPelanggan"
                title={isEdit ? "Edit Pelanggan" : "Tambah Pelanggan"}
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

export default Pelanggan;