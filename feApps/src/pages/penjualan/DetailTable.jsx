function DetailTable({

    obat,

    detail,

    setDetail,

    bayar,

    setBayar

}) {


    const tambahObat = (e) => {


        const id = e.target.value;


        if (!id) return;



        const item = obat.find(

            (o) => o.idObat == id

        );



        const sudahAda = detail.find(

            (d) => d.idObat == id

        );



        if (sudahAda) {


            alert("Obat sudah ditambahkan");


            e.target.value = "";


            return;


        }




        setDetail([

            ...detail,


            {

                idObat: item.idObat,

                namaObat: item.namaObat,

                jumlah: 1,

                harga: item.hargaJual,

                subtotal: item.hargaJual

            }


        ]);



        e.target.value = "";


    };





    const ubahJumlah = (index, jumlah) => {


        const data = [...detail];



        data[index].jumlah = Number(jumlah);



        data[index].subtotal =

            data[index].jumlah *

            data[index].harga;



        setDetail(data);


    };






    const hapusItem = (index) => {


        const data = [...detail];


        data.splice(index,1);


        setDetail(data);


    };






    const total = detail.reduce(

        (sum,item)=>

            sum + Number(item.subtotal),

        0

    );





    const kembalian =

        Number(bayar || 0) - total;





    return (


        <div className="card shadow-sm">



            <div className="card-header d-flex justify-content-between align-items-center">


                <h5 className="mb-0">

                    Detail Obat

                </h5>




                <select

                    className="form-select"

                    style={{

                        width:"300px"

                    }}

                    onChange={tambahObat}

                >


                    <option value="">


                        + Tambah Obat


                    </option>



                    {

                        obat.map((item)=>(


                            <option

                                key={item.idObat}

                                value={item.idObat}

                            >

                                {item.namaObat}

                            </option>


                        ))

                    }



                </select>


            </div>





            <div className="card-body">



                <div className="table-responsive">



                    <table className="table table-bordered">



                        <thead className="table-dark">


                            <tr>


                                <th>

                                    No

                                </th>


                                <th>

                                    Obat

                                </th>


                                <th>

                                    Jumlah

                                </th>


                                <th>

                                    Harga

                                </th>


                                <th>

                                    Subtotal

                                </th>


                                <th>

                                    Aksi

                                </th>


                            </tr>


                        </thead>





                        <tbody>



                            {

                                detail.length === 0 ?



                                (

                                    <tr>


                                        <td

                                            colSpan="6"

                                            className="text-center"

                                        >

                                            Belum ada obat

                                        </td>


                                    </tr>

                                )



                                :



                                detail.map((item,index)=>(


                                    <tr

                                        key={index}

                                    >


                                        <td>

                                            {index+1}

                                        </td>



                                        <td>

                                            {item.namaObat}

                                        </td>




                                        <td>


                                            <input

                                                type="number"

                                                min="1"

                                                className="form-control"

                                                value={item.jumlah}

                                                onChange={(e)=>

                                                    ubahJumlah(

                                                        index,

                                                        e.target.value

                                                    )

                                                }

                                            />


                                        </td>




                                        <td>


                                            Rp {

                                                Number(item.harga)

                                                .toLocaleString(

                                                    "id-ID"

                                                )

                                            }


                                        </td>




                                        <td>


                                            Rp {

                                                Number(item.subtotal)

                                                .toLocaleString(

                                                    "id-ID"

                                                )

                                            }


                                        </td>




                                        <td>


                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={()=>hapusItem(index)}

                                            >

                                                Hapus

                                            </button>


                                        </td>


                                    </tr>


                                ))

                            }



                        </tbody>





                        <tfoot>


                            <tr>


                                <th

                                    colSpan="4"

                                    className="text-end"

                                >

                                    Total


                                </th>


                                <th colSpan="2">


                                    Rp {

                                        total.toLocaleString(

                                            "id-ID"

                                        )

                                    }


                                </th>


                            </tr>




                            <tr>


                                <th

                                    colSpan="4"

                                    className="text-end"

                                >

                                    Bayar


                                </th>



                                <th colSpan="2">


                                    <input

                                        type="number"

                                        className="form-control"

                                        value={bayar}

                                        onChange={(e)=>

                                            setBayar(

                                                e.target.value

                                            )

                                        }

                                    />


                                </th>


                            </tr>





                            <tr>


                                <th

                                    colSpan="4"

                                    className="text-end"

                                >

                                    Kembalian


                                </th>



                                <th colSpan="2">


                                    Rp {

                                        kembalian > 0 ?

                                        kembalian.toLocaleString(

                                            "id-ID"

                                        )

                                        :

                                        0

                                    }


                                </th>


                            </tr>



                        </tfoot>




                    </table>


                </div>


            </div>



        </div>


    );

}


export default DetailTable;