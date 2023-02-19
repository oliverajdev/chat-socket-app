'use strict';

const { Op } = require('sequelize');


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

    const generateFollows = () => {
      const follows = [];
 
      for(let id = 1; id <= 11; id++){
      for(let i=1;i <= 11; i++){
          if(id !== i){

           const follow = {
             followedId: id,
             followerId: i,
             createdAt: new Date(),
             updatedAt: new Date(),
           }

           follows.push(follow)
          
          }  
         }
      }
      return follows
    }

    const ARRAY_FOLLOWS = generateFollows();



      await queryInterface.bulkInsert('Follows', ARRAY_FOLLOWS, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */
       await queryInterface.bulkDelete('Follows', null, {});
  }
  
};
