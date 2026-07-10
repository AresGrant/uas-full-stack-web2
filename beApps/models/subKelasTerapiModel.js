const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM subkelasterapi");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM subkelasterapi WHERE idSubKelas=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO subkelasterapi
        (idKelas,namaSubKelas)
        VALUES(?,?)
    `;

    const [result] = await db.query(sql,[
        data.idKelas,
        data.namaSubKelas
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE subkelasterapi
        SET
        idKelas=?,
        namaSubKelas=?
        WHERE idSubKelas=?
    `;

    const [result]=await db.query(sql,[
        data.idKelas,
        data.namaSubKelas,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM subkelasterapi WHERE idSubKelas=?",
        [id]
    );

    return result;

};