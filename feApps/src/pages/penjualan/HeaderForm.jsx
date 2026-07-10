function HeaderForm({

    formData,

    pelanggan,

    users,

    onChange

}) {


    return (

        <div className="card shadow-sm mb-4">


            <div className="card-header">

                <h5 className="mb-0">

                    Data Penjualan

                </h5>

            </div>



            <div className="card-body">


                <div className="row">


                    <div className="col-md-3 mb-3">


                        <label className="form-label">

                            No Faktur

                        </label>


                        <input

                            type="text"

                            className="form-control"

                            name="noFaktur"

                            value={formData.noFaktur}

                            onChange={onChange}

                        />


                    </div>




                    <div className="col-md-3 mb-3">


                        <label className="form-label">

                            Tanggal

                        </label>


                        <input

                            type="datetime-local"

                            className="form-control"

                            name="tglPenjualan"

                            value={formData.tglPenjualan}

                            onChange={onChange}

                        />


                    </div>




                    <div className="col-md-3 mb-3">


                        <label className="form-label">

                            Pelanggan

                        </label>


                        <select

                            className="form-select"

                            name="idPelanggan"

                            value={formData.idPelanggan}

                            onChange={onChange}

                        >


                            <option value="">

                                -- Pilih Pelanggan --

                            </option>



                            {

                                pelanggan.map((item)=>(


                                    <option

                                        key={item.value}

                                        value={item.value}

                                    >

                                        {item.label}

                                    </option>


                                ))

                            }


                        </select>


                    </div>




                    <div className="col-md-3 mb-3">


                        <label className="form-label">

                            User

                        </label>


                        <select

                            className="form-select"

                            name="idUser"

                            value={formData.idUser}

                            onChange={onChange}

                        >


                            <option value="">

                                -- Pilih User --

                            </option>



                            {

                                users.map((item)=>(


                                    <option

                                        key={item.value}

                                        value={item.value}

                                    >

                                        {item.label}

                                    </option>


                                ))

                            }


                        </select>


                    </div>



                </div>


            </div>


        </div>

    );

}


export default HeaderForm;