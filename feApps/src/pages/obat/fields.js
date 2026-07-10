const fields = (

    golongan,

    subKelas,

    supplier

) => [

    {

        name: "kodeObat",

        label: "Kode Obat",

        type: "text"

    },

    {

        name: "namaObat",

        label: "Nama Obat",

        type: "text"

    },

    {

        name: "idGol",

        label: "Golongan",

        type: "select",

        options: golongan

    },

    {

        name: "idSubKelas",

        label: "Sub Kelas",

        type: "select",

        options: subKelas

    },

    {

        name: "idSuplier",

        label: "Supplier",

        type: "select",

        options: supplier

    },

    {

        name: "satuan",

        label: "Satuan",

        type: "text"

    },

    {

        name: "stok",

        label: "Stok",

        type: "number"

    },

    {

        name: "stokMin",

        label: "Stok Minimum",

        type: "number"

    },

    {

        name: "hargaBeli",

        label: "Harga Beli",

        type: "number"

    },

    {

        name: "hargaJual",

        label: "Harga Jual",

        type: "number"

    },

    {

        name: "noBatch",

        label: "No Batch",

        type: "text"

    },

    {

        name: "tglKadaluarsa",

        label: "Tanggal Kadaluarsa",

        type: "date"

    }

];

export default fields;