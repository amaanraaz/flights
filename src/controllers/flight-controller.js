const { FlightService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse,ErrorResponse } = require('../utils/common');

/*  eg of request coming
    * Post: /flights
    * req-body {flightNumber: 'I981w',
            airplaneId: 'A390',
            departureAirportId: 11,
            arrivalAirportId: 9,
            arrivalTime: '11:00:00',
            departureTime: '12:00:00',
            price: 9000,            
            boardingGate: '12a',
            totalSeats: 120}        
 */

async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,            
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        })
        SuccessResponse.data = flight;

        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);        
    }
}

module.exports = {
    createFlight,
    getAllFlights
}