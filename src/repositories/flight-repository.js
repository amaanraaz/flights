const CrudRepository = require('./crud-repository');
const { Flight,Airport,Airplane } = require('../models');
const { Sequelize } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter,sort){
        const response = Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplane_details'
                },
                {
                    model: Airport,
                    on: {
                        col1 : Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col('departure_airport.code'))
                    },
                    as: 'departure_airport'
                },
                {
                    model: Airport,
                    on: {
                        col1 : Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col('arrival_airport.code'))
                    },
                    as: 'arrival_airport'
                }
                
        ]
        });
        return response;
    }
}

module.exports = FlightRepository;