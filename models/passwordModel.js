const mongoose=require('mongoose')

const pschema= new mongoose.Schema(
    {
        
        label:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId
            ,required:true
        }
                
})

module.exports=mongoose.model('passwords',pschema);

