const { User } = require('../database/models');
const { hash } = require('../utils/bcrypt.utils');





module.exports = {
     findByEmail:  async (email) => {
    
        const userId = await User.findOne({
            where: {
                email
            },
            raw: true
        })
    
        return userId
    
    },

    createNewUser: async ({firstName,lastName,email,password}) => {

        const hashPassword = hash(password)
        
        const [response, created]  = User.findOrCreate({
            where: {
                email: email,
              },
            default: {
                firstName,
                lastName,
                email,
                password: hashPassword
                
            }
        })

        if(created) return false
        
        return response
    },

    findAuthUser: async (senderId) => {
        
        const user = await User.findOne({
            where:{
                id: senderId
            },
        })

        return user
        
    },

    findUserById: async (userId) => {

        const user = await User.findOne({
            where: {
                id: userId
            },
            attributes: ['firstName', 'lastName']
        })

        return user
    }

   

}

