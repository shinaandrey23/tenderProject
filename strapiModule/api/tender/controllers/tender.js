module.exports = {

  async findTenderField(ctx) {
    return await strapi.query('tender').findOne({ field: ctx.params['idField']})
  },

  async findTenderHive(ctx) {
    return await strapi.query('tender').findOne({ hive: ctx.params['idHive']})
  },

  async availableTenders() {
    const data = await strapi.query('tender').find()
    const dataOut = []
    for (const t in data) {
      // console.log(data[t])
      if(data[t].hive === null || !data[t].hive.id) {
        dataOut.push(data[t])
      }
    }
    return dataOut
  }
};

