const db = require("../config/database");

exports.getAll = async () => {

    const sql = `
        SELECT
            p.*,
            pl.nama,
            u.nama
        FROM penjualan p
        INNER JOIN pelanggan pl
            ON p.idPelanggan = pl.idPelanggan
        INNER JOIN user u
            ON p.idUser = u.idUser
        ORDER BY p.tglPenjualan DESC
    `;

    const [rows] = await db.query(sql);

    return rows;

};

exports.getById = async (id) => {

    const sql = `
        SELECT
            p.*,
            pl.nama,
            u.nama
        FROM penjualan p
        INNER JOIN pelanggan pl
            ON p.idPelanggan = pl.idPelanggan
        INNER JOIN user u
            ON p.idUser = u.idUser
        WHERE p.idPenjualan = ?
    `;

    const [rows] = await db.query(sql,[id]);

    return rows;

};

exports.create = async(data)=>{

    const conn = await db.getConnection();

    try{

        await conn.beginTransaction();

        const [header] = await conn.query(

            `INSERT INTO penjualan
            (
                noFaktur,
                idPelanggan,
                idUser,
                tglPenjualan,
                total,
                bayar,
                kembalian
            )
            VALUES(?,?,?,?,?,?,?)`,

            [

                data.noFaktur,
                data.idPelanggan,
                data.idUser,
                data.tglPenjualan,
                data.total,
                data.bayar,
                data.kembalian

            ]

        );

        const idPenjualan = header.insertId;

        for(const item of data.detail){

            // cek stok

            const [stok] = await conn.query(

                "SELECT stok FROM obat WHERE idObat=?",

                [item.idObat]

            );

            if(stok.length===0){

                throw new Error("Obat tidak ditemukan");

            }

            if(stok[0].stok < item.jumlah){

                throw new Error(
                    "Stok obat tidak mencukupi"
                );

            }

            // insert detail

            await conn.query(

                `INSERT INTO detailpenjualan
                (
                    idPenjualan,
                    idObat,
                    jumlah,
                    harga,
                    subtotal
                )
                VALUES(?,?,?,?,?)`,

                [

                    idPenjualan,
                    item.idObat,
                    item.jumlah,
                    item.harga,
                    item.subtotal

                ]

            );

            // kurangi stok

            await conn.query(

                `UPDATE obat
                 SET stok = stok - ?
                 WHERE idObat=?`,

                [

                    item.jumlah,
                    item.idObat

                ]

            );

        }

        await conn.commit();

        return idPenjualan;

    }catch(err){

        await conn.rollback();

        throw err;

    }finally{

        conn.release();

    }

};

exports.update = async(id,data)=>{

    const sql = `
        UPDATE penjualan
        SET

        noFaktur=?,
        idPelanggan=?,
        idUser=?,
        tglPenjualan=?,
        total=?,
        bayar=?,
        kembalian=?

        WHERE idPenjualan=?

    `;

    const [result]=await db.query(sql,[

        data.noFaktur,
        data.idPelanggan,
        data.idUser,
        data.tglPenjualan,
        data.total,
        data.bayar,
        data.kembalian,
        id

    ]);

    return result;

};

exports.delete = async(id)=>{

    const conn = await db.getConnection();

    try{

        await conn.beginTransaction();

        const [detail] = await conn.query(

            `SELECT
                idObat,
                jumlah
             FROM detailpenjualan
             WHERE idPenjualan=?`,

            [id]

        );

        for(const item of detail){

            await conn.query(

                `UPDATE obat
                 SET stok = stok + ?
                 WHERE idObat=?`,

                [

                    item.jumlah,
                    item.idObat

                ]

            );

        }

        await conn.query(

            "DELETE FROM detailpenjualan WHERE idPenjualan=?",

            [id]

        );

        await conn.query(

            "DELETE FROM penjualan WHERE idPenjualan=?",

            [id]

        );

        await conn.commit();

        return true;

    }catch(err){

        await conn.rollback();

        throw err;

    }finally{

        conn.release();

    }

};