'use strict';
const {Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   // examples
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'airbus789',
        capacity: 199,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'boeing768',
        capacity: 230,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'boeing798',
        capacity: 130,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airbusa68',
        capacity: 230,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {[Op.or]:[{modelNumber:"airbus789"},{modelNumber:"boeing768"}]})
  }
};
