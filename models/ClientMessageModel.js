'use strict';

module.exports = (postgresClient) => {
    const Sequelize = require('sequelize');
    
    const ClientMessageModel = postgresClient.define('client_sync_message', {
            client_id:                      { type: Sequelize.STRING, primaryKey: true },
            message_id:                     { type: Sequelize.BIGINT, primaryKey: true },
            message_body:                   { type: Sequelize.STRING, allowNull: true }
    }, {
        timestamps: false
    });
    return ClientMessageModel;   
}