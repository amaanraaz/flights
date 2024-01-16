const CrudRepository = require('./crud-repository');
const { Flight,Airport,Airplane } = require('../models');
const { Sequelize } = require('sequelize');
const db = require('../models');
const {addRowLockOnFlights} = require('./queries')

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
        })
        return response;
    };
    async updateRemainingSeats(flightId, seats, dec = true){
        const transaction = await db.sequelize.transaction();
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const  flight = await Flight.findByPk(flightId);
        try {
            if(+dec){
                const res = await flight.decrement('totalSeats', {by: seats}, {transaction:transaction});
            }
            else{
                const res = await flight.increment('totalSeats', {by: seats}, {transaction:transaction});
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;