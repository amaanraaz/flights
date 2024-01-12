function addRowLockOnFlights(flightId){
    return `Select * from Flights where Flights.id = ${flightId} FOR UPDATE;`
}
module.exports = {
    addRowLockOnFlights
}