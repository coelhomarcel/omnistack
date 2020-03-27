const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const company = await connection('companies')
            .where('id',id)
            .select('name')
            .first();

        if(!company){
            return response.status(401).json({ error: 'No company found.'});
        }
        return response.json(company);
    }
}