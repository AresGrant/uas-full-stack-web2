const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM pelanggan");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM pelanggan WHERE idPelanggan=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO pelanggan
        (nama,noHP,noKTP,alamat)
        VALUES(?,?,?,?)
    `;

    const [result] = await db.query(sql,[
        data.nama,
        data.noHP,
        data.noKTP,
        data.alamat
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE pelanggan
        SET
        nama=?,
        noHP=?,
        noKTP=?,
        alamat=?
        WHERE idPelanggan=?
    `;

    const [result]=await db.query(sql,[
        data.nama,
        data.noHP,
        data.noKTP,
        data.alamat,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM pelanggan WHERE idPelanggan=?",
        [id]
    );

    return result;

};