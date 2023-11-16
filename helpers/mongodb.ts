import { connect } from 'mongoose';
const config = require('../config/config');
const mongoConfig = config.default.db;

const mongoClient = connect(`mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@cluster0.jyk3oim.mongodb.net/${mongoConfig.database}?retryWrites=true&w=majority`);

module.exports = { mongoClient }