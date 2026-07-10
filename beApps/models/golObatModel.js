const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM golobat");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM golobat WHERE idGol=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO golobat
        (namaGol,kode,perluResep,perluIdentitas,perluSIPA)
        VALUES(?,?,?,?,?)
    `;

    const [result] = await db.query(sql,[
        data.namaGol,
        data.kode,
        data.perluResep,
        data.perluIdentitas,
        data.perluSIPA
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE golobat
        SET
        namaGol=?,
        kode=?,
        perluResep=?,
        perluIdentitas=?,
        perluSIPA=?
        WHERE idGol=?
    `;

    const [result]=await db.query(sql,[
        data.namaGol,
        data.kode,
        data.perluResep,
        data.perluIdentitas,
        data.perluSIPA,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM golobat WHERE idGol=?",
        [id]
    );

    return result;

};