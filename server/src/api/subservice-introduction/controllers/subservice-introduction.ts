export default {
  async getSummary(ctx) {
    try {
      const totalArticles = await strapi.query('api::subservice.subservice').count();

      
      ctx.body = {
        totalArticles,

      };
    } catch (err) {
      ctx.body = {
        error: 'An error occurred while fetching the summary data',
        details: err instanceof Error ? err.message : 'Unknown error',
      };
      ctx.status = 500; // Set the HTTP status code to 500 to indicate a server error
    }
  },
};