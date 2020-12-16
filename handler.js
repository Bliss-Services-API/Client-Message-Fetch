'use strict';

const crypto = require('crypto');
const postgresClient = require('./connections/PostgresConnection')('production');

postgresClient.authenticate()
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.log(`Database Connection Failed! ERR: ${err}`));

module.exports.app = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const Controller = require('./controller')(postgresClient);

        const clientSyncController = Controller.syncUpdateController;

        const MagicWord = process.env.MAGIC_WORD;
        const clientEmail = event.queryStringParameters.client_email;

        const clientEmailSalted = clientEmail + "" + MagicWord;
        const clientId = crypto.createHash('sha256').update(clientEmailSalted).digest('base64');
        
        const syncContent = await clientSyncController.syncClient(clientId);

        const response = {
            MESSAGE: 'DONE',
            RESPONSE: 'Client Message Fetched Successfully!',
            CODE: 'CLIENT_MESSAGE_FETCHED',
            CONTENT: syncContent
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };

    } catch(err) {
        console.error(`ERR: ${JSON.stringify(err.message)}`);

        const response = {
            ERR: err.message,
            RESPONSE: 'Client Message Fetching Failed',
            CODE: 'CLIENT_MESSAGE_FETCH_FAILED'
        };

        return {
            statusCode: 400,
            body: JSON.stringify(response)
        };
    }
}