export let globalErrorHandler = (error , req , res , next)=>{
    return res.json({
        success:false ,
        message:error.message ,
        stack:error.stack
    })
}