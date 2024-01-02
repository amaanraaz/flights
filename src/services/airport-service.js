//  controllers pass on the call to the service and services use repositories for interact with db

const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');

const airportReposiotry = new AirportRepository();


async function createAirport(data){
    try {
        const airport = await airportReposiotry.create(data);
        return airport; 
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new Airport object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportReposiotry.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportReposiotry.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.statusCode)
        }
        throw new AppError("Cannot Fetch the data of all the airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportReposiotry.delete(id);
        return response;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// async function updateAirport(data,id){
//     try {
//         const response = await airplaneReposiotry.update(id,data);
//         return response;
//     } catch (error) {
//         throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}