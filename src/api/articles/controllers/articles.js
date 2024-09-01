const { createCoreController } = require('@strapi/strapi').factories;

module.exports =  createCoreController('api::articles.articles', {
  async find(ctx) {

    ctx.query = this.sanitizeQuery({
      ...ctx.query,
      status: 'published'
    })

    const entities = ctx.query._q
      ? await strapi.services.articles.search(ctx.query)
      : await strapi.services.articles.find(ctx.query)

    return this.sanitizeOutput(entities, ctx)
  },
})

