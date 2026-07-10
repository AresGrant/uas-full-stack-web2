function CrudForm({

    fields,

    formData,

    onChange

}) {

    return (

        <div className="row">

            {fields.map((field) => (

                <div
                    className="col-md-6 mb-3"
                    key={field.name}
                >

                    <label className="form-label">

                        {field.label}

                    </label>

                    {/* TEXT */}

                    {(field.type === "text" ||

                        field.type === "number" ||

                        field.type === "date" ||

                        field.type === "email" ||

                        field.type === "password") && (

                        <input

                            type={field.type}

                            name={field.name}

                            className="form-control"

                            value={formData[field.name] || ""}

                            onChange={onChange}

                        />

                    )}

                    {/* TEXTAREA */}

                    {field.type === "textarea" && (

                        <textarea

                            rows="3"

                            name={field.name}

                            className="form-control"

                            value={formData[field.name] || ""}

                            onChange={onChange}

                        />

                    )}

                    {/* SELECT */}

                    {field.type === "select" && (

                        <select

                            name={field.name}

                            className="form-select"

                            value={formData[field.name] || ""}

                            onChange={onChange}

                        >

                            <option value="">

                                -- Pilih --

                            </option>

                            {field.options?.map((item) => (

                                <option

                                    key={item.value}

                                    value={item.value}

                                >

                                    {item.label}

                                </option>

                            ))}

                        </select>

                    )}

                    {/* CHECKBOX */}

                    {field.type === "checkbox" && (

                        <div className="form-check mt-2">

                            <input

                                type="checkbox"

                                name={field.name}

                                className="form-check-input"

                                checked={Boolean(formData[field.name])}

                                onChange={onChange}

                            />

                            <label className="form-check-label">

                                Ya

                            </label>

                        </div>

                    )}

                </div>

            ))}

        </div>

    );

}

export default CrudForm;