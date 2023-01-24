var config = require('../dbConfig.js')
var sql = require('mssql');

async function ValidateCredentials(User, Password) {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request()
            .input("User", sql.VarChar, User)
            .input("Password", sql.VarChar, Password)
            .execute("SP_VALIDATE_CREDENTIALS");
        return data.returnValue;
    } catch (error) {
        return error
    }
}


module.exports = {
    ValidateCredentials: ValidateCredentials
}