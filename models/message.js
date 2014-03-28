var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Message Schema
 * @type {Schema}
 */
var MessageSchema = new Schema({
  name: {type: String, default: '', trim: true},
  message: { type: String, default: '', trim: true},
  createdAt: {type: Date, default: Date.now}
});

MessageSchema.statics = {
  /**
   * List messages
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {};
    this.find(criteria).sort({'createdAt': -1}).exec(cb);
  }
};

mongoose.model('Message', MessageSchema);