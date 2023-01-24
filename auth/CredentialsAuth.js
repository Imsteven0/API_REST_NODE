const dbCredentials = require("../DB/dataModels/dbCredentials");

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    dataReturn = -1
    await dbCredentials.ValidateCredentials(username, password).then(function (value) {
        dataReturn = value
    })
    return dataReturn
}

