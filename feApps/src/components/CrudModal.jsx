function CrudModal({

    id,

    title,

    children,

    onSave,

    saveButtonText = "Simpan",

    size = "lg"

}) {

    return (

        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            aria-hidden="true"
        >

            <div className={`modal-dialog modal-${size}`}>

                <div className="modal-content">

                    {/* Header */}

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {title}

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        >

                        </button>

                    </div>

                    {/* Body */}

                    <div className="modal-body">

                        {children}

                    </div>

                    {/* Footer */}

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >

                            Batal

                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSave}
                        >

                            {saveButtonText}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CrudModal;