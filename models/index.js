module.exports = postgresClient => {
    const clientMessageModel = require('./ClientMessageModel')(postgresClient);

    return {
        clientMessageModel
    };
}