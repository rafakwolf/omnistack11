const connection = require('../database/connection');

module.exports = {
    async list(_request, response) {
        const ongs = await connection.table('casos').select('*');
        return response.json(ongs);
    },

    async create(request, response) {
        const {
            titulo,
            descricao,
            valor
        } = request.body;
        const ong_id = request.headers.authorization;
    
        const [id] = await connection.table('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id
        });
    
        return response.json({ id });        
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = connection.table('casos')
          .where('id', id)
          .select('ong_id')
          .first();

        if (caso.ong_id !== ong_id) {
            return response.status(401).json({ error: "operation not permitted" });
        }

        await connection.table('casos')
          .where('id', id).delete();

        return response.status(204).send();  
    } 
};