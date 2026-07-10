const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const golonganObatRoute = require("./routes/golObatRoute");
const kelasTerapiRoute = require("./routes/kelasTerapiRoute");
const subKelasTerapiRoute = require("./routes/subKelasTerapiRoute");
const suplierRoute = require("./routes/suplierRoute");
const obatRoute = require("./routes/obatRoute");
const pelangganRoute = require("./routes/pelangganRoute");
const pembelianRoute = require("./routes/pembelianRoute");
const penjualanRoute = require("./routes/penjualanRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route awal
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Backend MyPharmacy berhasil berjalan 🚀"
    });
});

app.use("/api/user", userRoute);
app.use("/api/golongan-obat", golonganObatRoute);
app.use("/api/kelas-terapi", kelasTerapiRoute);
app.use("/api/sub-kelas-terapi", subKelasTerapiRoute);
app.use("/api/suplier", suplierRoute);
app.use("/api/obat", obatRoute);
app.use("/api/pelanggan", pelangganRoute);
app.use("/api/pembelian", pembelianRoute);
app.use("/api/penjualan", penjualanRoute);

module.exports = app;