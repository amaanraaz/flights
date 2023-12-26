const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares')
const router = express.Router();

// /api/v1/cities -> Post request
router.post('/',
CityMiddlewares.validateCreateRequest,
CityController.createCity)

module.exports = router;