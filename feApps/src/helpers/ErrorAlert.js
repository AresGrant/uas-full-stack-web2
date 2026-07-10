import Swal from "sweetalert2";

function ErrorAlert(message) {

    Swal.fire({

        icon: "error",

        title: "Oops...",

        text: message

    });

}

export default ErrorAlert;