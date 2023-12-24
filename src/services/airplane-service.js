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
        throw new AppError("Cannot create a new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneReposiotry.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes
}