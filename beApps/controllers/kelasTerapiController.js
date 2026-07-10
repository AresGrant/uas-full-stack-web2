const userModel = require("../models/kelasTerapiModel");
const response = require("../helpers/response");

// GET Semua User
exports.getAll = async (req, res) => {
    try {
        const data = await userModel.getAll();

        response.success(
            res,
            "Data user berhasil diambil",
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
        const data = await userModel.getById(req.params.id);

        response.success(
            res,
            "Data user berhasil diambil",
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
        await userModel.create(req.body);

        response.success(
            res,
            "Data user berhasil ditambahkan",
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
        await userModel.update(
            req.params.id,
            req.body
        );

        response.success(
            res,
            "Data user berhasil diupdate"
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
        await userModel.delete(req.params.id);

        response.success(
            res,
            "Data user berhasil dihapus"
        );
    } catch (err) {
        response.error(
            res,
            err.message
        );
    }
};