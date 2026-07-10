const obatModel = require("../models/obatModel");
const response = require("../helpers/response");

exports.getAll = async (req, res) => {

    try {

        const data = await obatModel.getAll();

        response.success(
            res,
            "Data obat berhasil diambil",
            data
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }

};

exports.getById = async (req, res) => {

    try {

        const data = await obatModel.getById(req.params.id);

        response.success(
            res,
            "Data obat berhasil diambil",
            data
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }

};

exports.create = async (req, res) => {

    try {

        await obatModel.create(req.body);

        response.success(
            res,
            "Data obat berhasil ditambahkan",
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

exports.update = async (req, res) => {

    try {

        await obatModel.update(
            req.params.id,
            req.body
        );

        response.success(
            res,
            "Data obat berhasil diupdate"
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }

};

exports.delete = async (req, res) => {

    try {

        await obatModel.delete(req.params.id);

        response.success(
            res,
            "Data obat berhasil dihapus"
        );

    } catch (err) {

        response.error(
            res,
            err.message
        );

    }

};