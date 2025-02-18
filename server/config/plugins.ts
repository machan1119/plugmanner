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

    },
    // ...
  });