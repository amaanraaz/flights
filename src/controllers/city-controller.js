const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse,ErrorResponse } = require('../utils/common');


/*  eg of request coming
    * Post: /cities
    * req-body {name: london}        
 */

async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name: req.body.name
        })
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getCities(req,res){
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function destroyCity(req,res){
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    getCities,
    destroyCity
}
