import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

function CrudTable({
    title,
    columns = [],
    data = [],
    primaryKey,
    onAdd,
    onEdit,
    onDelete,
    loading = false,
    search = "",
    onSearch
}) {
    return (
        <div className="card shadow-sm border-0">

            {/* Header */}

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

                <h4 className="mb-0">
                    {title}
                </h4>

                <button
                    className="btn btn-primary"
                    onClick={onAdd}
                >
                    <FaPlus className="me-2" />
                    Tambah
                </button>

            </div>

            {/* Search */}

            <div className="card-body pb-0">

                <div className="row mb-3">

                    <div className="col-md-4">

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaSearch />

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cari data..."
                                value={search}
                                onChange={onSearch}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Table */}

            <div className="card-body pt-0">

                {
                    loading ?

                        (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                </div>

                                <p className="mt-3">

                                    Memuat data...

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="table-responsive">

                                <table className="table table-hover table-bordered align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th width="60">
                                                No
                                            </th>

                                            {
                                                columns.map(column => (

                                                    <th key={column.key}>

                                                        {column.label}

                                                    </th>

                                                ))
                                            }

                                            <th width="150">

                                                Aksi

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            data.length === 0 ?

                                                (

                                                    <tr>

                                                        <td
                                                            colSpan={columns.length + 2}
                                                            className="text-center"
                                                        >

                                                            Tidak ada data.

                                                        </td>

                                                    </tr>

                                                )

                                                :

                                                (

                                                    data.map((item, index) => (

                                                        <tr key={item[primaryKey]}>

                                                            <td>

                                                                {index + 1}

                                                            </td>

                                                            {

                                                                columns.map(column => (

                                                                    <td key={column.key}>

                                                                        {

                                                                            column.render

                                                                                ?

                                                                                column.render(item)

                                                                                :

                                                                                item[column.key]

                                                                        }

                                                                    </td>

                                                                ))

                                                            }

                                                            <td>

                                                                <button
                                                                    className="btn btn-warning btn-sm me-2"
                                                                    onClick={() => onEdit(item)}
                                                                >

                                                                    <FaEdit />

                                                                </button>

                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => onDelete(item)}
                                                                >

                                                                    <FaTrash />

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    ))

                                                )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

                }

            </div>

        </div>
    );
}

export default CrudTable;