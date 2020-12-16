'use strict';

module.exports = (postgresClient) => {

    const models = require('../models');

    const Model = models(postgresClient);
    const clientMessageModel = Model.clientMessageModel;

    const clientMessages = (clientId) => {
        return new Promise(async (resolve, reject) => {
            const messages = [];

            try {
                const messageRecords = await clientMessageModel.findAll({ where: { client_id: clientId } });

                messageRecords.forEach(syncData => messages.push(syncData));

                return resolve(messages);

            } catch(err) {
                return reject(err);
            };   
        });
    };

    return {
        clientMessages
    };
}