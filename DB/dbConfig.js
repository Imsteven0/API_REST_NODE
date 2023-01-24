require('dotenv').config();

var dbConfig = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    server: process.env.DBSERVER,
    database: process.env.DBDEFAULT,
    options: {
        trustServerCertificate: true
    }
};
module.exports = dbConfig;



