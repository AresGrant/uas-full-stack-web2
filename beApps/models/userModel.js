const db = require("../config/database");

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM user WHERE idUser=?",
        [id]
    );
    return rows;
};

exports.create = async (data) => {

    const sql = `
        INSERT INTO user
        (nama,username,password,role)
        VALUES(?,?,?,?)
    `;

    const [result] = await db.query(sql,[
        data.nama,
        data.username,
        data.password,
        data.role
    ]);

    return result;
};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE user
        SET
        nama=?,
        username=?,
        password=?,
        role=?
        WHERE idUser=?
    `;

    const [result]=await db.query(sql,[
        data.nama,
        data.username,
        data.password,
        data.role,
        id
    ]);

    return result;

};

exports.delete=async(id)=>{

    const [result]=await db.query(
        "DELETE FROM user WHERE idUser=?",
        [id]
    );

    return result;

};