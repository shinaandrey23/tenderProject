'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async checkField(ctx) {
    return await strapi.query('field').findOne({ id: ctx.params})
  },

  async userFields(ctx) {
    const data = await strapi.query('field').find({farmer: ctx.params['userId']})
    // console.log(data)
    // console.log(ctx.params['userId'])
    return data
  }
};
