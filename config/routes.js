var messages = require('../controllers/messages');

module.exports = function (app) {
  /**
   * Routes for app
   */
  app.get('/', messages.index);
};
