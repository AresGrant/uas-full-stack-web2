const columns = [

    {
        key: "kodeObat",
        label: "Kode"
    },

    {
        key: "namaObat",
        label: "Nama Obat"
    },

    {
        key: "namaGol",
        label: "Golongan"
    },

    {
        key: "namaSubKelas",
        label: "Sub Kelas"
    },

    {
        key: "namaSuplier",
        label: "Supplier"
    },

    {
        key: "stok",
        label: "Stok"
    },

    {
        key: "hargaJual",
        label: "Harga Jual",
        render: (item) =>
            "Rp " +
            Number(item.hargaJual).toLocaleString("id-ID")
    },

    {
        key: "tglKadaluarsa",
        label: "Kadaluarsa",
        render: (item) =>
            new Date(item.tglKadaluarsa)
                .toLocaleDateString("id-ID")
    }

];

export default columns;