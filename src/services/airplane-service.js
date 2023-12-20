//  controllers pass on the call to the service and services use repositories for interact with db

const { AirplaneRepository } = require('../repositories');

const airplaneReposiotry = new AirplaneRepository();


async function createAirplane(data){
    try {
        const airplane = await airplaneReposiotry.create(data);
        return airplane; 
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAirplane
}