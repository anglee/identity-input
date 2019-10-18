/* eslint-disable global-require */
export default process.env.NODE_ENV === 'production'
  ? require('./store').default
  : require('./store.dev').default;
/* eslint-enable global-require */
