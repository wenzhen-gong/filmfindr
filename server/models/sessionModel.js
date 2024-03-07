const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expiresAfterSeconds: 20 },
  // expireAt: {
  //   type: string,
  //   default: Date.now,
  //   expires: 3000
  // }
});

module.exports = mongoose.model('Session', sessionSchema);
