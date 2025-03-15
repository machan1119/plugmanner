export default ({ env }) => ({
    // ...
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '30m',
        },
        register: {
            allowedFields: ["nickname"],
        },

      },
      seo: {
        enabled: true,
      }
    },
    'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 3, // Default is 5
    }
  },
    // ...
  });