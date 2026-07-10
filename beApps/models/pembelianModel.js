const db = require("../config/database");

exports.getAll = async () => {

    const sql = `
        SELECT
            p.*,
            s.namaSuplier,
            u.nama
        FROM pembelian p
        INNER JOIN suplier s
            ON p.idSuplier = s.idSuplier
        INNER JOIN user u
            ON p.idUser = u.idUser
        ORDER BY p.tglPembelian DESC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

exports.getById = async (id) => {

    const sql = `
        SELECT
            p.*,
            s.namaSuplier,
            u.nama
        FROM pembelian p
        INNER JOIN suplier s
            ON p.idSuplier = s.idSuplier
        INNER JOIN user u
            ON p.idUser = u.idUser
        WHERE p.idPembelian = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows;

};

exports.create = async (data) => {

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        const [header] = await conn.query(
            `INSERT INTO pembelian
            (
                noPembelian,
                idSuplier,
                idUser,
                tglPembelian,
                total
            )
            VALUES (?,?,?,?,?)`,
            [
                data.noPembelian,
                data.idSuplier,
                data.idUser,
                data.tglPembelian,
                data.total
            ]
        );

        const idPembelian = header.insertId;

        for (const item of data.detail) {

            await conn.query(
                `INSERT INTO detailpembelian
                (
                    idPembelian,
                    idObat,
                    jumlah,
                    harga,
                    subtotal
                )
                VALUES (?,?,?,?,?)`,
                [
                    idPembelian,
                    item.idObat,
                    item.jumlah,
                    item.harga,
                    item.subtotal
                ]
            );

            await conn.query(
                `UPDATE obat
                 SET stok = stok + ?
                 WHERE idObat = ?`,
                [
                    item.jumlah,
                    item.idObat
                ]
            );

        }

        await conn.commit();

        return idPembelian;

    } catch (err) {

        await conn.rollback();

        throw err;

    } finally {

        conn.release();

    }

};

exports.update = async (id, data) => {

    const sql = `
        UPDATE pembelian
        SET

        noPembelian = ?,
        idSuplier = ?,
        idUser = ?,
        tglPembelian = ?,
        total = ?

        WHERE idPembelian = ?
    `;

    const [result] = await db.query(sql, [

        data.noPembelian,
        data.idSuplier,
        data.idUser,
        data.tglPembelian,
        data.total,
        id

    ]);

    return result;

};

exports.delete = async (id) => {

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        const [detail] = await conn.query(
            `SELECT idObat, jumlah
             FROM detailpembelian
             WHERE idPembelian = ?`,
            [id]
        );

        for (const item of detail) {

            await conn.query(
                `UPDATE obat
                 SET stok = stok - ?
                 WHERE idObat = ?`,
                [
                    item.jumlah,
                    item.idObat
                ]
            );

        }

        await conn.query(
            "DELETE FROM detailpembelian WHERE idPembelian=?",
            [id]
        );

        await conn.query(
            "DELETE FROM pembelian WHERE idPembelian=?",
            [id]
        );

        await conn.commit();

        return true;

    } catch (err) {

        await conn.rollback();

        throw err;

    } finally {

        conn.release();

    }

};