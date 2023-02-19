const jwt = require('jsonwebtoken');

const secret = '12345678'

const encode = (payload) => {
    return jwt.sign(payload, secret);
  };
  
 
  
  const verify = (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  };
  
  module.exports = {
    encode,
    verify,
  };