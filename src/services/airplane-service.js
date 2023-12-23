//  controllers pass on the call to the service and services use repositories for interact with db

const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');

const airplaneReposiotry = new AirplaneRepository();


async function createAirplane(data){
    try {
        const airplane = await airplaneReposiotry.create(data);
        return airplane; 
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw error;
    }
}

module.exports = {
    createAirplane
}