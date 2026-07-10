require("dotenv").config();

const app = require("./app");
const db = require("./config/database");

const PORT = process.env.PORT || 5000;

// Test koneksi database
db.getConnection()
    .then((connection) => {
        console.log("✅ Database berhasil terhubung");
        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Gagal koneksi database");
        console.error(err);
    });