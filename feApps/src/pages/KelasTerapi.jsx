import { useState } from "react";
import { Modal } from "bootstrap";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";
import useCrud from "../hooks/useCrud";
import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function KelasTerapi() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/kelasterapi");

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        namaKelas: "",
        deskripsi: ""
    });

    const columns = [
        {
            key: "namaKelas",
            label: "Nama Kelas"
        },
        {
            key: "deskripsi",
            label: "Deskripsi"
        }
    ];

    const fields = [
        {
            name: "namaKelas",
            label: "Nama Kelas",
            type: "text"
        },
        {
            name: "deskripsi",
            label: "Deskripsi",
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
            namaKelas: "",
            deskripsi: ""
        });

        new Modal(
            document.getElementById("modalKelas")
        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData(item);

        new Modal(
            document.getElementById("modalKelas")
        ).show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(
                    formData.idKelas,
                    formData
                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            Modal
                .getInstance(
                    document.getElementById("modalKelas")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus Data",

            text: `Hapus ${item.namaKelas}?`,

            onConfirm: async () => {

                await deleteData(item.idKelas);

            }

        });

    };

    const filteredData = data.filter(item =>

        item.namaKelas
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        item.deskripsi
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (
        <>

            <CrudTable
                title="Kelas Terapi"
                columns={columns}
                data={filteredData}
                primaryKey="idKelas"
                loading={loading}
                search={search}
                onSearch={(e) => setSearch(e.target.value)}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CrudModal
                id="modalKelas"
                title={isEdit ? "Edit Kelas Terapi" : "Tambah Kelas Terapi"}
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

export default KelasTerapi;