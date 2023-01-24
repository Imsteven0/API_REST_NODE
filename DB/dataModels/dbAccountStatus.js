var config = require('../dbConfig.js')
var sql = require('mssql');

async function getProductos() {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().query("select * from tablaPractica1"); //Inline Funtion SQL.
        return data.recordset;
    } catch (error) {
        return error
    }
}

async function ListProduct(id) {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().input("id", id).query("select * from tablaPractica1 where id = @id");
        return data.recordset;
    } catch (error) {
        return error
    }
}

async function DeleteProduct(id) {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().input("id", id).query("delete from tablaPractica1 where id = @id");
        return data.rowsAffected;
    } catch (error) {
        return error
    }
}

async function AddProduct(Product) {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request()
            .input("Nombre", sql.VarChar, Product.Nombre)
            .input("Producto", sql.VarChar, Product.Producto)
            .input("Cantidad", sql.Int, Product.Cantidad)
            .execute("SP_ADD_PRODUCTS");
        return data.returnValue;
    } catch (error) {
        return error
    }
}

module.exports = {
    getProductos: getProductos,
    ListProduct: ListProduct,
    DeleteProduct: DeleteProduct,
    AddProduct: AddProduct

}