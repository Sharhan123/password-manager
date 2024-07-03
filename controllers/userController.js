const userData = require('../models/userSchema')
const passData = require('../models/passwordModel')
const { generateToken, verifyToken } = require('../jwt')




module.exports = {

    
    userRegister: async (req, res) => {
        try {
            const { name, email, pass, cpass  } = req.body
            
            console.log(req.body);
            const uData = await userData.findOne({ email: email })
            if (!uData) {

                if (pass === cpass) {


                    const data = new userData({
                        name:name,
                        email: email,
                        password: pass,
                        
                    })  

                    const resData = await data.save()
                    console.log(resData);
                    const payload = {
                        name:resData.name,
                        email: resData.email,
                        id: resData._id
                    }
                    const token = generateToken(payload)
                    res.status(200).json({ message: 'success', token })

                } else {
                    return res.status(403).json({ message: 'Provided Password and Confirm password do not match ' })
                }

            } else {
                return res.status(403).json({ message: 'Email address is already registered' })

            }


        } catch (err) {
            console.log(err);
        }
    },


    userSignin: async (req, res) => {
        try {
            const { email, pass } = req.body
            const user = await userData.findOne({ email: email })

            if (user) {
                

                if (pass === user.password) {
                    const payload = {
                        name: user.name,
                        email: user.email,
                        id: user._id
                    }
                    const token = generateToken(payload)

                    return res.status(200).json({ message: 'success',token })
                } else {
                    return res.status(403).json({ message: {pass:'Provided password is incorrect',email:''} })
                }
            } else {
                return res.status(403).json({ message:{pass:'',email:'Email address does not exist'} })
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error',err })
        }
    }
,
    savePassword: async (req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(token){

                const decoded = verifyToken(token)
                
                if(decoded){
                    const {label,password} = req.body
                    
            const data = new passData({
                label:label,
                password:password,
                userId:decoded.id
            })
            await data.save()
            return res.status(200).json({message:'success',data})
                }
            }
            
        }catch(err){
            console.log(err);
            return res.status(500).json({ message: 'Internal server error',err })
        }
    }
,
    getPasswords: async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(token){

                const decoded = verifyToken(token)
                
                if(decoded){
                    const data = await passData.find({userId:decoded.id})
                    return res.status(200).json({message:'success',data})
                }
            }

        }catch(err){
            console.log(err)
            return res.status(500).json({ message: 'Internal server error',err })

        }
    }

}