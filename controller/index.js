module.exports = (postgresClient) => {
    const clientMessageController = require('./ClientMessageController')(postgresClient);

    return {
        clientMessageController
    };
}