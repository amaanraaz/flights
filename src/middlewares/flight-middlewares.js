const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { compareTime } = require('../utils/helpers/time-compare')
const AppError = require('../utils/error/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['flightNumber not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['airplaneId not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['departureAirportId not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['arrivalAirportId not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['arrivalTime not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.departureTime){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['departureTime not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.price){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['price not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['totalSeats not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!compareTime(req.body.departureTime,req.body.arrivalTime)){
        ErrorResponse.message = 'something went wrong while creating flights';
        ErrorResponse.error = new AppError(['Arrival time can not be greater than departure time as found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message = 'something went wrong while booking flight';
        ErrorResponse.error = new AppError(['seats info not found incoming request'],StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
};