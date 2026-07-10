import { useEffect, useState } from "react";

import HeaderForm from "./HeaderForm";
import DetailTable from "./DetailTable";

import useOptions from "../../hooks/useOptions";
import api from "../../services/api";

import SuccessAlert from "../../helpers/SuccessAlert";
import ErrorAlert from "../../helpers/ErrorAlert";


function Penjualan() {


    const pelanggan = useOptions(

        "/pelanggan",

        "idPelanggan",

        "nama"

    );



    const users = useOptions(

        "/user",

        "idUser",

        "nama"

    );



    const [obat, setObat] = useState([]);



    const [detail, setDetail] = useState([]);



    const [bayar, setBayar] = useState("");




    const [formData, setFormData] = useState({


        noFaktur: "",


        idPelanggan: "",


        idUser: "",


        tglPenjualan: ""


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



        if (!formData.idPelanggan) {


            alert("Pelanggan belum dipilih");


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






        if (Number(bayar) < total) {


            alert("Uang pembayaran kurang");


            return;


        }







        const data = {



            noFaktur:

                formData.noFaktur,



            idPelanggan:

                formData.idPelanggan,



            idUser:

                formData.idUser,



            tglPenjualan:

                formData.tglPenjualan,



            total,



            bayar:

                Number(bayar),



            kembalian:

                Number(bayar) - total,



            detail



        };







        try {



            await api.post(


                "/penjualan",


                data


            );





            SuccessAlert(


                "Penjualan berhasil disimpan"


            );






            setFormData({


                noFaktur: "",


                idPelanggan: "",


                idUser: "",


                tglPenjualan: ""


            });





            setDetail([]);





            setBayar("");





        } catch (error) {



            console.error(error);




            ErrorAlert(


                "Gagal menyimpan penjualan"


            );



        }



    };







    return (



        <div className="container-fluid">



            <h3 className="mb-4">


                Transaksi Penjualan


            </h3>






            <HeaderForm



                formData={formData}



                pelanggan={pelanggan}



                users={users}



                onChange={handleChange}



            />






            <DetailTable



                obat={obat}



                detail={detail}



                setDetail={setDetail}



                bayar={bayar}



                setBayar={setBayar}



            />







            <div className="mt-4 text-end">





                <button


                    className="btn btn-primary"



                    onClick={simpan}



                >



                    Simpan Penjualan



                </button>





            </div>





        </div>



    );

}



export default Penjualan;