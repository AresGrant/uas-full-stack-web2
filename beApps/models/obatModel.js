const db = require("../config/database");

exports.getAll = async () => {

    const sql = `
        SELECT
            o.*,
            g.namaGol,
            sk.namaSubKelas,
            s.namaSuplier
        FROM obat o
        INNER JOIN golobat g
            ON o.idGol = g.idGol
        INNER JOIN subkelasterapi sk
            ON o.idSubKelas = sk.idSubKelas
        INNER JOIN suplier s
            ON o.idSuplier = s.idSuplier
        ORDER BY o.namaObat ASC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

exports.getById = async (id) => {

    const sql = `
        SELECT
            o.*,
            g.namaGol,
            sk.namaSubKelas,
            s.namaSuplier
        FROM obat o
        INNER JOIN golobat g
            ON o.idGol = g.idGol
        INNER JOIN subkelasterapi sk
            ON o.idSubKelas = sk.idSubKelas
        INNER JOIN suplier s
            ON o.idSuplier = s.idSuplier
        WHERE o.idObat=?
    `;

    const [rows] = await db.query(sql,[id]);

    return rows;

};

exports.create = async(data)=>{

    const sql=`
        INSERT INTO obat
        (
            kodeObat,
            namaObat,
            idSubKelas,
            idGol,
            idSuplier,
            satuan,
            stok,
            stokMin,
            hargaBeli,
            hargaJual,
            noBatch,
            tglKadaluarsa
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const [result]=await db.query(sql,[

        data.kodeObat,
        data.namaObat,
        data.idSubKelas,
        data.idGol,
        data.idSuplier,
        data.satuan,
        data.stok,
        data.stokMin,
        data.hargaBeli,
        data.hargaJual,
        data.noBatch,
        data.tglKadaluarsa

    ]);

    return result;

};

exports.update = async(id,data)=>{

    const sql=`
        UPDATE obat SET

        kodeObat=?,
        namaObat=?,
        idSubKelas=?,
        idGol=?,
        idSuplier=?,
        satuan=?,
        stok=?,
        stokMin=?,
        hargaBeli=?,
        hargaJual=?,
        noBatch=?,
        tglKadaluarsa=?

        WHERE idObat=?

    `;

    const [result]=await db.query(sql,[

        data.kodeObat,
        data.namaObat,
        data.idSubKelas,
        data.idGol,
        data.idSuplier,
        data.satuan,
        data.stok,
        data.stokMin,
        data.hargaBeli,
        data.hargaJual,
        data.noBatch,
        data.tglKadaluarsa,
        id

    ]);

    return result;

};

exports.delete = async(id)=>{

    const [result]=await db.query(
        "DELETE FROM obat WHERE idObat=?",
        [id]
    );

    return result;

};