const pembelianModel = require("../models/pembelianModel");
const response = require("../helpers/response");

// GET Semua Pembelian
exports.getAll = async (req, res) => {
    try {

        const data = await pembelianModel.getAll();

        response.success(
            res,
            "Data pembelian berhasil diambil",
            data
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};

// GET Pembelian Berdasarkan ID
exports.getById = async (req, res) => {
    try {

        const data = await pembelianModel.getById(req.params.id);

        response.success(
            res,
            "Data pembelian berhasil diambil",
            data
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};

// Tambah Pembelian
exports.create = async (req, res) => {
    try {

        const id = await pembelianModel.create(req.body);

        response.success(
            res,
            "Data pembelian berhasil ditambahkan",
            {
                idPembelian: id
            },
            201
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};

// Update Pembelian
exports.update = async (req, res) => {
    try {

        await pembelianModel.update(
            req.params.id,
            req.body
        );

        response.success(
            res,
            "Data pembelian berhasil diupdate"
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};

// Hapus Pembelian
exports.delete = async (req, res) => {
    try {

        await pembelianModel.delete(req.params.id);

        response.success(
            res,
            "Data pembelian berhasil dihapus"
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};