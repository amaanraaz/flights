const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const { destroyAirplane } = require('./airplane-service');

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city; 
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Cannot create a new city object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.delete(id);
        return response;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of the city",StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function updateCity(data,id){
    try {
        const response = await cityRepository.update(id,data);
        return response;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    destroyCity,
    updateCity
}