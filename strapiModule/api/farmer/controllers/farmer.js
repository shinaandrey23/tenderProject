const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async findOne(ctx) {
    console.log('start search')
    console.log(ctx.request.body)
    return await strapi.query('farmer').findOne({ email: ctx.request.body['email']})
    // const { id } = ctx.params;
    // const entity = await strapi.services..findOne({ id });
    // return sanitizeEntity(entity, { model: strapi.models.farmer });
  },
};

