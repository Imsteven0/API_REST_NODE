const dbProducts = require("../DB/dataModels/dbAccountStatus");

/** Listar todos los productos.**/
exports.ListProducts = async (req, res, next) => {
    await dbProducts.getProductos().then(function (value) {
        res.status(200).json(value)
    }, function (reason) {
        res.status(404).json(reason)
    });
};

/** Listar producto en especifico.**/
exports.ProductID = async (req, res, next) => {
    const start = process.hrtime.bigint();
    await dbProducts.ListProduct(req.params.id).then(function (value) {
        if (value.length == 0) {
            res.status(200).json({ message: 'ID ' + req.params.id + ' missing product', ResponseTime: `${Number(process.hrtime.bigint() - start) / 1e6}ms` })
        } else {
            res.status(200).json(value)
        }
    }, function (reason) {
        res.status(404).json(reason)
    });
};

/** Eliminar producto en especifico.**/
exports.DeleteProduct = async (req, res, next) => {
    await dbProducts.DeleteProduct(req.params.id).then(function (value) {
        res.status(200).json(value)
    }, function (reason) {
        res.status(404).json(reason)
    });
};

/** Eliminar producto en especifico.**/
exports.AddProduct = async (req, res, next) => {
    await dbProducts.AddProduct(req.body).then(function (value) {
        res.status(200).json(value)
    }, function (reason) {
        res.status(404).json(reason)
    });
};
