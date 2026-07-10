import { useState } from "react";
import { Modal } from "bootstrap";

import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";

import useCrud from "../hooks/useCrud";

import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function Suplier() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/suplier");

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        namaSuplier: "",
        alamat: "",
        telepon: "",
        email: ""
    });

    const columns = [

        {
            key: "namaSuplier",
            label: "Nama Suplier"
        },

        {
            key: "telepon",
            label: "Telepon"
        },

        {
            key: "email",
            label: "Email"
        },

        {
            key: "alamat",
            label: "Alamat"
        }

    ];

    const fields = [

        {
            name: "namaSuplier",
            label: "Nama Suplier",
            type: "text"
        },

        {
            name: "telepon",
            label: "Telepon",
            type: "text"
        },

        {
            name: "email",
            label: "Email",
            type: "email"
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

            namaSuplier: "",
            alamat: "",
            telepon: "",
            email: ""

        });

        new Modal(

            document.getElementById("modalSuplier")

        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData(item);

        new Modal(

            document.getElementById("modalSuplier")

        ).show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(

                    formData.idSuplier,

                    formData

                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            Modal
                .getInstance(
                    document.getElementById("modalSuplier")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus Suplier",

            text: `Hapus ${item.namaSuplier}?`,

            onConfirm: async () => {

                await deleteData(item.idSuplier);

            }

        });

    };

    const filteredData = data.filter(item =>

        item.namaSuplier
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        item.telepon
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        item.email
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <CrudTable

                title="Data Suplier"

                columns={columns}

                data={filteredData}

                primaryKey="idSuplier"

                loading={loading}

                search={search}

                onSearch={(e)=>setSearch(e.target.value)}

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <CrudModal

                id="modalSuplier"

                title={
                    isEdit
                        ? "Edit Suplier"
                        : "Tambah Suplier"
                }

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

export default Suplier;