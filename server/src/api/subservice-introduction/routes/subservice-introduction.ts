export default {
  routes: [
    {
      method: 'GET',
      path: '/subservice-introduction',
      handler: 'subservice-introduction.getSummary',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};