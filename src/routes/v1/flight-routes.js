const express = require('express');
const { FlightController } = require('../../controllers')
const { FlightMiddlewares } = require('../../middlewares')
const router = express.Router();

// /api/v1/flights -> Post request
router.post('/',
FlightMiddlewares.validateCreateRequest,
FlightController.createFlight)

// /api/v1/flights?trips=mum-del -> GET request
router.get('/',
FlightController.getAllFlights)

// /api/v1/flights/:id GET
router.get('/:id',
FlightController.getFlight)

// /api/v1/flights/:id Patch
router.patch('/:id/seats',
FlightMiddlewares.validateUpdateSeatsRequest,
FlightController.updateSeats)


module.exports = router;