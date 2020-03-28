const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
                .join('companies', 'companies.id', '=', 'incidents.company_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'incidents.*',
                    'companies.name',
                    'companies.email',
                    'companies.whatsapp',
                    'companies.city',
                    'companies.uf'
                ]);

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const company_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            company_id,
        });

        
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const company_id = request.headers.authorization;

        const incident = await connection('incidents')
                .where('id', id)
                .select('company_id')
                .first();
                
        if (incident.company_id !== company_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }
}