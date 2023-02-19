const { findAuthUser } = require('../services/users.services');
const { ErrorObject } = require('../helpers/error');
const { verify } = require('../utils/jwt.utils');

module.exports = {
  checkAuth: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw new ErrorObject('You must log in', 403);
      }
      const token = req.headers.authorization.split(' ').pop();
      const tokenData = verify(token);
      if (!tokenData) throw new ErrorObject('Access denied', 403);
  
      req.token = tokenData;
  
    } catch (error) {
      next(error);
    }
  },
  
  checkId: async (req, res, next) => {
    try {
  
      const { senderId } = req.body
  
      const user = await findAuthUser(senderId)
  
      if(user.id !== token.id) throw new ErrorObject('The sender of the message is incorrect', 400)
  
    
    } catch (error) {
      next(error);
    }
  },
}

