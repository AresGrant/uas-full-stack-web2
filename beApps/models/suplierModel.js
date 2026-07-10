const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM suplier");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM suplier WHERE idSuplier=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO suplier
        (namaSuplier,alamat,telepon,email)
        VALUES(?,?,?,?)
    `;

    const [result] = await db.query(sql,[
        data.namaSuplier,
        data.alamat,
        data.telepon,
        data.email
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE suplier
        SET
        namaSuplier=?,
        alamat=?,
        telepon=?,
        email=?
        WHERE idSuplier=?
    `;

    const [result]=await db.query(sql,[
        data.namaSuplier,
        data.alamat,
        data.telepon,
        data.email,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM suplier WHERE idSuplier=?",
        [id]
    );

    return result;

};