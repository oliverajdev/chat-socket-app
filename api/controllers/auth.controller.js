const { compare } = require("../utils/bcrypt.utils")
const { ErrorObject } = require("../helpers/error")
const { findByEmail, createNewUser } = require("../services/users.services")
const { encode } = require("../utils/jwt.utils")
const { endpointResponse } = require("../helpers/success")



module.exports = {
    userLogin: async (req,res,next) => {
        try{
     
            const {email, password} = req.body
    
            const user = await findByEmail(email);

    
            if(!user) throw new ErrorObject('incorrect email or password', 401)


    
            const hashPassword = user.password

            const passwordMatch = await compare(password,hashPassword)
    
            if(!passwordMatch) throw new ErrorObject('incorrect email or password', 401)
    
            delete user.password
            
            const token = encode(user)

    
            endpointResponse({
                res,
                message: 'Login successfully',
                body: {
                    token,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user.id,
                    email: user.email
                }
            })           
    
        }catch(err){
            next(err)
        }
    },
    
    userRegister: async  (req,res,next) =>{
        try{
          
            const user = await createNewUser(req.body)
    
            if(!user) throw new ErrorObject('User or email already exist.', 400)
    
            endpointResponse({
                res: 201,
                message: 'User created',
              })
    
    
        }catch(err){
            next(err)
        }
    
    }
}