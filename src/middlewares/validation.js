export function validation(schema){
    return (req , res , next) =>{
        let data = {...req.body , ...req.params , ...req.query}
        let validationResult = schema.validate(data , {abortEarly:false})

        if(validationResult.error){

            let errorMessages = validationResult.error.details.map((err)=>{
                return err.message ;
            })
            
            return next(new Error(errorMessages , {cause:400}))
        }else{
            return next()
        }
    }
}