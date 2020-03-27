const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const company_id = request.headers.authorization;

        const incidents =  await connection('incidents')
            .where('company_id', company_id)
            .select('*');

        return response.json(incidents);
    }
}