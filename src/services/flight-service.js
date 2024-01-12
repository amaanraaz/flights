//  controllers pass on the call to the service and services use repositories for interact with db

const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const { Op } = require('sequelize')

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

async function getAllFlights(query){
    // trips = MUM-DEL
    let customFilter = {};
    let sortFilter = [];
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId; 
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between] : [minPrice,((maxPrice == undefined)?"20000":maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]: [query.tripDate,query.tripDate + ' 23:59:00']
        }
    }
    // sort something like sort=departureTime_ASC,price_DESC
    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }
    try {
        console.log(customFilter);
        const flights = await flightReposiotry.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError("Cannot Fetch the data of all the flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightReposiotry.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}