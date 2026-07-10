const golObatModel = require("../models/golObatModel");
const response = require("../helpers/response");

// GET Semua User
exports.getAll = async (req, res) => {
    try {
        const data = await golObatModel.getAll();

        response.success(
            res,
            "Data golObat berhasil diambil",
            data
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};

// GET User Berdasarkan ID
exports.getById = async (req, res) => {
    try {
        const data = await golObatModel.getById(req.params.id);

        response.success(
            res,
            "Data golongan obat berhasil diambil",
            data
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};

// Tambah User
exports.create = async (req, res) => {
    try {
        await golObatModel.create(req.body);

        response.success(
            res,
            "Data golongan obat berhasil ditambahkan",
            null,
            201
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};

// Update User
exports.update = async (req, res) => {
    try {
        await golObatModel.update(
            req.params.id,
            req.body
        );

        response.success(
            res,
            "Data golongan obat berhasil diupdate"
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};

// Hapus User
exports.delete = async (req, res) => {
    try {
        await golObatModel.delete(req.params.id);

        response.success(
            res,
            "Data golongan obat berhasil dihapus"
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};