import Swal from "sweetalert2";

async function DeleteConfirm({

    title,

    text,

    onConfirm

}) {

    const result = await Swal.fire({

        title,

        text,

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc3545",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Ya",

        cancelButtonText: "Batal"

    });

    if (result.isConfirmed) {

        await onConfirm();

        Swal.fire({

            icon: "success",

            title: "Berhasil",

            text: "Data berhasil dihapus"

        });

    }

}

export default DeleteConfirm;