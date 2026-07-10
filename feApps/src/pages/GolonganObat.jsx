import { useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";
import useCrud from "../hooks/useCrud";
import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function GolonganObat() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/golongan-obat");

    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        namaGol: "",
        kode: "",
        perluResep: 0,
        perluIdentitas: 0,
        perluSIPA: 0
    });

    const [isEdit, setIsEdit] = useState(false);

    const columns = [
        {
            key: "namaGol",
            label: "Nama Golongan"
        },
        {
            key: "kode",
            label: "Kode"
        },
        {
            key: "perluResep",
            label: "Resep",
            render: (item) =>
                item.perluResep
                    ? <span className="badge bg-success">Ya</span>
                    : <span className="badge bg-secondary">Tidak</span>
        },
        {
            key: "perluIdentitas",
            label: "Identitas",
            render: (item) =>
                item.perluIdentitas
                    ? <span className="badge bg-success">Ya</span>
                    : <span className="badge bg-secondary">Tidak</span>
        },
        {
            key: "perluSIPA",
            label: "SIPA",
            render: (item) =>
                item.perluSIPA
                    ? <span className="badge bg-success">Ya</span>
                    : <span className="badge bg-secondary">Tidak</span>
        }
    ];

    const fields = [

        {
            name: "namaGol",
            label: "Nama Golongan",
            type: "text"
        },

        {
            name: "kode",
            label: "Kode",
            type: "text"
        },

        {
            name: "perluResep",
            label: "Perlu Resep",
            type: "checkbox"
        },

        {
            name: "perluIdentitas",
            label: "Perlu Identitas",
            type: "checkbox"
        },

        {
            name: "perluSIPA",
            label: "Perlu SIPA",
            type: "checkbox"
        }

    ];

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox"
                ? Number(checked)
                : value

        });

    };

    const handleAdd = () => {

        setIsEdit(false);

        setFormData({

            namaGol: "",

            kode: "",

            perluResep: 0,

            perluIdentitas: 0,

            perluSIPA: 0

        });

        const modal = new bootstrap.Modal(
            document.getElementById("modalGolongan")
        );

        modal.show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData(item);

        const modal = new bootstrap.Modal(
            document.getElementById("modalGolongan")
        );

        modal.show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(
                    formData.idGol,
                    formData
                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            bootstrap.Modal
                .getInstance(
                    document.getElementById("modalGolongan")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus Data",

            text: `Hapus ${item.namaGol}?`,

            onConfirm: async () => {

                await deleteData(item.idGol);

            }

        });

    };

    const filteredData = data.filter(item =>

        item.namaGol
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        item.kode
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <CrudTable

                title="Golongan Obat"

                columns={columns}

                data={filteredData}

                primaryKey="idGol"

                loading={loading}

                search={search}

                onSearch={(e) =>
                    setSearch(e.target.value)
                }

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <CrudModal

                id="modalGolongan"

                title={
                    isEdit
                        ? "Edit Golongan"
                        : "Tambah Golongan"
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

export default GolonganObat;