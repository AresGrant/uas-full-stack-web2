import { useState } from "react";
import { Modal } from "bootstrap";

import CrudTable from "../../components/CrudTable";
import CrudModal from "../../components/CrudModal";
import CrudForm from "../../components/CrudForm";

import useCrud from "../../hooks/useCrud";
import useOptions from "../../hooks/useOptions";

import DeleteConfirm from "../../helpers/DeleteConfirm";
import SuccessAlert from "../../helpers/SuccessAlert";
import ErrorAlert from "../../helpers/ErrorAlert";

import columns from "./columns";
import fields from "./fields";
import initialState from "./initialState";

function Obat() {

    const {

        data,

        loading,

        createData,

        updateData,

        deleteData

    } = useCrud("/obat");

    const golongan = useOptions(
        "/golongan-obat",
        "idGol",
        "namaGol"
    );

    const subKelas = useOptions(
        "/sub-kelas-terapi",
        "idSubKelas",
        "namaSubKelas"
    );

    const supplier = useOptions(
        "/suplier",
        "idSuplier",
        "namaSuplier"
    );

    const [search, setSearch] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleAdd = () => {

        setIsEdit(false);

        setFormData(initialState);

        new Modal(

            document.getElementById("modalObat")

        ).show();

    };

    const handleEdit = (item) => {

        setIsEdit(true);

        setFormData({

            ...item,

            tglKadaluarsa: item.tglKadaluarsa?.substring(0,10)

        });

        new Modal(

            document.getElementById("modalObat")

        ).show();

    };

    const handleSave = async () => {

        try{

            if(isEdit){

                await updateData(

                    formData.idObat,

                    formData

                );

                SuccessAlert(
                    "Data berhasil diubah"
                );

            }else{

                await createData(formData);

                SuccessAlert(
                    "Data berhasil ditambahkan"
                );

            }

            Modal

                .getInstance(

                    document.getElementById("modalObat")

                )

                .hide();

        }catch(err){

            ErrorAlert(
                err.message
            );

        }

    };

    const handleDelete = async(item)=>{

        await DeleteConfirm({

            title:"Hapus Obat",

            text:`Hapus ${item.namaObat}?`,

            onConfirm:async()=>{

                await deleteData(
                    item.idObat
                );

            }

        });

    };

    const filteredData=data.filter(item=>

        item.namaObat
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        item.kodeObat
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        item.namaGol
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        item.namaSuplier
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return(

        <>

            <CrudTable

                title="Data Obat"

                columns={columns}

                data={filteredData}

                primaryKey="idObat"

                loading={loading}

                search={search}

                onSearch={(e)=>setSearch(e.target.value)}

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <CrudModal

                id="modalObat"

                title={

                    isEdit

                    ?

                    "Edit Obat"

                    :

                    "Tambah Obat"

                }

                size="xl"

                onSave={handleSave}

            >

                <CrudForm

                    fields={

                        fields(

                            golongan,

                            subKelas,

                            supplier

                        )

                    }

                    formData={formData}

                    onChange={handleChange}

                />

            </CrudModal>

        </>

    );

}

export default Obat;