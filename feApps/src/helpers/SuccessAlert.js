import Swal from "sweetalert2";

function SuccessAlert(message) {

    Swal.fire({

        icon: "success",

        title: "Berhasil",

        text: message,

        timer: 1500,

        showConfirmButton: false

    });

}

export default SuccessAlert;