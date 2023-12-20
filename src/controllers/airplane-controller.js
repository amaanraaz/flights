const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');

/*  eg of request coming
    * Post: /airplanes
    * req-body {modelNumber:Airbus,capacity:100}        
 */

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Succesfully created an airplane",
            data: airplane,
            error: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong while creating airplane",
            data: {},
            error: error
        })
        
    }
}
module.exports = {
    createAirplane
}