import { useState } from "react";
import { Modal } from "bootstrap";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import CrudForm from "../components/CrudForm";

import useCrud from "../hooks/useCrud";
import useOptions from "../hooks/useOptions";

import DeleteConfirm from "../helpers/DeleteConfirm";
import SuccessAlert from "../helpers/SuccessAlert";
import ErrorAlert from "../helpers/ErrorAlert";

function SubKelasTerapi() {

    const {
        data,
        loading,
        createData,
        updateData,
        deleteData
    } = useCrud("/subkelasterapi");

    const kelasOptions = useOptions(
        "/kelasterapi",
        "idKelas",
        "namaKelas"
    );

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        idKelas: "",
        namaSubKelas: ""
    });

    const columns = [
        {
            key: "idKelas",
            label: "ID Kelas"
        },
        {
            key: "namaSubKelas",
            label: "Nama Sub Kelas"
        }
    ];

    const fields = [
        {
            name: "idKelas",
            label: "Kelas Terapi",
            type: "select",
            options: kelasOptions
        },
        {
            name: "namaSubKelas",
            label: "Nama Sub Kelas",
            type: "text"
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

            idKelas: "",

            namaSubKelas: ""

        });

        new Modal(

            document.getElementById("modalSubKelas")

        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData(item);

        new Modal(

            document.getElementById("modalSubKelas")

        ).show();

    };

    const handleSave = async () => {

        try {

            if (isEdit) {

                await updateData(
                    formData.idSubKelas,
                    formData
                );

                SuccessAlert("Data berhasil diubah");

            } else {

                await createData(formData);

                SuccessAlert("Data berhasil ditambahkan");

            }

            Modal
                .getInstance(
                    document.getElementById("modalSubKelas")
                )
                .hide();

        } catch (error) {

            ErrorAlert(error.message);

        }

    };

    const handleDelete = async (item) => {

        await DeleteConfirm({

            title: "Hapus Data",

            text: `Hapus ${item.namaSubKelas}?`,

            onConfirm: async () => {

                await deleteData(item.idSubKelas);

            }

        });

    };

    const filteredData = data.filter(item =>

        item.namaSubKelas
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <CrudTable

                title="Sub Kelas Terapi"

                columns={columns}

                data={filteredData}

                primaryKey="idSubKelas"

                loading={loading}

                search={search}

                onSearch={(e)=>setSearch(e.target.value)}

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <CrudModal

                id="modalSubKelas"

                title={
                    isEdit
                        ? "Edit Sub Kelas"
                        : "Tambah Sub Kelas"
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

export default SubKelasTerapi;