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

async function getAirplane(id){
    try {
        const airplane = await airplaneReposiotry.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.statusCode)
        }
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const response = await airplaneReposiotry.delete(id);
        return response;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id,data){
    try {
        const response = await airplaneReposiotry.update(data,id);
        return response;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}