function HeaderForm({

    formData,

    supplier,

    users,

    onChange

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header">

                <h5 className="mb-0">

                    Data Pembelian

                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <label>No Pembelian</label>

                        <input

                            className="form-control"

                            name="noPembelian"

                            value={formData.noPembelian}

                            onChange={onChange}

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label>Tanggal</label>

                        <input

                            type="datetime-local"

                            className="form-control"

                            name="tglPembelian"

                            value={formData.tglPembelian}

                            onChange={onChange}

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label>Supplier</label>

                        <select

                            className="form-select"

                            name="idSuplier"

                            value={formData.idSuplier}

                            onChange={onChange}

                        >

                            <option value="">

                                -- Pilih --

                            </option>

                            {

                                supplier.map(item=>(

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

                        <label>User</label>

                        <select

                            className="form-select"

                            name="idUser"

                            value={formData.idUser}

                            onChange={onChange}

                        >

                            <option value="">

                                -- Pilih --

                            </option>

                            {

                                users.map(item=>(

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