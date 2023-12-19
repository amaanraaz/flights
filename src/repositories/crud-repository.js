// generic crud code.
// repositories talk to model
const { Logger } = require('../config')

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in crud repo in Crud repo: create");
        }
    }

    async delete(data){
        try {
            const response = await this.model.destroy({
                // just like where clause
                where:{
                    id: data
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in crud repo in Crud repo: destroy");
        }
    }

    async get(data){
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in crud repo in Crud repo: get");
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("Something went wrong in crud repo in Crud repo: getAll");
        }
    }

    async update(id,data){ //data is the object -> {}
        try {
            const response = await this.model.update(data,{
                where:{
                    id:id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in crud repo in Crud repo: getAll");
        }
    }

}

module.exports = CrudRepository;