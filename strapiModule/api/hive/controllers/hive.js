'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async userHives(ctx) {
    const data = await strapi.query('hive').find({beekeeper: ctx.params['userId']})
    return data
  }
};
