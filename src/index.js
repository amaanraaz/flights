const express = require('express');
const { ServerConfig,Logger } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);
// app.use('/flightService/api',apiRoutes); by using pathrewrite in proxy it will directly come as / instead of /flightservice

app.listen(ServerConfig.PORT,async() => {
    console.log("Server is up and running");
    // Logger.info("started") will generate log file by winston
    
    // test 
//     const {Airport,City} = require('./models');
//    const city = await City.findByPk(1);
// //    const res = await city.createAirport({name:'kp m airport',code:'KPM'})
// await City.destroy({
//     where:{
//         id: 1
//     }
// })

})
