const db = require('./connection');
const Joi = require('joi');

const urls = db.get('urls');

const schema = Joi.object().keys({
    name: Joi.string().token().min(1).max(100).required(),
    url: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }),
}).with('target', 'url')


function create(url_data) {
    const result = Joi.validate(url_data, schema);

    url_data.created_at = new Date();
    if (result.error === null) {
        return urls.insert(url_data);
    } else {
        Promise.reject(result.error);
    };
}

async function exists(url_name) {
    const result = await urls.find({
        name: url_name
    });
    
    if (result.length == 0) return false;
    return true;
}


module.exports = {
    create,
    exists
}