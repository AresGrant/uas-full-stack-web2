const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM kelasterapi");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM kelasterapi WHERE idKelas=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO kelasterapi
        (namaKelas,deskripsi)
        VALUES(?,?)
    `;

    const [result] = await db.query(sql,[
        data.namaKelas,
        data.deskripsi
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE kelasterapi
        SET
        namaKelas=?,
        deskripsi=?
        WHERE idKelas=?
    `;

    const [result]=await db.query(sql,[
        data.namaKelas,
        data.deskripsi,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM kelasterapi WHERE idKelas=?",
        [id]
    );

    return result;

};