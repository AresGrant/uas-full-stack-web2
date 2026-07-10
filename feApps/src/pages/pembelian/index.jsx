import { useEffect, useState } from "react";

import HeaderForm from "./HeaderForm";
import DetailTable from "./DetailTable";

import useOptions from "../../hooks/useOptions";
import api from "../../services/api";

import SuccessAlert from "../../helpers/SuccessAlert";
import ErrorAlert from "../../helpers/ErrorAlert";


function Pembelian() {


    const supplier = useOptions(
        "/suplier",
        "idSuplier",
        "namaSuplier"
    );


    const users = useOptions(
        "/user",
        "idUser",
        "nama"
    );


    const [obat, setObat] = useState([]);

    const [detail, setDetail] = useState([]);


    const [formData, setFormData] = useState({

        noPembelian: "",

        idSuplier: "",

        idUser: "",

        tglPembelian: ""

    });



    useEffect(() => {

        getObat();

    }, []);




    const getObat = async () => {

        try {

            const response = await api.get("/obat");


            setObat(

                response.data.data

            );


        } catch (error) {

            console.error(error);

        }

    };





    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };






    const simpan = async () => {


        if (!formData.idSuplier) {

            alert("Supplier belum dipilih");

            return;

        }


        if (!formData.idUser) {

            alert("User belum dipilih");

            return;

        }


        if (detail.length === 0) {

            alert("Detail obat masih kosong");

            return;

        }



        const total = detail.reduce(

            (sum, item) =>

                sum + Number(item.subtotal),

            0

        );




        const data = {


            noPembelian:

                formData.noPembelian,


            idSuplier:

                formData.idSuplier,


            idUser:

                formData.idUser,


            tglPembelian:

                formData.tglPembelian,


            total,


            detail

        };




        try {


            await api.post(

                "/pembelian",

                data

            );



            SuccessAlert(

                "Pembelian berhasil disimpan"

            );



            setFormData({

                noPembelian: "",

                idSuplier: "",

                idUser: "",

                tglPembelian: ""

            });



            setDetail([]);



        } catch (error) {


            console.error(error);


            ErrorAlert(

                "Gagal menyimpan pembelian"

            );


        }


    };





    return (

        <div className="container-fluid">


            <h3 className="mb-4">

                Transaksi Pembelian

            </h3>



            <HeaderForm

                formData={formData}

                supplier={supplier}

                users={users}

                onChange={handleChange}

            />



            <DetailTable

                obat={obat}

                detail={detail}

                setDetail={setDetail}

            />



            <div className="mt-4 text-end">


                <button

                    className="btn btn-primary"

                    onClick={simpan}

                >

                    Simpan Pembelian

                </button>


            </div>


        </div>

    );

}


export default Pembelian;