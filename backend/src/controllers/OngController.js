const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async list(_request, response) {
        const ongs = await connection.table('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        const {
            nome,
            email,
            whatsapp,
            cidade,
            uf        
        } = request.body;
    
        const id = crypto.randomBytes(4).toString('hex');
    
        await connection.table('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf
        });
    
        return response.json({ id });        
    }
};