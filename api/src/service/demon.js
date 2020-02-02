const handler = module.exports = {};
const knex = require('../../config/knex')

handler.add = async (name, level, nature) => {
    return await knex('demon').insert({ name, level, nature });
};