"use strict";
const casual = require("casual");

casual.define("user", () => {
  const createdAt = new Date();

  return {
    name: casual.full_name,
    email: casual.email,
    password: casual.array_of_digits(9).join(""),
    createdAt,
    updatedAt: createdAt,
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // a.addFriendList(b);
    // b.addFriendList(b);
    const count = 55;
    const users = new Array(count).fill(null).map(() => casual.user);
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users", null, {});
  },
};
