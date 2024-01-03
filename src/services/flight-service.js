//  controllers pass on the call to the service and services use repositories for interact with db

const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');

const flightReposiotry = new FlightRepository();


async function createFlight(data){
    try {
        const flight = await flightReposiotry.create(data);
        return flight; 
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new Flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight
}