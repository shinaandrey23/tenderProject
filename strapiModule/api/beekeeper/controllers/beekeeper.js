'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    // console.log('start search')
    // console.log(ctx.request.body)
    return await strapi.query('beekeeper').findOne({ email: ctx.request.body['email']})
  }
};
