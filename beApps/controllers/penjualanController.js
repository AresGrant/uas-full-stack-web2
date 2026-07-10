const penjualanModel = require("../models/penjualanModel");
const response = require("../helpers/response");

// GET Semua Pembelian
exports.getAll = async (req, res) => {
    try {

        const data = await penjualanModel.getAll();

        response.success(
            res,
            "Data penjualan berhasil diambil",
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

        const data = await penjualanModel.getById(req.params.id);

        response.success(
            res,
            "Data penjualan berhasil diambil",
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

        const id = await penjualanModel.create(req.body);

        response.success(
            res,
            "Data penjualan berhasil ditambahkan",
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

        await penjualanModel.update(
            req.params.id,
            req.body
        );

        response.success(
            res,
            "Data penjualan berhasil diupdate"
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

        await penjualanModel.delete(req.params.id);

        response.success(
            res,
            "Data penjualan berhasil dihapus"
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }
};