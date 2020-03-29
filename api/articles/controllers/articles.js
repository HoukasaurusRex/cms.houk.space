'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  async find(ctx) {

    ctx.query = {
      ...ctx.query,
      status: 'published'
    }

    const entities = ctx.query._q
      ? await strapi.services.articles.search(ctx.query)
      : await strapi.services.articles.find(ctx.query)

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.articles })
    )
  },
}

